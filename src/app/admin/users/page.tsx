// src/app/admin/users/page.tsx
'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/lib/store';
import { apiFetch } from '@/lib/api';

interface User {
  id: number;
  email: string;
  full_name: string;
  role: 'student' | 'instructor' | 'admin';
  is_active: boolean;
  language: string;
  timezone: string;
  created_at: string;
}

type Filter = 'all' | 'active' | 'inactive';

export default function UsersPage() {
  const router = useRouter();
  const { isLoggedIn } = useAuthStore((state) => state);

  const [isMounted, setIsMounted] = useState(false);
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [editingId, setEditingId] = useState<number | null>(null);
  const [filter, setFilter] = useState<Filter>('all');

  useEffect(() => {
    setIsMounted(true);
    if (!isLoggedIn) {
      router.push('/login');
    }
  }, [isLoggedIn, router]);

  useEffect(() => {
    if (!isMounted || !isLoggedIn) return;

    async function fetchUsers() {
      setLoading(true);
      setError('');

      try {
        const data: User[] = await apiFetch('/api/auth/users/');
        setUsers(data);
      } catch (err) {
        setError('فشل في تحميل قائمة المستخدمين');
      } finally {
        setLoading(false);
      }
    }

    fetchUsers();
  }, [isMounted, isLoggedIn]);

  const filteredUsers = users.filter((user) =>
    filter === 'all'
      ? true
      : filter === 'active'
        ? user.is_active
        : !user.is_active
  );

  const handleDelete = async (id: number) => {
    try {
      await apiFetch(`/api/auth/users/${id}/delete/`, {
        method: 'DELETE',
      });
      setUsers((prev) => prev.filter((user) => user.id !== id));
    } catch (err) {
      console.error(err);
      alert('تعذّر تنفيذ الحذف، حاول مرة أخرى.');
    }
  };

  const handleStatusChangeLocal = (id: number, newStatus: 'active' | 'inactive') => {
    // لاحقاً نربطه مع PATCH/PUT من الـ backend
    setUsers((prev) =>
      prev.map((user) =>
        user.id === id ? { ...user, is_active: newStatus === 'active' } : user
      )
    );
    setEditingId(null);
  };

  if (!isMounted) return null;

  return (
    <div className="min-h-screen bg-slate-900 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">إدارة المستخدمين</h1>
          <p className="text-slate-400">Manage users, roles, and status</p>
        </div>

        {error && (
          <div className="mb-4 rounded-lg border border-red-500/60 bg-red-500/10 px-4 py-3 text-sm text-red-200">
            {error}
          </div>
        )}

        <div className="mb-6 flex gap-4">
          <button
            onClick={() => setFilter('all')}
            className={`px-4 py-2 rounded-lg transition ${filter === 'all'
              ? 'bg-cyan-600 text-white'
              : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
              }`}
          >
            الكل ({users.length})
          </button>
          <button
            onClick={() => setFilter('active')}
            className={`px-4 py-2 rounded-lg transition ${filter === 'active'
              ? 'bg-green-600 text-white'
              : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
              }`}
          >
            نشط ({users.filter((u) => u.is_active).length})
          </button>
          <button
            onClick={() => setFilter('inactive')}
            className={`px-4 py-2 rounded-lg transition ${filter === 'inactive'
              ? 'bg-red-600 text-white'
              : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
              }`}
          >
            غير نشط ({users.filter((u) => !u.is_active).length})
          </button>
        </div>

        <div className="bg-slate-800 border border-slate-700 rounded-lg overflow-hidden">
          {loading ? (
            <div className="p-6 text-center text-slate-300 text-sm">
              جاري تحميل المستخدمين...
            </div>
          ) : filteredUsers.length === 0 ? (
            <div className="p-6 text-center text-slate-300 text-sm">
              لا توجد بيانات لعرضها.
            </div>
          ) : (
            <table className="w-full">
              <thead className="bg-slate-700 border-b border-slate-600">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-white">
                    الاسم
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-white">
                    البريد الإلكتروني
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-white">
                    الدور
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-white">
                    الحالة
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-white">
                    تاريخ الانضمام
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-white">
                    الإجراءات
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.map((user, idx) => (
                  <tr
                    key={user.id}
                    className={`border-b border-slate-700 hover:bg-slate-700/50 transition ${idx % 2 === 0 ? 'bg-slate-800/50' : ''
                      }`}
                  >
                    <td className="px-6 py-4 text-white">
                      {user.full_name || user.email.split('@')[0]}
                    </td>
                    <td className="px-6 py-4 text-slate-300">{user.email}</td>
                    <td className="px-6 py-4">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium ${user.role === 'admin'
                          ? 'bg-purple-500/20 text-purple-300'
                          : user.role === 'instructor'
                            ? 'bg-blue-500/20 text-blue-300'
                            : 'bg-slate-600 text-slate-300'
                          }`}
                      >
                        {user.role === 'admin'
                          ? 'مسؤول'
                          : user.role === 'instructor'
                            ? 'مدرّس'
                            : 'طالب'}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      {editingId === user.id ? (
                        <select
                          value={user.is_active ? 'active' : 'inactive'}
                          onChange={(e) =>
                            handleStatusChangeLocal(
                              user.id,
                              e.target.value as 'active' | 'inactive'
                            )
                          }
                          className="px-2 py-1 bg-slate-700 border border-slate-600 rounded text-white text-sm"
                        >
                          <option value="active">نشط</option>
                          <option value="inactive">غير نشط</option>
                        </select>
                      ) : (
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-medium cursor-pointer ${user.is_active
                            ? 'bg-green-500/20 text-green-300'
                            : 'bg-red-500/20 text-red-300'
                            }`}
                          onClick={() => setEditingId(user.id)}
                        >
                          {user.is_active ? 'نشط' : 'غير نشط'}
                        </span>
                      )}
                    </td>
                    <td className="px-3 py-4 text-slate-400 text-sm">
                      {new Date(user.created_at).toLocaleDateString('ar-EG')}
                    </td>
                    <td className="px-3 py-4">
                      <button
                        onClick={() => handleDelete(user.id)}
                        className="px-2 py-1 bg-red-600 text-white rounded text-sm hover:bg-red-700 transition"
                      >
                        حذف
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}
