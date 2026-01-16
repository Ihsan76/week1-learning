'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useAuthStore } from '@/lib/store';
import { useLocaleStore } from '@/lib/localeStore';
import { useEffect, useState } from 'react';

interface NavItem {
  href: string;
  label: { ar: string; en: string };
}

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn);
  const logout = useAuthStore((state) => state.logout);
  const locale = useLocaleStore((state) => state.locale);
  const toggleLocale = useLocaleStore((state) => state.toggleLocale);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const isActive = (href: string) => pathname === href;

  const handleLogout = () => {
    logout();
    router.push('/login');
  };

  const navItemsLoggedIn: NavItem[] = [
    { href: '/', label: { ar: 'الرئيسية', en: 'Home' } },
    { href: '/dashboard', label: { ar: 'لوحتي', en: 'Dashboard' } },
    { href: '/admin', label: { ar: 'إدارة', en: 'Admin' } },
    { href: '/settings', label: { ar: 'الإعدادات', en: 'Settings' } },
  ];

  const navItemsGuest: NavItem[] = [
    { href: '/', label: { ar: 'الرئيسية', en: 'Home' } },
    { href: '/login', label: { ar: 'دخول', en: 'Login' } },
    { href: '/register', label: { ar: 'تسجيل', en: 'Register' } },
      { href: '/weeks', label: { ar: 'الأسابيع', en: 'Weeks' } },
  { href: '/resources', label: { ar: 'الموارد', en: 'Resources' } },
  ];

  const navItems = isLoggedIn ? navItemsLoggedIn : navItemsGuest;

  if (!mounted) return null;

  return (
    <nav className="navbar" dir={locale === 'ar' ? 'rtl' : 'ltr'}>
      <div className="navbar-brand">
        <span>🔨</span>
        <Link href="/">Week1 Learning</Link>
      </div>
      <ul className="nav-links">
        {navItems.map((item) => (
          <li key={item.href}>
            <Link
              href={item.href}
              className={isActive(item.href) ? 'active' : ''}
            >
              {item.label[locale]}
            </Link>
          </li>
        ))}
      </ul>
      {isLoggedIn && (
        <li>
          <button
            onClick={handleLogout}
            className="btn-logout"
          >
            {locale === 'ar' ? 'خروج' : 'Logout'}
          </button>
        </li>
      )}
      <button
        onClick={toggleLocale}
        className="btn-language"
        aria-label={`Switch to ${locale === 'ar' ? 'English' : 'Arabic'}`}
      >
        {locale === 'ar' ? '🇪🇸 EN' : '🇸🇦 AR'}
      </button>
    </nav>
  );
}
