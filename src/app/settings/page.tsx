'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/lib/store';
import { useLocaleStore } from '@/lib/localeStore';

const getContent = (locale: string) => {
  if (locale === 'ar') {
    return {
      settings: 'الإعدادات',
      account: 'حساب المستخدم',
      email: 'البريد الإلكتروني',
      language: 'اللغة',
      notifications: 'الإخطارات',
      privacy: 'الخصوصية',
      theme: 'مسودة الالوان',
      darkMode: 'وضع مظلم',
      save: 'حفظ',
      logout: 'تسجيل الخروج',
    };
  }
  return {
    settings: 'Settings',
    account: 'Account',
    email: 'Email',
    language: 'Language',
    notifications: 'Notifications',
    privacy: 'Privacy',
    theme: 'Theme',
    darkMode: 'Dark Mode',
    save: 'Save',
    logout: 'Logout',
  };
};

export default function SettingsPage() {
  const router = useRouter();
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn);
  const user = useAuthStore((state) => state.user);
  const logout = useAuthStore((state) => state.logout);
  const locale = useLocaleStore((state) => state.locale);
  const toggleLocale = useLocaleStore((state) => state.toggleLocale);
  const [mounted, setMounted] = useState(false);
  const [darkMode, setDarkMode] = useState(true);

  useEffect(() => {
    setMounted(true);
    if (!isLoggedIn) {
      router.push('/login');
    }
  }, [isLoggedIn, router]);

  if (!mounted || !isLoggedIn) {
    return <div className="p-8">{locale === 'ar' ? 'جاري...' : 'Loading...'}</div>;
  }

  const content = getContent(locale);

  const handleLogout = () => {
    logout();
    router.push('/login');
  };

  return (
    <div className="container p-8">
      <h1 className="text-4xl font-bold text-white mb-8">{content.settings}</h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Account Settings */}
        <div className="bg-slate-800 rounded-lg p-6 border border-slate-700">
          <h2 className="text-2xl font-bold text-white mb-4">{content.account}</h2>
          <div className="space-y-4">
            <div>
              <label className="text-slate-400 text-sm">{content.email}</label>
              <p className="text-white font-semibold mt-1">{user?.email}</p>
            </div>
          </div>
        </div>

        {/* Preferences */}
        <div className="bg-slate-800 rounded-lg p-6 border border-slate-700">
          <h2 className="text-2xl font-bold text-white mb-4">{content.privacy}</h2>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-slate-400">{content.language}</span>
              <button
                onClick={toggleLocale}
                className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white font-semibold py-2 px-4 rounded transition-all"
              >
                {locale === 'ar' ? '🇪🇸 EN' : '🇸🇦 AR'}
              </button>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-slate-400">{content.darkMode}</span>
              <input
                type="checkbox"
                checked={darkMode}
                onChange={(e) => setDarkMode(e.target.checked)}
                className="w-5 h-5"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Logout Button */}
      <div className="mt-8 flex gap-4">
        <button className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white font-bold py-2 px-6 rounded transition-all">
          {content.save}
        </button>
        <button
          onClick={handleLogout}
          className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-6 rounded transition-colors"
        >
          {content.logout}
        </button>
      </div>
    </div>
  );
}
