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
    Handle enquiries from both:
    - Main contact form
    - Quick enquiry modal
    Expects JSON or form-encoded data.
    """
    data = request.get_json(silent=True) or request.form

    name = data.get("name", "").strip()
    email = data.get("email", "").strip()
    phone_code = data.get("country_code", "").strip()
    phone = data.get("phone", "").strip()
    apartment_type = data.get("apartment_type", "").strip()
    message = data.get("message", "").strip()
    form_type = data.get("form_type", "website").strip()  # e.g., "quick", "contact"

    full_phone = (phone_code + " " + phone).strip()

    # Basic validation: name and phone are essential
    if not name or not phone:
        return jsonify({
            "ok": False,
            "error": "name_and_phone_required",
            "message": "Name and phone are required."
        }), 400

    # ------------------------
    # Save enquiry to CSV
    # ------------------------
    try:
        file_exists = os.path.isfile(ENQUIRY_CSV)
        with open(ENQUIRY_CSV, "a", newline="", encoding="utf-8") as f:
            writer = csv.writer(f)
            if not file_exists:
                writer.writerow(["name", "email", "phone", "apartment_type", "message", "form_type"])
            writer.writerow([name, email, full_phone, apartment_type, message, form_type])
    except Exception as e:
        # Log CSV error but do not fail the API
        print("CSV write error:", repr(e))

    # ------------------------
    # Build email content
    # ------------------------
    body_lines = [
        "New enquiry from Batumi Island Estates ({} form):".format(form_type),
        "",
        "Name: {}".format(name),
        "Phone: {}".format(full_phone),
        "Email: {}".format(email or "—"),
        "Apartment Type: {}".format(apartment_type or "—"),
        "",
        "Message:",
        message or "—",
    ]
    email_body = "\n".join(body_lines)

    # ------------------------
    # Send email (best-effort, fail gracefully)
    # ------------------------
    email_error = None

    if SMTP_USER and SMTP_PASS:
        try:
            msg = MIMEMultipart()
            msg["From"] = SMTP_USER
            msg["To"] = ENQUIRY_TO
            msg["Subject"] = "New Batumi Island Estates enquiry ({})".format(form_type)
            msg.attach(MIMEText(email_body, "plain", "utf-8"))

            if SMTP_PORT == 465:
                # SSL
                context = ssl.create_default_context()
                with smtplib.SMTP_SSL(SMTP_HOST, SMTP_PORT, context=context) as server:
                    server.login(SMTP_USER, SMTP_PASS)
                    server.send_message(msg)
            else:
                # STARTTLS (e.g., port 587)
                with smtplib.SMTP(SMTP_HOST, SMTP_PORT) as server:
                    server.ehlo()
                    server.starttls(context=ssl.create_default_context())
                    server.ehlo()
                    server.login(SMTP_USER, SMTP_PASS)
                    server.send_message(msg)

        except Exception as e:
            email_error = repr(e)
            print("Email send error:", email_error)
    else:
        email_error = "SMTP credentials not configured"
        print("Email skipped: SMTP_USER or SMTP_PASS not set")

    # ------------------------
    # Response to frontend
    # ------------------------
    response = {
        "ok": True,
        "message": "Enquiry received. Our team will contact you shortly."
    }

    if email_error:
        # Let frontend know email failed but don't break the UX
        response["emailError"] = True
        response["emailErrorMessage"] = email_error

    return jsonify(response)


# ------------------------
# DEV ENTRYPOINT
# ------------------------
if __name__ == "__main__":
    # For local development
    # You can change port if needed (e.g. 5001, 7860, etc.)
    app.run(host="0.0.0.0", port=5001, debug=True)
