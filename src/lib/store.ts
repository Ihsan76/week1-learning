// src/lib/store.ts

import { create } from 'zustand';

interface AuthStore {
  isLoggedIn: boolean;
  user: { email: string } | null;
  login: (email: string) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthStore>((set) => ({
  isLoggedIn: false,
  user: null,
  login: (email: string) =>
    set({
      isLoggedIn: true,
      user: { email },
    }),
  logout: () =>
    set({
      isLoggedIn: false,
      user: null,
    }),
}));
