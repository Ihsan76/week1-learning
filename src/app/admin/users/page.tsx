// src/app/admin/users/page.tsx
'use client';

import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/lib/store';
import { apiFetch } from '@/lib/api';
import { useLocaleContext } from '@/context/LocaleContext';

import EditUserModal from '@/components/EditUserModal';

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

  // ====== Drag state for modal ======
  const [modalPos, setModalPos] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [dragging, setDragging] = useState(false);
  const dragOffset = useRef<{ x: number; y: number }>({ x: 0, y: 0 });

  // حماية الصفحة
  useEffect(() => {
    setIsMounted(true);
    if (!isLoggedIn) router.push('/login');
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
      } catch {
        setError(dict!.admin.usersContent.errorLoadingUsers);
      } finally {
        setLoading(false);
      }
    }

    fetchUsers();
  }, [isMounted, isLoggedIn, dict, isLoading]);

  // قفل سكرول لوحة الإدارة (admin-main) عند فتح المودال
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

  // ESC لإغلاق المودال
  useEffect(() => {
    if (!editingUser) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeEditModal();
    };

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [editingUser]);

  // Mouse move/up للسحب
  useEffect(() => {
    if (!dragging) return;

    const onMove = (e: MouseEvent) => {
      setModalPos({
        x: e.clientX - dragOffset.current.x,
        y: e.clientY - dragOffset.current.y,
      });
    };

    const onUp = () => setDragging(false);

    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseup', onUp);

    return () => {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseup', onUp);
    };
  }, [dragging]);

  if (!dict || !isMounted || isLoading) {
    return (
      <div className="min-h-screen bg-slate-900 p-8 text-slate-200">
        {dict?.admin.usersContent.loading ?? '...'}
      </div>
    );
  }

  const content = dict.admin.usersContent;

  const filteredUsers = users.filter((user) =>
    filter === 'all' ? true : filter === 'active' ? user.is_active : !user.is_active
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

  const openEditModal = (user: User) => {
    setEditingUser(user);
    setModalPos({ x: 0, y: 0 }); // ابدأ من المنتصف كل مرة
  };

  const closeEditModal = () => {
    setEditingUser(null);
    setDragging(false);
  };

  const handleEditFieldChange = (
    field: keyof Pick<User, 'full_name' | 'role' | 'language' | 'timezone' | 'is_active'>,
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

      const updated: User = await apiFetch(`/api/auth/users/${editingUser.id}/update/`, {
        method: 'PATCH',
        body: JSON.stringify(payload),
      });

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
          <h1 className="text-4xl font-bold text-white mb-2">{content.title}</h1>
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
      

      {/* ===== Modal (Portal) ===== */}
      <EditUserModal
  open={!!editingUser}
  user={editingUser}
  saving={savingEdit}
  labels={{
    title: content.editUserTitle,
    email: content.email,
    fullName: content.name,
    role: content.role,
    status: content.status,
    language: content.Language,
    timezone: content.timezone,
    active: content.active,
    inactive: content.inactive,
    student: content.student,
    instructor: content.instructor,
    admin: content.admin,
    cancel: content.cancel,
    save: content.saveChanges,
    saving: content.saving,
  }}
  onClose={closeEditModal}
  onSave={handleSaveEdit}
  onChange={(field, value) => handleEditFieldChange(field, value as any)}
/>

    </div>
  );
}
