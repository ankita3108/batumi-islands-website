import smtplib
from email.mime.text import MIMEText

SMTP_HOST = "smtp.gmail.com"
SMTP_PORT = 465
SMTP_USER = "gupta.ankita3122@gmail.com"          # same as in app.py
SMTP_PASS = "ifqieuymjxbrgmhx"     # same app password
TO_EMAIL   = "gupta.ankita3122@gmail.com"         # where to receive test

body = "Test email from Batumi website SMTP test."

msg = MIMEText(body, "plain", "utf-8")
msg["Subject"] = "Batumi Website SMTP Test"
msg["From"] = SMTP_USER
msg["To"] = TO_EMAIL

try:
    with smtplib.SMTP_SSL(SMTP_HOST, SMTP_PORT) as server:
        server.login(SMTP_USER, SMTP_PASS)
        server.send_message(msg)
    print("✅ Test email sent successfully.")
except Exception as e:
    print("❌ SMTP error:", repr(e))
