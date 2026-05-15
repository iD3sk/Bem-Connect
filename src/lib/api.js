/**
 * API helper for communicating with the Express backend.
 *
 * Uses NEXT_PUBLIC_API_URL from .env so the base URL
 * is never hardcoded across components.
 */

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

/**
 * Generic fetch wrapper that hits the Express backend.
 *
 * @param {string} endpoint  - Path after /api, e.g. '/health'
 * @param {RequestInit} options - Standard fetch options (method, body, headers …)
 * @returns {Promise<any>} Parsed JSON response
 */
export async function apiFetch(endpoint, options = {}) {
  const url = `${API_BASE_URL}${endpoint}`;

  const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;

  const res = await fetch(url, {
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { 'Authorization': `Bearer ${token}` } : {}),
      ...options.headers,
    },
    ...options,
  });

  if (!res.ok) {
    const errorBody = await res.json().catch(() => ({}));
    throw new Error(errorBody.error || `API error: ${res.status}`);
  }

  return res.json();
}
