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
    subject: "Session Scheduled Confirmation",
    text: `You have scheduled a session with ${trainerName} on ${timeSlot}. Join via Google Meet: ${meetLink}`,
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
