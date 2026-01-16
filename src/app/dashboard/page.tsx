'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/lib/store';
import { useLocaleStore } from '@/lib/localeStore';

export default function DashboardPage() {
  const router = useRouter();
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn);
  const user = useAuthStore((state) => state.user);
  const logout = useAuthStore((state) => state.logout);
  const locale = useLocaleStore((state) => state.locale);

  useEffect(() => {
    if (!isLoggedIn) {
      router.push('/login');
    }
  }, [isLoggedIn, router]);

  if (!isLoggedIn) {
    return (
      <div className="p-8 text-white">
        {locale === 'ar' ? 'جاري...' : 'Loading...'}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-900 p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-white mb-4">
          {locale === 'ar' ? 'لوحت التحكم' : 'Dashboard'}
        </h1>
        <p className="text-slate-300 mb-8">
          {locale === 'ar' ? 'مرحبا؋' : 'Welcome'}, {user?.email}!
        </p>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-slate-800 p-6 rounded-lg border border-slate-700">
            <h3 className="text-slate-400 mb-2 text-sm uppercase">
              {locale === 'ar' ? 'الدروس' : 'Courses'}
            </h3>
            <p className="text-3xl font-bold text-white">5</p>
          </div>
          <div className="bg-slate-800 p-6 rounded-lg border border-slate-700">
            <h3 className="text-slate-400 mb-2 text-sm uppercase">
              {locale === 'ar' ? 'المشاريع' : 'Projects'}
            </h3>
            <p className="text-3xl font-bold text-white">12</p>
          </div>
          <div className="bg-slate-800 p-6 rounded-lg border border-slate-700">
            <h3 className="text-slate-400 mb-2 text-sm uppercase">
              {locale === 'ar' ? 'التقدم' : 'Progress'}
            </h3>
            <p className="text-3xl font-bold text-cyan-400">75%</p>
          </div>
        </div>

        {/* Action Button */}
        <button
          onClick={() => {
            logout();
            router.push('/login');
          }}
          className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-6 rounded transition-colors"
        >
          {locale === 'ar' ? 'تسجيل الخروج' : 'Logout'}
        </button>
      </div>
    </div>
  );
}
