import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import { UI_TEXT } from '../constants/text';
import { authService } from '../services/auth.service';
import type { User } from '../types';
import toast from 'react-hot-toast';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<User>;
  register: (username: string, email: string, password: string) => Promise<User>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(() => {
    const stored = localStorage.getItem('voyogo_user');
    return stored ? JSON.parse(stored) : null;
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const stored = localStorage.getItem('voyogo_user');
    if (stored) {
      setUser(JSON.parse(stored));
    }
    setLoading(false);
  }, []);

  const login = async (email: string, password: string): Promise<User> => {
    setLoading(true);
    try {
      const foundUser = await authService.login(email, password);
      setUser(foundUser);
      localStorage.setItem('voyogo_user', JSON.stringify(foundUser));
      toast.success(UI_TEXT.SUCCESS_LOGIN);
      return foundUser;
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
      const newUser = await authService.register(username, email, password);
      setUser(newUser);
      localStorage.setItem('voyogo_user', JSON.stringify(newUser));
      toast.success(UI_TEXT.SUCCESS_REGISTER);
      return newUser;
    } catch (err) {
      const message = err instanceof Error ? err.message : UI_TEXT.ERROR_REGISTER;
      toast.error(message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('voyogo_user');
    toast.success(UI_TEXT.SUCCESS_LOGOUT);
  };

  return (
    <AuthContext.Provider
      value={{ user, loading, login, register, logout }}
    >
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
