import axios from 'axios';

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

export default http;