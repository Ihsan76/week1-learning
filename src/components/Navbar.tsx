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
        { href: '/', label: 'الرئيسية' },
        { href: '/dashboard', label: 'لوحتي' },
        { href: '/admin', label: 'إدارة' },
        { href: '/settings', label: 'الإعدادات' },
      ]
    : [
        { href: '/', label: 'Home' },
        { href: '/login', label: 'Login' },
        { href: '/register', label: 'Register' },
      ];

  return (
    <nav className="navbar" dir="rtl">
      <div className="navbar-brand">
        <span>🚀</span>
        <Link href="/">Week1 Learning</Link>
      </div>
      <ul className="nav-links">
        {navItems.map((item) => (
          <li key={item.href}>
            <Link
              href={item.href}
              className={isActive(item.href) ? 'active' : ''}
            >
              {item.label}
            </Link>
          </li>
        ))}
        {isLoggedIn && (
          <li>
            <button
              onClick={handleLogout}
              className="btn btn-logout"
              style={{
                padding: '0.5rem 1rem',
                fontSize: '0.9rem',
                marginLeft: '1rem',
              }}
            >
              خروج
            </button>
          </li>
        )}
      </ul>
    </nav>
  );
}
