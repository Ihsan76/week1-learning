// src/app/admin/page.tsx

'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/lib/store';

interface User {
  id: number;
  email: string;
  created_at: string;
}

export default function AdminPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn);

  useEffect(() => {
    if (!isLoggedIn) {
      router.push('/login');
      return;
    }

    fetchUsers();
  }, [isLoggedIn, router]);

  const fetchUsers = async () => {
    try {
      const response = await fetch('http://localhost:8000/api/auth/users/');
      const data = await response.json();
      setUsers(data);
    } catch (err) {
      console.error('خطأ في جلب المستخدمين:', err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="p-8 text-white">جاري التحميل...</div>;
  }

  return (
    <div className="min-h-screen bg-slate-900 p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-white mb-8">لوحة التحكم - المستخدمون</h1>

        <div className="bg-slate-800 rounded-lg overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="bg-slate-700 text-white">
                <th className="px-6 py-4 text-left">الرقم</th>
                <th className="px-6 py-4 text-left">البريد الإلكتروني</th>
                <th className="px-6 py-4 text-left">تاريخ التسجيل</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id} className="border-t border-slate-700 hover:bg-slate-700">
                  <td className="px-6 py-4 text-gray-300">{user.id}</td>
                  <td className="px-6 py-4 text-white font-semibold">{user.email}</td>
                  <td className="px-6 py-4 text-gray-400">
                    {new Date(user.created_at).toLocaleString('ar-JO')}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {users.length === 0 && (
            <div className="text-center py-8 text-gray-400">
              لا توجد مستخدمون حتى الآن
            </div>
          )}
        </div>

        <div className="mt-6 bg-slate-700 p-4 rounded text-white">
          <p>إجمالي المستخدمين: <span className="font-bold text-blue-400">{users.length}</span></p>
        </div>
      </div>
    </div>
  );
}
