'use client';

import { useLocaleStore } from '@/lib/localeStore';

const getContent = (locale: string) => {
  if (locale === 'ar') {
    return {
      weekOne: 'الأسبوع الأول',
      schedule: 'جدول الأسبوع',
      day: 'اليوم',
      topic: 'الموضوع',
      duration: 'المدة',
      resources: 'الموارد',
      exercises: 'التمارين',
      monday: 'الاثنين',
      tuesday: 'الثلاثاء',
      wednesday: 'الأربعاء',
      thursday: 'الخميس',
      friday: 'الجمعة',
    };
  }
  return {
    weekOne: 'Week One',
    schedule: 'Weekly Schedule',
    day: 'Day',
    topic: 'Topic',
    duration: 'Duration',
    resources: 'Resources',
    exercises: 'Exercises',
    monday: 'Monday',
    tuesday: 'Tuesday',
    wednesday: 'Wednesday',
    thursday: 'Thursday',
    friday: 'Friday',
  };
};

export default function Week1Page() {
  const { locale } = useLocaleStore((state) => state);
  const content = getContent(locale);

  const weekSchedule = [
    {
      day: content.monday,
      topic: 'HTML Basics',
      duration: '2 hours',
      resources: ['Introduction to HTML', 'HTML Tags & Elements'],
      exercises: ['Create a basic HTML page'],
    },
    {
      day: content.tuesday,
      topic: 'CSS Styling',
      duration: '2 hours',
      resources: ['CSS Basics', 'Selectors & Properties'],
      exercises: ['Style HTML with CSS'],
    },
    {
      day: content.wednesday,
      topic: 'JavaScript Fundamentals',
      duration: '3 hours',
      resources: ['JS Variables', 'Functions & Events'],
      exercises: ['Build interactive components'],
    },
    {
      day: content.thursday,
      topic: 'Responsive Design',
      duration: '2 hours',
      resources: ['Mobile First', 'Media Queries'],
      exercises: ['Create responsive layout'],
    },
    {
      day: content.friday,
      topic: 'Project & Review',
      duration: '4 hours',
      resources: ['Week 1 Summary', 'Project Guidelines'],
      exercises: ['Complete Week 1 Project'],
    },
  ];

  return (
    <div className="min-h-screen bg-bg-dark pt-24 pb-12">
      <div className="container mx-auto px-4 md:px-8">
        {/* Page Title */}
        <div className="mb-12">
          <h1 className="hero-title mb-4">{content.weekOne}</h1>
          <p className="text-text-slate-400">Complete curriculum and schedule</p>
        </div>

        {/* Schedule Table */}
        <div className="bg-bg-darker border border-primary-dark rounded-lg overflow-hidden mb-12">
          <table className="w-full">
            <thead>
              <tr className="bg-primary-dark bg-opacity-20 border-b border-primary-dark">
                <th className="px-6 py-4 text-left">{content.day}</th>
                <th className="px-6 py-4 text-left">{content.topic}</th>
                <th className="px-6 py-4 text-left">{content.duration}</th>
              </tr>
            </thead>
            <tbody>
              {weekSchedule.map((item, idx) => (
                <tr key={idx} className="border-b border-text-slate-700 hover:bg-bg-darker transition">
                  <td className="px-6 py-4 text-text-primary">{item.day}</td>
                  <td className="px-6 py-4 text-text-primary">{item.topic}</td>
                  <td className="px-6 py-4 text-text-secondary">{item.duration}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Details Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {weekSchedule.map((item, idx) => (
            <div key={idx} className="bg-bg-darker border border-primary-dark rounded-lg p-6">
              <h3 className="section-title mb-4">{item.day} - {item.topic}</h3>
              <div className="space-y-4">
                <div>
                  <p className="text-text-secondary text-sm font-medium mb-2">Resources:</p>
                  <ul className="list-disc list-inside space-y-1">
                    {item.resources.map((res, i) => (
                      <li key={i} className="text-text-secondary">{res}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <p className="text-text-secondary text-sm font-medium mb-2">Exercises:</p>
                  <ul className="list-disc list-inside space-y-1">
                    {item.exercises.map((ex, i) => (
                      <li key={i} className="text-text-secondary">{ex}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
