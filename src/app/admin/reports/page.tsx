'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/lib/store';

interface ReportData {
  id: string;
  title: string;
  date: string;
  views: number;
  clicks: number;
  engagement: number;
}

export default function ReportsPage() {
  const router = useRouter();
  const { isLoggedIn } = useAuthStore((state) => state);
  const [isMounted, setIsMounted] = useState(false);
  const [reports, setReports] = useState<ReportData[]>([
    {
      id: '1',
      title: 'تقرير الترافيك',
      date: '2025-01-15',
      views: 2500,
      clicks: 480,
      engagement: 19.2,
    },
    {
      id: '2',
      title: 'تقرير المستخدمين',
      date: '2025-01-14',
      views: 3200,
      clicks: 640,
      engagement: 20.0,
    },
    {
      id: '3',
      title: 'تقرير الأداء',
      date: '2025-01-13',
      views: 1900,
      clicks: 360,
      engagement: 18.9,
    },
  ]);
  const [selectedReport, setSelectedReport] = useState<string | null>(null);

  useEffect(() => {
    setIsMounted(true);
    if (!isLoggedIn) {
      router.push('/academy/login');
    }
  }, [isLoggedIn, router]);

  const totalViews = reports.reduce((sum, r) => sum + r.views, 0);
  const totalClicks = reports.reduce((sum, r) => sum + r.clicks, 0);
  const avgEngagement =
    reports.length > 0
      ? (reports.reduce((sum, r) => sum + r.engagement, 0) / reports.length).toFixed(1)
      : 0;

  if (!isMounted) return null;

  return (
    <div className="min-h-screen bg-slate-900 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">التقارير</h1>
          <p className="text-slate-400">View analytics and performance reports</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-lg p-6 text-white">
            <div className="text-sm opacity-90">Total Views</div>
            <div className="text-4xl font-bold mt-2">{totalViews.toLocaleString()}</div>
          </div>
          <div className="bg-gradient-to-br from-green-600 to-green-700 rounded-lg p-6 text-white">
            <div className="text-sm opacity-90">Total Clicks</div>
            <div className="text-4xl font-bold mt-2">{totalClicks.toLocaleString()}</div>
          </div>
          <div className="bg-gradient-to-br from-purple-600 to-purple-700 rounded-lg p-6 text-white">
            <div className="text-sm opacity-90">Avg Engagement</div>
            <div className="text-4xl font-bold mt-2">{avgEngagement}%</div>
          </div>
        </div>

        <div className="bg-slate-800 border border-slate-700 rounded-lg overflow-hidden">
          <table className="w-full">
            <thead className="bg-slate-700 border-b border-slate-600">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-semibold text-white">العنوان</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-white">التاريخ</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-white">المعاينات</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-white">النقرات</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-white">التفاعل</th>
              </tr>
            </thead>
            <tbody>
              {reports.map((report, idx) => (
                <tr
                  key={report.id}
                  onClick={() => setSelectedReport(report.id)}
                  className={`border-b border-slate-700 hover:bg-slate-700/50 transition cursor-pointer ${
                    idx % 2 === 0 ? 'bg-slate-800/50' : ''
                  } ${
                    selectedReport === report.id ? 'bg-cyan-500/20' : ''
                  }`}
                >
                  <td className="px-6 py-4 text-white font-medium">{report.title}</td>
                  <td className="px-6 py-4 text-slate-300">{report.date}</td>
                  <td className="px-6 py-4">
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-500/20 text-blue-300">
                      {report.views.toLocaleString()}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-500/20 text-green-300">
                      {report.clicks.toLocaleString()}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-purple-500/20 text-purple-300">
                      {report.engagement}%
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
