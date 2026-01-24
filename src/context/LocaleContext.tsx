// src/context/LocaleContext.tsx
'use client';

import { createContext, useContext } from 'react';
import { useLocale } from '@/hooks/useLocale';

const LocaleContext = createContext<ReturnType<typeof useLocale> | null>(null);

export function LocaleProvider({ children }: { children: React.ReactNode }) {
  const value = useLocale();
  return (
    <LocaleContext.Provider value={value}>
      {children}
    </LocaleContext.Provider>
  );
}

export function useLocaleContext() {
  const ctx = useContext(LocaleContext);
  if (!ctx) {
    throw new Error('useLocaleContext must be used within LocaleProvider');
  }
  return ctx;
}
