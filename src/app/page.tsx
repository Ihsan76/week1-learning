// src/app/page.tsx

'use client';

import Link from 'next/link';
import { useAuthStore } from '@/lib/store';
import { useLocaleStore } from '@/lib/localeStore';
import { useEffect, useState } from 'react';

interface Technology {
  title: string;
  icon: string;
  description: string;
  color: string;
}

interface Content {
  title: string;
  subtitle: string;
  technologies: Technology[];
  features: Array<{ icon: string; title: string; description: string }>;
  cta: {
    text: string;
    href: string;
  };
}

const arContent: Content = {
  title: 'منصة تعليم الويب',
  subtitle: 'تعلم تطوير الويب بشكل احترافي',
  technologies: [
    {
      title: 'Next.js',
      icon: '⚡',
      description: 'React Framework متطور',
      color: '#000000',
    },
    {
      title: 'Django',
      icon: '🐍',
      description: 'Python Web Framework',
      color: '#092E20',
    },
    {
      title: 'React',
      icon: '⚛️',
      description: 'UI Library قوية',
      color: '#61dafb',
    },
    {
      title: 'TypeScript',
      icon: '📘',
      description: 'Type Safety',
      color: '#2f74c0',
    },
    {
      title: 'APIs',
      icon: '🔌',
      description: 'RESTful Services',
      color: '#ff6b6b',
    },
    {
      title: 'Zustand',
      icon: '📦',
      description: 'State Management',
      color: '#8b5cf6',
    },
  ],
  features: [
    {
      icon: '🎯',
      title: 'دروس مبسطة',
      description: 'محتوى تعليمي سهل الفهم والتطبيق',
    },
    {
      icon: '🚀',
      title: 'مشاريع عملية',
      description: 'تطبيق ما تتعلمه في مشاريع حقيقية',
    },
    {
      icon: '💡',
      title: 'أفضل الممارسات',
      description: 'تعلم أفضل الممارسات في التطوير',
    },
  ],
  cta: {
    text: 'اذهب للداشبورد',
    href: '/dashboard',
  },
};

const enContent: Content = {
  title: 'Web Learning Platform',
  subtitle: 'Learn Web Development Professionally',
  technologies: [
    {
      title: 'Next.js',
      icon: '⚡',
      description: 'Advanced React Framework',
      color: '#000000',
    },
    {
      title: 'Django',
      icon: '🐍',
      description: 'Python Web Framework',
      color: '#092E20',
    },
    {
      title: 'React',
      icon: '⚛️',
      description: 'Powerful UI Library',
      color: '#61dafb',
    },
    {
      title: 'TypeScript',
      icon: '📘',
      description: 'Type Safety',
      color: '#2f74c0',
    },
    {
      title: 'APIs',
      icon: '🔌',
      description: 'RESTful Services',
      color: '#ff6b6b',
    },
    {
      title: 'Zustand',
      icon: '📦',
      description: 'State Management',
      color: '#8b5cf6',
    },
  ],
  features: [
    {
      icon: '🎯',
      title: 'Simplified Lessons',
      description: 'Easy to understand educational content',
    },
    {
      icon: '🚀',
      title: 'Practical Projects',
      description: 'Apply what you learn in real projects',
    },
    {
      icon: '💡',
      title: 'Best Practices',
      description: 'Learn industry-standard development practices',
    },
  ],
  cta: {
    text: 'Go to Dashboard',
    href: '/dashboard',
  },
};

export default function Home() {
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn);
  const locale = useLocaleStore((state) => state.locale);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const content = locale === 'ar' ? arContent : enContent;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="max-w-6xl mx-auto px-4 py-20 text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
            {content.title}
          </h1>
          <p className="text-xl md:text-2xl text-slate-300 mb-8">{content.subtitle}</p>
          {!isLoggedIn ? (
            <Link
              href={content.cta.href}
              className="inline-block bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 px-8 py-3 rounded-lg font-semibold text-white transition-all duration-300 transform hover:scale-105"
            >
              {content.cta.text}
            </Link>
          ) : null}
        </div>
      </section>

      {/* Technologies Section */}
      <section className="technologies-section py-16 bg-slate-800/50">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-4 text-white">
            {locale === 'ar' ? 'التقنيات المستخدمة' : 'Technologies'}
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
            {content.technologies.map((tech) => (
              <div
                key={tech.title}
                className="bg-slate-700/50 backdrop-blur rounded-lg p-6 border border-slate-600 hover:border-cyan-500 transition-colors duration-300"
              >
                <div className="text-4xl mb-3">{tech.icon}</div>
                <h3 className="text-xl font-bold text-white mb-2">{tech.title}</h3>
                <p className="text-slate-300">{tech.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section py-16">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-white">
            {locale === 'ar' ? 'المميزات الرئيسية' : 'Key Features'} ⭐
          </h2>
          <div className="features-grid">
            {content.features.map((feature, i) => (
              <div key={i} className="feature-card">
                <div className="feature-icon">{feature.icon}</div>
                <h3 className="feature-title">{feature.title}</h3>
                <p className="section-subtitle">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-cta">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4 text-white">
            {locale === 'ar' ? 'جاهز للبدء؟' : 'Ready to Start?'}
          </h2>
          <p className="text-slate-300 mb-6">
            {locale === 'ar'
              ? 'انضم إلينا الآن وابدأ رحلتك في تعلم تطوير الويب'
              : 'Join us now and start your web development journey'}
          </p>
          {isLoggedIn && (
            <Link
              href={content.cta.href}
              className="btn-primary"
            >
              {content.cta.text}
            </Link>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <p>
          {locale === 'ar'
            ? `© 2024 منصة Week1 Learning - جميع الحقوق محفوظة`
            : `© 2024 Week1 Learning Platform - All Rights Reserved`}
        </p>
        <p className="footer-sub">
          {locale === 'ar'
            ? 'تم الإنشاء من قبل 👨‍💻 فريق المطورين'
            : 'Created by 👨‍💻 Developer Team'}
        </p>
      </footer>
    </div>
  );
}
