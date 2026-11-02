// Vercel serverless function: emails contact-form submissions through Resend.
// RESEND_API_KEY must stay server-side, so never give it a VITE_ prefix.
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const PHONE_RE = /^[+()\d\s-]{7,20}$/;
const DEFAULT_RECIPIENTS = 'vikas@thryvpartners.in, anujvaid@gmail.com, ragav.magnet@gmail.com';

const line = (value, max) => (typeof value === 'string' ? value.replace(/\s+/g, ' ').trim().slice(0, max) : '');
const block = (value, max) => (typeof value === 'string' ? value.trim().slice(0, max) : '');

function readBody(req) {
  try {
    return req.body && typeof req.body === 'object' ? req.body : {};
  } catch {
    return {}; // malformed JSON: let validation reject it
  }
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const body = readBody(req);
  if (body.website) return res.status(200).json({ ok: true }); // honeypot: silently ignore bots

  const name = line(body.name, 200);
  const email = line(body.email, 254);
  const company = line(body.company, 200);
  const phone = line(body.phone, 20);
  const interest = line(body.interest, 100) || 'General growth conversation';
  const message = block(body.message, 5000);

  if (!name || !EMAIL_RE.test(email) || !PHONE_RE.test(phone) || message.length < 10) {
    return res.status(400).json({ error: 'Please check the form and try again.' });
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error('Contact form: RESEND_API_KEY is not set');
    return res.status(500).json({ error: 'Email is not configured.' });
  }

  const text = [
    `Name: ${name}`,
    `Email: ${email}`,
    company ? `Company: ${company}` : null,
    `Phone: ${phone}`,
    `Topic: ${interest}`,
    '',
    message,
  ].filter((part) => part !== null).join('\n');

  const response = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: { Authorization: `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      from: process.env.CONTACT_FROM_EMAIL || 'THRYV Partners Website <website@thryvpartners.in>',
      to: (process.env.CONTACT_TO_EMAIL || DEFAULT_RECIPIENTS).split(',').map((address) => address.trim()),
      reply_to: email,
      subject: `Growth Agenda Conversation — ${interest}`,
      text,
    }),
  });

  if (!response.ok) {
    console.error('Contact form: Resend rejected the email', response.status, await response.text());
    return res.status(502).json({ error: 'Could not send your message.' });
  }

  return res.status(200).json({ ok: true });
}
