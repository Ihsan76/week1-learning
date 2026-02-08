// src/app/academy/page.tsx
import Link from 'next/link';

export default function AcademyHomePage() {
  return (
    <main className="min-h-screen bg-slate-950 text-white px-6 py-10">
      <div className="max-w-5xl mx-auto space-y-6">
        <h1 className="text-3xl font-bold">الأكاديمية</h1>
        <p className="text-slate-300">ابدأ التعلم أو ادخل للوحة التحكم.</p>

        <div className="flex gap-3">
          <Link href="/academy/login" className="px-5 py-3 rounded-lg bg-white text-slate-900 font-semibold">
            تسجيل الدخول
          </Link>
          <Link href="/academy/dashboard" className="px-5 py-3 rounded-lg border border-white/20">
            لوحة التحكم
          </Link>
        </div>
      </div>
    </main>
  );
}
