'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/lib/store';
import { useLocaleStore } from '@/lib/localeStore';
import { useLocaleContext } from '@/context/LocaleContext';



export default function SettingsPage() {
  const router = useRouter();
  const { user, logout: logoutUser } = useAuthStore();
  const [darkMode, setDarkMode] = useState(false);
  const { toggleLocale } = useLocaleStore();
  const { dict, locale, isLoading } = useLocaleContext();
  if (isLoading || !dict) return null;

  const t = dict.settings;

  const handleLogout = async () => {
    logoutUser();
    router.push('/');
  };

  return (
    <div className="min-h-screen bg-bg-dark pt-24 pb-12">
      <div className="container mx-auto px-4 md:px-8">
        {/* Page Title */}
        <div className="mb-12">
          <h1 className="hero-title mb-4">{t.title}</h1>
          <p className="text-text-slate-400">Manage your account and preferences</p>
        </div>

        {/* Settings Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Account Settings */}
            <div className="bg-bg-darker border border-primary-dark rounded-lg p-6">
              <h2 className="section-title mb-6">{t.account}</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-text-secondary text-sm font-medium mb-2">{t.email}</label>
                  <p className="text-text-primary font-medium">{user?.email}</p>
                </div>
              </div>
            </div>

            {/* Preferences */}
            <div className="bg-bg-darker border border-primary-dark rounded-lg p-6">
              <h2 className="section-title mb-6">{t.preferences}</h2>
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <span className="text-text-primary">{t.language}</span>
                  <button
                    onClick={toggleLocale}
                    className="btn-secondary px-4 py-2 text-sm"
                  >
                    {locale === 'ar' ? '🇺🇸 EN' : 'AR عر'}
                  </button>
                </div>
                <div className="border-t border-text-slate-700 pt-6 flex justify-between items-center">
                  <span className="text-text-primary">{t.darkMode}</span>
                  <input
                    type="checkbox"
                    checked={darkMode}
                    onChange={(e) => setDarkMode(e.target.checked)}
                    className="w-5 h-5 rounded cursor-pointer accent-primary"
                  />
                </div>
              </div>
            </div>

            {/* Privacy */}
            <div className="bg-bg-darker border border-primary-dark rounded-lg p-6">
              <h2 className="section-title mb-6">{t.privacy}</h2>
              <p className="text-text-secondary">{t.privacyText}</p>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 bg-bg-darker border border-primary-dark rounded-lg p-6 space-y-4">
              <button
                onClick={handleLogout}
                className="btn-logout w-full py-3 rounded-lg font-semibold transition-all"
              >
                {t.logout}
              </button>
              <div className="p-4 bg-bg-dark rounded-lg border border-text-slate-700">
                <p className="text-text-secondary text-sm text-center">v1.0 2024</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
