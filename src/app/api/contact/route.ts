import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";
import fs from "fs";
import path from "path";

// Helper function to get config (with fallback to .env parsing)
function getEnvVar(key: string, defaultValue: string = ""): string {
  // 1. Try process.env first
  const val = process.env[key];
  if (val && val.trim() !== "") {
    return val.trim();
  }

  // 2. Fallback to reading .env file directly (useful for local development environments)
  try {
    const envPath = path.join(process.cwd(), ".env");
    if (fs.existsSync(envPath)) {
      const content = fs.readFileSync(envPath, "utf-8");
      // Use regex that parses key=value ignoring optional spaces
      const regex = new RegExp(`^\\s*${key}\\s*=\\s*(.+)`, "m");
      const match = content.match(regex);
      if (match && match[1]) {
        return match[1].trim();
      }
    }
  } catch (err) {
    console.error(`Error reading .env fallback for ${key}:`, err);
  }

  return defaultValue;
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, subject, message } = body;

    // 1. Validation
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Name, email, and message are required fields." },
        { status: 400 }
      );
    }

    // 2. Load SMTP configurations
    const host = getEnvVar("SMTP_HOST", "smtp.gmail.com");
    const portStr = getEnvVar("SMTP_PORT", "587");
    const port = parseInt(portStr, 10);
    const user = getEnvVar("SMTP_USER");
    const passRaw = getEnvVar("SMTP_PASS");
    const pass = passRaw.replace(/\s+/g, "");
    const recipient = getEnvVar("CONTACT_RECIPIENT_EMAIL", "gouravkar0072@gmail.com");

    if (!user || !pass) {
      return NextResponse.json(
        {
          error: "Email system is not configured. Please define SMTP_USER and SMTP_PASS in your environment settings.",
        },
        { status: 500 }
      );
    }

    // 3. Configure Nodemailer transport
    const transporter = nodemailer.createTransport({
      host,
      port,
      secure: port === 465, // true for port 465, false for 587/other ports
      auth: {
        user,
        pass,
      },
      tls: {
        // Prevent connection failures due to self-signed certificates or host mismatch in local development
        rejectUnauthorized: false,
      },
    });

    // 4. Premium themed HTML Email Template (matching portfolio's cyber-grid dark theme)
    const mailOptions = {
      from: `"${name}" <${user}>`, // Standardize from address to authenticated user to prevent spam filters
      to: recipient,
      replyTo: email, // Direct replies back to the sender
      subject: `Portfolio Inquiry: ${subject || "No Subject"}`,
      text: `New Portfolio Inquiry\n\nName: ${name}\nEmail: ${email}\nSubject: ${subject || "N/A"}\n\nMessage:\n${message}`,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>New Portfolio Message</title>
          <style>
            body {
              font-family: 'SF Pro Display', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
              background-color: #07090e;
              color: #cbd5e1;
              margin: 0;
              padding: 20px;
            }
            .container {
              max-width: 600px;
              margin: 20px auto;
              background-color: #0a0f1d;
              border: 1px solid #1e293b;
              border-radius: 16px;
              overflow: hidden;
              box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
            }
            .header {
              background: linear-gradient(135deg, #090e1c 0%, #0284c7 100%);
              padding: 35px 30px;
              text-align: center;
              border-bottom: 2px solid #06b6d4;
            }
            .header h1 {
              margin: 0;
              font-size: 20px;
              color: #ffffff;
              letter-spacing: 2px;
              text-transform: uppercase;
              font-weight: 800;
            }
            .subtitle {
              color: #22d3ee;
              font-size: 11px;
              text-transform: uppercase;
              letter-spacing: 3px;
              margin-top: 8px;
              font-weight: bold;
            }
            .content {
              padding: 35px 30px;
            }
            .field-group {
              margin-bottom: 25px;
            }
            .label {
              font-size: 11px;
              text-transform: uppercase;
              color: #06b6d4;
              font-weight: 700;
              letter-spacing: 1.5px;
              margin-bottom: 8px;
            }
            .value {
              font-size: 15px;
              color: #f1f5f9;
            }
            .message-box {
              background-color: #04060c;
              border: 1px solid #1e293b;
              border-radius: 10px;
              padding: 20px;
              white-space: pre-wrap;
              font-size: 14px;
              line-height: 1.6;
              color: #e2e8f0;
            }
            .footer {
              background-color: #04060c;
              padding: 20px;
              text-align: center;
              font-size: 11px;
              color: #64748b;
              border-top: 1px solid #1e293b;
            }
            .footer a {
              color: #06b6d4;
              text-decoration: none;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>Inquiry Transmitted</h1>
              <div class="subtitle">Digital Identity Hub Contact Form</div>
            </div>
            <div class="content">
              <div class="field-group">
                <div class="label">Sender Identity</div>
                <div class="value" style="font-weight: 600;">${name}</div>
              </div>
              <div class="field-group">
                <div class="label">Sender Email Address</div>
                <div class="value">
                  <a href="mailto:${email}" style="color: #38bdf8; text-decoration: none;">${email}</a>
                </div>
              </div>
              <div class="field-group">
                <div class="label">Subject Reason</div>
                <div class="value">${subject || "Direct Professional Inquiry"}</div>
              </div>
              <div class="field-group">
                <div class="label">Transmitted Message</div>
                <div class="message-box">${message}</div>
              </div>
            </div>
            <div class="footer">
              This message was sent from your portfolio contact form. Reply directly to this email to contact the sender.
            </div>
          </div>
        </body>
        </html>
      `,
    };

    // 5. Send Email
    await transporter.sendMail(mailOptions);

    return NextResponse.json(
      { success: true, message: "Message transmitted successfully to email inbox!" },
      { status: 200 }
    );
  } catch (err: any) {
    console.error("Failed to send contact email:", err);
    return NextResponse.json(
      {
        error:
          err.message ||
          "An unexpected error occurred while transmitting your message. Please check your credentials.",
      },
      { status: 500 }
    );
  }
}
