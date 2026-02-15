import { USE_MOCK_DATA, MOCK_DELAY, ENDPOINTS } from '../config/api.config';
import { apiService } from './api.service';
import { MOCK_USERS } from '../data/users.data';
import type { User, UpdateProfileData } from '../types';

function delay<T>(data: T): Promise<T> {
  return new Promise(resolve => setTimeout(() => resolve(data), MOCK_DELAY));
}

export const userService = {
  async getAll(): Promise<User[]> {
    if (USE_MOCK_DATA) {
      return delay([...MOCK_USERS]);
    }
    return apiService.get<User[]>(ENDPOINTS.USERS);
  },

  async getById(id: string): Promise<User | null> {
    if (USE_MOCK_DATA) {
      const user = MOCK_USERS.find(u => u.id === id) || null;
      return delay(user);
    }
    return apiService.get<User>(ENDPOINTS.USER_BY_ID(id));
  },

  async update(id: string, data: Partial<UpdateProfileData>): Promise<User> {
    if (USE_MOCK_DATA) {
      const existing = MOCK_USERS.find(u => u.id === id);
      if (!existing) throw new Error('User not found');
      const updated = { ...existing, ...data, updated_at: new Date().toISOString() };
      return delay(updated as User);
    }
    return apiService.put<User>(ENDPOINTS.USER_BY_ID(id), data);
  },

  async delete(id: string): Promise<void> {
    if (USE_MOCK_DATA) {
      return delay(undefined);
    }
    await apiService.delete<void>(ENDPOINTS.USER_BY_ID(id));
  },
};
