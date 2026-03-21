import { createContext, useContext, useEffect, useMemo, type ReactNode } from 'react';
import axios, { type AxiosInstance } from 'axios';
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
        const interceptorId = axiosInstance.interceptors.response.use(
            (response) => response,
            (error) => {
                if (error.response) {
                    const status = error.response.status;

                    switch (status) {
                        case 400:
                            toast.error(
                                error.response.data?.message || 'Date invalide. Verifică informațiile introduse.'
                            );
                            break;
                        case 401:
                            localStorage.removeItem('voyogo_user');
                            toast.error('Sesiunea a expirat. Te rugăm să te autentifici din nou.');
                            navigate(ROUTES.LOGIN);
                            break;
                        case 403:
                            toast.error('Acces interzis. Nu ai permisiunea necesară.');
                            break;
                        case 404:
                            toast.error('Resursa nu a fost găsită.');
                            break;
                        case 500:
                            toast.error('Eroare de server. Încearcă din nou mai târziu.');
                            break;
                        default:
                            toast.error('A apărut o eroare neașteptată. Încearcă din nou.');
                            break;
                    }
                } else if (error.request) {
                    toast.error('Serverul nu răspunde. Verifică conexiunea la internet.');
                } else {
                    toast.error('A apărut o eroare neașteptată.');
                }

                return Promise.reject(error);
            }
        );

        return () => {
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