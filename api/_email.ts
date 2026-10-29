// HTML for the new-message notification. Email clients ignore <style> blocks and modern CSS,
// so this is table-based with inline styles only.

const ACCENT = '#e53e3e';
const FONT = "-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif";

export const escapeHtml = (text: string) =>
  text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

const initials = (name: string) =>
  name.split(/\s+/).filter(Boolean).slice(0, 2).map(part => part[0]!.toLocaleUpperCase('tr-TR')).join('') || '?';

export const renderMessageEmail = ({ name, email, message }: { name: string; email: string; message: string }) => {
  const sentAt = new Date().toLocaleString('tr-TR', {
    timeZone: 'Europe/Istanbul', day: 'numeric', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit',
  });
  const replyHref = `mailto:${encodeURIComponent(email)}?subject=${encodeURIComponent('Re: atakanclskn.me üzerinden mesajınız')}`;
  const preview = message.replace(/\s+/g, ' ').slice(0, 120);

  return `<!doctype html>
<html lang="tr">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<meta name="color-scheme" content="dark light">
<title>Yeni mesaj: ${escapeHtml(name)}</title>
</head>
<body style="margin:0;padding:0;background:#050505;">
<div style="display:none;max-height:0;overflow:hidden;opacity:0;">${escapeHtml(preview)}</div>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#050505;padding:40px 16px;">
  <tr><td align="center">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:560px;">

      <tr><td style="padding:0 4px 24px;font-family:${FONT};">
        <span style="font-size:18px;font-weight:700;letter-spacing:-0.5px;color:#ffffff;">atakanclskn</span><span style="display:inline-block;width:7px;height:7px;border-radius:50%;background:${ACCENT};margin-left:3px;"></span>
      </td></tr>

      <tr><td style="background:#0d0d0d;border:1px solid #1f1f1f;border-radius:24px;padding:32px;font-family:${FONT};">

        <table role="presentation" cellpadding="0" cellspacing="0"><tr>
          <td style="background:#161616;border:1px solid #262626;border-radius:999px;padding:6px 14px;">
            <span style="display:inline-block;width:7px;height:7px;border-radius:50%;background:#22c55e;margin-right:6px;"></span><span style="font-size:12px;font-weight:600;color:#d4d4d4;">İletişim formundan yeni mesaj</span>
          </td>
        </tr></table>

        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin-top:28px;"><tr>
          <td width="52" valign="middle">
            <div style="width:44px;height:44px;line-height:44px;border-radius:50%;background:${ACCENT};color:#ffffff;font-size:16px;font-weight:700;text-align:center;">${escapeHtml(initials(name))}</div>
          </td>
          <td valign="middle">
            <div style="font-size:20px;font-weight:700;color:#ffffff;letter-spacing:-0.3px;">${escapeHtml(name)}</div>
            <a href="mailto:${escapeHtml(email)}" style="font-size:14px;color:#a3a3a3;text-decoration:none;">${escapeHtml(email)}</a>
          </td>
        </tr></table>

        <div style="margin-top:24px;padding:20px 22px;background:#141414;border:1px solid #222222;border-left:3px solid ${ACCENT};border-radius:16px;font-size:15px;line-height:1.7;color:#e5e5e5;white-space:pre-wrap;">${escapeHtml(message)}</div>

        <table role="presentation" cellpadding="0" cellspacing="0" style="margin-top:28px;"><tr>
          <td style="padding-right:10px;">
            <a href="${replyHref}" style="display:inline-block;background:#ffffff;color:#000000;font-size:14px;font-weight:700;text-decoration:none;padding:13px 24px;border-radius:999px;">Yanıtla</a>
          </td>
          <td>
            <a href="https://atakanclskn.me/admin" style="display:inline-block;background:#161616;color:#ffffff;border:1px solid #2a2a2a;font-size:14px;font-weight:700;text-decoration:none;padding:12px 22px;border-radius:999px;">Admin panelinde aç →</a>
          </td>
        </tr></table>

      </td></tr>

      <tr><td style="padding:20px 4px 0;font-family:${FONT};font-size:12px;line-height:1.6;color:#737373;">
        ${escapeHtml(sentAt)} · <a href="https://atakanclskn.me" style="color:#737373;">atakanclskn.me</a><br>
        Bu e-posta sitendeki iletişim formundan otomatik gönderildi. Yanıtla düğmesi doğrudan gönderene yazar.
      </td></tr>

    </table>
  </td></tr>
</table>
</body>
</html>`;
};
