import { useState, useEffect, useCallback } from 'react';

interface User {
    id: string;
    email: string;
    name: string;
    avatar?: string;
    role?: 'user' | 'admin';
}

interface AuthContextType {
    user: User | null;
    isAuthenticated: boolean;
    loading: boolean;
    login: (email: string, password: string) => Promise<void>;
    logout: () => void;
    register: (email: string, password: string, name: string) => Promise<void>;
    updateUser: (userData: Partial<User>) => void;
}

export function useAuth(): AuthContextType {
    const [user, setUser] = useState<User | null>(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [loading, setLoading] = useState(true);

    // Verifică autentificarea la montare
    useEffect(() => {
        const checkAuth = () => {
            const token = localStorage.getItem('authToken');
            const userData = localStorage.getItem('userData');

            if (token && userData) {
                try {
                    const parsedUser = JSON.parse(userData);
                    setUser(parsedUser);
                    setIsAuthenticated(true);
                } catch (error) {
                    console.error('Eroare la parsarea datelor utilizatorului:', error);
                    localStorage.removeItem('authToken');
                    localStorage.removeItem('userData');
                }
            }
            setLoading(false);
        };

        checkAuth();
    }, []);

    const login = useCallback(async (email: string, password: string) => {
        setLoading(true);
        try {
            // Apel API - mock-ul va fi separat în mapa mocks/
            const response = await fetch('/api/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password })
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'Login failed');
            }

            localStorage.setItem('authToken', data.token);
            localStorage.setItem('userData', JSON.stringify(data.user));

            setUser(data.user);
            setIsAuthenticated(true);
        } catch (error) {
            console.error('Eroare la login:', error);
            throw error;
        } finally {
            setLoading(false);
        }
    }, []);

    const register = useCallback(async (email: string, password: string, name: string) => {
        setLoading(true);
        try {
            // Apel API - mock-ul va fi separat în mapa mocks/
            const response = await fetch('/api/auth/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password, name })
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'Registration failed');
            }

            localStorage.setItem('authToken', data.token);
            localStorage.setItem('userData', JSON.stringify(data.user));

            setUser(data.user);
            setIsAuthenticated(true);
        } catch (error) {
            console.error('Eroare la înregistrare:', error);
            throw error;
        } finally {
            setLoading(false);
        }
    }, []);

    const logout = useCallback(() => {
        localStorage.removeItem('authToken');
        localStorage.removeItem('userData');
        setUser(null);
        setIsAuthenticated(false);
    }, []);

    const updateUser = useCallback((userData: Partial<User>) => {
        if (user) {
            const updatedUser = { ...user, ...userData };
            setUser(updatedUser);
            localStorage.setItem('userData', JSON.stringify(updatedUser));
        }
    }, [user]);

    return {
        user,
        isAuthenticated,
        loading,
        login,
        logout,
        register,
        updateUser
    };
}
