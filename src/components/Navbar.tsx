// src/components/Navbar.tsx

'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useAuthStore } from '@/lib/store';
import { useState } from 'react';

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn);
  const logout = useAuthStore((state) => state.logout);

  const isActive = (href: string) => pathname === href;

  const handleLogout = () => {
    logout();
    router.push('/login');
  };

  const navItems = isLoggedIn
    ? [
        { href: '/', label: 'الرئيسية', icon: '🏠' },
        { href: '/dashboard', label: 'لوحتي', icon: '📊' },
        { href: '/admin', label: 'إدارة', icon: '⚙️' },
        { href: '/settings', label: 'الإعدادات', icon: '⚡' },
      ]
    : [
        { href: '/', label: 'الرئيسية', icon: '🏠' },
        { href: '/login', label: 'دخول', icon: '🔓' },
        { href: '/register', label: 'تسجيل', icon: '✍️' },
      ];

  return (
    <nav className="sticky top-0 z-50 bg-gradient-to-r from-slate-900/95 to-slate-800/95 backdrop-blur-xl border-b border-blue-500/20 shadow-2xl">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link 
            href="/" 
            className="flex items-center gap-3 group hover:opacity-80 transition-all"
          >
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center font-bold text-white shadow-lg group-hover:shadow-blue-500/50 transition-all">
              W1
            </div>
            <span className="text-2xl font-black text-white hidden sm:block">Week1</span>
          </Link>

          {/* Desktop Navigation */}
          <ul className="hidden lg:flex items-center gap-2">
            {navItems.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={`px-4 py-2 rounded-lg font-semibold transition-all flex items-center gap-2 ${
                    isActive(item.href)
                      ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/50'
                      : 'text-gray-300 hover:bg-slate-700 hover:text-white'
                  }`}
                >
                  <span>{item.icon}</span>
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>

          {/* Right side actions */}
          <div className="flex items-center gap-4">
            {isLoggedIn && (
              <button
                onClick={handleLogout}
                className="hidden sm:block px-6 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg font-semibold transition-all hover:shadow-lg hover:shadow-red-500/30"
              >
                🚪 خروج
              </button>
            )}
            
            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg hover:bg-slate-700 transition-all"
            >
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-slate-700 py-4 animate-fadeInDown">
            <div className="flex flex-col gap-2">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`px-4 py-3 rounded-lg font-semibold transition-all ${
                    isActive(item.href)
                      ? 'bg-blue-600 text-white'
                      : 'text-gray-300 hover:bg-slate-700'
                  }`}
                >
                  {item.icon} {item.label}
                </Link>
              ))}
              {isLoggedIn && (
                <button
                  onClick={handleLogout}
                  className="px-4 py-3 bg-red-600 text-white rounded-lg font-semibold hover:bg-red-700 transition-all text-right"
                >
                  🚪 خروج
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
