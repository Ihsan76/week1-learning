// src/hooks/useLocale.ts
'use client'

import { useEffect, useState } from 'react'
import { getDictionary, enabledLanguages, defaultLanguage, type Locale } from '@/locales/i18n'

export function useLocale() {
  const [locale, setLocale] = useState<Locale>(defaultLanguage.code as Locale)
  const [dict, setDict] = useState<any | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  // تحميل اللغة الأولية + القاموس
  useEffect(() => {
    const saved = window.localStorage.getItem('locale') as Locale | null
    const initial = (saved && enabledLanguages.find(l => l.code === saved))
      ? saved
      : (defaultLanguage.code as Locale)

    setLocale(initial)

    getDictionary(initial).then(d => {
      setDict(d)
      setIsLoading(false)
    })
  }, [])

  // مزامنة اتجاه <html> مع locale دائمًا
  useEffect(() => {
    const langConfig = enabledLanguages.find(l => l.code === locale)
    if (!langConfig) return

    document.documentElement.dir = langConfig.dir
    document.documentElement.lang = locale
  }, [locale])

  const changeLocale = async (newLocale: Locale) => {
  setLocale(newLocale)
  const newDict = await getDictionary(newLocale)
  setDict(newDict)
  window.localStorage.setItem('locale', newLocale)

  const langConfig = enabledLanguages.find(l => l.code === newLocale)
  if (langConfig) {
    document.documentElement.dir = langConfig.dir
    document.documentElement.lang = newLocale
  }
}


  return {
    locale,
    dict,
    isLoading,
    changeLocale,
    availableLanguages: enabledLanguages,
    currentLanguageConfig: enabledLanguages.find(l => l.code === locale),
  }
}
