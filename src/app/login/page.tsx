// src/app/login/page.tsx
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/lib/store';
import { useLocaleStore } from '@/lib/localeStore';
import ar from '@/locales/ar.json';
import en from '@/locales/en.json';

const translations = { ar, en };

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const locale = useLocaleStore((state) => state.locale);
  const router = useRouter();

  // من الـ store الجديد: يخزن user + token
  const setAuth = useAuthStore((state) => state.setAuth);

  const t = translations[locale as keyof typeof translations] || translations.en;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await fetch(
        'https://week1-backend.onrender.com/api/auth/login/',
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

      // نتوقع من الباك إند: { user: {...}, token: "..." }
      const { user, token } = data;

      if (!user || !token) {
        setError(t.auth.error);
        return;
      }

      // تخزين بيانات المستخدم/التوكن
      setAuth(user, token);

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
        {/* Card Container */}
        <div className="bg-white/10 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/20 p-8 space-y-6">
          {/* Header */}
          <div className="text-center space-y-3">
            <div className="inline-block p-3 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg">
              {/* تركتها فارغة بدون أيقونة */}
            </div>
            <h1 className="text-3xl font-bold text-white">{t.auth.signIn}</h1>
            <p className="text-gray-300 text-sm">
              {t.auth.noAccount}{' '}
              <a
                href="/register"
                className="text-blue-400 hover:text-blue-300 font-semibold transition-colors"
              >
                {t.auth.signUp}
              </a>
            </p>
          </div>

          {/* Error Message */}
          {error && (
            <div className="bg-red-500/20 border border-red-500/50 rounded-lg p-4 flex items-start gap-3">
              <p className="text-red-200 text-sm">{error}</p>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
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
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
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
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                />
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 px-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold rounded-lg hover:from-blue-600 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-slate-900 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 transform hover:scale-105 active:scale-95"
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  جاري الدخول...
                </span>
              ) : (
                t.auth.signIn
              )}
            </button>
          </form>

          {/* Divider */}
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-white/10"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-gray-400">
                {locale === 'ar' ? 'أو' : 'OR'}
              </span>
            </div>
          </div>

          {/* Footer */}
          <p className="text-center text-gray-400 text-sm">
            {locale === 'ar' ? 'ليس لديك حساب؟' : 'New to Week1 Learning?'}{' '}
            <a
              href="/register"
              className="text-blue-400 hover:text-blue-300 font-semibold transition-colors"
            >
              {t.auth.signUp}
            </a>
          </p>
        </div>

        {/* Bottom Info */}
        <p className="text-center text-gray-400 text-xs mt-6">
          🔒 {locale === 'ar' ? 'بيانات آمنة محمية بـ SSL' : 'Your data is secure'}
        </p>
      </div>
    </div>
  );
}
