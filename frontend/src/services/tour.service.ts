import type { Tour, CreateTourData } from '../types';
import http from './_http';

export const tourService = {
    async getAll(): Promise<Tour[]> {
        const res = await http.get('/tours');
        return res.data;
    },

    async getById(id: string): Promise<Tour | null> {
        const res = await http.get(`/tours/${id}`);
        return res.data;
    },

    async getByDestination(destinationId: number): Promise<Tour[]> {
        const res = await http.get(`/tours/destination/${destinationId}`);
        return res.data;
    },

    async create(data: CreateTourData): Promise<Tour> {
        const res = await http.post('/tours', data);
        return res.data;
    },

    async update(id: string, data: Partial<CreateTourData>): Promise<Tour> {
        const res = await http.put(`/tours/${id}`, data);
        return res.data;
    },

    async delete(id: string): Promise<void> {
        await http.delete(`/tours/${id}`);
    },
};
