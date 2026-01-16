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
    <div className="min-h-screen bg-slate-900 p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-10">
          <div>
            <h1 className="text-5xl font-bold text-white mb-3">{content.dashboard}</h1>
            <p className="text-slate-400 text-lg">
              {content.welcome}, <span className="text-cyan-400 font-semibold">{user?.email}!</span>
            </p>
          </div>
          <button
            onClick={handleLogout}
            className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-bold py-3 px-6 rounded-lg transition-all duration-300 transform hover:scale-105"
          >
            {content.logout}
          </button>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          {/* Completed Courses */}
          <div className="bg-gradient-to-br from-slate-800 to-slate-700 rounded-xl p-6 border border-slate-600 hover:border-cyan-500 transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-cyan-500/20">
            <div className="flex items-start justify-between mb-4">
              <div>
                <p className="text-slate-400 text-sm mb-2 uppercase tracking-wider">{content.completedCourses}</p>
                <p className="text-4xl font-bold text-cyan-400">{completedCount}</p>
              </div>
              <div className="text-5xl">✓</div>
            </div>
            <div className="h-1 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full"></div>
          </div>

          {/* In Progress */}
          <div className="bg-gradient-to-br from-slate-800 to-slate-700 rounded-xl p-6 border border-slate-600 hover:border-blue-500 transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-blue-500/20">
            <div className="flex items-start justify-between mb-4">
              <div>
                <p className="text-slate-400 text-sm mb-2 uppercase tracking-wider">{content.inProgress}</p>
                <p className="text-4xl font-bold text-blue-400">{inProgressCount}</p>
              </div>
              <div className="text-5xl">⚡</div>
            </div>
            <div className="h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"></div>
          </div>

          {/* Hours Learned */}
          <div className="bg-gradient-to-br from-slate-800 to-slate-700 rounded-xl p-6 border border-slate-600 hover:border-green-500 transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-green-500/20">
            <div className="flex items-start justify-between mb-4">
              <div>
                <p className="text-slate-400 text-sm mb-2 uppercase tracking-wider">{content.hoursLearned}</p>
                <p className="text-4xl font-bold text-green-400">{totalHours}h</p>
              </div>
              <div className="text-5xl">🕐</div>
            </div>
            <div className="h-1 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full"></div>
          </div>
        </div>

        {/* Courses Section */}
        <div className="bg-gradient-to-br from-slate-800 to-slate-700 rounded-xl p-8 border border-slate-600">
          <h2 className="text-3xl font-bold text-white mb-8 flex items-center gap-3">
            <span className="text-cyan-400">📚</span>
            {content.recentCourses}
          </h2>
          <div className="space-y-6">
            {mockCourses.map((course) => (
              <div
                key={course.id}
                className="bg-gradient-to-r from-slate-700 to-slate-600 rounded-lg p-6 border border-slate-500 hover:border-cyan-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-cyan-500/10"
              >
                <div className="flex justify-between items-start mb-4">
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-white mb-2">
                      {course.title[locale as 'ar' | 'en']}
                    </h3>
                    <p className="text-slate-300 text-sm">
                      {course.description[locale as 'ar' | 'en']}
                    </p>
                  </div>
                  <span
                    className={`px-4 py-2 rounded-lg text-sm font-semibold whitespace-nowrap ${
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

                {/* Course Meta Info */}
                <div className="flex gap-6 mb-5 text-sm text-slate-300 flex-wrap">
                  <span className="flex items-center gap-2">
                    <span>📘</span>
                    {content.difficulty}: <span className="text-cyan-400 font-semibold">{course.difficulty[locale as 'ar' | 'en']}</span>
                  </span>
                  <span className="flex items-center gap-2">
                    <span>⏱️</span>
                    {content.duration}: <span className="text-cyan-400 font-semibold">{course.duration}</span>
                  </span>
                </div>

                {/* Progress Bar */}
                <div className="mb-5">
                  <div className="flex justify-between items-center mb-3">
                    <span className="text-xs text-slate-400 uppercase tracking-wider">{content.progress}</span>
                    <span className="text-sm font-bold text-cyan-400">{course.progress}%</span>
                  </div>
                  <div className="w-full bg-slate-800 rounded-full h-3 overflow-hidden border border-slate-600">
                    <div
                      className="bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500 h-3 rounded-full transition-all duration-500 ease-out shadow-lg shadow-cyan-500/30"
                      style={{ width: `${course.progress}%` }}
                    />
                  </div>
                </div>

                {/* Action Button */}
                <button className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white font-bold py-3 px-4 rounded-lg transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-cyan-500/20">
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
    </div>
  );
}
