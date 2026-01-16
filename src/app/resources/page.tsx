'use client';

import Link from 'next/link';
import { useLocaleStore } from '@/lib/localeStore';

const getContent = (locale: string) => {
  if (locale === 'ar') {
    return {
      resources: 'الموارد التعليمية',
      description: 'المراجع والمواد الماهمة للتعلم',
      reference: 'مراجع',
      tools: 'الأدوات',
      readMore: 'قراءة المزيد',
    };
  }
  return {
    resources: 'Learning Resources',
    description: 'Essential references and materials for learning',
    reference: 'References',
    tools: 'Tools',
    readMore: 'Read More',
  };
};

const resources = [
  {
    title: 'MDN Web Docs',
    titleAr: 'وثائق MDN الويب',
    description: 'Comprehensive web technology reference',
    descriptionAr: 'مرجع شامل لتكنولوجيا الويب',
    link: 'https://developer.mozilla.org',
    icon: '🎨',
  },
  {
    title: 'W3C Standards',
    titleAr: 'معايير W3C',
    description: 'Web standards and specifications',
    descriptionAr: 'معايير ومواصفات الويب',
    link: 'https://www.w3.org',
    icon: '🌐',
  },
];

export default function ResourcesPage() {
  const { locale } = useLocaleStore((state) => state);
  const content = getContent(locale);

  return (
    <div className="min-h-screen bg-bg-dark pt-24 pb-12">
      <div className="container mx-auto px-4 md:px-8">
        <div className="mb-12">
          <h1 className="hero-title mb-4">{content.resources}</h1>
          <p className="text-text-slate-400">{content.description}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {resources.map((res, idx) => (
            <a
              key={idx}
              href={res.link}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-bg-darker border border-primary-dark rounded-lg p-8 hover:border-primary transition"
            >
              <div className="text-4xl mb-4">{res.icon}</div>
              <h3 className="section-title mb-2">{locale === 'ar' ? res.titleAr : res.title}</h3>
              <p className="text-text-secondary">{locale === 'ar' ? res.descriptionAr : res.description}</p>
              <button className="btn-primary px-4 py-2 mt-4 rounded text-sm">
                {content.readMore}
              </button>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
