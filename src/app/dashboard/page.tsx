'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/lib/store';

export default function DashboardPage() {
  const router = useRouter();
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn);
  const user = useAuthStore((state) => state.user);
  const logout = useAuthStore((state) => state.logout);

  useEffect(() => {
    if (!isLoggedIn) {
      router.push('/login');
    }
  }, [isLoggedIn, router]);

  if (!isLoggedIn) {
    return <div className="p-8 text-white">جاري التحويل...</div>;
  }

  return (
    <div className="min-h-screen bg-slate-900 p-8">
      <div className="max-w-2xl">
        <h1 className="text-4xl font-bold text-white mb-6">مرحباً! 👋</h1>
        
        <div className="bg-slate-800 p-6 rounded-lg text-white mb-6">
          <p className="text-gray-300">البريد الإلكتروني:</p>
          <p className="text-2xl font-bold text-blue-400">{user?.email}</p>
        </div>

        <div className="bg-slate-800 p-6 rounded-lg">
          <p className="text-gray-300 mb-4">أنت الآن مسجل دخول بنجاح! ✅</p>
          <button
            onClick={() => {
              logout();
              router.push('/login');
            }}
            className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded transition-all"
          >
            تسجيل الخروج
          </button>
        </div>
      </div>
    </div>
  );
}
