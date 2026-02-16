import { USE_MOCK_DATA, MOCK_DELAY, ENDPOINTS } from '../config/api.config';
import { apiService } from './api.service';
import { MOCK_TOURS } from '../data/tours.data';
import toursJson from '../data/tours.json';
import type { Tour, CreateTourData } from '../types';
import type { Tour as JsonTour } from '../types/tour';

function delay<T>(data: T): Promise<T> {
  return new Promise(resolve => setTimeout(() => resolve(data), MOCK_DELAY));
}

export const tourService = {
  async getAll(): Promise<Tour[]> {
    if (USE_MOCK_DATA) {
      return delay([...MOCK_TOURS]);
    }
    return apiService.get<Tour[]>(ENDPOINTS.TOURS);
  },

  async getById(id: string): Promise<Tour | null> {
    if (USE_MOCK_DATA) {
      // Search in MOCK_TOURS first
      const tour = MOCK_TOURS.find(t => t.id === id);
      if (tour) return delay(tour);
      // Fallback: search tours.json and convert to Tour type
      const jsonTour = (toursJson as JsonTour[]).find(t => t.id === id);
      if (jsonTour) {
        const converted: Tour = {
          id: jsonTour.id,
          name: jsonTour.name,
          location: jsonTour.location,
          price: `$${jsonTour.price.toLocaleString()}`,
          days: String(jsonTour.days),
          description: jsonTour.description,
          image: jsonTour.img,
          destination_id: 0,
          status: 'active',
        };
        return delay(converted);
      }
      return delay(null);
    }
    return apiService.get<Tour>(ENDPOINTS.TOUR_BY_ID(id));
  },

  async getByDestination(destinationId: number): Promise<Tour[]> {
    if (USE_MOCK_DATA) {
      const tours = MOCK_TOURS.filter(t => t.destination_id === destinationId && t.status === 'active');
      return delay(tours);
    }
    return apiService.get<Tour[]>(ENDPOINTS.TOURS_BY_DESTINATION(destinationId));
  },

  async create(data: CreateTourData): Promise<Tour> {
    if (USE_MOCK_DATA) {
      const newTour: Tour = {
        ...data,
        id: crypto.randomUUID(),
        created_at: new Date().toISOString(),
      };
      return delay(newTour);
    }
    return apiService.post<Tour>(ENDPOINTS.TOURS, data);
  },

  async update(id: string, data: Partial<CreateTourData>): Promise<Tour> {
    if (USE_MOCK_DATA) {
      const existing = MOCK_TOURS.find(t => t.id === id);
      if (!existing) throw new Error('Tour not found');
      const updated = { ...existing, ...data };
      return delay(updated);
    }
    return apiService.put<Tour>(ENDPOINTS.TOUR_BY_ID(id), data);
  },

  async delete(id: string): Promise<void> {
    if (USE_MOCK_DATA) {
      return delay(undefined);
    }
    await apiService.delete<void>(ENDPOINTS.TOUR_BY_ID(id));
  },
};
