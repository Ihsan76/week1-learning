// src/hooks/useLocale.ts
'use client';

import { useEffect, useState } from 'react';
import {
  getDictionary,
  enabledLanguages,
  defaultLanguage,
  type Locale,
} from '@/locales/i18n';

export function useLocale() {
  const [locale, setLocale] = useState<Locale>(
    defaultLanguage.code as Locale
  );
  const [dict, setDict] = useState<any | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // تحديد اللغة الأولية مرة واحدة
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const saved = window.localStorage.getItem('locale') as Locale | null;
    const initial =
      saved && enabledLanguages.find((l) => l.code === saved)
        ? saved
        : (defaultLanguage.code as Locale);

    setLocale(initial);
  }, []);

  // في كل مرة تتغيّر فيها locale: حمّل القاموس وحدِّث اتجاه الصفحة
  useEffect(() => {
    if (!locale) return;

    let cancelled = false;

    const load = async () => {
      setIsLoading(true);
      const d = await getDictionary(locale);
      if (cancelled) return;
      setDict(d);
      setIsLoading(false);

      const langConfig = enabledLanguages.find((l) => l.code === locale);
      if (langConfig) {
        document.documentElement.dir = langConfig.dir;
        document.documentElement.lang = locale;
      }
    };

    load();

    return () => {
      cancelled = true;
    };
  }, [locale]);

  const changeLocale = (next: Locale) => {
    setLocale(next);
    if (typeof window !== 'undefined') {
      window.localStorage.setItem('locale', next);
    }
  };

  return {
    locale,
    dict,
    isLoading,
    changeLocale,
    availableLanguages: enabledLanguages,
    currentLanguageConfig: enabledLanguages.find((l) => l.code === locale),
  };
}
