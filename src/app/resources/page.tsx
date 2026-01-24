'use client';

import Link from 'next/link';
import { useLocaleContext } from '@/context/LocaleContext';


export default function ResourcesPage() {
  
  
  const { dict, locale, isLoading } = useLocaleContext();
  if (isLoading || !dict) return null;

  const t = dict.resource;
  return (
    <div className="min-h-screen bg-bg-dark pt-24 pb-12">
      <div className="container mx-auto px-4 md:px-8">
        <div className="mb-12">
          <h1 className="hero-title mb-4">{t.resource}</h1>
          <p className="text-text-slate-400">{t.description}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {t.resources.map((res, idx) => (
            <a
              key={idx}
              href={res.link}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-bg-darker border border-primary-dark rounded-lg p-8 hover:border-primary transition"
            >
              <div className="text-4xl mb-4">{res.icon}</div>
              <h3 className="section-title mb-2">{res.title}</h3>
              <p className="text-text-secondary">{res.description}</p>
              <button className="btn-primary px-4 py-2 mt-4 rounded text-sm">
                {t.readMore}
              </button>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
