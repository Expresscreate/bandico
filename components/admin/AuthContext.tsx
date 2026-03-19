import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { authAPI, setToken, getToken } from '../../lib/api';

interface AuthContextType {
  isAuthenticated: boolean;
  username: string | null;
  loading: boolean;
  login: (username: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType>({
  isAuthenticated: false,
  username: null,
  loading: true,
  login: async () => {},
  logout: () => {},
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = getToken();
    if (token) {
      authAPI.me()
        .then((res) => {
          setIsAuthenticated(true);
          setUsername(res.user?.sub || 'admin');
        })
        .catch(() => {
          setToken(null);
          setIsAuthenticated(false);
        })
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, []);

  const login = async (user: string, password: string) => {
    const res = await authAPI.login(user, password);
    setToken(res.token);
    setIsAuthenticated(true);
    setUsername(res.username);
  };

  const logout = () => {
    setToken(null);
    setIsAuthenticated(false);
    setUsername(null);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, username, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
