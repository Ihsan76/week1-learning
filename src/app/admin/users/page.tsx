'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/lib/store';

interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'user' | 'moderator';
  status: 'active' | 'inactive';
  joinedDate: string;
}

export default function UsersPage() {
  const router = useRouter();
  const { isLoggedIn } = useAuthStore((state) => state);
  const [isMounted, setIsMounted] = useState(false);
  const [users, setUsers] = useState<User[]>([
    {
      id: '1',
      name: 'احمد محمد',
      email: 'ahmed@example.com',
      role: 'admin',
      status: 'active',
      joinedDate: '2025-01-01',
    },
    {
      id: '2',
      name: 'فاطمة علي',
      email: 'fatima@example.com',
      role: 'user',
      status: 'active',
      joinedDate: '2025-01-05',
    },
    {
      id: '3',
      name: 'محمود حسن',
      email: 'mahmoud@example.com',
      role: 'moderator',
      status: 'inactive',
      joinedDate: '2025-01-10',
    },
  ]);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [filter, setFilter] = useState<'all' | 'active' | 'inactive'>('all');

  useEffect(() => {
    setIsMounted(true);
    if (!isLoggedIn) {
      router.push('/login');
    }
  }, [isLoggedIn, router]);

  const filteredUsers = users.filter((user) =>
    filter === 'all' ? true : user.status === filter
  );

  const handleDelete = (id: string) => {
    setUsers(users.filter((user) => user.id !== id));
  };

  const handleStatusChange = (id: string, newStatus: 'active' | 'inactive') => {
    setUsers(
      users.map((user) =>
        user.id === id ? { ...user, status: newStatus } : user
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
          <p className="text-slate-400">Manage users and their roles</p>
        </div>

        <div className="mb-6 flex gap-4">
          <button
            onClick={() => setFilter('all')}
            className={`px-4 py-2 rounded-lg transition ${
              filter === 'all'
                ? 'bg-cyan-600 text-white'
                : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
            }`}
          >
            الكل ({users.length})
          </button>
          <button
            onClick={() => setFilter('active')}
            className={`px-4 py-2 rounded-lg transition ${
              filter === 'active'
                ? 'bg-green-600 text-white'
                : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
            }`}
          >
            نشط ({users.filter((u) => u.status === 'active').length})
          </button>
          <button
            onClick={() => setFilter('inactive')}
            className={`px-4 py-2 rounded-lg transition ${
              filter === 'inactive'
                ? 'bg-red-600 text-white'
                : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
            }`}
          >
            غير نشط ({users.filter((u) => u.status === 'inactive').length})
          </button>
        </div>

        <div className="bg-slate-800 border border-slate-700 rounded-lg overflow-hidden">
          <table className="w-full">
            <thead className="bg-slate-700 border-b border-slate-600">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-semibold text-white">الاسم</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-white">البريد الإلكتروني</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-white">الدور</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-white">الحالة</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-white">تاريخ الانضمام</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-white">الإجراءات</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((user, idx) => (
                <tr
                  key={user.id}
                  className={`border-b border-slate-700 hover:bg-slate-700/50 transition ${
                    idx % 2 === 0 ? 'bg-slate-800/50' : ''
                  }`}
                >
                  <td className="px-6 py-4 text-white">{user.name}</td>
                  <td className="px-6 py-4 text-slate-300">{user.email}</td>
                  <td className="px-6 py-4">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${
                        user.role === 'admin'
                          ? 'bg-purple-500/20 text-purple-300'
                          : user.role === 'moderator'
                          ? 'bg-blue-500/20 text-blue-300'
                          : 'bg-slate-600 text-slate-300'
                      }`}
                    >
                      {user.role === 'admin'
                        ? 'مسؤول'
                        : user.role === 'moderator'
                        ? 'معدِّل'
                        : 'مستخدم'}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    {editingId === user.id ? (
                      <select
                        value={user.status}
                        onChange={(e) =>
                          handleStatusChange(
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
                        className={`px-3 py-1 rounded-full text-xs font-medium cursor-pointer ${
                          user.status === 'active'
                            ? 'bg-green-500/20 text-green-300'
                            : 'bg-red-500/20 text-red-300'
                        }`}
                        onClick={() => setEditingId(user.id)}
                      >
                        {user.status === 'active' ? 'نشط' : 'غير نشط'}
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4 text-slate-400 text-sm">{user.joinedDate}</td>
                  <td className="px-6 py-4">
                    <button
                      onClick={() => handleDelete(user.id)}
                      className="px-4 py-1 bg-red-600 text-white rounded text-sm hover:bg-red-700 transition"
                    >
                      حذف
                    </button>
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
