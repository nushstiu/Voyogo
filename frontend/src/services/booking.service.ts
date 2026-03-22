import type { Booking, CreateBookingData } from '../types';
import http from './_http';

export const bookingService = {
    async getAll(): Promise<Booking[]> {
        const res = await http.get('/bookings');
        return res.data;
    },

    async getById(id: string): Promise<Booking | null> {
        const res = await http.get(`/bookings/${id}`);
        return res.data;
    },

    async getByUserId(userId: string): Promise<Booking[]> {
        const res = await http.get(`/bookings/user/${userId}`);
        return res.data;
    },

    async create(data: CreateBookingData): Promise<Booking> {
        const res = await http.post('/bookings', data);
        return res.data;
    },

    async update(id: string, data: Partial<Booking>): Promise<Booking> {
        const res = await http.put(`/bookings/${id}`, data);
        return res.data;
    },

    async cancel(id: string): Promise<Booking> {
        const res = await http.patch(`/bookings/${id}/status`, { status: 'cancelled' });
        return res.data;
    },

    async delete(id: string): Promise<void> {
        await http.delete(`/bookings/${id}`);
    },
};
