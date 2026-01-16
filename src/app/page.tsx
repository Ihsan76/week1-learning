// src/app/page.tsx

'use client';

import Link from 'next/link';
import { useAuthStore } from '@/lib/store';

export default function Home() {
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn);

  return (
    <div style={{ backgroundColor: '#0a0a0a', color: '#ededed', minHeight: '100vh' }}>
      
      {/* ═══════ NAVBAR ═══════ */}
      <nav style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '1rem 2rem',
        borderBottom: '1px solid #2a2a2a',
        position: 'sticky',
        top: 0,
        zIndex: 100,
      }}>
        <div style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>
          🚀 <span style={{ color: '#00bcd4' }}>Week1</span> Learning
        </div>
        <ul style={{ display: 'flex', listStyle: 'none', gap: '2rem' }}>
          <li><Link href="/" style={{ color: '#ededed', textDecoration: 'none' }}>الرئيسية</Link></li>
          {isLoggedIn && (
            <>
              <li><Link href="/dashboard" style={{ color: '#ededed', textDecoration: 'none' }}>لوحتي</Link></li>
              <li><Link href="/admin" style={{ color: '#ededed', textDecoration: 'none' }}>إدارة</Link></li>
              <li><Link href="/settings" style={{ color: '#ededed', textDecoration: 'none' }}>الإعدادات</Link></li>
            </>
          )}
        </ul>
      </nav>

      {/* ═══════ HERO SECTION ═══════ */}
      <section style={{ padding: '4rem 2rem', textAlign: 'center', borderBottom: '1px solid #2a2a2a' }}>
        <h1 style={{ fontSize: '3rem', marginBottom: '1rem', color: '#ededed' }}>تعلم تطوير الويب 🌐</h1>
        <p style={{ fontSize: '1.3rem', color: '#757575', marginBottom: '1rem' }}>منصة تعليمية متكاملة</p>
        <p style={{ fontSize: '1.1rem', color: '#ededed', marginBottom: '1rem' }}>Next.js • Django • APIs</p>
        <p style={{ fontSize: '1rem', color: '#757575', marginBottom: '2rem' }}>
          🚀 جاهز لتحويل افكارك إلى مشاريع وتطبيقات محترفة
        </p>
        <Link href="/dashboard" style={{
          backgroundColor: '#00bcd4',
          color: '#0a0a0a',
          padding: '0.75rem 1.5rem',
          borderRadius: '6px',
          textDecoration: 'none',
          fontWeight: 'bold',
          display: 'inline-block'
        }}>
          اذهب للداشبورد
        </Link>
      </section>

      {/* ═══════ TECHNOLOGIES SECTION ═══════ */}
      <section style={{ padding: '3rem 2rem', borderBottom: '1px solid #2a2a2a' }}>
        <h2 style={{ fontSize: '2.5rem', textAlign: 'center', marginBottom: '2rem', color: '#ededed' }}>
          التقنيات المستخدمة 💻
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '2rem' }}>
          {[
            { icon: 'N', title: 'Next.js', desc: 'React Framework متطور' },
            { icon: 'D', title: 'Django', desc: 'Python Web Framework' },
            { icon: 'R', title: 'React', desc: 'UI Library قوية' },
            { icon: 'Z', title: 'Zustand', desc: 'State Management' },
            { icon: 'T', title: 'TypeScript', desc: 'Type Safety' },
            { icon: 'A', title: 'APIs', desc: 'RESTful Services' },
          ].map((tech, i) => (
            <div key={i} style={{
              backgroundColor: 'rgba(237, 237, 237, 0.05)',
              border: '1px solid #2a2a2a',
              borderRadius: '8px',
              padding: '1.5rem',
              textAlign: 'center',
              transition: 'all 0.3s ease',
            }} onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = '#00bcd4';
              e.currentTarget.style.transform = 'translateY(-4px)';
            }} onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = '#2a2a2a';
              e.currentTarget.style.transform = 'translateY(0)';
            }}>
              <div style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>{tech.icon}</div>
              <h3 style={{ fontSize: '1.3rem', color: '#ededed', marginBottom: '0.5rem' }}>{tech.title}</h3>
              <p style={{ color: '#757575', fontSize: '0.95rem' }}>{tech.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ═══════ FEATURES SECTION ═══════ */}
      <section style={{ padding: '3rem 2rem', borderBottom: '1px solid #2a2a2a' }}>
        <h2 style={{ fontSize: '2.5rem', textAlign: 'center', marginBottom: '2rem', color: '#ededed' }}>
          المميزات الرئيسية ⭐
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '2rem' }}>
          <div>
            <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>⚡</div>
            <h3 style={{ fontSize: '1.2rem', color: '#ededed', marginBottom: '0.5rem' }}>أداء عالي</h3>
            <p style={{ color: '#757575' }}>Next.js مع Optimization</p>
          </div>
          <div>
            <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>🔒</div>
            <h3 style={{ fontSize: '1.2rem', color: '#ededed', marginBottom: '0.5rem' }}>آمن تماماً</h3>
            <p style={{ color: '#757575' }}>Password hashing وحماية</p>
          </div>
          <div>
            <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>📊</div>
            <h3 style={{ fontSize: '1.2rem', color: '#ededed', marginBottom: '0.5rem' }}>واجهة احترافية</h3>
            <p style={{ color: '#757575' }}>تصميم حديث جميل</p>
          </div>
          <div>
            <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>📱</div>
            <h3 style={{ fontSize: '1.2rem', color: '#ededed', marginBottom: '0.5rem' }}>Responsive</h3>
            <p style={{ color: '#757575' }}>يعمل على جميع الأجهزة</p>
          </div>
          <div>
            <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>🔧</div>
            <h3 style={{ fontSize: '1.2rem', color: '#ededed', marginBottom: '0.5rem' }}>سهل التطوير</h3>
            <p style={{ color: '#757575' }}>كود منظم وواضح</p>
          </div>
          <div>
            <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>📚</div>
            <h3 style={{ fontSize: '1.2rem', color: '#ededed', marginBottom: '0.5rem' }}>موثق بالكامل</h3>
            <p style={{ color: '#757575' }}>شرح مفصل لكل شيء</p>
          </div>
        </div>
      </section>

      {/* ═══════ CTA SECTION ═══════ */}
      <section style={{ padding: '3rem 2rem', textAlign: 'center', borderBottom: '1px solid #2a2a2a' }}>
        <h2 style={{ fontSize: '2.5rem', marginBottom: '1rem', color: '#ededed' }}>جاهز للبدء؟ 🎯</h2>
        <p style={{ fontSize: '1.1rem', color: '#757575', marginBottom: '2rem' }}>
          انضم لآلاف المتعلمين الذين بدؤوا رحلتهم معنا
        </p>
        <Link href="/dashboard" style={{
          backgroundColor: '#00bcd4',
          color: '#0a0a0a',
          padding: '0.75rem 1.5rem',
          borderRadius: '6px',
          textDecoration: 'none',
          fontWeight: 'bold',
          display: 'inline-block'
        }}>
          استمر في التعلم
        </Link>
      </section>

      {/* ═══════ FOOTER ═══════ */}
      <footer style={{
        padding: '2rem',
        textAlign: 'center',
        color: '#757575',
        borderTop: '1px solid #2a2a2a'
      }}>
        <p>&copy; 2026 Week1 Learning - جميع الحقوق محفوظة</p>
        <p style={{ fontSize: '0.9rem', marginTop: '0.5rem' }}>تم التطوير بـ ❤️ لتعليم الويب الحديث</p>
      </footer>

    </div>
  );
}
