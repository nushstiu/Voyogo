import type { User, UpdateProfileData } from '../types';
import http from './_http';

export const userService = {
    async getAll(): Promise<User[]> {
        const res = await http.get('/users');
        return res.data;
    },

    async getById(id: string): Promise<User | null> {
        const res = await http.get(`/users/${id}`);
        return res.data;
    },

    async update(id: string, data: Partial<UpdateProfileData>): Promise<User> {
        const res = await http.put(`/users/${id}`, data);
        return res.data;
    },

    async delete(id: string): Promise<void> {
        await http.delete(`/users/${id}`);
    },
};
