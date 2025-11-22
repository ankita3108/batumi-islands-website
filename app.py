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
ENQUIRY_CSV = os.getenv("ENQUIRY_CSV", "enquiry.csv")

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
    data = request.get_json(silent=True) or request.form

    name = data.get("name", "").strip()
    email = data.get("email", "").strip()
    phone_code = data.get("country_code", "").strip()
    phone = data.get("phone", "").strip()
    apartment_type = data.get("apartment_type", "").strip()
    message = data.get("message", "").strip()
    form_type = data.get("form_type", "website").strip()  # e.g. "quick", "contact"

    full_phone = (phone_code + " " + phone).strip() if phone_code else phone

    # --- Basic validation ---
    if not name or not phone:
        return jsonify({
            "ok": False,
            "error": "name_and_phone_required",
            "message": "Name and phone are required."
        }), 400

    csv_ok = False
    email_ok = False

    # -----------------------------
    # 1) TRY TO LOG TO enquiries.csv
    # -----------------------------
    try:
        file_exists = os.path.isfile(ENQUIRY_CSV)
        with open(ENQUIRY_CSV, "a", newline="", encoding="utf-8") as f:
            writer = csv.writer(f)
            if not file_exists:
                writer.writerow([
                    "name",
                    "email",
                    "phone",
                    "apartment_type",
                    "message",
                    "form_type"
                ])
            writer.writerow([
                name,
                email,
                full_phone,
                apartment_type,
                message,
                form_type
            ])
        print(f"[CSV] Enquiry saved to {ENQUIRY_CSV}")
        csv_ok = True
    except Exception as e:
        print("[CSV] Error writing enquiry:", repr(e))

    # -----------------------------
    # 2) TRY TO SEND EMAIL
    # -----------------------------
    # Only attempt if SMTP_USER and SMTP_PASS are configured
    if SMTP_USER and SMTP_PASS and SMTP_HOST:
        try:
            body_lines = [
                f"New enquiry from Batumi Island Estates ({form_type} form):",
                "",
                f"Name: {name}",
                f"Phone: {full_phone}",
                f"Email: {email or '—'}",
                f"Apartment Type: {apartment_type or '—'}",
                "",
                "Message:",
                message or "—",
            ]
            email_body = "\n".join(body_lines)

            msg = MIMEMultipart()
            msg["From"] = SMTP_USER
            msg["To"] = ENQUIRY_TO
            msg["Subject"] = f"New Batumi Island Estates enquiry ({form_type})"
            msg.attach(MIMEText(email_body, "plain", "utf-8"))

            context = ssl.create_default_context()

            if SMTP_PORT == 465:
                # SSL connection
                with smtplib.SMTP_SSL(SMTP_HOST, SMTP_PORT, context=context) as server:
                    server.login(SMTP_USER, SMTP_PASS)
                    server.send_message(msg)
            else:
                # STARTTLS (e.g. port 587)
                with smtplib.SMTP(SMTP_HOST, SMTP_PORT) as server:
                    server.ehlo()
                    server.starttls(context=context)
                    server.ehlo()
                    server.login(SMTP_USER, SMTP_PASS)
                    server.send_message(msg)

            print("[EMAIL] Enquiry email sent successfully to", ENQUIRY_TO)
            email_ok = True

        except Exception as e:
            print("[EMAIL] Error sending enquiry email:", repr(e))
    else:
        print("[EMAIL] SMTP not configured (missing SMTP_USER/SMTP_PASS/SMTP_HOST), skipping email send.")

    # -----------------------------
    # 3) FINAL RESPONSE LOGIC
    # -----------------------------
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

# ------------------------
# DEV ENTRYPOINT
# ------------------------
if __name__ == "__main__":
    # For local development
    # You can change port if needed (e.g. 5001, 7860, etc.)
    app.run(host="0.0.0.0", port=5001, debug=True)
