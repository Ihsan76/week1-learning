// src/app/(marketing)/page.tsx
import Link from 'next/link';

export default function HomePage() {
  return (
    <main className="min-h-screen bg-slate-950 text-white flex items-center justify-center px-6">
      <div className="max-w-xl w-full space-y-6">
        <h1 className="text-4xl font-bold">آفاق</h1>
        <p className="text-slate-300">
          منصة آفاق للعلوم والتكنولوجيا — البداية هنا.
        </p>

        <div className="flex gap-3">
          <Link
            href="/academy"
            className="px-5 py-3 rounded-lg bg-white text-slate-900 font-semibold"
          >
            الدخول إلى الأكاديمية
          </Link>

          <Link
            href="/academy/register"
            className="px-5 py-3 rounded-lg border border-white/20 text-white"
          >
            إنشاء حساب
          </Link>
        </div>
      </div>
    </main>
  );
}
