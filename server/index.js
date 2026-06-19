import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import formData from 'form-data';
import Mailgun from 'mailgun.js';

const app = express();
app.use(cors());
app.use(express.json());

const { MAILGUN_API_KEY, MAILGUN_DOMAIN, CONTACT_EMAIL } = process.env;

if (!MAILGUN_API_KEY || !MAILGUN_DOMAIN) {
  console.error('Missing MAILGUN_API_KEY or MAILGUN_DOMAIN in .env');
  process.exit(1);
}

const mailgun = new Mailgun(formData);
const mg = mailgun.client({ username: 'api', key: MAILGUN_API_KEY });

app.post('/api/contact', async (req, res) => {
  const { user_name, user_email, message } = req.body;

  if (!user_name || !user_email || !message) {
    return res.status(400).json({ error: 'All fields are required.' });
  }

  try {
    await mg.messages.create(MAILGUN_DOMAIN, {
      from: `Mangesh Ghodke <noreply@${MAILGUN_DOMAIN}>`,
      to: CONTACT_EMAIL || 'hello@mangesh.dev',
      'h:Reply-To': user_email,
      subject: `New Contact from ${user_name}`,
      text: `Name: ${user_name}\nEmail: ${user_email}\nMessage: ${message}`,
      html: `
        <h3>New Contact Form Submission</h3>
        <p><strong>Name:</strong> ${user_name}</p>
        <p><strong>Email:</strong> ${user_email}</p>
        <p><strong>Message:</strong></p>
        <p>${message}</p>
      `,
    });

    res.json({ success: true });
  } catch (err) {
    console.error('Mailgun error:', err);
    res.status(500).json({ error: 'Failed to send email.' });
  }
});

const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
