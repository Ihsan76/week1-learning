// src/components/Navbar.tsx
'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useAuthStore } from '@/lib/store';
// import { useLocale } from '@/hooks/useLocale';
import { useLocaleContext } from '@/context/LocaleContext';


interface NavItem {
  href: string;
  labelKey: keyof typeof dict.nav; // سنضبطه بعد تعريف dict
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

  // const { locale, dict, isLoading, changeLocale } = useLocale();
  const { locale, dict, isLoading, changeLocale } = useLocaleContext();

  const [mounted, setMounted] = useState(false);
  const [showAdminDropdown, setShowAdminDropdown] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const [adminOpenMobile, setAdminOpenMobile] = useState(false);


  useEffect(() => {
    setMounted(true);
  }, []);


  useEffect(() => {
  setMobileOpen(false);
  setShowAdminDropdown(false);
  setAdminOpenMobile(false);
}, [pathname]);



  if (!mounted || isLoading || !dict) return null;

  const translations = dict.nav; // نستخدم قاموس nav من dict
  type NavKey = keyof typeof translations;

  const isActive = (href: string) => pathname === href;

  const handleLogout = () => {
    logout();
    router.push('/academy/login');
  };

  const navItemsLoggedIn: { href: string; key: NavKey }[] = [
    { href: '/', key: 'home' },
    { href: '/academy/dashboard', key: 'dashboard' },
    { href: '/settings', key: 'settings' },
    { href: '/weeks', key: 'weeks' },
    { href: '/resources', key: 'resources' },
  ];

  const navItemsGuest: { href: string; key: NavKey }[] = [
    { href: '/', key: 'home' },
    { href: '/weeks', key: 'weeks' },
    { href: '/resources', key: 'resources' },
    { href: '/academy/login', key: 'login' },
    { href: '/academy/register', key: 'register' },
  ];

  const adminItems: AdminItem[] = [
    { href: '/admin', label: { ar: 'لوحة التحكم', en: 'Dashboard' }, icon: '📊' },
    { href: '/admin/users', label: { ar: 'إدارة المستخدمين', en: 'Users Management' }, icon: '👥' },
    { href: '/admin/content', label: { ar: 'إدارة المحتوى', en: 'Content Management' }, icon: '📏' },
    { href: '/admin/settings', label: { ar: 'الإعدادات', en: 'Settings' }, icon: '⚙️' },
    { href: '/admin/reports', label: { ar: 'التقارير', en: 'Reports' }, icon: '📈' },
  ];

  const toggleLocale = () => {
    changeLocale(locale === 'ar' ? 'en' : 'ar');
  };

  return (
    <nav className="sticky top-0 z-50 bg-slate-900 shadow-lg navbar">
      <div className="navbar-container">
        {/* Logo */}
        <Link href="/" className="navbar-logo">
          <span className="logo-icon">👋</span>
          <span className="logo-text">Week1 Learning</span>
        </Link>
        <button
          type="button"
          className="nav-burger"
          aria-label="Toggle menu"
          aria-expanded={mobileOpen}
          onClick={() => setMobileOpen(v => !v)}
        >
          ☰
        </button>
        
        <div className={`nav-mobilePanel ${mobileOpen ? "is-open" : ""}`}>
          {/* Navigation Items */}
          <div className="nav-mobileHeader">
  <span className="nav-mobileTitle">
    {locale === "ar" ? "القائمة" : "Menu"}
  </span>
</div>

          <div className="nav-items">
            {isLoggedIn
              ? navItemsLoggedIn.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`nav-link ${isActive(item.href) ? 'active' : ''}`}
                >
                  {translations[item.key]}
                </Link>
              ))
              : navItemsGuest.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`nav-link ${isActive(item.href) ? 'active' : ''}`}
                >
                  {translations[item.key]}
                </Link>
              ))}

            {/* Admin Dropdown */}
            {isLoggedIn && (
  <div className="nav-admin">
    {/* Desktop dropdown button */}
    <button
      type="button"
      className="nav-link2 admin-toggle admin-desktopToggle"
      onClick={() => setShowAdminDropdown(v => !v)}
      aria-expanded={showAdminDropdown}
    >
      {translations.admin}
    </button>

    {showAdminDropdown && (
      <div className="nav-dropdown-menu admin-desktopMenu">
        {adminItems.map(item => (
          <Link
            key={item.href}
            href={item.href}
            className={`dropdown-item ${isActive(item.href) ? "active" : ""}`}
            onClick={() => setShowAdminDropdown(false)}
          >
            {item.icon && <span className="dropdown-icon">{item.icon}</span>}
            <span>{item.label[locale as "ar" | "en"]}</span>
          </Link>
        ))}
      </div>
    )}

    {/* Mobile accordion */}
    <button
      type="button"
      className="nav-link2 admin-toggle admin-mobileToggle"
      onClick={() => setAdminOpenMobile(v => !v)}
      aria-expanded={adminOpenMobile}
    >
      <span>{translations.admin}</span>
      <span className={`chev ${adminOpenMobile ? "is-open" : ""}`}>▾</span>
    </button>

    {adminOpenMobile && (
      <div className="admin-mobileMenu">
        {adminItems.map(item => (
          <Link
            key={item.href}
            href={item.href}
            className={`dropdown-item ${isActive(item.href) ? "active" : ""}`}
            onClick={() => {
              setAdminOpenMobile(false);
              setMobileOpen(false); // يغلق قائمة الموبايل بعد اختيار عنصر
            }}
          >
            {item.icon && <span className="dropdown-icon">{item.icon}</span>}
            <span>{item.label[locale as "ar" | "en"]}</span>
          </Link>
        ))}
      </div>
    )}
  </div>
)}

          </div>

          {/* Right Actions */}
          <div className="nav-actions">
            {isLoggedIn && (
              <button onClick={handleLogout} className="btn-logout">
                {translations.logout || 'Logout'}
              </button>
            )}
            <button onClick={toggleLocale} className="btn-language" aria-label="Toggle language">
              {locale === 'ar' ? '😄 EN' : '🌠 AR'}
            </button>
          </div>
        </div>
       
      </div>
      {mobileOpen && (
        <button
          type="button"
          className="nav-overlay"
          aria-label="Close menu"
          onClick={() => {
            setMobileOpen(false);
            setShowAdminDropdown(false);
          }}
        />
      )}

    </nav>
  );
}
