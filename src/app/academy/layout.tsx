// src/app/academy/layout.tsx
import type { ReactNode } from 'react';
import Link from 'next/link';

export default function AcademyLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <header className="border-b border-white/10">
        <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/academy" className="font-bold">
            آفاق | Academy
          </Link>
          <nav className="flex gap-4 text-sm text-slate-300">
            <Link href="/academy/login" className="hover:text-white">
              دخول
            </Link>
            <Link href="/academy/register" className="hover:text-white">
              حساب جديد
            </Link>
          </nav>
        </div>
      </header>

      <main>{children}</main>
    </div>
  );
}
