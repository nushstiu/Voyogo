import type { Destination, CreateDestinationData } from '../types';
import http from './_http';

export const destinationService = {
    async getAll(): Promise<Destination[]> {
        const res = await http.get('/destinations');
        return res.data;
    },

    async getById(id: number): Promise<Destination | null> {
        const res = await http.get(`/destinations/${id}`);
        return res.data;
    },

    async create(data: CreateDestinationData): Promise<Destination> {
        const res = await http.post('/destinations', data);
        return res.data;
    },

    async update(id: number, data: Partial<CreateDestinationData>): Promise<Destination> {
        const res = await http.put(`/destinations/${id}`, data);
        return res.data;
    },

    async delete(id: number): Promise<void> {
        await http.delete(`/destinations/${id}`);
    },
};
