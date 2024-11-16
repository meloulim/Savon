import axios from 'axios';
import toast from 'react-hot-toast';

const api = axios.create({
  baseURL: `${import.meta.env.VITE_BACKEND_URL}/api`,
  withCredentials: false,
  headers: {
    'Content-Type': 'application/json'
  }
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      const message = error.response.data?.error || 'Une erreur est survenue';
      toast.error(message);
      
      if (error.response.status === 401) {
        localStorage.removeItem('token');
        window.location.href = '/login';
      }
    } else if (error.request) {
      toast.error('Impossible de contacter le serveur');
    } else {
      toast.error('Une erreur est survenue');
    }
    
    return Promise.reject(error);
  }
);

export const auth = {
  register: (data: { name: string; email: string; password: string }) =>
    api.post('/auth/register', data),
  login: (data: { email: string; password: string }) =>
    api.post('/auth/login', data),
  me: () => api.get('/auth/me'),
};

export const products = {
  getAll: () => api.get('/products'),
  getById: (id: string) => api.get(`/products/${id}`),
};

export const orders = {
  create: (data: { items: any[]; shippingAddress: any }) =>
    api.post('/orders', data),
  getMine: () => api.get('/orders/me'),
};

export { api };