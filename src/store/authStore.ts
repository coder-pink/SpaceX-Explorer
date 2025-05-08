
import { create } from 'zustand';

interface AuthState {
  isAuthenticated: boolean;
  login: (username: string, password: string) => void;
  logout: () => void;
  errorMessage: string | null;
}

export const useAuthStore = create<AuthState>((set) => ({
  isAuthenticated: localStorage.getItem('isAuthenticated') === 'true',
  errorMessage: null,
  login: (username: string, password: string) => {
    // Simulating an authentication mechanism
    if (username === 'admin' && password === '12345') {
      localStorage.setItem('isAuthenticated', 'true');
      set({ isAuthenticated: true, errorMessage: null });
    } else {
      set({ isAuthenticated: false, errorMessage: 'Invalid username or password' });
    }
  },
  logout: () => {
    localStorage.removeItem('isAuthenticated');
    set({ isAuthenticated: false, errorMessage: null });
  },
}));
