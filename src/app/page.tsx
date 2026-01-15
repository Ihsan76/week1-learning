// src/app/page.tsx

'use client';

import Link from 'next/link';
import { useAuthStore } from '@/lib/store';

export default function Home() {
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn);

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-800 p-8">
      {/* Navigation Bar */}
      <nav className="navbar">
        <div className="navbar-brand">
          <span>🚀</span> <span>Week1</span> Learning
        </div>
        <ul className="nav-links">
          <li><Link href="/" className="active">الرئيسية</Link></li>
          {isLoggedIn && (
            <>
              <li><Link href="/dashboard">لوحتي</Link></li>
              <li><Link href="/admin">إدارة</Link></li>
              <li><Link href="/settings">الإعدادات</Link></li>
            </>
          )}
        </ul>
      </nav>

      {/* Hero Section */}
      <section className="section text-center">
        <h1 className="section-title">تعلم تطوير الويب 🌐</h1>
        <p className="section-subtitle">منصة تعليمية متكاملة</p>
        <p className="text-xl mb-8">Next.js • Django • APIs</p>
        <p className="text-lg mb-12">🚀 جاهز لتحويل افكارك إلى مشاريع وتطبيقات محترفة</p>
        <Link href="/dashboard" className="btn">اذهب للداشبورد</Link>
      </section>

      {/* Technologies Section */}
      <section className="section">
        <h2 className="section-title">التقنيات المستخدمة 💻</h2>
        <div className="grid">
          {[
            { icon: 'N', title: 'Next.js', desc: 'React Framework متطور' },
            { icon: 'D', title: 'Django', desc: 'Python Web Framework' },
            { icon: 'R', title: 'React', desc: 'UI Library قوية' },
            { icon: 'Z', title: 'Zustand', desc: 'State Management' },
            { icon: 'T', title: 'TypeScript', desc: 'Type Safety' },
            { icon: 'A', title: 'APIs', desc: 'RESTful Services' },
          ].map((tech, i) => (
            <div key={i} className="card text-center fade-in">
              <div className="feature-icon">{tech.icon}</div>
              <h3 className="feature-title">{tech.title}</h3>
              <p className="feature-description">{tech.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Features Section */}
      <section className="section">
        <h2 className="section-title">المميزات الرئيسية ⭐</h2>
        <div className="features">
          <div className="feature-item">
            <div className="feature-icon">⚡</div>
            <h3 className="feature-title">أداء عالي</h3>
            <p className="feature-description">Next.js مع Optimization</p>
          </div>
          <div className="feature-item">
            <div className="feature-icon">🔒</div>
            <h3 className="feature-title">آمن تماماً</h3>
            <p className="feature-description">Password hashing وحماية</p>
          </div>
          <div className="feature-item">
            <div className="feature-icon">📊</div>
            <h3 className="feature-title">واجهة احترافية</h3>
            <p className="feature-description">تصميم حديث جميل</p>
          </div>
          <div className="feature-item">
            <div className="feature-icon">📱</div>
            <h3 className="feature-title">Responsive</h3>
            <p className="feature-description">يعمل على جميع الأجهزة</p>
          </div>
          <div className="feature-item">
            <div className="feature-icon">🔧</div>
            <h3 className="feature-title">سهل التطوير</h3>
            <p className="feature-description">كود منظم وواضح</p>
          </div>
          <div className="feature-item">
            <div className="feature-icon">📚</div>
            <h3 className="feature-title">موثق بالكامل</h3>
            <p className="feature-description">شرح مفصل لكل شيء</p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section text-center">
        <h2 className="section-title">جاهز للبدء؟ 🎯</h2>
        <p className="section-subtitle">انضم لآلاف المتعلمين الذين بدؤوا رحلتهم معنا</p>
        <Link href="/dashboard" className="btn">استمر في التعلم</Link>
      </section>

      {/* Footer */}
      <footer>
        <p>&copy; 2026 Week1 Learning - جميع الحقوق محفوظة</p>
        <p className="text-sm mt-2">تم التطوير بـ ❤️ لتعليم الويب الحديث</p>
      </footer>
    </div>
  );
}
