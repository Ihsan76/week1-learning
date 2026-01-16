// Language Configuration System
// This file defines the language structure and metadata

export interface LanguageConfig {
  code: string;           // e.g., 'ar', 'en', 'fr'
  name: string;           // e.g., 'العربية', 'English'
  direction: 'ltr' | 'rtl'; // Layout direction
  enabled: boolean;       // Is this language active?
  flag?: string;          // Flag emoji or icon
  nativeName: string;     // Name in native language
  englishName: string;    // Name in English
}

export interface TranslationKey {
  key: string;
  section: string;        // e.g., 'nav', 'hero', 'course'
  description?: string;   // For admin notes
  requiresContext?: string; // e.g., 'plural', 'gender'
}

// Supported languages with metadata
export const SUPPORTED_LANGUAGES: Record<string, LanguageConfig> = {
  ar: {
    code: 'ar',
    name: 'العربية',
    direction: 'rtl',
    enabled: true,
    flag: '🇸🇦',
    nativeName: 'العربية',
    englishName: 'Arabic',
  },
  en: {
    code: 'en',
    name: 'English',
    direction: 'ltr',
    enabled: true,
    flag: '🇬🇧',
    nativeName: 'English',
    englishName: 'English',
  },
  // Future languages can be added here
  // fr: { ... }
};

// Translation key registry (auto-generated from locale files)
export const TRANSLATION_KEYS: TranslationKey[] = [
  // Navigation keys
  { key: 'nav.home', section: 'nav', description: 'Home page link' },
  { key: 'nav.dashboard', section: 'nav', description: 'Dashboard link' },
  { key: 'nav.admin', section: 'nav', description: 'Admin panel link' },
  { key: 'nav.settings', section: 'nav', description: 'Settings link' },
  { key: 'nav.logout', section: 'nav', description: 'Logout button' },
  { key: 'nav.login', section: 'nav', description: 'Login link' },
  { key: 'nav.register', section: 'nav', description: 'Register link' },
  { key: 'nav.weeks', section: 'nav', description: 'Weeks selector' },
  { key: 'nav.resources', section: 'nav', description: 'Resources page' },
  
  // Course keys
  { key: 'course.difficulty', section: 'course', description: 'Course difficulty level' },
  { key: 'course.duration', section: 'course', description: 'Course duration' },
  { key: 'course.startNow', section: 'course', description: 'Start course button' },
  { key: 'course.progress', section: 'course', description: 'Course progress' },
  
  // Add more as needed
];

// Helper to get language config
export function getLanguageConfig(code: string): LanguageConfig | null {
  return SUPPORTED_LANGUAGES[code] || null;
}

// Get all enabled languages
export function getEnabledLanguages(): LanguageConfig[] {
  return Object.values(SUPPORTED_LANGUAGES).filter(lang => lang.enabled);
}

// Check if language is RTL
export function isRTL(code: string): boolean {
  const lang = getLanguageConfig(code);
  return lang?.direction === 'rtl' ? true : false;
}
