// src/app/register/page.tsx
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuthStore } from '@/lib/store';
import { useLocaleStore } from '@/lib/localeStore';
import ar from '@/locales/ar.json';
import en from '@/locales/en.json';

const translations = { ar, en };

export default function RegisterPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const locale = useLocaleStore((state) => state.locale);
  const router = useRouter();

  // عدّل useAuthStore ليكون فيه setAuth(user, token) مثلاً
  const setAuth = useAuthStore((state) => state.setAuth);

  const t = translations[locale as keyof typeof translations] || translations.en;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    // Validation
    if (!email || !password || !confirmPassword) {
      setError(t.auth.error);
      setLoading(false);
      return;
    }

    if (password !== confirmPassword) {
      setError(t.auth.passwordMismatch);
      setLoading(false);
      return;
    }

    try {
      const response = await fetch(
        'https://week1-backend.onrender.com/api/auth/register/',
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, password }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || t.auth.error);
        return;
      }

      // نتوقع أن الباك إند يرجع user + token
      const { user, token } = data;

      if (!user || !token) {
        setError(t.auth.error);
        return;
      }

      // تخزين بيانات المستخدم/التوكن في Zustand
      setAuth(user, token);

      // بعد التسجيل الناجح، وجّهه مباشرة للـ Dashboard
      router.push('/dashboard');
    } catch (err) {
      setError(t.auth.error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        <div className="bg-white/10 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/20 p-8 space-y-6">
          {/* Header */}
          <div className="text-center space-y-3">
            <div className="inline-block p-3 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-lg">
              {/* يمكن حذف الأيقونة هنا إن أردت */}
            </div>
            <h1 className="text-3xl font-bold text-white">{t.auth.register}</h1>
            <p className="text-gray-300 text-sm">
              {t.auth.haveAccount}{' '}
              <a href="/login" className="text-emerald-400 hover:text-emerald-300 font-semibold transition-colors">
                {t.auth.signIn}
              </a>
            </p>
          </div>

          {/* Error Message */}
          {error && (
            <div className="bg-red-500/20 border border-red-500/50 rounded-lg p-4 flex items-start gap-3 animate-pulse">
              <p className="text-red-200 text-sm">{error}</p>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Email Field */}
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-200">
                {t.auth.email}
              </label>
              <div className="relative">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@example.com"
                  required
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-200">
                {t.auth.password}
              </label>
              <div className="relative">
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
                />
              </div>
            </div>

            {/* Confirm Password Field */}
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-200">
                {t.auth.confirmPassword}
              </label>
              <div className="relative">
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
                />
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 px-4 bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-semibold rounded-lg hover:from-emerald-600 hover:to-teal-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 focus:ring-offset-slate-900 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 transform hover:scale-105 active:scale-95 mt-6"
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  جاري التسجيل...
                </span>
              ) : (
                t.auth.submit
              )}
            </button>
          </form>

          {/* Divider + Footer كما هي عندك */}
        </div>

        <p className="text-center text-gray-400 text-xs mt-6">
          🐓 {locale === 'ar' ? 'كلمة مرورك آمنة 100%' : 'Your password is 100% secure'}
        </p>
      </div>
    </div>
  );
}
