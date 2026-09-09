import express from 'express';
import cors from 'cors';
import fs from 'fs';
import path from 'path';
import nodemailer from 'nodemailer';

const app = express();
const PORT = process.env.PORT || 5000;
const BOOKINGS_FILE = path.join(process.cwd(), 'bookings.json');

app.use(cors());
app.use(express.json());

// Initialize bookings storage file if it doesn't exist
if (!fs.existsSync(BOOKINGS_FILE)) {
  fs.writeFileSync(BOOKINGS_FILE, JSON.stringify([], null, 2));
}

// Nodemailer SMTP Transporter (optional - configure via environment variables if desired)
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER || 'palfocussports@gmail.com',
    pass: process.env.EMAIL_PASS || '' // Your Gmail App Password
  }
});

// GET Endpoint to retrieve saved bookings (for studio admin review)
app.get('/api/bookings', (req, res) => {
  try {
    const data = fs.readFileSync(BOOKINGS_FILE, 'utf-8');
    res.json({ success: true, bookings: JSON.parse(data) });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// POST Endpoint for new bookings
app.post('/api/book', async (req, res) => {
  const { name, contact, email, message } = req.body;

  if (!name || !contact || !email) {
    return res.status(400).json({ success: false, error: 'Name, contact, and email are required.' });
  }

  const newBooking = {
    id: Date.now().toString(),
    name,
    contact,
    email,
    message: message || 'N/A',
    timestamp: new Date().toISOString()
  };

  // 1. Save to local bookings.json database
  try {
    const fileData = fs.readFileSync(BOOKINGS_FILE, 'utf-8');
    const bookings = JSON.parse(fileData);
    bookings.unshift(newBooking);
    fs.writeFileSync(BOOKINGS_FILE, JSON.stringify(bookings, null, 2));
    console.log(`[BOOKING CAPTURED] New booking from ${name} saved to bookings.json`);
  } catch (err) {
    console.error('Error writing to bookings.json:', err);
  }

  // 2. Dispatch email to palfocussports@gmail.com via FormSubmit
  try {
    await fetch("https://formsubmit.co/ajax/palfocussports@gmail.com", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify({
        _subject: `✨ New GlamCam Pro Booking Request from ${name}`,
        _template: "table",
        _captcha: "false",
        "Client Name": name,
        "Contact Number / WhatsApp": contact,
        "Client Email": email,
        "Event Details / Notes": message || "None provided",
        "Submitted At": new Date().toLocaleString()
      })
    });
    console.log(`[EMAIL DISPATCHED] Booking details sent to palfocussports@gmail.com`);
  } catch (emailErr) {
    console.warn('FormSubmit email dispatch warning:', emailErr);
  }

  // 3. Optional SMTP Nodemailer dispatch (if EMAIL_PASS is set)
  if (process.env.EMAIL_PASS) {
    try {
      await transporter.sendMail({
        from: '"GlamCam Pro Studio" <palfocussports@gmail.com>',
        to: 'palfocussports@gmail.com',
        subject: `✨ New Glambot Booking Request from ${name}`,
        html: `
          <h2>New Glambot Booking Request</h2>
          <table border="1" cellpadding="8" cellspacing="0" style="border-collapse: collapse;">
            <tr><td><strong>Client Name</strong></td><td>${name}</td></tr>
            <tr><td><strong>Phone / WhatsApp</strong></td><td>${contact}</td></tr>
            <tr><td><strong>Email</strong></td><td>${email}</td></tr>
            <tr><td><strong>Event Details</strong></td><td>${message || 'N/A'}</td></tr>
            <tr><td><strong>Submitted At</strong></td><td>${new Date().toLocaleString()}</td></tr>
          </table>
        `
      });
      console.log(`[SMTP DISPATCHED] Email sent via Nodemailer to palfocussports@gmail.com`);
    } catch (smtpErr) {
      console.warn('SMTP Nodemailer dispatch warning:', smtpErr.message);
    }
  }

  return res.json({
    success: true,
    message: 'Booking details received and dispatched to palfocussports@gmail.com',
    booking: newBooking
  });
});

app.listen(PORT, () => {
  console.log(`🚀 GlamCam Pro Backend Server running at http://localhost:${PORT}`);
  console.log(`📩 Target email inbox: palfocussports@gmail.com`);
});
