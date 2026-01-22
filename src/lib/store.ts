// src/lib/store.ts
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

export interface User {
  id: number;
  email: string;
  created_at?: string;
  // أضف أي حقول أخرى يرجعها الباك إند (مثلاً name, is_admin...)
}

export interface AuthStore {
  isLoggedIn: boolean;
  user: User | null;
  token: string | null;
  setAuth: (user: User) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      isLoggedIn: false,
      user: null,
      token: null,
      setAuth: (user, token) =>
        set({
          isLoggedIn: true,
          user,
        }),
      logout: () =>
        set({
          isLoggedIn: false,
          user: null,
          token: null,
        }),
    }),
    {
      name: 'auth-storage',
      storage: createJSONStorage(() => localStorage),
    }
  )
);
