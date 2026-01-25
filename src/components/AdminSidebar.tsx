// src/components/AdminSidebar.tsx

'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { useLocaleContext } from '@/context/LocaleContext';

interface SidebarItem {
  href: string;
  label: { ar: string; en: string };
  icon?: string;
}

export default function AdminSidebar() {
  const pathname = usePathname();
  const { dict, locale, isLoading } = useLocaleContext();

  if (isLoading || !dict) return null;
  const content = dict.admin;
  const isActive = (href: string) => pathname === href;

  return (
    <aside className="admin-sidebar">
      <div className="sidebar-header">
        <h3>{content.title}</h3>
      </div>
      <nav className="sidebar-nav">
        <ul className="sidebar-menu">
          {content.sideBarItems.map((item) => (
            <li key={item.href} className={isActive(item.href) ? 'active' : ''}>
              <Link href={item.href} className="sidebar-link">
                {item.icon && <span className="sidebar-icon">{item.icon}</span>}
                <span className="sidebar-label">{item.label}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
}
