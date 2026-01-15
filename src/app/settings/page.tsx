// src/app/settings/page.tsx

'use client';

import { useAuthStore } from '@/lib/store';

export default function SettingsPage() {
  const user = useAuthStore((state) => state.user);

  return (
    <div className="min-h-screen bg-slate-900 p-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold text-white mb-8">الإعدادات</h1>

        {/* Account Settings */}
        <div className="bg-slate-800 p-6 rounded-lg mb-6">
          <h2 className="text-2xl font-bold text-white mb-4">بيانات الحساب</h2>
          <div className="space-y-4">
            <div>
              <label className="text-gray-300 block mb-2">البريد الإلكتروني</label>
              <input 
                type="email" 
                value={user?.email || ''} 
                disabled
                className="w-full p-3 bg-slate-700 text-gray-400 rounded border border-slate-600 cursor-not-allowed"
              />
            </div>
          </div>
        </div>

        {/* Preferences */}
        <div className="bg-slate-800 p-6 rounded-lg mb-6">
          <h2 className="text-2xl font-bold text-white mb-4">التفضيلات</h2>
          <div className="space-y-4">
            <label className="flex items-center cursor-pointer">
              <input type="checkbox" defaultChecked className="w-5 h-5 rounded" />
              <span className="text-gray-300 ml-3">إشعارات البريد الإلكتروني</span>
            </label>
            <label className="flex items-center cursor-pointer">
              <input type="checkbox" defaultChecked className="w-5 h-5 rounded" />
              <span className="text-gray-300 ml-3">الوضع الداكن</span>
            </label>
          </div>
        </div>

        {/* Danger Zone */}
        <div className="bg-red-900 bg-opacity-20 border border-red-700 p-6 rounded-lg">
          <h2 className="text-2xl font-bold text-red-400 mb-4">منطقة الخطر</h2>
          <button className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-2 rounded transition-all">
            حذف الحساب
          </button>
        </div>
      </div>
    </div>
  );
}
