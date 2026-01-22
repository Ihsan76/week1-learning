// src/lib/languages.ts


export type LanguageType = 'ar' | 'en'

export interface LanguageConfig {
  code: LanguageType
  name: string
  nativeName: string
  dir: 'rtl' | 'ltr'
  flag?: string
  enabled: boolean
  isDefault?: boolean
}

export const LANGUAGES_CONFIG: LanguageConfig[] = [
  {
    code: 'ar',
    name: 'Arabic',
    nativeName: 'العربية',
    dir: 'rtl',
    flag: '🇸🇦',
    enabled: true,
    isDefault: true,
  },
  {
    code: 'en',
    name: 'English',
    nativeName: 'English',
    dir: 'ltr',
    flag: '🇺🇸',
    enabled: true,
    isDefault: false,
  },
]

export const ENABLED_LANGUAGES = LANGUAGES_CONFIG.filter(l => l.enabled)
export const DEFAULT_LANGUAGE = LANGUAGES_CONFIG.find(l => l.isDefault) || LANGUAGES_CONFIG[0]

// ✅ استخدم LANGUAGES_CONFIG بدل languages
export const getLanguages = () => LANGUAGES_CONFIG
export const getLanguage = (code: string) => LANGUAGES_CONFIG.find(l => l.code === code)

export function getLanguageConfig(code: string): LanguageConfig | undefined {
  return LANGUAGES_CONFIG.find(lang => lang.code === code)
}

export const TRANSLATION_KEYS = {
  nav: 'nav',
  home: 'home',
  dashboard: 'dashboard',
  admin: 'admin',
  settings: 'settings',
  logout: 'logout',
  login: 'login',
  register: 'register',
  users: 'users',
  content: 'content',
  languages: 'languages',
  weeks: 'weeks',
  resources: 'resources',
  hero: 'hero',
  technologies: 'technologies',
  features: 'features',
  cta: 'cta',
} as const
