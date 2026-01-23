// src/hooks/useLocale.ts
'use client'

import { useEffect, useState } from 'react'
import { getDictionary, enabledLanguages, defaultLanguage, type Locale } from '@/locales/i18n'

export function useLocale() {
  const [locale, setLocale] = useState<Locale>(defaultLanguage.code as Locale)
  const [dict, setDict] = useState<any | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  // تحديد اللغة الأولية من localStorage مرة واحدة
  useEffect(() => {
    const saved = window.localStorage.getItem('locale') as Locale | null
    const initial = (saved && enabledLanguages.find(l => l.code === saved))
      ? saved
      : (defaultLanguage.code as Locale)

    setLocale(initial)
  }, [])

  // تحميل القاموس + تحديث اتجاه الصفحة في كل مرة تتغيّر فيها locale
  useEffect(() => {
    if (!locale) return

    setIsLoading(true)
    getDictionary(locale).then(d => {
      setDict(d)
      setIsLoading(false)
    })

    const langConfig = enabledLanguages.find(l => l.code === locale)
    if (langConfig) {
      document.documentElement.dir = langConfig.dir
      document.documentElement.lang = locale
    }
  }, [locale])

  const changeLocale = (newLocale: Locale) => {
    setLocale(newLocale)
    window.localStorage.setItem('locale', newLocale)
    // لا نحمّل القاموس هنا، الـ useEffect فوق سيهتم بذلك
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
