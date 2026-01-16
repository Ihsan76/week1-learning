'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/lib/store';
import { useLocaleStore } from '@/lib/localeStore';

export default function AdminPage() {
  const router = useRouter();
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn);
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
          {locale === 'ar' ? 'لوحة الإدارة' : 'Admin Panel'}
        </h1>
        <p className="text-slate-300 mb-8">
          {locale === 'ar' ? 'إدارة المنصة' : 'Manage the platform'}
        </p>

        {/* Admin Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-slate-800 p-6 rounded-lg border border-slate-700">
            <h3 className="text-slate-400 mb-2 text-sm uppercase">
              {locale === 'ar' ? 'عدد المستخدمين' : 'Total Users'}
            </h3>
            <p className="text-3xl font-bold text-white">1,234</p>
          </div>
          <div className="bg-slate-800 p-6 rounded-lg border border-slate-700">
            <h3 className="text-slate-400 mb-2 text-sm uppercase">
              {locale === 'ar' ? 'المتفاعلات' : 'Engagements'}
            </h3>
            <p className="text-3xl font-bold text-green-400">5,678</p>
          </div>
        </div>

        <p className="text-slate-400 mt-8 text-sm">
          {locale === 'ar' ? 'خيارات إدارية إضافية قادمة' : 'More admin options coming soon'}
        </p>
      </div>
    </div>
  );
}
