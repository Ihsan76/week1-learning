// src/app/page.tsx

'use client';

import Link from 'next/link';
import { useAuthStore } from '@/lib/store';

export default function Home() {
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn);

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-800 p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-5xl font-bold text-white mb-4">مرحباً بك في Week1 Learning 🚀</h1>
          <p className="text-xl text-gray-300">رحلة التعلم من الصفر إلى Pro في Next.js</p>
        </div>

        {/* Main Content */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {/* What we learned */}
          <div className="bg-slate-700 p-6 rounded-lg">
            <h2 className="text-2xl font-bold text-white mb-4">ما تعلمنا:</h2>
            <ul className="text-gray-300 space-y-2">
              <li>✅ Next.js مع TypeScript</li>
              <li>✅ Routing و Navigation</li>
              <li>✅ State Management بـ Zustand</li>
              <li>✅ API Routes</li>
              <li>✅ Protected Pages</li>
              <li>✅ Form Validation</li>
            </ul>
          </div>

          {/* Stats */}
          <div className="bg-slate-700 p-6 rounded-lg">
            <h2 className="text-2xl font-bold text-white mb-4">الإحصائيات:</h2>
            <div className="space-y-3">
              <div className="flex justify-between text-gray-300">
                <span>أيام التعلم:</span>
                <span className="text-blue-400 font-bold">2/6</span>
              </div>
              <div className="flex justify-between text-gray-300">
                <span>صفحات مكتملة:</span>
                <span className="text-blue-400 font-bold">5</span>
              </div>
              <div className="flex justify-between text-gray-300">
                <span>API Endpoints:</span>
                <span className="text-blue-400 font-bold">1</span>
              </div>
            </div>
          </div>
        </div>

        {/* CTA */}
        {!isLoggedIn ? (
          <div className="bg-blue-600 p-8 rounded-lg text-center">
            <h2 className="text-2xl font-bold text-white mb-4">جاهز للبدء؟</h2>
            <p className="text-gray-100 mb-6">سجّل دخول واستكشف Dashboard</p>
            <Link 
              href="/login" 
              className="inline-block bg-white text-blue-600 px-8 py-3 rounded-lg font-bold hover:bg-gray-100 transition-all"
            >
              تسجيل الدخول
            </Link>
          </div>
        ) : (
          <div className="bg-green-600 p-8 rounded-lg text-center">
            <h2 className="text-2xl font-bold text-white mb-4">أنت مسجل دخول بنجاح! 🎉</h2>
            <p className="text-gray-100 mb-6">اذهب إلى Dashboard لمتابعة التعلم</p>
            <Link 
              href="/dashboard" 
              className="inline-block bg-white text-green-600 px-8 py-3 rounded-lg font-bold hover:bg-gray-100 transition-all"
            >
              الذهاب إلى Dashboard
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
