import { MOCK_BOOKINGS } from '../data/bookings.data';
import { BookingStatus, type Booking, type CreateBookingData } from '../types';

const MOCK_DELAY = 400;

function delay<T>(data: T): Promise<T> {
  return new Promise(resolve => setTimeout(() => resolve(data), MOCK_DELAY));
}

export const bookingService = {
  async getAll(): Promise<Booking[]> {
    return delay([...MOCK_BOOKINGS]);
  },

  async getById(id: string): Promise<Booking | null> {
    const booking = MOCK_BOOKINGS.find(b => b.id === id) || null;
    return delay(booking);
  },

  async getByUserId(userId: string): Promise<Booking[]> {
    const bookings = MOCK_BOOKINGS.filter(b => b.user_id === userId);
    return delay(bookings);
  },

  async create(data: CreateBookingData): Promise<Booking> {
    const newBooking: Booking = {
      ...data,
      id: crypto.randomUUID(),
      user_id: data.user_id || '',
      status: BookingStatus.Pending,
      created_at: new Date().toISOString(),
    };
    return delay(newBooking);
  },

  async update(id: string, data: Partial<Booking>): Promise<Booking> {
    const existing = MOCK_BOOKINGS.find(b => b.id === id);
    if (!existing) throw new Error('Booking not found');
    const updated = { ...existing, ...data };
    return delay(updated);
  },

  async cancel(id: string): Promise<Booking> {
    const existing = MOCK_BOOKINGS.find(b => b.id === id);
    if (!existing) throw new Error('Booking not found');
    const updated = { ...existing, status: BookingStatus.Cancelled };
    return delay(updated);
  },

  async delete(id: string): Promise<void> {
    if (!MOCK_BOOKINGS.find(b => b.id === id)) throw new Error('Booking not found');
    return delay(undefined);
  },
};
