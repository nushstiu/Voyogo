import { MOCK_USERS } from '../data/users.data';
import type { User, UpdateProfileData } from '../types';

const MOCK_DELAY = 400;

function delay<T>(data: T): Promise<T> {
  return new Promise(resolve => setTimeout(() => resolve(data), MOCK_DELAY));
}

export const userService = {
  async getAll(): Promise<User[]> {
    return delay([...MOCK_USERS]);
  },

  async getById(id: string): Promise<User | null> {
    const user = MOCK_USERS.find(u => u.id === id) || null;
    return delay(user);
  },

  async update(id: string, data: Partial<UpdateProfileData>): Promise<User> {
    const existing = MOCK_USERS.find(u => u.id === id);
    if (!existing) throw new Error('User not found');
    const updated = { ...existing, ...data, updated_at: new Date().toISOString() };
    return delay(updated as User);
  },

  async delete(id: string): Promise<void> {
    if (!MOCK_USERS.find(u => u.id === id)) throw new Error('User not found');
    return delay(undefined);
  },
};
