import type { AxiosInstance } from 'axios';
import type { User } from '../types';
import http from './_http';

interface AuthResponse {
    user: User;
    token: string;
    refreshToken: string;
}

export const createAuthService = (axiosInstance: AxiosInstance) => ({
    async login(email: string, password: string): Promise<AuthResponse> {
        const res = await axiosInstance.post('/auth/login', { email, password });
        return res.data;
    },

    async register(username: string, email: string, password: string): Promise<AuthResponse> {
        const res = await axiosInstance.post('/auth/register', { username, email, password });
        return res.data;
    },

    async logout(): Promise<void> {
        localStorage.removeItem('voyogo_user');
        localStorage.removeItem('voyogo_token');
    },

    async getCurrentUser(): Promise<User | null> {
        const stored = localStorage.getItem('voyogo_user');
        return stored ? JSON.parse(stored) : null;
    },
});

export const authService = createAuthService(http);