'use client';

import { useEffect } from 'react';
import { useLocaleStore } from '@/lib/localeStore';

export function LocaleSync() {
  const locale = useLocaleStore((state) => state.locale);

  useEffect(() => {
    // Update HTML element attributes when locale changes
    const htmlElement = document.documentElement;
    htmlElement.lang = locale;
    htmlElement.dir = locale === 'ar' ? 'rtl' : 'ltr';
    
    // Optional: Update document title locale info
    document.body.dir = locale === 'ar' ? 'rtl' : 'ltr';
  }, [locale]);

  return null;
}
