// src/components/LanguageSwitcher.tsx
'use client'

import { useLocaleStore } from '@/lib/localeStore'
import { ENABLED_LANGUAGES, type LanguageType } from '@/lib/languages'

export function LanguageSwitcher() {
  const { locale, setLocale } = useLocaleStore()

  return (
    <div className="flex gap-2 items-center">
      {ENABLED_LANGUAGES.map(lang => (
        <button
          key={lang.code}
          onClick={() => setLocale(lang.code as LanguageType)}
          className={`px-3 py-1 rounded transition-all text-sm font-medium ${
            locale === lang.code
              ? 'bg-blue-500 text-white shadow-md'
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`}
          title={lang.nativeName}
        >
          <span className="mr-1">{lang.flag}</span>
          {lang.code.toUpperCase()}
        </button>
      ))}
    </div>
  )
}
