// src/app/page.tsx
'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useAuthStore } from '@/lib/store';
import { useLocaleContext } from '@/context/LocaleContext';

export default function Home() {
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn);
  const { dict, isLoading } = useLocaleContext();
  const [mounted, setMounted] = useState(false);

  // لتفادي مشاكل الهيدرشن
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted || isLoading || !dict) return null;

  const t = dict.home;

  return (
    <div className="container">
      {/* Hero */}
      <section className="hero-section">
        <div className="hero-content">
          <h1 className="hero-title">{t.title}</h1>
          <p className="hero-subtitle">{t.subtitle}</p>
        </div>
      </section>

      {/* Technologies */}
      <section className="section">
        <h2 className="section-title">{t.tech}</h2>
        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon">⚡</div>
            <h3 className="feature-title">Next.js</h3>
            <p className="section-subtitle">{t.technologies.nextjs}</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">🐍</div>
            <h3 className="feature-title">Django</h3>
            <p className="section-subtitle">{t.technologies.django}</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">⚛️</div>
            <h3 className="feature-title">React</h3>
            <p className="section-subtitle">{t.technologies.react}</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">📘</div>
            <h3 className="feature-title">TypeScript</h3>
            <p className="section-subtitle">{t.technologies.typescript}</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">🔌</div>
            <h3 className="feature-title">APIs</h3>
            <p className="section-subtitle">{t.technologies.apis}</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">📦</div>
            <h3 className="feature-title">Zustand</h3>
            <p className="section-subtitle">{t.technologies.zustand}</p>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="section">
        <h2 className="section-title">{t.features} ⭐</h2>
        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon">🎯</div>
            <h3 className="feature-title">{t.simpleLesson}</h3>
            <p className="section-subtitle">{t.simpleLessonDesc}</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">🚀</div>
            <h3 className="feature-title">{t.projects}</h3>
            <p className="section-subtitle">{t.projectsDesc}</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">💡</div>
            <h3 className="feature-title">{t.bestPractices}</h3>
            <p className="section-subtitle">{t.bestPracticesDesc}</p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-cta">
        <h2 className="section-title">{t.ready}</h2>
        <p className="section-subtitle">{t.readyText}</p>
        {!isLoggedIn && (
          <Link href="/dashboard" className="btn-primary">
            {t.cta}
          </Link>
        )}
      </section>

      {/* Footer */}
      <footer className="footer">
        <p>© 2024 Week1 Learning - {t.copyright}</p>
      </footer>
    </div>
  );
}
