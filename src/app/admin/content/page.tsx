'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/lib/store';

interface Content {
  id: string;
  title: string;
  type: 'article' | 'video' | 'tutorial';
  author: string;
  status: 'draft' | 'published' | 'archived';
  createdDate: string;
  views: number;
}

export default function ContentPage() {
  const router = useRouter();
  const { isLoggedIn } = useAuthStore((state) => state);
  const [isMounted, setIsMounted] = useState(false);
  const [contents, setContents] = useState<Content[]>([
    {
      id: '1',
      title: 'Next.js بدايات سهلة',
      type: 'article',
      author: 'احمد',
      status: 'published',
      createdDate: '2025-01-10',
      views: 450,
    },
    {
      id: '2',
      title: 'React Hooks شرح مفصل',
      type: 'tutorial',
      author: 'فاطمة',
      status: 'published',
      createdDate: '2025-01-08',
      views: 320,
    },
    {
      id: '3',
      title: 'TypeScript للمبتدئين',
      type: 'video',
      author: 'محمود',
      status: 'draft',
      createdDate: '2025-01-15',
      views: 0,
    },
  ]);
  const [filter, setFilter] = useState<'all' | 'draft' | 'published' | 'archived'>('all');

  useEffect(() => {
    setIsMounted(true);
    if (!isLoggedIn) {
      router.push('/login');
    }
  }, [isLoggedIn, router]);

  const filteredContents = contents.filter((c) =>
    filter === 'all' ? true : c.status === filter
  );

  const handleDelete = (id: string) => {
    setContents(contents.filter((c) => c.id !== id));
  };

  const handlePublish = (id: string) => {
    setContents(
      contents.map((c) =>
        c.id === id ? { ...c, status: 'published' } : c
      )
    );
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'article':
        return '📄';
      case 'video':
        return '🎥';
      case 'tutorial':
        return '📚';
      default:
        return '📄';
    }
  };

  if (!isMounted) return null;

  return (
    <div className="min-h-screen bg-slate-900 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8 flex justify-between items-start">
          <div>
            <h1 className="text-4xl font-bold text-white mb-2">إدارة المحتوى</h1>
            <p className="text-slate-400">Create and manage your content</p>
          </div>
          <button className="px-6 py-2 bg-cyan-600 text-white rounded-lg hover:bg-cyan-700 transition">
            + محتوى جديد
          </button>
        </div>

        <div className="mb-6 flex gap-2 flex-wrap">
          {['all', 'draft', 'published', 'archived'].map((status) => (
            <button
              key={status}
              onClick={() => setFilter(status as any)}
              className={`px-4 py-2 rounded-lg transition ${
                filter === status
                  ? 'bg-cyan-600 text-white'
                  : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
              }`}
            >
              {status === 'all'
                ? 'الكل'
                : status === 'draft'
                ? 'مسودات'
                : status === 'published'
                ? 'منشورة'
                : 'مرحفوضة'}
            </button>
          ))}
        </div>

        <div className="grid gap-6">
          {filteredContents.map((content) => (
            <div
              key={content.id}
              className="bg-slate-800 border border-slate-700 rounded-lg p-6 hover:border-slate-600 transition"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-start gap-4 flex-1">
                  <div className="text-4xl">{getTypeIcon(content.type)}</div>
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-white mb-2">{content.title}</h3>
                    <div className="flex gap-4 text-sm text-slate-400">
                      <span>بواسطة: {content.author}</span>
                      <span>التاريخ: {content.createdDate}</span>
                      <span>المعاينات: {content.views}</span>
                    </div>
                  </div>
                </div>
                <div className="flex gap-2">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium ${
                      content.status === 'published'
                        ? 'bg-green-500/20 text-green-300'
                        : content.status === 'draft'
                        ? 'bg-yellow-500/20 text-yellow-300'
                        : 'bg-red-500/20 text-red-300'
                    }`}
                  >
                    {content.status === 'published'
                      ? 'منشور'
                      : content.status === 'draft'
                      ? 'مسودة'
                      : 'مرحفوظ'}
                  </span>
                </div>
              </div>
              <div className="flex gap-4">
                {content.status === 'draft' && (
                  <button
                    onClick={() => handlePublish(content.id)}
                    className="px-4 py-2 bg-green-600 text-white rounded-lg text-sm hover:bg-green-700 transition"
                  >
                    نشر
                  </button>
                )}
                <button
                  onClick={() => handleDelete(content.id)}
                  className="px-4 py-2 bg-red-600 text-white rounded-lg text-sm hover:bg-red-700 transition"
                >
                  حذف
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
