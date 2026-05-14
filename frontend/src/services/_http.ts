import axios, { type InternalAxiosRequestConfig } from 'axios';

const http = axios.create({
    baseURL: 'http://localhost:5068/api',
    headers: { 'Content-Type': 'application/json' },
});

http.interceptors.request.use((config) => {
    const token = localStorage.getItem('voyogo_token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

http.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config as InternalAxiosRequestConfig & { _retry?: boolean };

        if (error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;
            const refreshToken = localStorage.getItem('voyogo_refresh_token');

            if (refreshToken) {
                try {
                    const res = await axios.post('http://localhost:5068/api/auth/refresh', { refreshToken });
                    const { token, refreshToken: newRefresh } = res.data;
                    localStorage.setItem('voyogo_token', token);
                    localStorage.setItem('voyogo_refresh_token', newRefresh);
                    originalRequest.headers.Authorization = `Bearer ${token}`;
                    return http(originalRequest);
                } catch {
                    localStorage.removeItem('voyogo_token');
                    localStorage.removeItem('voyogo_refresh_token');
                    localStorage.removeItem('voyogo_user');
                    window.location.href = '/login';
                    return Promise.reject(error);
                }
            } else {
                localStorage.removeItem('voyogo_token');
                localStorage.removeItem('voyogo_user');
                window.location.href = '/login';
            }
        }

        return Promise.reject(error);
    }
);

export default http;