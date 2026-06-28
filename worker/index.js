const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
};

function json(data, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { ...corsHeaders, 'Content-Type': 'application/json' },
  });
}

export default {
  async fetch(request, env) {
    if (request.method === 'OPTIONS') {
      return new Response(null, { headers: corsHeaders });
    }

    if (request.method !== 'POST') {
      return new Response('Method not allowed', { status: 405, headers: corsHeaders });
    }

    const { user_name, user_email, message, recaptcha_token } = await request.json();

    if (!user_name || !user_email || !message) {
      return json({ error: 'All fields are required.' }, 400);
    }

    const { RESEND_API_KEY, CONTACT_EMAIL, RECAPTCHA_SECRET_KEY } = env;

    if (RECAPTCHA_SECRET_KEY && recaptcha_token) {
      const verify = await fetch('https://www.google.com/recaptcha/api/siteverify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams({ secret: RECAPTCHA_SECRET_KEY, response: recaptcha_token }),
      });
      const result = await verify.json();
      if (!result.success || (result.score != null && result.score < 0.5)) {
        return json({ error: 'reCAPTCHA verification failed. Please try again.' }, 400);
      }
    }

    if (!RESEND_API_KEY) {
      return json({ error: 'Server config error' }, 500);
    }

    const safe = (str) => str.replace(/[<>]/g, '').slice(0, 5000);
    const name = safe(user_name);
    const email = safe(user_email);
    const msg = safe(message);
    const site = 'https://mangeshghodke.github.io/portfolio';
    const toEmail = CONTACT_EMAIL || 'hello@mangesh.dev';
    const dateStr = new Date().toLocaleDateString('en-US', {
      weekday: 'long', year: 'numeric', month: 'long', day: 'numeric',
    });

    const text = `Hi Mangesh,\n\n${name} (${email}) sent you a message from your portfolio on ${dateStr}.\n\n---\n${msg}\n---\n\nYou can reply to this email to respond directly.\n\n${site}`;

    const html = `<!DOCTYPE html>
<html lang="en">
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background-color:#f4f4f5;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#f4f4f5">
<tr><td align="center" style="padding:32px 16px">
<table role="presentation" width="100%" style="max-width:520px;background-color:#fff;border-radius:16px;overflow:hidden;box-shadow:0 1px 4px rgba(0,0,0,0.06)">
  <tr>
    <td style="padding:32px 32px 0">
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
        <tr>
          <td style="width:40px;height:40px;background-color:#1a1a2e;border-radius:10px;text-align:center;vertical-align:middle">
            <span style="color:#ffc107;font-size:20px;font-weight:700;line-height:40px">M</span>
          </td>
          <td style="padding-left:12px;vertical-align:middle">
            <span style="font-size:15px;font-weight:600;color:#1a1a2e">mangesh.dev</span>
            <span style="display:block;font-size:12px;color:#999">portfolio contact</span>
          </td>
        </tr>
      </table>
    </td>
  </tr>
  <tr>
    <td style="padding:24px 32px 0">
      <h1 style="margin:0;font-size:20px;font-weight:600;color:#1a1a2e">Someone wants to connect</h1>
      <p style="margin:6px 0 0;font-size:14px;color:#888;line-height:1.5">${name} sent you a message via your portfolio on ${dateStr}.</p>
    </td>
  </tr>
  <tr>
    <td style="padding:24px 32px 0">
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#fafafa;border-radius:12px;overflow:hidden">
        <tr>
          <td style="padding:16px;border-bottom:1px solid #eee">
            <span style="font-size:12px;color:#999;text-transform:uppercase;letter-spacing:0.5px">Name</span>
            <span style="display:block;font-size:16px;font-weight:500;color:#1a1a2e;margin-top:2px">${name}</span>
          </td>
        </tr>
        <tr>
          <td style="padding:16px;border-bottom:1px solid #eee">
            <span style="font-size:12px;color:#999;text-transform:uppercase;letter-spacing:0.5px">Email</span>
            <span style="display:block;margin-top:2px"><a href="mailto:${email}" style="font-size:15px;color:#ffc107;text-decoration:none;font-weight:500">${email}</a></span>
          </td>
        </tr>
        <tr>
          <td style="padding:16px">
            <span style="font-size:12px;color:#999;text-transform:uppercase;letter-spacing:0.5px">Message</span>
            <p style="margin:6px 0 0;font-size:14px;color:#333;line-height:1.7;white-space:pre-wrap">${msg}</p>
          </td>
        </tr>
      </table>
    </td>
  </tr>
  <tr>
    <td style="padding:24px 32px 0;text-align:center">
      <table role="presentation" cellpadding="0" cellspacing="0" style="margin:0 auto">
        <tr>
          <td style="background-color:#1a1a2e;border-radius:8px;padding:0">
            <a href="mailto:${email}" style="display:inline-block;padding:12px 28px;font-size:14px;font-weight:500;color:#fff;text-decoration:none">Reply to ${name}</a>
          </td>
        </tr>
      </table>
    </td>
  </tr>
  <tr>
    <td style="padding:24px 32px 32px;text-align:center">
      <p style="margin:0;font-size:12px;color:#bbb;line-height:1.5">This email was sent from the contact form on<br><a href="${site}" style="color:#ffc107;text-decoration:none">${site}</a></p>
    </td>
  </tr>
</table>
</td></tr></table>
</body>
</html>`;

    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: `${name} via Portfolio <onboarding@resend.dev>`,
        to: [toEmail],
        reply_to: [email],
        subject: `Portfolio: ${name} sent you a message`,
        text,
        html,
      }),
    });

    if (!res.ok) {
      const text = await res.text();
      console.error('Resend error:', text);
      return json({ error: 'Failed to send email.' }, 500);
    }

    return json({ success: true });
  },
};
