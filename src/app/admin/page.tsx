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
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const router = useRouter();
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn);

  useEffect(() => {
    if (!isLoggedIn) {
      router.push('/login');
      return;
    }

    fetchUsers();
  }, [isLoggedIn, router]);

  useEffect(() => {
    // Filter users based on search term
    const filtered = users.filter((user) =>
      user.email.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredUsers(filtered);
  }, [searchTerm, users]);

  const fetchUsers = async () => {
    try {
      const response = await fetch('http://localhost:8000/api/auth/users/');
      const data = await response.json();
      setUsers(data);
      setFilteredUsers(data);
    } catch (err) {
      console.error('خطأ في جلب المستخدمين:', err);
    } finally {
      setLoading(false);
    }
  };

  const deleteUser = async (userId: number) => {
    if (!confirm('هل أنت متأكد من حذف هذا المستخدم؟')) return;

    try {
      const response = await fetch(`http://localhost:8000/api/auth/users/${userId}/delete/`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setUsers(users.filter((u) => u.id !== userId));
        alert('تم حذف المستخدم بنجاح');
      }
    } catch (err) {
      console.error('خطأ في حذف المستخدم:', err);
    }
  };

  if (loading) {
    return <div className="p-8 text-white">جاري التحميل...</div>;
  }

  return (
    <div className="min-h-screen bg-slate-900 p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-white mb-8">لوحة التحكم - المستخدمون</h1>

        {/* Search Box */}
        <div className="mb-6">
          <input
            type="text"
            placeholder="ابحث عن مستخدم بالبريد الإلكتروني..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full p-3 rounded bg-slate-700 text-white placeholder-gray-400 border border-slate-600 focus:border-blue-600 outline-none"
          />
        </div>

        {/* Users Table */}
        <div className="bg-slate-800 rounded-lg overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="bg-slate-700 text-white">
                <th className="px-6 py-4 text-left">الرقم</th>
                <th className="px-6 py-4 text-left">البريد الإلكتروني</th>
                <th className="px-6 py-4 text-left">تاريخ التسجيل</th>
                <th className="px-6 py-4 text-left">الإجراءات</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((user) => (
                <tr key={user.id} className="border-t border-slate-700 hover:bg-slate-700">
                  <td className="px-6 py-4 text-gray-300">{user.id}</td>
                  <td className="px-6 py-4 text-white font-semibold">{user.email}</td>
                  <td className="px-6 py-4 text-gray-400">
                    {new Date(user.created_at).toLocaleString('ar-JO')}
                  </td>
                  <td className="px-6 py-4">
                    <button
                      onClick={() => deleteUser(user.id)}
                      className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded transition-all"
                    >
                      حذف
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {filteredUsers.length === 0 && (
            <div className="text-center py-8 text-gray-400">
              {searchTerm ? 'لا توجد نتائج بحث' : 'لا توجد مستخدمون حتى الآن'}
            </div>
          )}
        </div>

        {/* Stats */}
        <div className="mt-6 grid grid-cols-2 gap-4">
          <div className="bg-slate-700 p-4 rounded text-white">
            <p>إجمالي المستخدمين: <span className="font-bold text-blue-400">{users.length}</span></p>
          </div>
          <div className="bg-slate-700 p-4 rounded text-white">
            <p>نتائج البحث: <span className="font-bold text-green-400">{filteredUsers.length}</span></p>
          </div>
        </div>
      </div>
    </div>
  );
}
