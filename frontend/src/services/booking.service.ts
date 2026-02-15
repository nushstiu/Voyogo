import { USE_MOCK_DATA, MOCK_DELAY, ENDPOINTS } from '../config/api.config';
import { apiService } from './api.service';
import { MOCK_BOOKINGS } from '../data/bookings.data';
import type { Booking, CreateBookingData } from '../types';

function delay<T>(data: T): Promise<T> {
  return new Promise(resolve => setTimeout(() => resolve(data), MOCK_DELAY));
}

export const bookingService = {
  async getAll(): Promise<Booking[]> {
    if (USE_MOCK_DATA) {
      return delay([...MOCK_BOOKINGS]);
    }
    return apiService.get<Booking[]>(ENDPOINTS.BOOKINGS);
  },

  async getById(id: string): Promise<Booking | null> {
    if (USE_MOCK_DATA) {
      const booking = MOCK_BOOKINGS.find(b => b.id === id) || null;
      return delay(booking);
    }
    return apiService.get<Booking>(ENDPOINTS.BOOKING_BY_ID(id));
  },

  async getByUserId(userId: string): Promise<Booking[]> {
    if (USE_MOCK_DATA) {
      const bookings = MOCK_BOOKINGS.filter(b => b.user_id === userId);
      return delay(bookings);
    }
    return apiService.get<Booking[]>(`${ENDPOINTS.BOOKINGS}?userId=${userId}`);
  },

  async create(data: CreateBookingData): Promise<Booking> {
    if (USE_MOCK_DATA) {
      const newBooking: Booking = {
        ...data,
        id: crypto.randomUUID(),
        user_id: '',
        status: 'pending',
        created_at: new Date().toISOString(),
      };
      return delay(newBooking);
    }
    return apiService.post<Booking>(ENDPOINTS.BOOKINGS, data);
  },

  async update(id: string, data: Partial<Booking>): Promise<Booking> {
    if (USE_MOCK_DATA) {
      const existing = MOCK_BOOKINGS.find(b => b.id === id);
      if (!existing) throw new Error('Booking not found');
      const updated = { ...existing, ...data };
      return delay(updated);
    }
    return apiService.put<Booking>(ENDPOINTS.BOOKING_BY_ID(id), data);
  },

  async cancel(id: string): Promise<Booking> {
    if (USE_MOCK_DATA) {
      const existing = MOCK_BOOKINGS.find(b => b.id === id);
      if (!existing) throw new Error('Booking not found');
      const updated = { ...existing, status: 'cancelled' as const };
      return delay(updated);
    }
    return apiService.put<Booking>(ENDPOINTS.BOOKING_CANCEL(id), {});
  },

  async delete(id: string): Promise<void> {
    if (USE_MOCK_DATA) {
      return delay(undefined);
    }
    await apiService.delete<void>(ENDPOINTS.BOOKING_BY_ID(id));
  },
};
