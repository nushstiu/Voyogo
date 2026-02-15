import { BASE_URL } from '../config/api.config';

/**
 * Generic API service for HTTP requests.
 * All services use this as the base for real API calls.
 */

function getAuthToken(): string | null {
  const user = localStorage.getItem('voyogo_user');
  if (user) {
    try {
      return JSON.parse(user).id || null;
    } catch {
      return null;
    }
  }
  return null;
}

function buildUrl(endpoint: string): string {
  return `${BASE_URL}${endpoint}`;
}

function buildHeaders(): Record<string, string> {
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
  };
  const token = getAuthToken();
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }
  return headers;
}

async function handleResponse<T>(response: Response): Promise<T> {
  if (!response.ok) {
    const errorBody = await response.text();
    throw new Error(errorBody || `HTTP ${response.status}`);
  }
  return response.json();
}

export const apiService = {
  async get<T>(endpoint: string): Promise<T> {
    const response = await fetch(buildUrl(endpoint), {
      method: 'GET',
      headers: buildHeaders(),
    });
    return handleResponse<T>(response);
  },

  async post<T>(endpoint: string, body: unknown): Promise<T> {
    const response = await fetch(buildUrl(endpoint), {
      method: 'POST',
      headers: buildHeaders(),
      body: JSON.stringify(body),
    });
    return handleResponse<T>(response);
  },

  async put<T>(endpoint: string, body: unknown): Promise<T> {
    const response = await fetch(buildUrl(endpoint), {
      method: 'PUT',
      headers: buildHeaders(),
      body: JSON.stringify(body),
    });
    return handleResponse<T>(response);
  },

  async delete<T>(endpoint: string): Promise<T> {
    const response = await fetch(buildUrl(endpoint), {
      method: 'DELETE',
      headers: buildHeaders(),
    });
    return handleResponse<T>(response);
  },
};
