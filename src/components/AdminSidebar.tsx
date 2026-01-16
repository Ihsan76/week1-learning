'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useLocaleStore } from '@/lib/localeStore';
import arTranslations from '@/locales/ar.json';
import enTranslations from '@/locales/en.json';

interface SidebarItem {
  href: string;
  label: { ar: string; en: string };
  icon?: string;
}

export default function AdminSidebar() {
  const pathname = usePathname();
  const locale = useLocaleStore((state) => state.locale);
  const translations = locale === 'ar' ? arTranslations : enTranslations;

  const sidebarItems: SidebarItem[] = [
    {
      href: '/admin',
label: { ar: '📊 لوحة التحكم الإدارية', en: 'Admin Dashboard' }      icon: '📊',
    },
    {
      href: '/admin/users',
      label: { ar: 'إدارة المستخدمين', en: 'Users Management' },
      icon: '👥',
    },
    {
      href: '/admin/settings',
label: { ar: '⚙️ إعدادات النظام', en: 'System Settings' }      icon: '⚙️',
    },
    {
      href: '/admin/content',
      label: { ar: 'إدارة المحتوى', en: 'Content Management' },
      icon: '📝',
    },
    {
      href: '/admin/reports',
      label: { ar: 'التقارير', en: 'Reports' },
      icon: '📈',
    },
  ];

  const isActive = (href: string) => pathname === href;

  return (
    <aside className="admin-sidebar">
      <div className="sidebar-header">
        <h3>{translations.nav.admin}</h3>
      </div>
      <nav className="sidebar-nav">
        <ul className="sidebar-menu">
          {sidebarItems.map((item) => (
            <li key={item.href} className={isActive(item.href) ? 'active' : ''}>
              <Link href={item.href} className="sidebar-link">
                {item.icon && <span className="sidebar-icon">{item.icon}</span>}
                <span className="sidebar-label">{item.label[locale as 'ar' | 'en']}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
}
