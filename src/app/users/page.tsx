// src/app/users/page.tsx

'use client';

import { useState } from 'react';
import EditUserModal from '@/components/EditUserModal/EditUserModal';
import { User } from '@/types';

export default function UsersPage() {
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [saving, setSaving] = useState(false);
  const [users, setUsers] = useState<User[]>([
    {
      id: 1,
      email: 'ahmed.hassan@example.com',
      fullName: 'أحمد حسن',
      role: 'student',
      status: true,
      language: 'ar',
      timezone: 'Africa/Cairo',
    },
    {
      id: 2,
      email: 'sarah.smith@example.com',
      fullName: 'Sarah Smith',
      role: 'instructor',
      status: true,
      language: 'en',
      timezone: 'America/New_York',
    },
  ]);

  const handleEditClick = (user: User) => {
    setEditingUser(user);
  };

  const handleClose = () => {
    setEditingUser(null);
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      if (editingUser) {
        setUsers((prev) =>
          prev.map((u) => (u.id === editingUser.id ? editingUser : u))
        );
        console.log('User saved:', editingUser);
      }
      setEditingUser(null);
    } finally {
      setSaving(false);
    }
  };

  const handleChange = (field: keyof User, value: any) => {
    setEditingUser((prev) =>
      prev ? { ...prev, [field]: value } : null
    );
  };

  return (
    <div style={{ padding: '20px', maxWidth: '1000px', margin: '0 auto' }}>
      <h1>Users Management</h1>
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr style={{ borderBottom: '1px solid #ccc' }}>
            <th style={{ padding: '10px', textAlign: 'left' }}>Email</th>
            <th style={{ padding: '10px', textAlign: 'left' }}>Name</th>
            <th style={{ padding: '10px', textAlign: 'left' }}>Role</th>
            <th style={{ padding: '10px', textAlign: 'left' }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id} style={{ borderBottom: '1px solid #eee' }}>
              <td style={{ padding: '10px' }}>{user.email}</td>
              <td style={{ padding: '10px' }}>{user.fullName}</td>
              <td style={{ padding: '10px' }}>{user.role}</td>
              <td style={{ padding: '10px' }}>
                <button
                  onClick={() => handleEditClick(user)}
                  style={{
                    padding: '6px 12px',
                    background: '#3b82f6',
                    color: 'white',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: 'pointer',
                  }}
                >
                  Edit
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <EditUserModal
        open={!!editingUser}
        user={editingUser || undefined}
        saving={saving}
        labels={{
          title: editingUser?.language === 'ar' ? 'تعديل المستخدم' : 'Edit User',
          email: editingUser?.language === 'ar' ? 'البريد الإلكتروني' : 'Email',
          fullName: editingUser?.language === 'ar' ? 'الاسم الكامل' : 'Full Name',
          role: editingUser?.language === 'ar' ? 'الدور' : 'Role',
          timezone: editingUser?.language === 'ar' ? 'المنطقة الزمنية' : 'Timezone',
          cancel: editingUser?.language === 'ar' ? 'إلغاء' : 'Cancel',
          save: editingUser?.language === 'ar' ? 'حفظ' : 'Save',
        }}
        onClose={handleClose}
        onSave={handleSave}
        onChange={handleChange}
      />
    </div>
  );
}