import { createContext, useContext, useMemo, useState, useEffect } from 'react';
import { apiFetch } from '../api/client.js';

const AuthContext = createContext(null);

const STORAGE_KEY = 'gcc_token';

export function AuthProvider({ children }) {
  const [token, setToken] = useState(() => localStorage.getItem(STORAGE_KEY) || '');
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (!token) {
      setUser(null);
      return;
    }
    let cancelled = false;
    (async () => {
      try {
        const data = await apiFetch('/api/me', { token });
        if (!cancelled) setUser(data.user);
      } catch {
        if (!cancelled) {
          setUser(null);
          setToken('');
          localStorage.removeItem(STORAGE_KEY);
        }
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [token]);

  const login = async (email, password) => {
    const data = await apiFetch('/api/auth/login', { method: 'POST', body: { email, password } });
    localStorage.setItem(STORAGE_KEY, data.token);
    setToken(data.token);
    setUser(data.user);
    return data.user;
  };

  const register = async (payload) => {
    const data = await apiFetch('/api/auth/register', { method: 'POST', body: payload });
    localStorage.setItem(STORAGE_KEY, data.token);
    setToken(data.token);
    setUser(data.user);
    return data.user;
  };

  const logout = () => {
    localStorage.removeItem(STORAGE_KEY);
    setToken('');
    setUser(null);
  };

  const value = useMemo(
    () => ({
      token,
      user,
      login,
      register,
      logout,
      isAuthenticated: !!token && !!user,
    }),
    [token, user]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
