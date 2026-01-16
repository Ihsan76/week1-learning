'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useAuthStore } from '@/lib/store';
import { useLocaleStore } from '@/lib/localeStore';
import { useEffect, useState } from 'react';
import arTranslations from '@/locales/ar.json';
import enTranslations from '@/locales/en.json';

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

    const translations = locale === 'ar' ? arTranslations : enTranslations;

  const navItemsLoggedIn: NavItem[] = [
    { href: '/', label: { ar: translations.nav.home, en: enTranslations.nav.home } },
    { href: '/dashboard', label: { ar: translations.nav.dashboard, en: enTranslations.nav.dashboard } },
    { href: '/admin', label: { ar: translations.nav.admin, en: enTranslations.nav.admin } },
    { href: '/settings', label: { ar: translations.nav.settings, en: enTranslations.nav.settings } },
  ];

  const navItemsGuest: NavItem[] = [
    { href: '/', label: { ar: arTranslations.nav.home, en: enTranslations.nav.home } },
    { href: '/login', label: { ar: arTranslations.nav.login, en: enTranslations.nav.login } },
    { href: '/register', label: { ar: arTranslations.nav.register, en: enTranslations.nav.register } },
    { href: '/weeks', label: { ar: arTranslations.nav.weeks, en: enTranslations.nav.weeks } },
    { href: '/resources', label: { ar: arTranslations.nav.resources, en: enTranslations.nav.resources } },
  ];

  const navItems = isLoggedIn ? navItemsLoggedIn
    : navItemsGuest;

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
