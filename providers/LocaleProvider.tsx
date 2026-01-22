// src/providers/LocaleProvider.tsx
'use client'

import { createContext, useContext, type ReactNode } from 'react'
import { useLocale } from '@/hooks/useLocale'
import { type Locale } from '@/locales/i18n'

type LocaleContextType = ReturnType<typeof useLocale> | null

const LocaleContext = createContext<LocaleContextType>(null)

export function LocaleProvider({ children }: { children: ReactNode }) {
  const locale = useLocale()

  if (locale.isLoading) {
    return <div>جاري التحميل...</div>
  }

  return (
    <LocaleContext.Provider value={locale}>
      {children}
    </LocaleContext.Provider>
  )
}

export function useLocaleContext() {
  const context = useContext(LocaleContext)
  if (!context) {
    throw new Error('useLocaleContext يجب أن يستخدم داخل LocaleProvider')
  }
  return context
}
