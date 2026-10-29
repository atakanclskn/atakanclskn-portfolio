// Vercel Function: authorizes Vercel Blob uploads for the signed-in admin only.
// The browser uploads the file straight to Blob storage with a short-lived presigned URL.
//
// Environment variables (set in the Vercel project):
//   BLOB_STORE_ID         – added when a Blob store is connected; auth runs over Vercel OIDC
//   FIREBASE_API_KEY      – the site's public Firebase web API key, used to check the admin's ID token
//   ADMIN_EMAIL           – optional, defaults to the admin address in lib/firebase.ts
import { issueSignedToken, presignUrl } from '@vercel/blob';
import { handleUploadPresigned, type HandleUploadPresignedBody } from '@vercel/blob/client';
import { corsHeaders, json, preflight } from './_shared.js';

const MAX_BYTES = 8 * 1024 * 1024;
const IMAGE_TYPES = ['image/jpeg', 'image/png', 'image/webp', 'image/avif', 'image/gif', 'image/svg+xml'];

// Asks Firebase Auth who owns the ID token; only the admin's verified account may upload.
// Throws a specific reason so a failed upload says what to fix.
const assertAdminToken = async (idToken: string | undefined): Promise<void> => {
  const apiKey = process.env.FIREBASE_API_KEY;
  if (!apiKey) throw new Error('Not authorized: FIREBASE_API_KEY is not set on Vercel');
  if (!idToken) throw new Error('Not authorized: not signed in');
  const response = await fetch(`https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=${apiKey}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ idToken }),
  });
  if (!response.ok) throw new Error(`Not authorized: Firebase rejected the sign-in token (${response.status})`);
  const { users } = await response.json() as { users?: { email?: string; emailVerified?: boolean }[] };
  const user = users?.[0];
  if (!user?.emailVerified || user.email !== (process.env.ADMIN_EMAIL || 'calskanatakan55@gmail.com')) {
    throw new Error('Not authorized: this account is not the admin');
  }
};

export const OPTIONS = preflight;

// Health check: tries Blob auth and reports only whether it worked (no token is returned)
export async function GET(request: Request) {
  const env = {
    BLOB_STORE_ID: !!process.env.BLOB_STORE_ID,
    BLOB_READ_WRITE_TOKEN: !!process.env.BLOB_READ_WRITE_TOKEN,
    VERCEL_OIDC_TOKEN_env: !!process.env.VERCEL_OIDC_TOKEN,
    oidc_header: request.headers.has('x-vercel-oidc-token'),
    FIREBASE_API_KEY: !!process.env.FIREBASE_API_KEY,
  };
  try {
    const token = await issueSignedToken({ pathname: 'portfolio/health-check.png', operations: ['put'], allowedContentTypes: IMAGE_TYPES, maximumSizeInBytes: MAX_BYTES });
    let presign = 'ok';
    try {
      await presignUrl(token, { operation: 'put', pathname: 'portfolio/health-check.png', allowedContentTypes: IMAGE_TYPES, maximumSizeInBytes: MAX_BYTES, addRandomSuffix: true });
    } catch (error) {
      presign = error instanceof Error ? error.message : String(error);
    }
    return json(200, { blobAuth: 'ok', presign, env }, {});
  } catch (error) {
    return json(500, { blobAuth: error instanceof Error ? error.message : String(error), env }, {});
  }
}

export async function POST(request: Request) {
  const headers = corsHeaders(request.headers.get('origin'));
  if (!headers['Access-Control-Allow-Origin']) return json(403, { error: 'Origin not allowed' }, headers);

  try {
    const body = await request.json() as HandleUploadPresignedBody;
    const result = await handleUploadPresigned({
      body,
      request,
      getSignedToken: async (pathname, clientPayload) => {
        const { idToken } = JSON.parse(clientPayload || '{}') as { idToken?: string };
        await assertAdminToken(idToken);
        const token = await issueSignedToken({
          pathname,
          operations: ['put'],
          allowedContentTypes: IMAGE_TYPES,
          maximumSizeInBytes: MAX_BYTES,
        });
        return { token, urlOptions: { allowedContentTypes: IMAGE_TYPES, maximumSizeInBytes: MAX_BYTES, addRandomSuffix: true } };
      },
    });
    return json(200, result, headers);
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Upload failed';
    console.error('Upload authorization failed:', message);
    return json(message.startsWith('Not authorized') ? 401 : 400, { error: message }, headers);
  }
}
