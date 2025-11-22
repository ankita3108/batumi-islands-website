# -*- coding: utf-8 -*-

import os
import smtplib
from email.mime.text import MIMEText
from flask import Flask, request, jsonify

# ------------------------
# CONFIG
# ------------------------
SMTP_HOST = os.getenv("SMTP_HOST", "smtp.gmail.com")
SMTP_PORT = int(os.getenv("SMTP_PORT", "465"))
SMTP_USER = os.getenv("SMTP_USER", "gupta.ankita3122@gmail.com")      # put your email here or via env
SMTP_PASS = os.getenv("SMTP_PASS", "ifqieuymjxbrgmhx")      # put your app password here or via env
ENQUIRY_TO = os.getenv("ENQUIRY_TO", "gupta.ankita3122@gmail.com")    # where you want to receive enquiries

# If you just want to TEST without email, set:
DRY_RUN = False   # True = do NOT send email, only print to terminal


app = Flask(__name__, static_folder="frontend", static_url_path="")


# ------------------------
# ROUTES
# ------------------------

@app.route("/")
def index():
    # serves frontend/index.html
    return app.send_static_file("index.html")


@app.route("/api/enquiry", methods=["POST"])
def handle_enquiry():
    # Make sure JSON is parsed
    try:
        data = request.get_json(force=True)
    except Exception:
        return jsonify({"ok": False, "error": "invalid_json"}), 400

    form_type = (data.get("formType") or "main").strip()
    name = (data.get("name") or "").strip()
    email = (data.get("email") or "").strip()
    phone = (data.get("phone") or "").strip()
    country_code = (data.get("countryCode") or "").strip()
    apartment_type = (data.get("apartmentType") or "").strip()
    message = (data.get("message") or "").strip()

    # Basic validation
    if not name or not phone:
        return jsonify({
            "ok": False,
            "error": "name_and_phone_required",
            "message": "Name and phone are required."
        }), 400

    # Build email body
    body_lines = [
        "New enquiry from Batumi Island Estates ({} form):".format(form_type),
        "",
        "Name: {}".format(name),
        "Phone: {} {}".format(country_code, phone),
        "Email: {}".format(email or "-"),
        "Apartment Type: {}".format(apartment_type or "-"),
        "",
        "Message:",
        message or "-"
    ]
    body = "\n".join(body_lines)

    print("\n--- New Enquiry Received ---")
    print(body)
    print("----------------------------\n")

    # If DRY_RUN = True, don't send email yet
    if DRY_RUN or not (SMTP_USER and SMTP_PASS and ENQUIRY_TO):
        # Just acknowledge success for now
        return jsonify({"ok": True, "dryRun": True})

    # Try sending email
    try:
        msg = MIMEText(body, "plain", "utf-8")
        msg["Subject"] = "New Batumi Enquiry from {}".format(name)
        msg["From"] = SMTP_USER
        msg["To"] = ENQUIRY_TO

        with smtplib.SMTP_SSL(SMTP_HOST, SMTP_PORT) as server:
            server.login(SMTP_USER, SMTP_PASS)
            server.send_message(msg)

    except Exception as e:
        # Log the email error, but still return ok=True so your UI doesn't show error
        print("Email send error:", e)
        return jsonify({
            "ok": True,
            "emailError": True,
            "emailErrorMessage": str(e)
        })

    return jsonify({"ok": True})


if __name__ == "__main__":
    # Use a standard dev port; change if something else is using it
    app.run(host="0.0.0.0", port=5001, debug=True)
