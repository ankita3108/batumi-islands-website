# -*- coding: utf-8 -*-
"""
Batumi Island Estates - Flask backend

- Serves index.html from templates/
- Serves static/ automatically (CSS, JS, images, videos, components)
- Handles /api/enquiry for both main form and quick enquiry modal
- Saves enquiries to enquiry.csv
- Sends email using SMTP (Gmail / other) but fails gracefully
"""

import os
import csv
import ssl
import smtplib
from datetime import datetime

import requests
from flask import Flask, render_template, request, jsonify, send_from_directory
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart

# ------------------------
# CONFIG
# ------------------------

# Google Sheets webhook (Apps Script URL)
GOOGLE_SHEETS_WEBHOOK_URL = os.getenv("GOOGLE_SHEETS_WEBHOOK_URL", "https://script.google.com/macros/s/AKfycbxtdfFr6TAiRhxBrwksw4XtZjHu83ToJMN89hrUgOCt_EEknAXgd1t6bOtPAZE-_g/exec")

# SMTP settings – override these with environment variables in production
SMTP_HOST = os.getenv("SMTP_HOST", "smtp.gmail.com")
SMTP_PORT = int(os.getenv("SMTP_PORT", "587"))   # 587 for STARTTLS, 465 for SSL
SMTP_USER = os.getenv("SMTP_USER", "gupta.ankita3122@gmail.com")      # your email
SMTP_PASS = os.getenv("SMTP_PASS", "ifqieuymjxbrgmhx")          # your app password
ENQUIRY_TO = os.getenv("ENQUIRY_TO", SMTP_USER)                       # where enquiries are sent

# CSV file to log enquiries
ENQUIRY_CSV = os.getenv("ENQUIRY_CSV", "enquiries.csv")

# Ensure CSV file exists with headers
def ensure_csv_exists():
  if not os.path.exists(ENQUIRY_CSV):
      with open(ENQUIRY_CSV, "w", newline="", encoding="utf-8") as f:
          writer = csv.writer(f)
          writer.writerow([
              "name",
              "email",
              "phone",
              "country_code",
              "apartment_type",
              "budget",
              "message",
              "form_type",
              "timestamp"
          ])
      print(f"[INFO] Created CSV file: {ENQUIRY_CSV}")

# Call immediately at app startup
ensure_csv_exists()

# ------------------------
# FLASK APP
# ------------------------

app = Flask(
    __name__,
    template_folder="templates",   # index.html is here
    static_folder="static"         # CSS, JS, images, videos, components
)

# ------------------------
# ROUTES
# ------------------------

@app.route("/")
def home():
    """Serve the main landing page."""
    return render_template("index.html")


@app.route("/api/enquiry", methods=["POST"])
def handle_enquiry():
    """
    Handles enquiries from:
    - Main contact form
    - Quick enquiry modal

    Behaviour:
      - Builds unified enquiry_data dict
      - Logs to CSV
      - Sends to Google Sheets
      - Tries to send email
      - If CSV OR Sheets OR Email succeeds => returns success
    """
    raw = request.get_json(silent=True) or request.form

    name = (raw.get("name") or "").strip()
    email = (raw.get("email") or "").strip()
    phone = (raw.get("phone") or "").strip()
    country_code = (raw.get("country_code") or "").strip()
    apartment_type = (raw.get("apartment_type") or "").strip()
    budget = (raw.get("budget") or "").strip()
    message = (raw.get("message") or "").strip()
    form_type = (raw.get("form_type") or "website").strip()

    full_phone = f"{country_code} {phone}".strip() if country_code else phone

    # Basic validation
    if not name or not phone:
        return jsonify({
            "ok": False,
            "error": "name_and_phone_required",
            "message": "Name and phone are required."
        }), 400

    enquiry_data = {
        "name": name,
        "email": email,
        "phone": full_phone,
        "country_code": country_code,
        "apartment_type": apartment_type,
        "budget": budget,
        "message": message,
        "form_type": form_type,
    }

    csv_ok = save_to_csv(enquiry_data)
    sheets_ok = send_to_sheets(enquiry_data)
    email_ok = send_email(enquiry_data)

    if csv_ok or sheets_ok or email_ok:
        return jsonify({
            "ok": True,
            "message": "Enquiry received. Our team will contact you shortly.",
            "csvLogged": csv_ok,
            "sheetsLogged": sheets_ok,
            "emailSent": email_ok
        })

    return jsonify({
        "ok": False,
        "message": "Something went wrong while saving your enquiry. Please try again or contact us via WhatsApp / Call.",
        "csvLogged": csv_ok,
        "sheetsLogged": sheets_ok,
        "emailSent": email_ok
    }), 500

    # -----------------------------
    # 1) TRY TO LOG TO enquiries.csv
    # -----------------------------
def save_to_csv(data):
    """
    Saves enquiry to enquiries.csv with columns:
    name, email, phone, country_code, apartment_type, budget, message, form_type, timestamp
    """
    try:
        file_missing = not os.path.exists(ENQUIRY_CSV)

        with open(ENQUIRY_CSV, "a", newline="", encoding="utf-8") as f:
            writer = csv.writer(f)

            # If file was created empty, write header
            if file_missing or os.path.getsize(ENQUIRY_CSV) == 0:
                writer.writerow([
                    "name",
                    "email",
                    "phone",
                    "country_code",
                    "apartment_type",
                    "budget",
                    "message",
                    "form_type",
                    "timestamp"
                ])

            writer.writerow([
                data.get("name", ""),
                data.get("email", ""),
                data.get("phone", ""),
                data.get("country_code", ""),
                data.get("apartment_type", ""),
                data.get("budget", ""),
                data.get("message", ""),
                data.get("form_type", ""),
                datetime.utcnow().isoformat(timespec="seconds"),
            ])

        print("[CSV] Enquiry saved to", ENQUIRY_CSV)
        return True
    
    except Exception as e:
        print("[CSV] Error saving enquiry:", repr(e))
        return False

    # -----------------------------
    # 2) TRY TO SEND EMAIL (with short timeout)
    # -----------------------------
def send_email(data):
    """
    Attempts to send an email with enquiry details.
    Returns True if sent, False if not configured or fails.
    """
    if not (SMTP_USER and SMTP_PASS and SMTP_HOST):
        print("[EMAIL] SMTP not configured, skipping email.")
        return False

    try:
        body = f"""
        New enquiry ({data.get('form_type', '')}):

        Name: {data.get('name', '')}
        Email: {data.get('email', '—')}
        Phone: {data.get('phone', '—')}
        Country Code: {data.get('country_code', '—')}
        Apartment Type: {data.get('apartment_type', '—')}
        Budget (USD): {data.get('budget', '—')}

        Message:
        {data.get('message', '—')}
                """.strip()
        
        msg = MIMEMultipart()
        msg["From"] = SMTP_USER
        msg["To"] = ENQUIRY_TO
        msg["Subject"] = f"Batumi Island Estates enquiry ({data.get('form_type', '')})"
        msg.attach(MIMEText(body, "plain", "utf-8"))

        context = ssl.create_default_context()

        if str(SMTP_PORT) == "465":
            with smtplib.SMTP_SSL(SMTP_HOST, SMTP_PORT, context=context, timeout=5) as server:
                server.login(SMTP_USER, SMTP_PASS)
                server.send_message(msg)
        else:
            with smtplib.SMTP(SMTP_HOST, SMTP_PORT, timeout=5) as server:
                server.ehlo()
                server.starttls(context=context)
                server.ehlo()
                server.login(SMTP_USER, SMTP_PASS)
                server.send_message(msg)

        print("[EMAIL] Enquiry email sent.")
        return True
    except Exception as e:
        print("[EMAIL] Error sending email:", repr(e))
        return False

def send_to_sheets(data):
    """
    Sends enquiry data to Google Sheets via Apps Script webhook.
    Keys expected by Apps Script:
    name, email, phone, country_code, apartment_type, budget, message, form_type
    """
    if not GOOGLE_SHEETS_WEBHOOK_URL:
        print("[SHEETS] GOOGLE_SHEETS_WEBHOOK_URL not set, skipping Sheets.")
        return False

    try:
        resp = requests.post(
            GOOGLE_SHEETS_WEBHOOK_URL,
            json=data,
            timeout=8
        )
        print("[SHEETS] Status:", resp.status_code, "Body:", resp.text[:200])
        return resp.status_code == 200
    except Exception as e:
        print("[SHEETS] Error sending to Sheets:", repr(e))
        return False

@app.route("/life-in-georgia")
def life_in_georgia():
    return send_from_directory("static/pages", "life-in-georgia.html")
# ------------------------
# DEV ENTRYPOINT
# ------------------------
if __name__ == "__main__":
    # For local development
    # You can change port if needed (e.g. 5001, 7860, etc.)
    app.run(host="0.0.0.0", port=5001, debug=True)
