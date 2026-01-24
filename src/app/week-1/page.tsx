// src/app/week-1/page.tsx
'use client';

import { useLocaleStore } from '@/lib/localeStore';
import { useLocaleContext } from '@/context/LocaleContext';



export default function Week1Page() {
  
  const { dict, locale, isLoading } = useLocaleContext();
  if (isLoading || !dict) return null;

  const t = dict.weekOne;

  
  return (
    <div className="min-h-screen bg-bg-dark pt-24 pb-12">
      <div className="container mx-auto px-4 md:px-8">
        {/* Page Title */}
        <div className="mb-12">
          <h1 className="hero-title mb-4">{t.title}</h1>
          <p className="text-text-slate-400">Complete curriculum and schedule</p>
        </div>

        {/* Schedule Table */}
        <div className="bg-bg-darker border border-primary-dark rounded-lg overflow-hidden mb-12">
          <table className="w-full">
            <thead>
              <tr className="bg-primary-dark bg-opacity-20 border-b border-primary-dark">
                <th className="px-6 py-4 text-left">{t.day}</th>
                <th className="px-6 py-4 text-left">{t.topic}</th>
                <th className="px-6 py-4 text-left">{t.duration}</th>
              </tr>
            </thead>
            <tbody>
              {t.weekSchedule.map((item, idx) => (
                <tr key={idx} className="border-b border-text-slate-700 hover:bg-bg-darker transition">
                  <td className="px-6 py-4 text-text-primary">{item.title}</td>
                  <td className="px-6 py-4 text-text-primary">{item.description}</td>
                  <td className="px-6 py-4 text-text-secondary">{item.duration}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Details Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {t.weekSchedule.map((item, idx) => (
            <div key={idx} className="bg-bg-darker border border-primary-dark rounded-lg p-6">
              <h3 className="section-title mb-4">{item.title} </h3>
              <div className="space-y-4">
                <div>
                  <p className="text-text-secondary">{item.description}</p>
                  <p className="text-text-secondary text-sm font-medium mb-2">{t.resource}:</p>
                  <ul className="list-disc list-inside space-y-1">
                    {item.resources.map((res, i) => (
                      <li key={i} className="text-text-secondary">{res}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <p className="text-text-secondary text-sm font-medium mb-2">{t.exercises}:</p>
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
