// src/app/admin/users/page.tsx
'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/lib/store';
import { apiFetch } from '@/lib/api';
import { useLocaleContext } from '@/context/LocaleContext';
import Portal from '@/components/Portal';


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
  const { dict, isLoading } = useLocaleContext();

  const [isMounted, setIsMounted] = useState(false);
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [savingEdit, setSavingEdit] = useState(false);
  const [filter, setFilter] = useState<Filter>('all');

  // حماية الصفحة
  useEffect(() => {
    setIsMounted(true);
    if (!isLoggedIn) {
      router.push('/login');
    }
  }, [isLoggedIn, router]);

  // جلب المستخدمين
  useEffect(() => {
    if (!isMounted || !isLoggedIn || !dict || isLoading) return;

    async function fetchUsers() {
      setLoading(true);
      setError('');
      try {
        const data: User[] = await apiFetch('/api/auth/users/');
        setUsers(data);
      } catch (err) {
        setError(dict!.admin.usersContent.errorLoadingUsers);
      } finally {
        setLoading(false);
      }
    }

    fetchUsers();
  }, [isMounted, isLoggedIn, dict, isLoading]);

  // قفل سكرول الخلفية عند فتح المودال
  useEffect(() => {
    if (editingUser) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [editingUser]);

  useEffect(() => {
    const adminMain = document.getElementById('admin-main') as HTMLElement | null;
    if (!adminMain) return;

    const prevOverflow = adminMain.style.overflowY;

    if (editingUser) adminMain.style.overflowY = 'hidden';
    else adminMain.style.overflowY = 'auto';

    return () => {
      adminMain.style.overflowY = prevOverflow || 'auto';
    };
  }, [editingUser]);



  if (!dict || !isMounted || isLoading) {
    return (
      <div className="min-h-screen bg-slate-900 p-8 text-slate-200">
        {dict?.admin.usersContent.loading ?? '...'}
      </div>
    );
  }

  const content = dict.admin.usersContent;

  const filteredUsers = users.filter((user) =>
    filter === 'all'
      ? true
      : filter === 'active'
        ? user.is_active
        : !user.is_active
  );

  const handleDelete = async (id: number) => {
    try {
      await apiFetch(`/api/auth/users/${id}/delete/`, { method: 'DELETE' });
      setUsers((prev) => prev.filter((user) => user.id !== id));
    } catch (err) {
      console.error(err);
      alert(content.errorDeletingUser);
    }
  };

  const openEditModal = (user: User) => setEditingUser(user);
  const closeEditModal = () => setEditingUser(null);

  const handleEditFieldChange = (
    field: keyof Pick<
      User,
      'full_name' | 'role' | 'language' | 'timezone' | 'is_active'
    >,
    value: string | boolean
  ) => {
    if (!editingUser) return;
    setEditingUser({ ...editingUser, [field]: value as any });
  };

  const handleSaveEdit = async () => {
    if (!editingUser) return;
    setSavingEdit(true);
    setError('');
    try {
      const payload = {
        full_name: editingUser.full_name,
        role: editingUser.role,
        language: editingUser.language,
        timezone: editingUser.timezone,
        is_active: editingUser.is_active,
      };
      const updated: User = await apiFetch(
        `/api/auth/users/${editingUser.id}/update/`,
        {
          method: 'PATCH',
          body: JSON.stringify(payload),
        }
      );
      setUsers((prev) => prev.map((u) => (u.id === updated.id ? updated : u)));
      closeEditModal();
    } catch (err) {
      console.error(err);
      setError(content.errorUpdatingUser);
    } finally {
      setSavingEdit(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 p-8 relative">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">
            {content.title}
          </h1>
          <p className="text-slate-400">{content.description}</p>
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
            {content.filterAll} ({users.length})
          </button>
          <button
            onClick={() => setFilter('active')}
            className={`px-4 py-2 rounded-lg transition ${filter === 'active'
              ? 'bg-green-600 text-white'
              : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
              }`}
          >
            {content.active} ({users.filter((u) => u.is_active).length})
          </button>
          <button
            onClick={() => setFilter('inactive')}
            className={`px-4 py-2 rounded-lg transition ${filter === 'inactive'
              ? 'bg-red-600 text-white'
              : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
              }`}
          >
            {content.inactive} ({users.filter((u) => !u.is_active).length})
          </button>
        </div>

        <div className="bg-slate-800 border border-slate-700 rounded-lg overflow-hidden">
          {loading ? (
            <div className="p-6 text-center text-slate-300 text-sm">
              {content.loadingUsers}...
            </div>
          ) : filteredUsers.length === 0 ? (
            <div className="p-6 text-center text-slate-300 text-sm">
              {content.noUsers}
            </div>
          ) : (
            <table className="w-full">
              <thead className="bg-slate-700 border-b border-slate-600">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-white">
                    {content.name}
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-white">
                    {content.email}
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-white">
                    {content.role}
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-white">
                    {content.status}
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-white">
                    {content.registeredAt}
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-white">
                    {content.actions}
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
                    <td className="px-6 py-4 text-slate-300">
                      {user.email}
                    </td>
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
                          ? content.admin
                          : user.role === 'instructor'
                            ? content.instructor
                            : content.student}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium ${user.is_active
                          ? 'bg-green-500/20 text-green-300'
                          : 'bg-red-500/20 text-red-300'
                          }`}
                      >
                        {user.is_active ? content.active : content.inactive}
                      </span>
                    </td>
                    <td className="px-3 py-4 text-slate-400 text-sm">
                      {new Date(user.created_at).toLocaleDateString('ar-EG')}
                    </td>
                    <td className="px-3 py-4 flex gap-2">
                      <button
                        onClick={() => openEditModal(user)}
                        className="px-2 py-1 bg-slate-600 text-white rounded text-sm hover:bg-slate-500 transition"
                      >
                        {content.edit}
                      </button>
                      <button
                        onClick={() => handleDelete(user.id)}
                        className="px-2 py-1 bg-red-600 text-white rounded text-sm hover:bg-red-700 transition"
                      >
                        {content.delete}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>

      {editingUser && (
        <Portal>
          <div className="w-[min(680px,92vw)] rounded-2xl bg-slate-900 border border-slate-700 shadow-2xl">
            {/* Header */}
            <div className="flex items-center justify-between border-b border-slate-800 px-6 py-4">
              <h2 className="text-lg font-semibold text-white">{content.editUserTitle}</h2>
              <button
                onClick={closeEditModal}
                className="h-9 w-9 rounded-lg grid place-items-center text-slate-300 hover:bg-slate-800 hover:text-white"
                disabled={savingEdit}
                aria-label="Close"
              >
                ×
              </button>
            </div>

            {/* Body */}
            <div className="px-6 py-5 max-h-[70vh] overflow-y-auto">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Email (full) */}
                <div className="md:col-span-2">
                  <label className="block text-xs font-medium text-slate-300 mb-1">
                    {content.email}
                  </label>
                  <input
                    type="email"
                    value={editingUser.email}
                    readOnly
                    className="w-full rounded-lg border border-slate-700 bg-slate-800 px-3 py-2 text-sm text-slate-300"
                  />
                </div>

                {/* Full name */}
                <div className="md:col-span-2">
                  <label className="block text-xs font-medium text-slate-300 mb-1">
                    {content.name}
                  </label>
                  <input
                    type="text"
                    value={editingUser.full_name}
                    onChange={(e) => handleEditFieldChange('full_name', e.target.value)}
                    className="w-full rounded-lg border border-slate-700 bg-slate-800 px-3 py-2 text-sm text-white outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20"
                  />
                </div>

                {/* Role */}
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">
                    {content.role}
                  </label>
                  <select
                    value={editingUser.role}
                    onChange={(e) => handleEditFieldChange('role', e.target.value as User['role'])}
                    className="w-full rounded-lg border border-slate-700 bg-slate-800 px-3 py-2 text-sm text-white outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20"
                  >
                    <option value="student">{content.student}</option>
                    <option value="instructor">{content.instructor}</option>
                    <option value="admin">{content.admin}</option>
                  </select>
                </div>

                {/* Status */}
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">
                    {content.status}
                  </label>
                  <select
                    value={editingUser.is_active ? 'active' : 'inactive'}
                    onChange={(e) => handleEditFieldChange('is_active', e.target.value === 'active')}
                    className="w-full rounded-lg border border-slate-700 bg-slate-800 px-3 py-2 text-sm text-white outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20"
                  >
                    <option value="active">{content.active}</option>
                    <option value="inactive">{content.inactive}</option>
                  </select>
                </div>

                {/* Language */}
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">
                    {content.Language}
                  </label>
                  <select
                    value={editingUser.language}
                    onChange={(e) => handleEditFieldChange('language', e.target.value)}
                    className="w-full rounded-lg border border-slate-700 bg-slate-800 px-3 py-2 text-sm text-white outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20"
                  >
                    <option value="ar">العربية</option>
                    <option value="en">English</option>
                  </select>
                </div>

                {/* Timezone */}
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">
                    {content.timezone}
                  </label>
                  <input
                    type="text"
                    value={editingUser.timezone}
                    onChange={(e) => handleEditFieldChange('timezone', e.target.value)}
                    className="w-full rounded-lg border border-slate-700 bg-slate-800 px-3 py-2 text-sm text-white outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20"
                  />
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="flex items-center justify-end gap-2 border-t border-slate-800 px-6 py-4 bg-slate-950/60">
              <button
                onClick={closeEditModal}
                className="rounded-lg bg-slate-800 px-4 py-2 text-sm text-slate-200 hover:bg-slate-700"
                disabled={savingEdit}
              >
                {content.cancel}
              </button>
              <button
                onClick={handleSaveEdit}
                className="rounded-lg bg-cyan-600 px-4 py-2 text-sm text-white hover:bg-cyan-700 disabled:opacity-60"
                disabled={savingEdit}
              >
                {savingEdit ? content.saving : content.saveChanges}
              </button>
            </div>
          </div>


        </Portal>
      )}
    </div>
  );
}
