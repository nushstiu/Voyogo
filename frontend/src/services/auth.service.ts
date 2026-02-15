import { USE_MOCK_DATA, MOCK_DELAY, ENDPOINTS } from '../config/api.config';
import { apiService } from './api.service';
import { MOCK_USERS } from '../data/users.data';
import type { User } from '../types';

function delay<T>(data: T): Promise<T> {
  return new Promise(resolve => setTimeout(() => resolve(data), MOCK_DELAY));
}

export const authService = {
  async login(email: string, _password: string): Promise<User> {
    if (USE_MOCK_DATA) {
      const user = MOCK_USERS.find(u => u.email.toLowerCase() === email.toLowerCase());
      if (!user) throw new Error('Invalid email or password');
      return delay(user);
    }
    return apiService.post<User>(ENDPOINTS.AUTH_LOGIN, { email, password: _password });
  },

  async register(username: string, email: string, _password: string): Promise<User> {
    if (USE_MOCK_DATA) {
      const exists = MOCK_USERS.find(u => u.email.toLowerCase() === email.toLowerCase());
      if (exists) throw new Error('Email already registered');
      const newUser: User = {
        id: crypto.randomUUID(),
        username,
        email,
        role: 'user',
        profile_pic: null,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      };
      return delay(newUser);
    }
    return apiService.post<User>(ENDPOINTS.AUTH_REGISTER, { username, email, password: _password });
  },

  async logout(): Promise<void> {
    if (USE_MOCK_DATA) {
      return delay(undefined);
    }
    await apiService.post<void>(ENDPOINTS.AUTH_LOGOUT, {});
  },

  async getCurrentUser(): Promise<User | null> {
    if (USE_MOCK_DATA) {
      const stored = localStorage.getItem('voyogo_user');
      return stored ? JSON.parse(stored) : null;
    }
    try {
      return await apiService.get<User>(ENDPOINTS.AUTH_ME);
    } catch {
      return null;
    }
  },
};
