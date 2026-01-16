'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
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
    difficulty: { ar: 'متوسط', en: 'Intermediate' },
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
    <div className="container p-8">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-4xl font-bold text-white mb-2">{content.dashboard}</h1>
          <p className="text-slate-400">
            {content.welcome}, {user?.email}!
          </p>
        </div>
        <button
          onClick={handleLogout}
          className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded transition-colors"
        >
          {content.logout}
        </button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {/* Completed Courses */}
        <div className="bg-slate-800 rounded-lg p-6 border border-slate-700 hover:border-cyan-500 transition-colors">
          <div className="text-cyan-400 text-3xl mb-2">✓</div>
          <p className="text-slate-400 text-sm mb-2">{content.completedCourses}</p>
          <p className="text-3xl font-bold text-white">{completedCount}</p>
        </div>

        {/* In Progress */}
        <div className="bg-slate-800 rounded-lg p-6 border border-slate-700 hover:border-blue-500 transition-colors">
          <div className="text-blue-400 text-3xl mb-2">⚡</div>
          <p className="text-slate-400 text-sm mb-2">{content.inProgress}</p>
          <p className="text-3xl font-bold text-white">{inProgressCount}</p>
        </div>

        {/* Hours Learned */}
        <div className="bg-slate-800 rounded-lg p-6 border border-slate-700 hover:border-green-500 transition-colors">
          <div className="text-green-400 text-3xl mb-2">🕐</div>
          <p className="text-slate-400 text-sm mb-2">{content.hoursLearned}</p>
          <p className="text-3xl font-bold text-white">{totalHours}h</p>
        </div>
      </div>

      {/* Courses Section */}
      <div className="bg-slate-800 rounded-lg p-6 border border-slate-700">
        <h2 className="text-2xl font-bold text-white mb-6">{content.recentCourses}</h2>

        <div className="space-y-4">
          {mockCourses.map((course) => (
            <div
              key={course.id}
              className="bg-slate-700 rounded-lg p-4 border border-slate-600 hover:border-slate-500 transition-colors"
            >
              <div className="flex justify-between items-start mb-3">
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-white">
                    {course.title[locale as 'ar' | 'en']}
                  </h3>
                  <p className="text-slate-400 text-sm mt-1">
                    {course.description[locale as 'ar' | 'en']}
                  </p>
                </div>
                <span
                  className={`px-3 py-1 rounded text-sm font-semibold ${
                    course.status === 'completed'
                      ? 'bg-green-500/20 text-green-400'
                      : course.status === 'in_progress'
                      ? 'bg-blue-500/20 text-blue-400'
                      : 'bg-gray-500/20 text-gray-400'
                  }`}
                >
                  {course.status === 'completed'
                    ? locale === 'ar'
                      ? 'منتهية'
                      : 'Completed'
                    : course.status === 'in_progress'
                    ? locale === 'ar'
                      ? 'قيد الإنجاز'
                      : 'In Progress'
                    : locale === 'ar'
                    ? 'لم تبدأ'
                    : 'Not Started'}
                </span>
              </div>

              {/* Course Info */}
              <div className="flex gap-4 mb-4 text-sm text-slate-400">
                <span>📘 {content.difficulty}: {course.difficulty[locale as 'ar' | 'en']}</span>
                <span>⏱️ {content.duration}: {course.duration}</span>
              </div>

              {/* Progress Bar */}
              <div className="mb-4">
                <div className="flex justify-between mb-2">
                  <span className="text-xs text-slate-400">{content.progress}</span>
                  <span className="text-xs text-slate-400">{course.progress}%</span>
                </div>
                <div className="w-full bg-slate-600 rounded-full h-2">
                  <div
                    className="bg-gradient-to-r from-cyan-500 to-blue-500 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${course.progress}%` }}
                  />
                </div>
              </div>

              {/* Action Button */}
              <button className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white font-semibold py-2 px-4 rounded transition-all duration-300">
                {course.status === 'completed'
                  ? content.startLearning
                  : course.status === 'in_progress'
                  ? content.continue
                  : content.startLearning}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
