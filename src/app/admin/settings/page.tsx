// src/app/admin/settings/page.tsx
'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

import { useAuthStore } from '@/lib/store';
import { useLocaleContext } from '@/context/LocaleContext';

interface SettingsForm {
  siteName: string;
  siteDescription: string;
  maintenanceMode: boolean;
  theme: 'light' | 'dark' | 'auto';
  defaultLanguage: string;
}

export default function SettingsPage() {
  const router = useRouter();

  const isLoggedIn = useAuthStore((state) => state.isLoggedIn);
  const { dict, isLoading } = useLocaleContext();

  // hooks لازم تكون دائمًا قبل أي return
  const [isMounted, setIsMounted] = useState(false);
  const [settings, setSettings] = useState<SettingsForm>({
    siteName: '',
    siteDescription: '',
    maintenanceMode: false,
    theme: 'auto',
    defaultLanguage: 'ar',
  });
  const [isSaving, setIsSaving] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (!isLoggedIn) router.push('/academy/login');
  }, [isLoggedIn, router]);

  // تعبئة الإعدادات بعد وصول dict (مرة/كل تغيير لغة)
  useEffect(() => {
    if (!dict) return;

    const content = dict.admin.settingsContent;

    setSettings((prev) => ({
      ...prev,
      siteName: content.siteName ?? prev.siteName,
      siteDescription: content.siteDescription ?? prev.siteDescription,
      theme: (content.theme as SettingsForm['theme']) ?? prev.theme,
      defaultLanguage: content.defaultLanguage ?? prev.defaultLanguage,
    }));
  }, [dict]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;
    const fieldValue =
      type === 'checkbox' ? (e.target as HTMLInputElement).checked : value;

    setSettings((prev) => ({
      ...prev,
      [name]: fieldValue,
    }));
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setSuccessMessage('Settings saved successfully!');
      setTimeout(() => setSuccessMessage(''), 3000);
    } finally {
      setIsSaving(false);
    }
  };

  // شروط العرض تأتي بعد تعريف كل hooks
  if (!isMounted) return null;
  if (!isLoggedIn) return null;
  if (isLoading || !dict) return null;

  const content = dict.admin.settingsContent;

  return (
    <div className="min-h-screen bg-slate-900 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">{content.title}</h1>
          <p className="text-slate-400">{content.description}</p>
        </div>

        {successMessage && (
          <div className="mb-6 p-4 bg-green-500/20 border border-green-500 rounded-lg text-green-400">
            ✓ {successMessage}
          </div>
        )}

        <div className="bg-slate-800 border border-slate-700 rounded-lg p-6 space-y-6">
          <div>
            <h2 className="text-xl font-semibold text-white mb-4">{content.class}</h2>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  {content.siteNameLabel}
                </label>
                <input
                  type="text"
                  name="siteName"
                  value={settings.siteName}
                  onChange={handleChange}
                  className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:outline-none focus:border-cyan-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  {content.siteDescriptionLabel}
                </label>
                <textarea
                  name="siteDescription"
                  value={settings.siteDescription}
                  onChange={handleChange}
                  rows={3}
                  className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:outline-none focus:border-cyan-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  {content.selectTheme}
                </label>
                <select
                  name="theme"
                  value={settings.theme}
                  onChange={handleChange}
                  className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:outline-none focus:border-cyan-500"
                >
                  <option value="light">{content.light}</option>
                  <option value="dark">{content.dark}</option>
                  <option value="auto">{content.auto}</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  {content.defaultLanguageLabel}
                </label>
                <select
                  name="defaultLanguage"
                  value={settings.defaultLanguage}
                  onChange={handleChange}
                  className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:outline-none focus:border-cyan-500"
                >
                  <option value="ar">العربية</option>
                  <option value="en">English</option>
                </select>
              </div>

              <div className="mt-6">
                <h3 className="text-lg font-bold mb-2">{content.langageTranslations}</h3>
                <p className="text-sm text-slate-400 mb-3">{content.manageLanguages}</p>

                <Link
                  href="/admin/languages"
                  className="btn-primary inline-block px-4 py-2"
                >
                  {content.manageLanguagesButton}
                </Link>
              </div>
            </div>
          </div>

          <div className="border-t border-slate-700 pt-6">
            <h2 className="text-xl font-semibold text-white mb-4">{content.security}</h2>
            <div className="flex items-center justify-between p-4 bg-slate-700/50 rounded-lg">
              <div>
                <p className="text-white font-medium">{content.maintenanceModeLabel}</p>
                <p className="text-sm text-slate-400">{content.maintenanceModeDescription}</p>
              </div>
              <input
                type="checkbox"
                name="maintenanceMode"
                checked={settings.maintenanceMode}
                onChange={handleChange}
                className="w-6 h-6 cursor-pointer"
              />
            </div>
          </div>
        </div>

        <div className="mt-8 flex gap-4 justify-end">
          <button
            onClick={handleSave}
            disabled={isSaving}
            className="px-6 py-2 bg-cyan-600 text-white rounded-lg hover:bg-cyan-700 transition disabled:opacity-50"
          >
            {content.isSaving }
          </button>
        </div>
      </div>
    </div>
  );
}
