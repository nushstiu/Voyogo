import { USE_MOCK_DATA, MOCK_DELAY, ENDPOINTS } from '../config/api.config';
import { apiService } from './api.service';
import { MOCK_DESTINATIONS } from '../data/destinations.data';
import type { Destination, CreateDestinationData } from '../types';

function delay<T>(data: T): Promise<T> {
  return new Promise(resolve => setTimeout(() => resolve(data), MOCK_DELAY));
}

export const destinationService = {
  async getAll(): Promise<Destination[]> {
    if (USE_MOCK_DATA) {
      return delay([...MOCK_DESTINATIONS]);
    }
    return apiService.get<Destination[]>(ENDPOINTS.DESTINATIONS);
  },

  async getById(id: number): Promise<Destination | null> {
    if (USE_MOCK_DATA) {
      const dest = MOCK_DESTINATIONS.find(d => d.id === id) || null;
      return delay(dest);
    }
    return apiService.get<Destination>(ENDPOINTS.DESTINATION_BY_ID(id));
  },

  async create(data: CreateDestinationData): Promise<Destination> {
    if (USE_MOCK_DATA) {
      const newDest: Destination = {
        ...data,
        id: Math.max(...MOCK_DESTINATIONS.map(d => d.id)) + 1,
        created_at: new Date().toISOString(),
      };
      return delay(newDest);
    }
    return apiService.post<Destination>(ENDPOINTS.DESTINATIONS, data);
  },

  async update(id: number, data: Partial<CreateDestinationData>): Promise<Destination> {
    if (USE_MOCK_DATA) {
      const existing = MOCK_DESTINATIONS.find(d => d.id === id);
      if (!existing) throw new Error('Destination not found');
      const updated = { ...existing, ...data };
      return delay(updated);
    }
    return apiService.put<Destination>(ENDPOINTS.DESTINATION_BY_ID(id), data);
  },

  async delete(id: number): Promise<void> {
    if (USE_MOCK_DATA) {
      return delay(undefined);
    }
    await apiService.delete<void>(ENDPOINTS.DESTINATION_BY_ID(id));
  },
};
