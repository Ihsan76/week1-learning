'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useLocaleContext } from '@/context/LocaleContext';
import { useEffect, useState } from 'react';

export default function AdminSidebar() {
  const pathname = usePathname();
  const { dict, locale, isLoading } = useLocaleContext();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  if (isLoading || !dict) return null;

  const content = dict.admin;
  const isActive = (href: string) => pathname === href;

  return (
    <>
      <button
        type="button"
        className="sidebar-toggle"
        aria-expanded={open}
        onClick={() => setOpen(v => !v)}
      >
        ☰ {content.title}
      </button>

      {open && (
        <button
          type="button"
          className="sidebar-overlay"
          aria-label="Close sidebar"
          onClick={() => setOpen(false)}
        />
      )}

      <aside className={`admin-sidebar ${open ? 'is-open' : ''}`}>
        <div className="sidebar-header">
          <h3>{content.title}</h3>

          <button
            type="button"
            className="sidebar-close"
            onClick={() => setOpen(false)}
            aria-label="Close sidebar"
          >
            ×
          </button>
        </div>


        <nav className="sidebar-nav">
          <ul className="sidebar-menu">
            {content.sideBarItems.map((item) => (
              <li key={item.href} className={isActive(item.href) ? 'active' : ''}>
                <Link
                  href={item.href}
                  className="sidebar-link"
                  onClick={() => setOpen(false)}
                >
                  {item.icon && <span className="sidebar-icon">{item.icon}</span>}
                  <span className="sidebar-label">
                    {item.label}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </aside>
    </>
  );
}
