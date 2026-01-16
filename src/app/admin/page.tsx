'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/lib/store';
import { useLocaleStore } from '@/lib/localeStore';

const getContent = (locale: string) => {
  if (locale === 'ar') {
    return {
      admin: 'لوحة الإدارة',
      management: 'إدارة المنصة',
      users: 'عدد المستخدمين',
      courses: 'عدد الدروس',
      analytics: 'التحليلات',
      recentActivity: 'النشاط الأخير',
    };
  }
  return {
    admin: 'Admin Panel',
    management: 'Platform Management',
    users: 'Total Users',
    courses: 'Total Courses',
    analytics: 'Analytics',
    recentActivity: 'Recent Activity',
  };
};

export default function AdminPage() {
  const router = useRouter();
  const { isLoggedIn } = useAuthStore((state) => state);
  const { locale } = useLocaleStore((state) => state);
  const content = getContent(locale);

  useEffect(() => {
    if (!isLoggedIn) {
      router.push('/login');
    }
  }, [isLoggedIn, router]);

  const stats = [
    { label: content.users, value: '1,234', icon: '👥' },
    { label: content.courses, value: '45', icon: '🎥' },
    { label: content.analytics, value: '98.5%', icon: '📊' },
  ];

  return (
    <div className="min-h-screen bg-bg-dark pt-24 pb-12">
      <div className="container mx-auto px-4 md:px-8">
        {/* Page Title */}
        <div className="mb-12">
          <h1 className="hero-title mb-4">{content.admin}</h1>
          <p className="text-text-slate-400">{content.management}</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {stats.map((stat, idx) => (
            <div key={idx} className="bg-bg-darker border border-primary-dark rounded-lg p-8 text-center">
              <div className="text-4xl mb-4">{stat.icon}</div>
              <h3 className="section-title mb-2">{stat.value}</h3>
              <p className="text-text-secondary">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Recent Activity Section */}
        <div className="bg-bg-darker border border-primary-dark rounded-lg p-8">
          <h2 className="section-title mb-6">{content.recentActivity}</h2>
          <p className="text-text-secondary">Activity logs and system updates will be displayed here.</p>
        </div>
      </div>
    </div>
  );
}
