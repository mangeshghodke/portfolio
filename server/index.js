import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import formData from 'form-data';
import Mailgun from 'mailgun.js';

const app = express();
app.use(cors());
app.use(express.json());

const { MAILGUN_API_KEY, MAILGUN_DOMAIN, CONTACT_EMAIL, SITE_URL } = process.env;

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

  const safe = (str) => str.replace(/[<>]/g, '').slice(0, 5000);
  const name = safe(user_name);
  const email = safe(user_email);
  const msg = safe(message);
  const site = SITE_URL || 'https://mangeshghodke.github.io/portfolio';
  const domain = MAILGUN_DOMAIN;
  const dateStr = new Date().toLocaleDateString('en-US', {
    weekday: 'long', year: 'numeric', month: 'long', day: 'numeric',
  });

  try {
    await mg.messages.create(domain, {
      from: `Mangesh Ghodke <hello@${domain}>`,
      to: CONTACT_EMAIL || 'hello@mangesh.dev',
      'h:Reply-To': email,
      'h:List-Unsubscribe': `<${site}>`,
      'h:Precedence': 'bulk',
      'h:Auto-Submitted': 'auto-generated',
      'o:tracking': false,
      'o:tracking-clicks': false,
      'o:tracking-opens': false,
      'o:dkim': true,
      'o:require-tls': true,
      subject: `New inquiry from ${name}`,
      text: `Hi Mangesh,\n\nSomeone filled out your contact form on your portfolio site.\n\nName: ${name}\nEmail: ${email}\n\nMessage:\n${msg}\n\n---\nSent via your portfolio at ${site}`,
      html: `
        <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 560px; margin: 0 auto; padding: 24px; color: #333;">
          <div style="background: linear-gradient(135deg, #1a1a2e, #16213e); padding: 28px; border-radius: 12px 12px 0 0; text-align: center;">
            <h2 style="margin: 0; color: #ffc107; font-size: 22px;">New Contact Form Submission</h2>
            <p style="margin: 6px 0 0; color: rgba(255,255,255,0.6); font-size: 14px;">Someone wants to connect with you</p>
          </div>
          <div style="background: #fff; padding: 28px; border: 1px solid #e8e8e8; border-radius: 0 0 12px 12px;">
            <table style="width: 100%; border-collapse: collapse; font-size: 15px;">
              <tr>
                <td style="padding: 10px 0; color: #888; width: 80px; vertical-align: top;">Name</td>
                <td style="padding: 10px 0;"><strong style="font-size: 17px;">${name}</strong></td>
              </tr>
              <tr>
                <td style="padding: 10px 0; color: #888; vertical-align: top;">Email</td>
                <td style="padding: 10px 0;"><a href="mailto:${email}" style="color: #ffc107; text-decoration: none;">${email}</a></td>
              </tr>
            </table>
            <hr style="border: none; border-top: 1px solid #eee; margin: 20px 0;">
            <p style="margin: 0 0 8px; color: #888; font-size: 14px;">Message:</p>
            <p style="margin: 0; line-height: 1.7; font-size: 15px; white-space: pre-wrap;">${msg}</p>
          </div>
          <div style="text-align: center; padding: 16px 0 0;">
            <p style="margin: 0; font-size: 12px; color: #aaa;">This email was sent from your portfolio contact form &middot; <a href="${site}" style="color: #aaa;">${site}</a></p>
          </div>
        </div>`,
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
