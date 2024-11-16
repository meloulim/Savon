import { create } from 'zustand';
import { auth } from '../services/api';

interface User {
  id: string;
  name: string;
  email: string;
  role: 'user' | 'admin';
}

interface AuthStore {
  user: User | null;
  token: string | null;
  loading: boolean;
  error: string | null;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  checkAuth: () => Promise<void>;
}

export const useAuthStore = create<AuthStore>((set) => ({
  user: null,
  token: localStorage.getItem('token'),
  loading: false,
  error: null,

  login: async (email, password) => {
    try {
      set({ loading: true, error: null });
      const { data } = await auth.login({ email, password });
      localStorage.setItem('token', data.token);
      set({ 
        user: data.user, 
        token: data.token, 
        loading: false,
        error: null 
      });
    } catch (error: any) {
      set({
        user: null,
        token: null,
        loading: false,
        error: error.response?.data?.error || 'Une erreur est survenue'
      });
      throw error;
    }
  },

  register: async (name, email, password) => {
    try {
      set({ loading: true, error: null });
      const { data } = await auth.register({ name, email, password });
      localStorage.setItem('token', data.token);
      set({ 
        user: data.user, 
        token: data.token, 
        loading: false,
        error: null 
      });
    } catch (error: any) {
      set({
        user: null,
        token: null,
        loading: false,
        error: error.response?.data?.error || 'Une erreur est survenue'
      });
      throw error;
    }
  },

  logout: () => {
    localStorage.removeItem('token');
    set({ 
      user: null, 
      token: null,
      error: null,
      loading: false 
    });
  },

  checkAuth: async () => {
    try {
      if (!localStorage.getItem('token')) {
        set({ user: null, token: null });
        return;
      }

      const { data } = await auth.me();
      set({ 
        user: data.user,
        error: null,
        loading: false 
      });
    } catch (error) {
      localStorage.removeItem('token');
      set({ 
        user: null, 
        token: null,
        error: null,
        loading: false 
      });
    }
  },
}));