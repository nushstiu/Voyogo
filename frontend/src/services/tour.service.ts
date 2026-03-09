import { MOCK_TOURS } from '../data/tours.data';
import { TourStatus, type Tour, type CreateTourData } from '../types';

const MOCK_DELAY = 400;

function delay<T>(data: T): Promise<T> {
  return new Promise(resolve => setTimeout(() => resolve(data), MOCK_DELAY));
}

export const tourService = {
  async getAll(): Promise<Tour[]> {
    return delay([...MOCK_TOURS]);
  },

  async getById(id: string): Promise<Tour | null> {
    const tour = MOCK_TOURS.find(t => t.id === id) || null;
    return delay(tour);
  },

  async getByDestination(destinationId: number): Promise<Tour[]> {
    const tours = MOCK_TOURS.filter(t => t.destination_id === destinationId && t.status === TourStatus.Active);
    return delay(tours);
  },

  async create(data: CreateTourData): Promise<Tour> {
    const newTour: Tour = {
      ...data,
      id: crypto.randomUUID(),
      created_at: new Date().toISOString(),
    };
    return delay(newTour);
  },

  async update(id: string, data: Partial<CreateTourData>): Promise<Tour> {
    const existing = MOCK_TOURS.find(t => t.id === id);
    if (!existing) throw new Error('Tour not found');
    const updated = { ...existing, ...data };
    return delay(updated);
  },

  async delete(id: string): Promise<void> {
    if (!MOCK_TOURS.find(t => t.id === id)) throw new Error('Tour not found');
    return delay(undefined);
  },
};
