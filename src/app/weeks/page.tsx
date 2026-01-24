'use client';

import Link from 'next/link';
import { useLocaleStore } from '@/lib/localeStore';
import { allWeeks } from '@/lib/curriculum';
import { useLocaleContext } from '@/context/LocaleContext';




export default function WeeksPage() {
  const { dict, locale, isLoading } = useLocaleContext();
  if (isLoading || !dict) return null;

  const t = dict.allWeeks;
    return (
    <div className="min-h-screen bg-bg-dark pt-24 pb-12">
      <div className="container mx-auto px-4 md:px-8">
        {/* Page Title */}
        <div className="mb-12">
          <h1 className="hero-title mb-4">{t.allWeeks}</h1>
          <p className="text-text-slate-400">{t.selectWeek}</p>
        </div>

        {/* Weeks Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {allWeeks.map((week) => (
            <Link
              key={week.id}
              href={`/week-${week.id}`}
              className="bg-bg-darker border border-primary-dark rounded-lg p-8 text-center hover:border-primary transition"
            >
              <div className="text-4xl mb-4">📚</div>
              <h3 className="section-title mb-4">
                {locale === 'ar' ? week.titleAr : week.title}
              </h3>
              <button className="btn-primary px-6 py-2 rounded-lg text-sm">
                {t.view}
              </button>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
