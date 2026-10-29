// Vercel Function: emails the site owner (via Resend) when a contact message comes in.
// The contact form saves the message to Firestore first, then calls this endpoint.
//
// Environment variables (set in the Vercel project):
//   RESEND_API_KEY  – Resend API key (required)
//   NOTIFY_TO       – where notifications go (required)
//   NOTIFY_FROM     – sender; defaults to Resend's test sender, which can only mail the
//                     Resend account's own address until a domain is verified

import { corsHeaders, json, preflight } from './_shared.js';

const LIMITS = { name: 100, email: 200, message: 5000 };
const EMAIL_PATTERN = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;

const escapeHtml = (text: string) =>
  text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

export const OPTIONS = preflight;

export async function POST(request: Request) {
  const headers = corsHeaders(request.headers.get('origin'));
  if (!headers['Access-Control-Allow-Origin']) return json(403, { error: 'Origin not allowed' }, headers);

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.NOTIFY_TO;
  if (!apiKey || !to) return json(500, { error: 'Notifications are not configured' }, headers);

  let payload: { name?: unknown; email?: unknown; message?: unknown; website?: unknown };
  try {
    payload = await request.json();
  } catch {
    return json(400, { error: 'Invalid JSON' }, headers);
  }

  // Honeypot field from the form: bots fill it, people never see it
  if (payload.website) return json(200, { ok: true }, headers);

  const name = typeof payload.name === 'string' ? payload.name.trim() : '';
  const email = typeof payload.email === 'string' ? payload.email.trim() : '';
  const message = typeof payload.message === 'string' ? payload.message.trim() : '';
  if (!name || !message || !EMAIL_PATTERN.test(email)
    || name.length > LIMITS.name || email.length > LIMITS.email || message.length > LIMITS.message) {
    return json(400, { error: 'Invalid message' }, headers);
  }

  const response = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: { Authorization: `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      from: process.env.NOTIFY_FROM || 'Portfolio <onboarding@resend.dev>',
      to,
      reply_to: email,
      subject: `Yeni mesaj: ${name}`,
      text: `${name} <${email}>\n\n${message}\n\n— https://atakanclskn.me/admin`,
      html: `
        <div style="font-family:-apple-system,Segoe UI,sans-serif;max-width:560px">
          <p style="margin:0 0 4px;font-size:13px;color:#6b7280">atakanclskn.me iletişim formu</p>
          <h2 style="margin:0 0 16px;font-size:20px">${escapeHtml(name)}</h2>
          <p style="margin:0 0 16px"><a href="mailto:${escapeHtml(email)}">${escapeHtml(email)}</a></p>
          <p style="white-space:pre-wrap;line-height:1.6;margin:0 0 24px">${escapeHtml(message)}</p>
          <a href="https://atakanclskn.me/admin" style="font-size:13px;color:#6b7280">Admin panelinde aç →</a>
        </div>`,
    }),
  });

  if (!response.ok) {
    console.error('Resend error:', response.status, await response.text());
    return json(502, { error: 'Email could not be sent' }, headers);
  }
  return json(200, { ok: true }, headers);
}
