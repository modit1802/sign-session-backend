// index.js
const express = require("express");
const cors = require("cors");
const nodemailer = require("nodemailer");

const app = express();
app.use(cors());
app.use(express.json());

// ─── CONFIGURE YOUR GMAIL & APP PASSWORD HERE ───────────────────────────
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "moditgrover2003.iii@gmail.com",        // ← your Gmail address
    pass: "tyetbdzalnwuikyk"            // ← an App Password (see note below)
  },
});

// ─── EMAIL-SENDING ENDPOINT ───────────────────────────────────────────────
app.post("/send-email", async (req, res) => {
  const { userEmail, trainerName, timeSlot, meetLink } = req.body;

  const mailOptions = {
    from: "moditgrover2003.iii@gmail.com",
    to: userEmail,
    subject: "Session Confirmation and Details",
    html: `
Hi Dear,<br><br>

We are pleased to inform you that your session with Trainer <strong>${trainerName}</strong> has been successfully scheduled.<br><br>

<strong>Session Details:</strong><br>
- <strong>Trainer:</strong> ${trainerName}<br>
- <strong>Date and Time:</strong> ${timeSlot}<br>
- <strong>Google Meet Link:</strong> <a href="${meetLink}" target="_blank">${meetLink}</a><br><br>

Please make sure to join the meeting at the scheduled time. Should you need to reschedule or have any further questions, feel free to contact us.<br><br>

We look forward to your session.<br><br>

Best regards,<br>
MAAASign Team
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    res.send({ success: true });
  } catch (err) {
    console.error("Mail error:", err);
    res.status(500).send({ success: false, error: err.toString() });
  }
});

// ─── START THE SERVER ────────────────────────────────────────────────────
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`✅ Server listening on port ${PORT}`));
