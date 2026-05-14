import { createContext, useContext, useEffect, useMemo, type ReactNode } from 'react';
import axios, { type AxiosInstance, type InternalAxiosRequestConfig } from 'axios';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../constants/routes';

const AxiosContext = createContext<AxiosInstance | undefined>(undefined);

export function AxiosProvider({ children }: { children: ReactNode }) {
    const navigate = useNavigate();

    const axiosInstance = useMemo(() => {
        return axios.create({
            baseURL: 'http://localhost:5068/api',
            headers: {
                'Content-Type': 'application/json',
            },
        });
    }, []);

    useEffect(() => {
        const requestInterceptorId = axiosInstance.interceptors.request.use(
            (config) => {
                const token = localStorage.getItem('voyogo_token');
                if (token) {
                    config.headers.Authorization = `Bearer ${token}`;
                }
                return config;
            },
            (error) => Promise.reject(error)
        );

        const interceptorId = axiosInstance.interceptors.response.use(
            (response) => response,
            async (error) => {
                if (!error.response) {
                    if (error.request) {
                        toast.error('Serverul nu răspunde. Verifică conexiunea la internet.');
                    } else {
                        toast.error('A apărut o eroare neașteptată.');
                    }
                    return Promise.reject(error);
                }

                const status = error.response.status;
                const originalRequest = error.config as InternalAxiosRequestConfig & { _retry?: boolean };

                if (status === 401 && !originalRequest._retry) {
                    originalRequest._retry = true;
                    const refreshToken = localStorage.getItem('voyogo_refresh_token');

                    if (refreshToken) {
                        try {
                            const res = await axios.post('http://localhost:5068/api/auth/refresh', { refreshToken });
                            const { token, refreshToken: newRefresh } = res.data;
                            localStorage.setItem('voyogo_token', token);
                            localStorage.setItem('voyogo_refresh_token', newRefresh);
                            if (originalRequest.headers) {
                                originalRequest.headers.Authorization = `Bearer ${token}`;
                            }
                            return axiosInstance(originalRequest);
                        } catch {
                            localStorage.removeItem('voyogo_token');
                            localStorage.removeItem('voyogo_refresh_token');
                            localStorage.removeItem('voyogo_user');
                            toast.error('Sesiunea a expirat. Te rugăm să te autentifici din nou.');
                            navigate(ROUTES.LOGIN);
                            return Promise.reject(error);
                        }
                    } else {
                        localStorage.removeItem('voyogo_token');
                        localStorage.removeItem('voyogo_user');
                        toast.error('Sesiunea a expirat. Te rugăm să te autentifici din nou.');
                        navigate(ROUTES.LOGIN);
                        return Promise.reject(error);
                    }
                }

                switch (status) {
                    case 400:
                        toast.error(
                            error.response.data?.message || 'Date invalide. Verifică informațiile introduse.'
                        );
                        break;
                    case 403:
                        navigate(ROUTES.FORBIDDEN);
                        break;
                    case 404:
                        toast.error('Resursa nu a fost găsită.');
                        break;
                    case 500:
                        toast.error('Eroare de server. Încearcă din nou mai târziu.');
                        break;
                    default:
                        if (status !== 401) {
                            toast.error('A apărut o eroare neașteptată. Încearcă din nou.');
                        }
                        break;
                }

                return Promise.reject(error);
            }
        );

        return () => {
            axiosInstance.interceptors.request.eject(requestInterceptorId);
            axiosInstance.interceptors.response.eject(interceptorId);
        };
    }, [axiosInstance, navigate]);

    return (
        <AxiosContext.Provider value={axiosInstance}>
            {children}
        </AxiosContext.Provider>
    );
}

export function useAxios(): AxiosInstance {
    const context = useContext(AxiosContext);
    if (!context) {
        throw new Error('useAxios must be used within an AxiosProvider');
    }
    return context;
}
