import { apiUrl } from './api';

// Asks the Vercel function (api/notify.ts) to email the owner about a new contact message.
// Fire-and-forget: a failed notification never affects the visitor's submission.
export const notifyNewMessage = (data: { name: string; email: string; message: string }) => {
  const url = apiUrl('notify');
  if (!url) return;
  fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
    keepalive: true,
  }).catch(err => console.error('Message notification failed:', err));
};
