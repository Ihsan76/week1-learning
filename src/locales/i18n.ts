// src/locales/i18n.ts
import ar from './ar.json';
import en from './en.json';

type LanguageType = 'ar' | 'en';

const locales = {
  ar,
  en,
};

interface TranslationKey {
  [key: string]: string | TranslationKey;
}

const getNestedValue = (obj: TranslationKey, path: string): string => {
  const keys = path.split('.');
  let value: any = obj;
  
  for (const key of keys) {
    if (value && typeof value === 'object' && key in value) {
      value = value[key];
    } else {
      return path; // Return key if translation not found
    }
  }
  
  return typeof value === 'string' ? value : path;
};

export const useTranslation = (lang: LanguageType = 'ar') => {
  const locale = locales[lang];
  
  return {
    t: (key: string): string => getNestedValue(locale as TranslationKey, key),
    locale: lang,
    locales: Object.keys(locales) as LanguageType[],
  };
};

export const getLanguages = () => ([
  { code: 'ar', name: 'العربية', flag: '🇪🇦' },
  { code: 'en', name: 'English', flag: '🇺🇸' },
] as const);

export type { LanguageType };
