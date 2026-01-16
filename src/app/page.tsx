'use client';

import Link from 'next/link';
import { useAuthStore } from '@/lib/store';
import { useLocaleStore } from '@/lib/localeStore';
import { useEffect, useState } from 'react';

const getContent = (locale: string) => {
  if (locale === 'ar') {
    return {
      title: 'منصة تعليم الويب',
      subtitle: 'تعلم تطوير الويب بشكل احترافي',
      tech: 'التقنيات',
      features: 'المميزات',
      ready: 'جاهز للبدء؟',
      readyText: 'انضم إلينا الآن وابدأ رحلتك',
      cta: 'اذهب للداشبورد',
      copyright: 'جميع الحقوق محفوظة',
    };
  }
  return {
    title: 'Web Learning Platform',
    subtitle: 'Learn Web Development Professionally',
    tech: 'Technologies',
    features: 'Features',
    ready: 'Ready to Start?',
    readyText: 'Join us now',
    cta: 'Go to Dashboard',
    copyright: 'All Rights Reserved',
  };
};

export default function Home() {
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn);
  const locale = useLocaleStore((state) => state.locale);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const content = getContent(locale);

  return (
    <div className="container">
      {/* Hero */}
      <section className="hero-section">
        <div className="hero-content">
          <h1 className="hero-title">{content.title}</h1>
          <p className="hero-subtitle">{content.subtitle}</p>
        </div>
      </section>

      {/* Technologies */}
      <section className="section">
        <h2 className="section-title">{content.tech}</h2>
        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon">⚡</div>
            <h3 className="feature-title">Next.js</h3>
            <p className="section-subtitle">React Framework متطور</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">🐍</div>
            <h3 className="feature-title">Django</h3>
            <p className="section-subtitle">Python Web Framework</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">⚛️</div>
            <h3 className="feature-title">React</h3>
            <p className="section-subtitle">UI Library قوية</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">📘</div>
            <h3 className="feature-title">TypeScript</h3>
            <p className="section-subtitle">Type Safety</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">🔌</div>
            <h3 className="feature-title">APIs</h3>
            <p className="section-subtitle">RESTful Services</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">📦</div>
            <h3 className="feature-title">Zustand</h3>
            <p className="section-subtitle">State Management</p>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="section">
        <h2 className="section-title">{content.features} ⭐</h2>
        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon">🎯</div>
            <h3 className="feature-title">{locale === 'ar' ? 'دروس مبسطة' : 'Simple Lessons'}</h3>
            <p className="section-subtitle">{locale === 'ar' ? 'محتوى سهل الفهم' : 'Easy to understand'}</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">🚀</div>
            <h3 className="feature-title">{locale === 'ar' ? 'مشاريع عملية' : 'Projects'}</h3>
            <p className="section-subtitle">{locale === 'ar' ? 'تطبيق حقيقي' : 'Real projects'}</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">💡</div>
            <h3 className="feature-title">{locale === 'ar' ? 'أفضل المعايير' : 'Best Practices'}</h3>
            <p className="section-subtitle">{locale === 'ar' ? 'احترافية' : 'Professional'}</p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-cta">
        <h2 className="section-title">{content.ready}</h2>
        <p className="section-subtitle">{content.readyText}</p>
        {!isLoggedIn && (
          <Link href="/dashboard" className="btn-primary">
            {content.cta}
          </Link>
        )}
      </section>

      {/* Footer */}
      <footer className="footer">
        <p>© 2024 Week1 Learning - {content.copyright}</p>
      </footer>
    </div>
  );
}
