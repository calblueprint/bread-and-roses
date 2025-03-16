const keyString = process.env.NEXT_PUBLIC_EMAIL_ENCRYPTION_KEY;

if (!keyString || keyString.length !== 32) {
  throw new Error('Encryption key must be 32 characters');
}

function getKey(): Promise<CryptoKey> {
  const enc = new TextEncoder();
  return crypto.subtle.importKey(
    'raw',
    enc.encode(keyString),
    { name: 'AES-GCM' },
    false,
    ['encrypt', 'decrypt'],
  );
}

export async function encryptEmail(email: string): Promise<string> {
  const iv = crypto.getRandomValues(new Uint8Array(12));
  const key = await getKey();
  const encoded = new TextEncoder().encode(email);

  const cipherText = await crypto.subtle.encrypt(
    { name: 'AES-GCM', iv },
    key,
    encoded,
  );

  const full = new Uint8Array([...iv, ...new Uint8Array(cipherText)]);
  return btoa(String.fromCharCode(...full));
}

export async function decryptEmail(token: string): Promise<string> {
  const raw = Uint8Array.from(atob(token), c => c.charCodeAt(0));
  const iv = raw.slice(0, 12);
  const data = raw.slice(12);
  const key = await getKey();

  const decrypted = await crypto.subtle.decrypt(
    { name: 'AES-GCM', iv },
    key,
    data,
  );

  return new TextDecoder().decode(decrypted);
}
