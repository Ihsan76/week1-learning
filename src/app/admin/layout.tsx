'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/lib/store';
import Link from 'next/link';

const ADMIN_MENU_ITEMS = [
  {
    name: 'ar',
    label: 'لوحة التحكم',
    href: '/admin',
    icon: '📄',
  },
  {
    name: 'users',
    label: 'إدارة المستخدمين',
    href: '/admin/users',
    icon: '👥',
  },
  {
    name: 'content',
    label: 'إدارة المحتوى',
    href: '/admin/content',
    icon: '📄',
  },
  {
    name: 'settings',
    label: 'الإعدادات',
    href: '/admin/settings',
    icon: '⚙️',
  },
  {
    name: 'reports',
    label: 'التقارير',
    href: '/admin/reports',
    icon: '📈',
  },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const { isLoggedIn } = useAuthStore((state) => state);
  const [isMounted, setIsMounted] = useState(false);
  const [activeMenu, setActiveMenu] = useState('dashboard');

  useEffect(() => {
    setIsMounted(true);
    if (!isLoggedIn) {
      router.push('/login');
    }
  }, [isLoggedIn, router]);

  if (!isMounted) return null;

  return (
    <div className="flex min-h-screen bg-slate-900">
      {/* Sidebar */}
      <aside className="w-64 bg-slate-800 border-r border-slate-700 p-6">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-white mb-2">킡لوحة البيانات</h2>
          <p className="text-sm text-slate-400">Admin Panel</p>
        </div>

        <nav className="space-y-2">
          {ADMIN_MENU_ITEMS.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              onClick={() => setActiveMenu(item.name)}
              className={`block px-4 py-3 rounded-lg transition ${
                activeMenu === item.name
                  ? 'bg-cyan-600 text-white'
                  : 'text-slate-300 hover:bg-slate-700 hover:text-white'
              }`}
            >
              <span className="mr-3">{item.icon}</span>
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="mt-8 pt-6 border-t border-slate-700">
          <button className="w-full px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition">
            تسجيل الخروج
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1">{children}</main>
    </div>
  );
}
