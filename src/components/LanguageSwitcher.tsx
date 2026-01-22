// src/components/LanguageSwitcher.tsx

'use client'

import { useLocaleStore } from '@/lib/localeStore'
import { allLanguages } from '@/locales/i18n'  // ✅ استيراد صحيح

export default function LanguageSwitcher() {
  const { locale, setLocale } = useLocaleStore()

  return (
    <div className="flex gap-2">
      {allLanguages.map((lang) => (
        <button
          key={lang.code}
          onClick={() => setLocale(lang.code as any)}  // ✅ add type
          className={`px-3 py-2 rounded ${
            locale === lang.code ? 'bg-blue-500' : 'bg-gray-400'
          }`}
        >
          {lang.flag} {lang.name}
        </button>
      ))}
    </div>
  )
}
