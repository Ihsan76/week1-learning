// src/components/LanguageSwitcher.tsx

'use client';

import { useLocale } from '@/hooks/useLocale';
import { enabledLanguages } from '@/locales/i18n';

export default function LanguageSwitcher() {
  const { locale, changeLocale } = useLocale();

  return (
    <div className="flex gap-2">
      {enabledLanguages.map((lang) => (
        <button
          key={lang.code}
          onClick={() => changeLocale(lang.code as any)}
          className={`px-3 py-2 rounded ${
            locale === lang.code ? 'bg-blue-500' : 'bg-gray-400'
          }`}
        >
          {lang.flag} {lang.name}
        </button>
      ))}
    </div>
  );
}
