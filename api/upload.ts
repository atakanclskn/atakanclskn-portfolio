// Vercel Function: issues Vercel Blob upload tokens to the signed-in admin only.
// The browser uploads the file straight to Blob storage; this route just authorizes it.
//
// Environment variables (set in the Vercel project):
//   BLOB_READ_WRITE_TOKEN – added automatically when a Blob store is connected to the project
//                           (any <PREFIX>_READ_WRITE_TOKEN holding a Blob token also works)
//   FIREBASE_API_KEY      – the site's public Firebase web API key, used to check the admin's ID token
//   ADMIN_EMAIL           – optional, defaults to the admin address in lib/firebase.ts
import { handleUpload, type HandleUploadBody } from '@vercel/blob/client';
import { corsHeaders, json, preflight } from './_shared.js';

const MAX_BYTES = 8 * 1024 * 1024;
const IMAGE_TYPES = ['image/jpeg', 'image/png', 'image/webp', 'image/avif', 'image/gif', 'image/svg+xml'];

// Asks Firebase Auth who owns the ID token; only the admin's verified account may upload
const isAdminToken = async (idToken: string): Promise<boolean> => {
  const apiKey = process.env.FIREBASE_API_KEY;
  if (!apiKey) return false;
  const response = await fetch(`https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=${apiKey}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ idToken }),
  });
  if (!response.ok) return false;
  const { users } = await response.json() as { users?: { email?: string; emailVerified?: boolean }[] };
  const user = users?.[0];
  return !!user?.emailVerified && user.email === (process.env.ADMIN_EMAIL || 'calskanatakan55@gmail.com');
};

// Connecting a store with a custom prefix renames the variable, so accept any Blob read-write token
const blobToken = () =>
  process.env.BLOB_READ_WRITE_TOKEN
  ?? Object.entries(process.env).find(([key, value]) => key.endsWith('_READ_WRITE_TOKEN') && value?.startsWith('vercel_blob_rw_'))?.[1];

export const OPTIONS = preflight;

export async function POST(request: Request) {
  const headers = corsHeaders(request.headers.get('origin'));
  if (!headers['Access-Control-Allow-Origin']) return json(403, { error: 'Origin not allowed' }, headers);

  try {
    const token = blobToken();
    if (!token) return json(500, { error: 'Blob storage is not connected' }, headers);
    const body = await request.json() as HandleUploadBody;
    const result = await handleUpload({
      token,
      body,
      request,
      onBeforeGenerateToken: async (_pathname, clientPayload) => {
        const { idToken } = JSON.parse(clientPayload || '{}') as { idToken?: string };
        if (!idToken || !(await isAdminToken(idToken))) throw new Error('Not authorized');
        return { allowedContentTypes: IMAGE_TYPES, maximumSizeInBytes: MAX_BYTES, addRandomSuffix: true };
      },
    });
    return json(200, result, headers);
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Upload failed';
    return json(message === 'Not authorized' ? 401 : 400, { error: message }, headers);
  }
}
