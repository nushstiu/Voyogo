import { MOCK_USERS } from '../data/users.data';
import { UserRole, type User } from '../types';

const MOCK_DELAY = 400;

function delay<T>(data: T): Promise<T> {
  return new Promise(resolve => setTimeout(() => resolve(data), MOCK_DELAY));
}

export const authService = {
  async login(email: string, _password: string): Promise<User> {
    const user = MOCK_USERS.find(u => u.email.toLowerCase() === email.toLowerCase());
    if (!user) throw new Error('Invalid email or password');
    return delay(user);
  },

  async register(username: string, email: string, _password: string): Promise<User> {
    const exists = MOCK_USERS.find(u => u.email.toLowerCase() === email.toLowerCase());
    if (exists) throw new Error('Email already registered');
    const newUser: User = {
      id: crypto.randomUUID(),
      username,
      email,
      role: UserRole.User,
      profile_pic: null,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };
    return delay(newUser);
  },

  async logout(): Promise<void> {
    return delay(undefined);
  },

  async getCurrentUser(): Promise<User | null> {
    const stored = localStorage.getItem('voyogo_user');
    return stored ? JSON.parse(stored) : null;
  },
};
