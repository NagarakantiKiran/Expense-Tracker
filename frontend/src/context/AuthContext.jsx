import { createContext, useState, useEffect } from 'react';
import * as authService from '../services/authService';
import api from '../services/api';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Attach token to Axios
  const setAuthToken = (token) => {
    if (token) {
      api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      localStorage.setItem('token', token);
    } else {
      delete api.defaults.headers.common['Authorization'];
      localStorage.removeItem('token');
    }
  };

  // Load user from token on mount
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setAuthToken(token);
      authService.getUser()
        .then(res => setUser(res.data))
        .catch(() => setUser(null))
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, []);

  // Login method
  const login = async (data) => {
    setLoading(true);
    try {
      const res = await authService.login(data);
      setAuthToken(res.data.token);
      setUser(res.data.user);
      setLoading(false);
      return { success: true };
    } catch (err) {
      setUser(null);
      setAuthToken(null);
      setLoading(false);
      return { success: false, message: err.response?.data?.message || 'Login failed' };
    }
  };

  // Register method
  const register = async (data) => {
    setLoading(true);
    try {
      const res = await authService.register(data);
      setLoading(false);
      return { success: true, user: res.data };
    } catch (err) {
      setLoading(false);
      return { success: false, message: err.response?.data?.message || 'Registration failed' };
    }
  };

  // Logout method
  const logout = () => {
    setUser(null);
    setAuthToken(null);
  };

  return (
    <AuthContext.Provider value={{ user, setUser, loading, login, logout, register }}>
      {children}
    </AuthContext.Provider>
  );
};
