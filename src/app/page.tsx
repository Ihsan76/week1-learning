// src/app/page.tsx
'use client';
import Link from 'next/link';
import { useAuthStore } from '@/lib/store';

export default function Home() {
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn);

  // Technologies with icons and descriptions
  const technologies = [
    {
      title: 'Next.js',
      icon: '⚡',
      description: 'React Framework متطور',
      color: '#00bcd4',
    },
    {
      title: 'Django',
      icon: '🐍',
      description: 'Python Web Framework',
      color: '#4caf50',
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
      color: '#3178c6',
    },
    {
      title: 'APIs',
      icon: '🔌',
      description: 'RESTful Services',
      color: '#ff9800',
    },
    {
      title: 'Zustand',
      icon: '📦',
      description: 'State Management',
      color: '#fff044',
    },
  ];

  const features = [
    { icon: '⚡', title: 'أداء عالي', description: 'Next.js مع Optimization' },
    { icon: '🔒', title: 'آمن تماماً', description: 'Password hashing وحماية' },
    { icon: '📊', title: 'واجهة احترافية', description: 'تصميم حديث جميل' },
    { icon: '📱', title: 'Responsive', description: 'يعمل على جميع الأجهزة' },
    { icon: '🔧', title: 'سهل التطوير', description: 'كود منظم وواضح' },
    { icon: '📚', title: 'موثق بالكامل', description: 'شرح مفصل لكل شيء' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-800">
      {/* Hero Section */}
      <section className="section-hero">
        <div className="hero-content">
          <h1 className="hero-title">تعلم تطوير الويب 🌐</h1>
          <p className="hero-subtitle">منصة تعليمية متكاملة</p>
          <p className="hero-text">Next.js • Django • APIs</p>
          <p className="hero-description">🚀 جاهز لتحويل افكارك إلى مشاريع وتطبيقات محترفة</p>
          <Link href="/dashboard" className="btn btn-primary">
            اذهب للداشبورد
          </Link>
        </div>
      </section>

      {/* Technologies Section */}
      <section className="section">
        <h2 className="section-title">التقنيات المستخدمة 💻</h2>
        <div className="tech-grid">
          {technologies.map((tech, i) => (
            <div key={i} className="tech-card" style={{ '--color': tech.color } as any}>
              <div className="tech-icon">{tech.icon}</div>
              <h3 className="tech-title">{tech.title}</h3>
              <p className="tech-description">{tech.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Features Section */}
      <section className="section">
        <h2 className="section-title">المميزات الرئيسية ⭐</h2>
        <div className="features-grid">
          {features.map((feature, i) => (
            <div key={i} className="feature-card">
              <div className="feature-icon">{feature.icon}</div>
              <h3 className="feature-title">{feature.title}</h3>
              <p className="feature-text">{feature.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="section section-cta">
        <h2 className="section-title">جاهز للبدء؟ 🎯</h2>
        <p className="section-subtitle">انضم لآلاف المتعلمين الذين بدؤوا رحلتهم معنا</p>
        <Link href="/dashboard" className="btn btn-primary btn-large">
          استمر في التعلم
        </Link>
      </section>

      {/* Footer */}
      <footer className="footer">
        <p>© 2026 Week1 Learning - جميع الحقوق محفوظة</p>
        <p className="footer-sub">تم التطوير بـ ❤️ لتعليم الويب الحديث</p>
      </footer>
    </div>
  );
}
