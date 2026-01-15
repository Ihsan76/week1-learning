// src/components/Navbar.tsx

'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useAuthStore } from '@/lib/store';

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn);
  const logout = useAuthStore((state) => state.logout);

  const isActive = (href: string) => pathname === href;

  const handleLogout = () => {
    logout();
    router.push('/login');
  };

  const navItems = isLoggedIn
    ? [
        { href: '/', label: 'Home' },
        { href: '/dashboard', label: 'Dashboard' },
        { href: '/settings', label: 'Settings' },
        { href: '/admin', label: 'Admin Dashboard' },

      ]
    : [
        { href: '/', label: 'Home' },
        { href: '/login', label: 'Login' },
        { href: '/register', label: 'Register' },
      ];

  return (
    <nav className="bg-slate-900 text-white shadow-lg border-b border-slate-700">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex justify-between items-center">
          <Link href="/" className="text-xl font-bold">Week1</Link>

          <ul className="flex gap-2 items-center">
            {navItems.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={`px-4 py-2 rounded transition-all ${
                    isActive(item.href)
                      ? 'bg-blue-600 text-white'
                      : 'text-gray-300 hover:bg-slate-700'
                  }`}
                >
                  {item.label}
                </Link>
              </li>
            ))}
            
            {isLoggedIn && (
              <li>
                <button
                  onClick={handleLogout}
                  className="ml-4 px-4 py-2 bg-red-600 hover:bg-red-700 rounded text-white transition-all"
                >
                  Logout
                </button>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}
