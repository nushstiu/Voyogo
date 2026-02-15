import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import { UI_TEXT } from '../constants/text';
import { MOCK_USERS } from '../data';
import type { User } from '../types';
import toast from 'react-hot-toast';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<User>;
  register: (username: string, email: string, password: string) => Promise<User>;
  loginWithGoogle: () => Promise<void>;
  loginWithFacebook: () => Promise<void>;
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

  const login = async (email: string, _password: string): Promise<User> => {
    setLoading(true);
    try {
      const foundUser = MOCK_USERS.find(
        (u) => u.email.toLowerCase() === email.toLowerCase()
      );

      if (!foundUser) {
        throw new Error(UI_TEXT.ERROR_LOGIN);
      }

      await new Promise((resolve) => setTimeout(resolve, 600));

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

  const register = async (username: string, email: string, _password: string): Promise<User> => {
    setLoading(true);
    try {
      const exists = MOCK_USERS.find(
        (u) => u.email.toLowerCase() === email.toLowerCase()
      );
      if (exists) {
        throw new Error('Email already registered');
      }

      await new Promise((resolve) => setTimeout(resolve, 600));

      const newUser: User = {
        id: crypto.randomUUID(),
        username,
        email,
        role: 'user',
        profile_pic: null,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      };

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

  const loginWithGoogle = async () => {
    toast.error('Google login requires Firebase configuration. Use email login for demo.');
  };

  const loginWithFacebook = async () => {
    toast.error('Facebook login requires Firebase configuration. Use email login for demo.');
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('voyogo_user');
    toast.success(UI_TEXT.SUCCESS_LOGOUT);
  };

  return (
    <AuthContext.Provider
      value={{ user, loading, login, register, loginWithGoogle, loginWithFacebook, logout }}
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
