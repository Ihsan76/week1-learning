// src/locales/i18n.ts
// import 'server-only'
import languagesConfig from '@/config/languages.json'

export type LanguageConfig = {
  code: string
  name: string
  nativeName: string
  dir: 'rtl' | 'ltr'  
  flag: string
  enabled: boolean
  isDefault: boolean
}

// ✅ أضف as const للـ JSON
export const allLanguages: LanguageConfig[] = languagesConfig as LanguageConfig[]
export const enabledLanguages = allLanguages.filter(l => l.enabled !== false)
export const defaultLanguage = allLanguages.find(l => l.isDefault) ?? allLanguages[0]

export type Locale = (typeof enabledLanguages)[number]['code']

// Dynamic import لملفات الترجمة
const dictionaries: Record<string, () => Promise<any>> = {}

// إنشء قاموس ديناميكي بناءً على اللغات المتاحة
enabledLanguages.forEach(lang => {
  dictionaries[lang.code] = () =>
    import(`./${lang.code}.json`).then(m => m.default).catch(() => ({}))
})

export async function getDictionary(locale: Locale | string) {
  const validLocale = enabledLanguages.find(l => l.code === locale)
  
  if (!validLocale) {
    return getDictionary(defaultLanguage.code as Locale)
  }

  if (dictionaries[locale]) {
    return dictionaries[locale]()
  }

  return {}
}

// دالة مساعدة للحصول على معلومات اللغة
export function getLanguageConfig(code: string): LanguageConfig | undefined {
  return allLanguages.find(lang => lang.code === code)
}

// تصدير مفاتيح الترجمة (للـ type-safe استخدام)
export type TranslationKeys = 'nav' | 'home' | 'dashboard' | 'admin' | 
  'settings' | 'logout' | 'login' | 'register' | 'users' | 'content' | 
  'languages' | 'weeks' | 'resources' | 'hero' | 'technologies' | 'features' | 'cta'
