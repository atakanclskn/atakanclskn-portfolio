// Helpers shared by the Vercel Functions (files starting with "_" are not deployed as routes)

const ALLOWED_ORIGINS = [
  'https://atakanclskn.me',
  'https://www.atakanclskn.me',
  'https://atakanclskn-portfolio.web.app',
  'https://atakanclskn-portfolio.firebaseapp.com',
];

export const corsHeaders = (origin: string | null): Record<string, string> =>
  origin && (ALLOWED_ORIGINS.includes(origin) || /^http:\/\/localhost:\d+$/.test(origin))
    ? { 'Access-Control-Allow-Origin': origin, 'Access-Control-Allow-Methods': 'POST, OPTIONS', 'Access-Control-Allow-Headers': 'Content-Type', Vary: 'Origin' }
    : {};

export const json = (status: number, body: object, headers: Record<string, string>) =>
  new Response(JSON.stringify(body), { status, headers: { ...headers, 'Content-Type': 'application/json' } });

export const preflight = (request: Request) =>
  new Response(null, { status: 204, headers: corsHeaders(request.headers.get('origin')) });
