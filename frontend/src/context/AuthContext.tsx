import axios from 'axios';
import { createContext, useContext, useState, useEffect, useMemo, type ReactNode } from 'react';
import { UI_TEXT } from '../constants/text';
import { createAuthService } from '../services/auth.service';
import { useAxios } from './AxiosContext';
import type { User } from '../types';
import toast from 'react-hot-toast';
import { isTokenValid, getRoleFromToken, getUserIdFromToken } from '../utils/jwt';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<User>;
  register: (username: string, email: string, password: string) => Promise<User>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const axiosInstance = useAxios();
  const authService = useMemo(() => createAuthService(axiosInstance), [axiosInstance]);

  const [user, setUser] = useState<User | null>(() => {
    const stored = localStorage.getItem('voyogo_user');
    const token = localStorage.getItem('voyogo_token');

    // Verificam daca tokenul este valid inainte de a restaura sesiunea
    if (stored && token && isTokenValid(token)) {
      return JSON.parse(stored) as User;
    }

    // Token expirat sau lipsa - curatam localStorage
    localStorage.removeItem('voyogo_user');
    localStorage.removeItem('voyogo_token');
    localStorage.removeItem('voyogo_refresh_token');
    return null;
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const stored = localStorage.getItem('voyogo_user');
    const token = localStorage.getItem('voyogo_token');

    if (stored && token && isTokenValid(token)) {
      const parsedUser = JSON.parse(stored) as User;

      // Extragem informatii din token si le verificam cu datele stocate
      const roleFromToken = getRoleFromToken(token);
      const userIdFromToken = getUserIdFromToken(token);

      if (roleFromToken && userIdFromToken && userIdFromToken === String(parsedUser.id)) {
        setUser(parsedUser);
      } else {
        // Token nu corespunde cu userul stocat
        localStorage.removeItem('voyogo_user');
        localStorage.removeItem('voyogo_token');
        localStorage.removeItem('voyogo_refresh_token');
      }
    } else {
      localStorage.removeItem('voyogo_user');
      localStorage.removeItem('voyogo_token');
      localStorage.removeItem('voyogo_refresh_token');
    }

    setLoading(false);
  }, []);

  const login = async (email: string, password: string): Promise<User> => {
    setLoading(true);
    try {
      const response = await authService.login(email, password);

      // Extragem si logam informatii din token pentru debugging
      const roleFromToken = getRoleFromToken(response.token);
      const userIdFromToken = getUserIdFromToken(response.token);
      console.log('[JWT] userId din token:', userIdFromToken);
      console.log('[JWT] rol din token:', roleFromToken);

      setUser(response.user);
      localStorage.setItem('voyogo_user', JSON.stringify(response.user));
      localStorage.setItem('voyogo_token', response.token);
      localStorage.setItem('voyogo_refresh_token', response.refreshToken);
      toast.success(UI_TEXT.SUCCESS_LOGIN);
      return response.user;
    } catch {
      toast.error(UI_TEXT.ERROR_LOGIN);
      throw new Error(UI_TEXT.ERROR_LOGIN);
    } finally {
      setLoading(false);
    }
  };

  const register = async (username: string, email: string, password: string): Promise<User> => {
    setLoading(true);
    try {
      const response = await authService.register(username, email, password);

      const roleFromToken = getRoleFromToken(response.token);
      const userIdFromToken = getUserIdFromToken(response.token);
      console.log('[JWT] userId din token:', userIdFromToken);
      console.log('[JWT] rol din token:', roleFromToken);

      setUser(response.user);
      localStorage.setItem('voyogo_user', JSON.stringify(response.user));
      localStorage.setItem('voyogo_token', response.token);
      localStorage.setItem('voyogo_refresh_token', response.refreshToken);
      toast.success(UI_TEXT.SUCCESS_REGISTER);
      return response.user;
    } catch (err) {
      const message = err instanceof Error ? err.message : UI_TEXT.ERROR_REGISTER;
      toast.error(message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    const refreshToken = localStorage.getItem('voyogo_refresh_token');
    if (refreshToken) {
      axios.post('http://localhost:5068/api/auth/revoke', { refreshToken }).catch(() => {});
    }
    setUser(null);
    localStorage.removeItem('voyogo_user');
    localStorage.removeItem('voyogo_token');
    localStorage.removeItem('voyogo_refresh_token');
    toast.success(UI_TEXT.SUCCESS_LOGOUT);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
