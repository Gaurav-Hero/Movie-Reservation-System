import axios from 'axios';
import { toast } from 'react-toastify';
import useAuthStore from '../store/useAuthStore';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const axiosInstance = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    const { response } = error;

    // Handle 401 Unauthorized
    if (response?.status === 401) {
      useAuthStore.getState().logout();
      toast.error('Session expired. Please login again.');
      window.location.href = '/login';
    }

    // Handle other errors
    if (response?.data?.message) {
      toast.error(response.data.message);
    } else {
      toast.error('An error occurred. Please try again.');
    }

    return Promise.reject(error);
  }
);

export default axiosInstance; 