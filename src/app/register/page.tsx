'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/lib/store';
import { useLocaleStore } from '@/lib/localeStore';
import Link from 'next/link';
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
  const login = useAuthStore((state) => state.login);

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
      login(email);
      router.push('/login');
    } catch (err) {
      setError(t.auth.error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-900">
      <div className="bg-slate-800 p-8 rounded-lg shadow-lg w-full max-w-md">
        <h1 className="text-3xl font-bold text-white mb-6">{t.auth.register}</h1>
        {error && (
          <div className="bg-red-600 text-white p-3 rounded mb-4">
            {error}
          </div>
        )}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-white mb-2">{t.auth.email}</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="example@example.com"
              className="w-full p-3 rounded bg-slate-700 text-white placeholder-gray-400 border border-slate-600 focus:border-blue-600 outline-none"
            />
          </div>
          <div>
            <label className="block text-white mb-2">{t.auth.password}</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full p-3 rounded bg-slate-700 text-white placeholder-gray-400 border border-slate-600 focus:border-blue-600 outline-none"
            />
          </div>
          <div>
            <label className="block text-white mb-2">
              {t.auth.confirmPassword}
            </label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full p-3 rounded bg-slate-700 text-white placeholder-gray-400 border border-slate-600 focus:border-blue-600 outline-none"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded transition disabled:opacity-50"
          >
            {loading ? `${t.auth.error}...` : t.auth.submit}
          </button>
        </form>
        <div className="mt-4 text-center text-gray-300">
          <p>
            {t.auth.haveAccount}{' '}
            <Link href="/login" className="text-blue-400 hover:text-blue-300">
              {t.auth.signIn}
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
