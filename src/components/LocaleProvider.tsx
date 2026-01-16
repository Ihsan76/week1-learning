'use client';

import { ReactNode } from 'react';
import { useLocaleStore } from '@/lib/localeStore';
import { useEffect, useState } from 'react';

export function LocaleProvider({ children }: { children: ReactNode }) {
  const [mounted, setMounted] = useState(false);
  const locale = useLocaleStore((state) => state.locale);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <>{children}</>;
  }

  return (
    <html lang={locale} dir={locale === 'ar' ? 'rtl' : 'ltr'}>
      {children}
    </html>
  );
}
