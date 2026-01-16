'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/lib/store';
import arTranslations from '@/locales/ar.json';
import enTranslations from '@/locales/en.json';

interface TranslationState {
  [languageCode: string]: Record<string, string>;
}

export default function LanguagesPage() {
  const router = useRouter();
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn);
  const [mounted, setMounted] = useState(false);
  const [languages, setLanguages] = useState<LanguageConfig[]>([]);
  const [translations, setTranslations] = useState<TranslationState>({});
  const [selectedLang, setSelectedLang] = useState<string | null>(null);
  const [newLanguageCode, setNewLanguageCode] = useState('');
  const [editingKey, setEditingKey] = useState<string | null>(null);
  const [editingValue, setEditingValue] = useState('');

  useEffect(() => {
    setMounted(true);
    if (!isLoggedIn) {
      router.push('/login');
    } else {
      // Load all languages and translations
      setLanguages(Object.values(SUPPORTED_LANGUAGES));
      loadTranslations();
    }
  }, [isLoggedIn, router]);

  const loadTranslations = () => {
    // Load translations from JSON files
    const translationsByLang: TranslationState = {
      ar: flattenObject(arTranslations),
      en: flattenObject(enTranslations),
    };
    setTranslations(translationsByLang);
  };

  // Flatten nested object to dot-notation keys
  const flattenObject = (obj: any, prefix = ''): Record<string, string> => {
    const flattened: Record<string, string> = {};
    for (const key in obj) {
      const value = obj[key];
      const newKey = prefix ? `${prefix}.${key}` : key;
      if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
        Object.assign(flattened, flattenObject(value, newKey));
      } else if (typeof value === 'string') {
        flattened[newKey] = value;
      }
    }
    return flattened;
  };

  const handleAddLanguage = () => {
    if (!newLanguageCode.trim()) return;
    
    const newLang: LanguageConfig = {
      code: newLanguageCode.toLowerCase(),
      name: newLanguageCode,
      direction: 'ltr',
      enabled: true,
      nativeName: newLanguageCode,
      englishName: newLanguageCode,
    };

    setLanguages([...languages, newLang]);
    setTranslations({
      ...translations,
      [newLanguageCode]: {},
    });
    setNewLanguageCode('');
    setSelectedLang(newLanguageCode);
  };

  const handleSaveTranslation = (langCode: string, key: string, value: string) => {
    setTranslations({
      ...translations,
      [langCode]: {
        ...translations[langCode],
        [key]: value,
      },
    });
  };

  const handleExportLanguage = (langCode: string) => {
    const langData = translations[langCode] || {};
    const jsonString = JSON.stringify(langData, null, 2);
    const blob = new Blob([jsonString], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${langCode}.json`;
    link.click();
    URL.revokeObjectURL(url);
  };

  if (!mounted || !isLoggedIn) {
    return <div className="container p-8">Loading...</div>;
  }

  return (
    <div className="container py-12">
      <section className="section">
        <h1 className="hero-title mb-4">🌍 Language Management</h1>
        <p className="hero-subtitle mb-8">Manage languages and translations for your application</p>

        {/* Add New Language Section */}
        <div className="feature-card mb-8">
          <h2 className="section-title mb-4">➕ Add New Language</h2>
          <div className="flex gap-4 mb-4">
            <input
              type="text"
              placeholder="Language code (e.g., fr, es, de)"
              value={newLanguageCode}
              onChange={(e) => setNewLanguageCode(e.target.value)}
              className="flex-1 px-4 py-2 rounded bg-slate-800 border border-slate-600 text-white"
            />
            <button
              onClick={handleAddLanguage}
              className="btn-primary px-6 py-2"
            >
              Add Language
            </button>
          </div>
        </div>

        {/* Languages List */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {languages.map((lang) => (
            <div
              key={lang.code}
              className={`feature-card cursor-pointer transition-all ${
                selectedLang === lang.code ? 'ring-2 ring-cyan-400' : ''
              }`}
              onClick={() => setSelectedLang(lang.code)}
            >
              <h3 className="text-xl font-bold mb-2">
                {lang.flag} {lang.nativeName}
              </h3>
              <p className="text-sm text-slate-400 mb-2">{lang.englishName}</p>
              <div className="flex items-center gap-2 text-sm text-slate-400">
                <span>Direction: {lang.direction.toUpperCase()}</span>
              </div>
              <div className="flex gap-2 mt-4">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleExportLanguage(lang.code);
                  }}
                  className="btn-primary text-xs px-3 py-1"
                >
                  Export
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedLang(lang.code);
                  }}
                  className="btn-primary text-xs px-3 py-1"
                >
                  Edit
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Translation Editor */}
        {selectedLang && (
          <div className="feature-card mt-8">
            <h2 className="section-title mb-6">
              Edit Translations - {selectedLang.toUpperCase()}
            </h2>
            <div className="space-y-4 max-h-96 overflow-y-auto">
              {TRANSLATION_KEYS.map((keyObj) => (
                <div key={keyObj.key} className="border border-slate-600 rounded p-4">
                  <label className="block text-sm font-semibold text-cyan-400 mb-2">
                    {keyObj.key}
                  </label>
                  <p className="text-xs text-slate-400 mb-3">{keyObj.description}</p>
                  <input
                    type="text"
                    value={translations[selectedLang]?.[keyObj.key] || ''}
                    onChange={(e) => handleSaveTranslation(selectedLang, keyObj.key, e.target.value)}
                    placeholder={`Enter translation for ${keyObj.key}`}
                    className="w-full px-4 py-2 rounded bg-slate-800 border border-slate-600 text-white placeholder-slate-500"
                  />
                </div>
              ))}
            </div>
            <button
              onClick={() => handleExportLanguage(selectedLang)}
              className="btn-primary mt-6 w-full"
            >
              💾 Export All Translations
            </button>
          </div>
        )}
      </section>
    </div>
  );
}
