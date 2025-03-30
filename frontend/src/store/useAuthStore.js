import { create } from 'zustand';
import axiosInstance from '../utils/axios';

const useAuthStore = create((set) => ({
  user: null,
  token: localStorage.getItem('token'),
  isAuthenticated: false,
  loading: false,
  error: null,

  login: async (email, password) => {
    try {
      set({ loading: true, error: null });
      const response = await axiosInstance.post('/users/login', {
        email,
        password,
      });
      const { token, user } = response.data;
      localStorage.setItem('token', token);
      set({ token, user, isAuthenticated: true, loading: false });
      return true;
    } catch (error) {
      set({
        error: error.response?.data?.message || 'Login failed',
        loading: false,
      });
      return false;
    }
  },

  register: async (name, email, password) => {
    try {
      set({ loading: true, error: null });
      const response = await axiosInstance.post('/users/register', {
        name,
        email,
        password,
      });
      const { token, user } = response.data;
      localStorage.setItem('token', token);
      set({ token, user, isAuthenticated: true, loading: false });
      return true;
    } catch (error) {
      set({
        error: error.response?.data?.message || 'Registration failed',
        loading: false,
      });
      return false;
    }
  },

  logout: () => {
    localStorage.removeItem('token');
    set({ user: null, token: null, isAuthenticated: false });
  },

  setUser: (user) => {
    set({ user, isAuthenticated: true });
  },

  clearError: () => {
    set({ error: null });
  },
}));

export default useAuthStore; 