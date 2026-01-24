// src/app/admin/page.tsx

'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/lib/store';

import { useLocaleContext } from '@/context/LocaleContext';

export default function AdminPage() {
  const router = useRouter();
  const { isLoggedIn } = useAuthStore((state) => state);
  
  const { dict, locale, isLoading } = useLocaleContext();

  if (isLoading || !dict) return null;

  const content = dict.admin;

  const stats = [
    { label: content.users, value: '1,234', icon: '👥' },
    { label: content.courses, value: '45', icon: '🎥' },
    { label: content.analytics, value: '98.5%', icon: '📊' },
  ];

  return (
    <div className="admin-dashboard-inner">
      {/* Page Title */}
      <div className="mb-8">
        <h1 className="hero-title mb-3">{content.title}</h1>
        <p className="text-text-slate-400">{content.management}</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        {stats.map((stat, idx) => (
          <div
            key={idx}
            className="bg-bg-darker border border-primary-dark rounded-lg p-6 text-center"
          >
            <div className="text-4xl mb-3">{stat.icon}</div>
            <h3 className="section-title mb-1">{stat.value}</h3>
            <p className="text-text-secondary">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Recent Activity Section */}
      <div className="bg-bg-darker border border-primary-dark rounded-lg p-6">
        <h2 className="section-title mb-4">{content.recentActivity}</h2>
        <p className="text-text-secondary">
          {content.logs}
        </p>
      </div>
    </div>
  );
}
