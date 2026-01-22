// src/components/Navbar.tsx
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

interface AdminItem {
  href: string;
  label: { ar: string; en: string };
  icon?: string;
}

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn);
  const logout = useAuthStore((state) => state.logout);
  const locale = useLocaleStore((state) => state.locale);
  const toggleLocale = useLocaleStore((state) => state.toggleLocale);
  const [mounted, setMounted] = useState(false);
  const [showAdminDropdown, setShowAdminDropdown] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const isActive = (href: string) => pathname === href;

  const handleLogout = () => {
    logout();
    router.push('/login');
  };

  const translations = locale === 'ar' ? arTranslations : enTranslations;

  const navItemsLoggedIn: NavItem[] = [
    { href: '/', label: { ar: translations.nav.home, en: translations.nav.home } },
    { href: '/dashboard', label: { ar: translations.nav.dashboard, en: translations.nav.dashboard } },
    { href: '/settings', label: { ar: translations.nav.settings, en: translations.nav.settings } },
    { href: '/weeks', label: { ar: translations.nav.weeks, en: enTranslations.nav.weeks } },
    { href: '/resources', label: { ar: translations.nav.resources, en: enTranslations.nav.resources } },
  ];

  const adminItems: AdminItem[] = [
    { href: '/admin', label: { ar: 'لوحة التحكم', en: 'Dashboard' }, icon: '📊' },
    { href: '/admin/users', label: { ar: 'إدارة المستخدمين', en: 'Users Management' }, icon: '👥' },
    { href: '/admin/content', label: { ar: 'إدارة المحتوى', en: 'Content Management' }, icon: '📏' },
    { href: '/admin/settings', label: { ar: 'الإعدادات', en: 'Settings' }, icon: '⚙️' },
    { href: '/admin/reports', label: { ar: 'التقارير', en: 'Reports' }, icon: '📈' },
  ];

  const navItemsGuest: NavItem[] = [
    { href: '/', label: { ar: translations.nav.home, en: enTranslations.nav.home } },
    { href: '/weeks', label: { ar: arTranslations.nav.weeks, en: enTranslations.nav.weeks } },
    { href: '/resources', label: { ar: arTranslations.nav.resources, en: enTranslations.nav.resources } },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-slate-900 shadow-lg navbar">
      <div className="navbar-container">
        {/* Logo */}
        <Link href="/" className="navbar-logo">
          <span className="logo-icon">👋</span>
          <span className="logo-text">Week1 Learning</span>
        </Link>

        {/* Navigation Items */}
        <div className="nav-items">
          {isLoggedIn
            ? navItemsLoggedIn.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`nav-link ${isActive(item.href) ? 'active' : ''}`}
                >
                  {item.label[locale as 'ar' | 'en']}
                </Link>
              ))
            : navItemsGuest.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`nav-link ${isActive(item.href) ? 'active' : ''}`}
                >
                  {item.label[locale as 'ar' | 'en']}
                </Link>
              ))}

          {/* Admin Dropdown */}
          {isLoggedIn && (
            <div className="nav-dropdown-wrapper">
              <button
                className="nav-link2 admin-toggle"
                onClick={() => setShowAdminDropdown(!showAdminDropdown)}
              >
                {translations.nav.admin}
              </button>
              {showAdminDropdown && (
                <div className="nav-dropdown-menu">
                  {adminItems.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={`dropdown-item ${isActive(item.href) ? 'active' : ''}`}
                      onClick={() => setShowAdminDropdown(false)}
                    >
                      {item.icon && <span className="dropdown-icon">{item.icon}</span>}
                      <span>{item.label[locale as 'ar' | 'en']}</span>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Right Actions */}
        <div className="nav-actions">
          {isLoggedIn ? (
            <>
              <button onClick={handleLogout} className="btn-logout">
                {translations.nav.logout || 'Logout'}
              </button>
            </>
          ) : (
            <>
              <Link href="/login" className="btn-login">
                {locale === 'ar' ? 'تسجيل دخول' : 'Login'}
              </Link>
              <Link href="/register" className="btn-signup">
                {locale === 'ar' ? 'موافق' : 'Sign up'}
              </Link>
            </>
          )}
          <button onClick={toggleLocale} className="btn-language" aria-label="Toggle language">
            {locale === 'ar' ? '😄 EN' : '🌠 AR'}
          </button>
        </div>
      </div>
    </nav>
  );
}
