'use client';

import { create } from 'zustand';
import { LanguageType } from '@/locales/i18n';

interface LocaleStore {
  locale: LanguageType;
  setLocale: (locale: LanguageType) => void;
  toggleLocale: () => void;
}

export const useLocaleStore = create<LocaleStore>((set) => ({
  locale: 'ar',
  setLocale: (locale) => set({ locale }),
  toggleLocale: () => set((state) => ({
    locale: state.locale === 'ar' ? 'en' : 'ar',
  })),
}));
