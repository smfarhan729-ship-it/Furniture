import React, { createContext, useContext, useState, useEffect } from 'react';
import { api } from '../services/api';

interface AuthContextType {
  token: string | null;
  isAdmin: boolean;
  isLoading: boolean;
  login: (password: string) => Promise<boolean>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [token, setToken] = useState<string | null>(() => {
    return localStorage.getItem('sbsf_admin_token') || null;
  });
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    async function checkAuth() {
      if (token) {
        const valid = await api.verifyAdmin(token);
        setIsAdmin(valid);
        if (!valid) {
          localStorage.removeItem('sbsf_admin_token');
          setToken(null);
        }
      } else {
        setIsAdmin(false);
      }
      setIsLoading(false);
    }
    checkAuth();
  }, [token]);

  const login = async (password: string): Promise<boolean> => {
    try {
      const res = await api.adminLogin(password);
      if (res.success && res.token) {
        localStorage.setItem('sbsf_admin_token', res.token);
        setToken(res.token);
        setIsAdmin(true);
        return true;
      }
      return false;
    } catch {
      return false;
    }
  };

  const logout = () => {
    localStorage.removeItem('sbsf_admin_token');
    setToken(null);
    setIsAdmin(false);
  };

  return (
    <AuthContext.Provider value={{ token, isAdmin, isLoading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
