// src/lib/api.ts
const API_URL = process.env.NEXT_PUBLIC_API_URL;

if (!API_URL) {
  throw new Error('NEXT_PUBLIC_API_URL is not defined');
}

export async function apiFetch(
  path: string,
  options?: RequestInit
) {
  const url = `${API_URL}${path}`;

  const res = await fetch(url, {
    headers: {
      'Content-Type': 'application/json',
      ...(options?.headers || {}),
    },
    ...options,
  });

  const data = await res.json().catch(() => null);

  if (!res.ok) {
    // ترجع الخطأ بشكل موحد
    throw { status: res.status, data };
  }

  return data;
}
