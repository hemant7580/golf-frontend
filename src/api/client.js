/**
 * API base: use VITE_API_URL in production (full backend URL). Dev uses Vite proxy → relative /api.
 */
const base = import.meta.env.VITE_API_URL || '';

function authHeaders(token) {
  return token ? { Authorization: `Bearer ${token}` } : {};
}

export async function apiFetch(path, { method = 'GET', token, body, isForm } = {}) {
  const headers = { ...authHeaders(token) };
  let reqBody;
  if (body && !isForm) {
    headers['Content-Type'] = 'application/json';
    reqBody = JSON.stringify(body);
  } else if (body && isForm) {
    reqBody = body;
  }

  const res = await fetch(`${base}${path}`, {
    method,
    headers,
    body: reqBody,
  });

  const text = await res.text();
  let data;
  try {
    data = text ? JSON.parse(text) : null;
  } catch {
    data = { raw: text };
  }

  if (!res.ok) {
    const err = new Error(data?.error || res.statusText || 'Request failed');
    err.status = res.status;
    err.data = data;
    throw err;
  }
  return data;
}
