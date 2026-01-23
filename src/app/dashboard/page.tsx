// src/app/dashboard/page.tsx

'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/lib/store';
import { useLocale } from '@/hooks/useLocale';

type Course = {
  id: number;
  title: string;
  description: string;
  level: string;
  created_at: string;
};

export default function DashboardPage() {
  const router = useRouter();
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn);
  const user = useAuthStore((state) => state.user);
  const logout = useAuthStore((state) => state.logout);

  const { dict, locale, isLoading } = useLocale();

  const [mounted, setMounted] = useState(false);
  const [courses, setCourses] = useState<Course[]>([]);
  const [loadingCourses, setLoadingCourses] = useState(false);
  const [courseError, setCourseError] = useState('');
  const [newTitle, setNewTitle] = useState('');
  const [newDescription, setNewDescription] = useState('');
  const [newLevel, setNewLevel] = useState<'beginner' | 'intermediate' | 'advanced'>('beginner');
  const [creatingCourse, setCreatingCourse] = useState(false);

  // تأخير حتى يركب الـ client + التحقق من تسجيل الدخول
  useEffect(() => {
    setMounted(true);
  }, []);

  // حماية بسيطة: توجيه لصفحة الدخول إذا لم يكن المستخدم مسجلاً
  useEffect(() => {
    if (mounted && !isLoggedIn) {
      router.push('/login');
    }
  }, [mounted, isLoggedIn, router]);

  // جلب الدورات عند توفّر الترجمة والمستخدم
  useEffect(() => {
    if (!mounted || !isLoggedIn || !dict) return;

    const fetchCourses = async () => {
      setLoadingCourses(true);
      setCourseError('');

      try {
        const res = await fetch('https://week1-backend.onrender.com/api/courses/');
        const data = await res.json();

        if (!res.ok) {
          setCourseError(dict.dashboard.errorLoadingCourses);
          return;
        }

        setCourses(data);
      } catch (err) {
        setCourseError(dict.dashboard.errorLoadingCourses);
      } finally {
        setLoadingCourses(false);
      }
    };

    fetchCourses();
  }, [mounted, isLoggedIn, dict]);

  if (!mounted || isLoading || !dict) {
    return (
      <div className="min-h-screen w-full flex items-center justify-center px-4 py-12">
        <p className="text-gray-300">
          {dict?.dashboard?.loading || 'Loading...'}
        </p>
      </div>
    );
  }

  const t = dict.dashboard;

  const completedCount = 0;
  const inProgressCount = courses.length;
  const totalHours = courses.length * 4;

  const handleLogout = () => {
    logout();
    router.push('/login');
  };

  const handleCreateCourse = async (e: React.FormEvent) => {
    e.preventDefault();
    setCourseError('');

    if (!newTitle.trim()) {
      setCourseError(t.titleRequired);
      return;
    }

    try {
      setCreatingCourse(true);
      const res = await fetch('https://week1-backend.onrender.com/api/courses/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: newTitle,
          description: newDescription,
          level: newLevel,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setCourseError(data.error || t.errorCreatingCourse);
        return;
      }

      setCourses((prev) => [data, ...prev]);
      setNewTitle('');
      setNewDescription('');
      setNewLevel('beginner');
    } catch (err) {
      setCourseError(t.errorCreatingCourseGeneric);
    } finally {
      setCreatingCourse(false);
    }
  };

  return (
    <div className="container">
      {/* Header */}
      <section className="section">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="hero-title">{t.title}</h1>
            <p className="hero-subtitle">
              {t.welcome},{' '}
              <span className="text-cyan-400">
                {user?.email}
              </span>
              !
            </p>
          </div>
          <button onClick={handleLogout} className="btn-logout">
            {t.logout}
          </button>
        </div>
      </section>

      {/* Stats */}
      <section className="section">
        <h2 className="section-title">{t.stats}</h2>
        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon">✓</div>
            <h3 className="feature-title">{completedCount}</h3>
            <p className="feature-text">{t.completedCourses}</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">⚡</div>
            <h3 className="feature-title">{inProgressCount}</h3>
            <p className="feature-text">{t.inProgress}</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">🕐</div>
            <h3 className="feature-title">{totalHours}h</h3>
            <p className="feature-text">{t.hoursLearned}</p>
          </div>
        </div>
      </section>

      {/* Create Course Form */}
      <section className="section">
        <h2 className="section-title">{t.createCourse}</h2>

        {courseError && (
          <div className="bg-red-500/20 border border-red-500/50 rounded-lg p-4 mb-4 text-sm text-red-200">
            {courseError}
          </div>
        )}

        <form onSubmit={handleCreateCourse} className="space-y-4 max-w-xl mx-auto">
          <div className="space-y-2">
            <label className="block text-sm font-semibold text-gray-200">
              {t.newCourseTitle}
            </label>
            <input
              type="text"
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
              placeholder={locale === 'ar' ? 'مثال: أساسيات Next.js' : 'e.g. Next.js Basics'}
            />
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-semibold text-gray-200">
              {t.newCourseDescription}
            </label>
            <textarea
              value={newDescription}
              onChange={(e) => setNewDescription(e.target.value)}
              className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
              rows={3}
              placeholder={locale === 'ar' ? 'وصف مختصر عن محتوى الدورة' : 'Short description of the course'}
            />
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-semibold text-gray-200">
              {t.newCourseLevel}
            </label>
            <select
              value={newLevel}
              onChange={(e) => setNewLevel(e.target.value as 'beginner' | 'intermediate' | 'advanced')}
              className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
            >
              <option value="beginner">{t.beginner}</option>
              <option value="intermediate">{t.intermediate}</option>
              <option value="advanced">{t.advanced}</option>
            </select>
          </div>

          <button
            type="submit"
            disabled={creatingCourse}
            className="btn-primary px-6 py-2 inline-flex items-center justify-center rounded-lg font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {creatingCourse ? t.creatingCourse : t.createCourse}
          </button>
        </form>
      </section>

      {/* Courses list */}
      <section className="section">
        <h2 className="section-title">{t.recentCourses}</h2>

        {loadingCourses ? (
          <p className="text-center text-gray-400">
            {t.loadingCourses}
          </p>
        ) : courses.length === 0 ? (
          <p className="text-center text-gray-400">
            {t.noCourses}
          </p>
        ) : (
          <div className="features-grid">
            {courses.map((course) => (
              <div key={course.id} className="feature-card">
                <h3 className="feature-title">{course.title}</h3>
                <p className="feature-text mb-4">{course.description}</p>
                <div className="text-xs text-slate-400 mb-3 space-y-1">
                  <p>
                    {t.level}: {t[course.level as 'beginner' | 'intermediate' | 'advanced'] || course.level}
                  </p>
                  <p>
                    {t.duration}: 4 {t.durationWeeks}
                  </p>
                </div>
                <button className="btn-primary w-full text-sm">
                  {t.startLearning}
                </button>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Week 1 Link */}
      <div className="mt-12 text-center">
        <Link href="/week-1" className="btn-primary px-8 py-3 inline-block rounded-lg font-semibold">
          {t.viewWeekOne}
        </Link>
      </div>
    </div>
  );
}
