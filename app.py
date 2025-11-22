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
import smtplib
import ssl
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart

from flask import Flask, render_template, request, jsonify

# ------------------------
# CONFIG
# ------------------------

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
            writer.writerow(["name", "email", "phone", "apartment_type", "message", "form_type"])
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
      - Tries to log the enquiry to enquiries.csv
      - Tries to send an email
      - If at least ONE of those succeeds, returns success to the user
      - Only if BOTH fail, returns an error
    """
    # Accept JSON or form-encoded data
    raw = request.get_json(silent=True) or request.form

    name = raw.get("name", "").strip()
    email = raw.get("email", "").strip()
    phone_code = raw.get("country_code", "").strip()
    phone = raw.get("phone", "").strip()
    apartment_type = raw.get("apartment_type", "").strip()
    message = raw.get("message", "").strip()
    form_type = raw.get("form_type", "website").strip()  # e.g. "quick", "contact"

    full_phone = (phone_code + " " + phone).strip() if phone_code else phone

    # --- Basic validation ---
    if not name or not phone:
        return jsonify({
            "ok": False,
            "error": "name_and_phone_required",
            "message": "Name and phone are required."
        }), 400

    # Build unified data dict for helpers
    enquiry_data = {
        "name": name,
        "email": email,
        "phone": full_phone,
        "apartment_type": apartment_type,
        "message": message,
        "form_type": form_type,
    }

    # --- 1) Try CSV logging ---
    csv_ok = save_to_csv(enquiry_data)   # must return True/False

    # --- 2) Try email sending (with timeout inside send_email) ---
    email_ok = send_email(enquiry_data)  # must return True/False

    # --- 3) Final response logic ---
    if csv_ok or email_ok:
        # At least one of the two worked → show success message
        return jsonify({
            "ok": True,
            "message": "Enquiry received. Our team will contact you shortly.",
            "csvLogged": csv_ok,
            "emailSent": email_ok
        })

    # If BOTH failed, return error to frontend
    return jsonify({
        "ok": False,
        "message": "Something went wrong while saving your enquiry. Please try again or contact us via WhatsApp / Call.",
        "csvLogged": csv_ok,
        "emailSent": email_ok
    }), 500

    # -----------------------------
    # 1) TRY TO LOG TO enquiries.csv
    # -----------------------------
def save_to_csv(data):
    try:
        file_exists = os.path.exists(ENQUIRY_CSV)

        with open(ENQUIRY_CSV, "a", newline="", encoding="utf-8") as f:
            writer = csv.writer(f)

            # Write header only if file was empty
            if os.path.getsize(ENQUIRY_CSV) == 0:
                writer.writerow(["name", "email", "phone", "apartment_type", "message", "form_type"])

            writer.writerow([
                data.get("name", ""),
                data.get("email", ""),
                data.get("phone", ""),
                data.get("apartment_type", ""),
                data.get("message", ""),
                data.get("form_type", ""),
            ])

        print("[INFO] Enquiry saved to CSV.")
        return True

    except Exception as e:
        print(f"[ERROR] CSV write failed: {e}")
        return False

    # -----------------------------
    # 2) TRY TO SEND EMAIL (with short timeout)
    # -----------------------------
def send_email(data):
    """
    Sends enquiry email. Returns True if email was sent, False if failed.
    Email errors NEVER stop the app (worker-safe).
    """
    if not (SMTP_USER and SMTP_PASS and SMTP_HOST):
        print("[EMAIL] SMTP missing, skipping email send.")
        return False

    try:
        name = data.get("name", "")
        email = data.get("email", "")
        phone = data.get("phone", "")
        apartment_type = data.get("apartment_type", "")
        message = data.get("message", "")
        form_type = data.get("form_type", "")

        body = f"""
        New enquiry ({form_type}):

        Name: {name}
        Email: {email or "—"}
        Phone: {phone or "—"}
        Apartment Type: {apartment_type or "—"}

        Message:
        {message or "—"}
        """

        msg = MIMEMultipart()
        msg["From"] = SMTP_USER
        msg["To"] = ENQUIRY_TO
        msg["Subject"] = f"New Batumi Island Estates enquiry ({form_type})"
        msg.attach(MIMEText(body, "plain", "utf-8"))

        context = ssl.create_default_context()

        # SSL mode (port 465)
        if str(SMTP_PORT) == "465":
            with smtplib.SMTP_SSL(SMTP_HOST, SMTP_PORT, context=context, timeout=5) as server:
                server.login(SMTP_USER, SMTP_PASS)
                server.send_message(msg)

        # STARTTLS (port 587)
        else:
            with smtplib.SMTP(SMTP_HOST, SMTP_PORT, timeout=5) as server:
                server.ehlo()
                server.starttls(context=context)
                server.ehlo()
                server.login(SMTP_USER, SMTP_PASS)
                server.send_message(msg)

        print("[EMAIL] Sent successfully.")
        return True

    except Exception as e:
        print("[EMAIL] Failed:", repr(e))
        return False

# ------------------------
# DEV ENTRYPOINT
# ------------------------
if __name__ == "__main__":
    # For local development
    # You can change port if needed (e.g. 5001, 7860, etc.)
    app.run(host="0.0.0.0", port=5001, debug=True)
