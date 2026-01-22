'use client';
import Link from 'next/link';
import { useAuthStore } from '@/lib/store';
import { useLocaleStore } from '@/lib/localeStore';
import { useEffect, useState } from 'react';
import ar from '@/locales/ar.json';
import en from '@/locales/en.json';

const translations = { ar, en };

export default function Home() {
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn);
  const locale = useLocaleStore((state) => state.locale);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const t = translations[locale as keyof typeof translations] || translations.en;

  return (
    <div className="container">
      {/* Hero */}
      <section className="hero-section">
        <div className="hero-content">
          <h1 className="hero-title">{t.home.title}</h1>
          <p className="hero-subtitle">{t.home.subtitle}</p>
        </div>
      </section>

      {/* Technologies */}
      <section className="section">
        <h2 className="section-title">{t.home.tech}</h2>
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
        <h2 className="section-title">{t.home.features} ⭐</h2>
        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon">🎯</div>
            <h3 className="feature-title">{t.home.simpleLesson}</h3>
            <p className="section-subtitle">{t.home.simpleLessonDesc}</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">🚀</div>
            <h3 className="feature-title">{t.home.projects}</h3>
            <p className="section-subtitle">{t.home.projectsDesc}</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">💡</div>
            <h3 className="feature-title">{t.home.bestPractices}</h3>
            <p className="section-subtitle">{t.home.bestPracticesDesc}</p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-cta">
        <h2 className="section-title">{t.home.ready}</h2>
        <p className="section-subtitle">{t.home.readyText}</p>
        {!isLoggedIn && (
          <Link href="/dashboard" className="btn-primary">
            {t.home.cta}
          </Link>
        )}
      </section>

      {/* Footer */}
      <footer className="footer">
        <p>© 2024 Week1 Learning - {t.home.copyright}</p>
      </footer>
    </div>
  );
}
