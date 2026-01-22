// src/lib/localeStore.ts
'use client'

import { create } from 'zustand'
import { LanguageType, ENABLED_LANGUAGES, DEFAULT_LANGUAGE } from '@/lib/languages'
import { getDictionary } from '@/locales/i18n'

interface LocaleStore {
  locale: LanguageType
  dictionary: Record<string, any> | null
  isLoading: boolean
  setLocale: (locale: LanguageType) => Promise<void>
  toggleLocale: () => Promise<void>
  initializeLocale: () => Promise<void>
}

export const useLocaleStore = create<LocaleStore>((set) => ({
  locale: 'ar',
  dictionary: null,
  isLoading: true,

  setLocale: async (locale: LanguageType) => {
    set({ isLoading: true })
    const dict = await getDictionary(locale)
    set({ locale, dictionary: dict, isLoading: false })
    window.localStorage.setItem('locale', locale)
  },

  toggleLocale: async () => {
    set((state) => {
      const newLocale = state.locale === 'ar' ? 'en' : 'ar'
      return { locale: newLocale }
    })
    
    const state = useLocaleStore.getState()
    const dict = await getDictionary(state.locale)
    set({ dictionary: dict, isLoading: false })
    window.localStorage.setItem('locale', state.locale)
  },

  initializeLocale: async () => {
    const saved = window.localStorage.getItem('locale') as LanguageType | null
    const initial = (saved && ENABLED_LANGUAGES.find(l => l.code === saved)) 
      ? saved 
      : (DEFAULT_LANGUAGE.code as LanguageType)

    set({ locale: initial, isLoading: true })
    const dict = await getDictionary(initial)
    set({ dictionary: dict, isLoading: false })
  },
}))
