'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuthStore } from '@/lib/store';
import { useLocaleStore } from '@/lib/localeStore';

const getContent = (locale: string) => {
  if (locale === 'ar') {
    return {
      welcome: 'أهلا بالرجوع',
      dashboard: 'لوحة التحكم',
      stats: 'الإحصائيات',
      courses: 'الدروس',
      progress: 'التقدم',
      completedCourses: 'الدروس المنتهية',
      inProgress: 'قيد الإنجاز',
      hoursLearned: 'ساعات التعلم',
      recentCourses: 'الدروس الحديثة',
      startLearning: 'ابدأ التعلم',
      continue: 'استمرار',
      difficulty: 'مستوى الصعوبة',
      duration: 'المدة',
      logout: 'تسجيل الخروج',
            viewWeekOne: 'عرض الأسبوع الأول',
    };
  }
  return {
    welcome: 'Welcome back',
    dashboard: 'Dashboard',
    stats: 'Statistics',
    courses: 'Courses',
    progress: 'Progress',
    completedCourses: 'Completed Courses',
    inProgress: 'In Progress',
    hoursLearned: 'Hours Learned',
    recentCourses: 'Recent Courses',
    startLearning: 'Start Learning',
    continue: 'Continue',
    difficulty: 'Level',
    duration: 'Duration',
    logout: 'Logout',
  };
};

const mockCourses = [
  {
    id: 1,
    title: { ar: 'Next.js متقدم', en: 'Advanced Next.js' },
    description: { ar: 'تعلم مهارات Next.js المتقدمة', en: 'Learn advanced Next.js skills' },
    progress: 65,
    difficulty: { ar: 'متقدم', en: 'Advanced' },
    duration: '8 weeks',
    status: 'in_progress',
  },
  {
    id: 2,
    title: { ar: 'React للمبتدئين', en: 'React Basics' },
    description: { ar: 'أساسيات React', en: 'React fundamentals' },
    progress: 100,
    difficulty: { ar: 'مبتدئ', en: 'Beginner' },
    duration: '4 weeks',
    status: 'completed',
  },
  {
    id: 3,
    title: { ar: 'TypeScript مع React', en: 'TypeScript with React' },
    description: { ar: 'استخدام TypeScript مع React', en: 'Using TypeScript with React' },
    progress: 0,
    difficulty: 
    { ar: 'متوسط', en: 'Intermediate' },
    duration: '6 weeks',
    status: 'not_started',
  },
];

export default function DashboardPage() {
  const router = useRouter();
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn);
  const user = useAuthStore((state) => state.user);
  const logout = useAuthStore((state) => state.logout);
  const locale = useLocaleStore((state) => state.locale);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    if (!isLoggedIn) {
      router.push('/login');
    }
  }, [isLoggedIn, router]);

  if (!mounted || !isLoggedIn) {
    return (
      <div className="container p-8">
        <p>{locale === 'ar' ? 'جاري...' : 'Loading...'}</p>
      </div>
    );
  }

  const content = getContent(locale);
  const completedCount = mockCourses.filter((c) => c.status === 'completed').length;
  const inProgressCount = mockCourses.filter((c) => c.status === 'in_progress').length;
  const totalHours = 32;

  const handleLogout = () => {
    logout();
    router.push('/login');
  };

  return (
    <div className="container">
      <section className="section">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="hero-title">{content.dashboard}</h1>
            <p className="hero-subtitle">
              {content.welcome}, <span className="text-cyan-400">{user?.email}</span>!
            </p>
          </div>
          <button onClick={handleLogout} className="btn-logout">
            {content.logout}
          </button>
        </div>
      </section>

      <section className="section">
        <h2 className="section-title">{content.stats}</h2>
        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon">✓</div>
            <h3 className="feature-title">{completedCount}</h3>
            <p className="feature-text">{content.completedCourses}</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">⚡</div>
            <h3 className="feature-title">{inProgressCount}</h3>
            <p className="feature-text">{content.inProgress}</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">🕐</div>
            <h3 className="feature-title">{totalHours}h</h3>
            <p className="feature-text">{content.hoursLearned}</p>
          </div>
        </div>
      </section>

      <section className="section">
        <h2 className="section-title">{content.recentCourses}</h2>
        <div className="features-grid">
          {mockCourses.map((course) => (
            <div key={course.id} className="feature-card">
              <h3 className="feature-title">{course.title[locale as 'ar' | 'en']}</h3>
              <p className="feature-text mb-4">{course.description[locale as 'ar' | 'en']}</p>
              <div className="text-xs text-slate-400 mb-3 space-y-1">
                <p>{content.difficulty}: {course.difficulty[locale as 'ar' | 'en']}</p>
                <p>{content.duration}: {course.duration}</p>
                </p>
              </div>
              <div className="mb-4">
                <div className="flex justify-between mb-2">
                  <span className="text-xs text-slate-400">{content.progress}</span>
                  <span className="text-xs font-bold text-cyan-400">{course.progress}%</span>
                </div>
                <div className="w-full bg-slate-800 rounded-full h-2 border border-slate-600 overflow-hidden">
                  <div
                    className="bg-gradient-to-r from-cyan-500 to-blue-500 h-2 rounded-full transition-all"
                    style={{ width: `${course.progress}%` }}
                  />
                </div>
              </div>
              <button className="btn-primary w-full text-sm">
                {course.status === 'completed' ? content.startLearning : course.status === 'in_progress' ? content.continue : content.startLearning}
              </button>
            </div>
          ))}
        </div>
      </section>
    
        {/* Week 1 Link */}
        <div className="mt-12 text-center">
          <Link href="/week-1" className="btn-primary px-8 py-3 inline-block rounded-lg font-semibold">
            {content.viewWeekOne || 'View Week 1 Curriculum'}
          </Link>
        </div>
</div>
  );
}
