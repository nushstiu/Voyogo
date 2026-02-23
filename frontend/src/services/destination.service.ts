import { MOCK_DESTINATIONS } from '../data/destinations.data';
import type { Destination, CreateDestinationData } from '../types';

const MOCK_DELAY = 400;

function delay<T>(data: T): Promise<T> {
  return new Promise(resolve => setTimeout(() => resolve(data), MOCK_DELAY));
}

export const destinationService = {
  async getAll(): Promise<Destination[]> {
    return delay([...MOCK_DESTINATIONS]);
  },

  async getById(id: number): Promise<Destination | null> {
    const dest = MOCK_DESTINATIONS.find(d => d.id === id) || null;
    return delay(dest);
  },

  async create(data: CreateDestinationData): Promise<Destination> {
    const newDest: Destination = {
      ...data,
      id: Math.max(...MOCK_DESTINATIONS.map(d => d.id)) + 1,
      created_at: new Date().toISOString(),
    };
    return delay(newDest);
  },

  async update(id: number, data: Partial<CreateDestinationData>): Promise<Destination> {
    const existing = MOCK_DESTINATIONS.find(d => d.id === id);
    if (!existing) throw new Error('Destination not found');
    const updated = { ...existing, ...data };
    return delay(updated);
  },

  async delete(id: number): Promise<void> {
    if (!MOCK_DESTINATIONS.find(d => d.id === id)) throw new Error('Destination not found');
    return delay(undefined);
  },
};
