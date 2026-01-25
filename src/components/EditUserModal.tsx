'use client';

import { useEffect, useRef, useState } from 'react';
import Portal from '@/components/Portal';

type Role = 'student' | 'instructor' | 'admin';

export interface User {
  id: number;
  email: string;
  full_name: string;
  role: Role;
  is_active: boolean;
  language: string;
  timezone: string;
}

type Props = {
  open: boolean;
  user: User | null;
  saving?: boolean;
  labels: {
    title: string;
    email: string;
    fullName: string;
    role: string;
    status: string;
    language: string;
    timezone: string;
    active: string;
    inactive: string;
    student: string;
    instructor: string;
    admin: string;
    cancel: string;
    save: string;
    saving: string;
  };
  onClose: () => void;
  onSave: () => void;
  onChange: <K extends keyof Pick<User, 'full_name' | 'role' | 'language' | 'timezone' | 'is_active'>>(
    field: K,
    value: User[K]
  ) => void;
};

export default function EditUserModal({
  open,
  user,
  saving = false,
  labels,
  onClose,
  onSave,
  onChange,
}: Props) {
  
  const dialogRef = useRef<HTMLDivElement | null>(null);
  const headerRef = useRef<HTMLDivElement | null>(null);

  // Drag state
  const [isDragging, setIsDragging] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const dragOffset = useRef({ x: 0, y: 0 });

  // useId import
  const { useId } = require('react');
  const titleId = useId();
  const descId = useId();
  // Close on ESC
  useEffect(() => {
    if (!open) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [open, onClose]);

  // Auto focus
  useEffect(() => {
    if (!open) return;
    const input = dialogRef.current?.querySelector<HTMLInputElement>('input[data-autofocus="true"]');
    input?.focus();
  }, [open]);

  // Drag handlers
  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    // Skip if clicking on close button
    if ((e.target as HTMLElement).closest('button')) return;

    setIsDragging(true);

    if (dialogRef.current) {
      const rect = dialogRef.current.getBoundingClientRect();
      dragOffset.current.x = e.clientX - rect.left - rect.width / 2;
      dragOffset.current.y = e.clientY - rect.top - rect.height / 2;
    }
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (!isDragging) return;

    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;

    const newX = e.clientX - centerX - dragOffset.current.x;
    const newY = e.clientY - centerY - dragOffset.current.y;

    setPosition({ x: newX, y: newY });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  useEffect(() => {
    if (!isDragging) return;

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging]);

  if (!open || !user) return null;

  return (
    <Portal>
      <div
        className="fixed inset-0 z-[999999] flex items-center justify-center bg-black/70"
        onClick={onClose}
      >
        {/* Modal Container */}
        <div
          ref={dialogRef}
          className={`fixed w-[min(720px,92vw)] rounded-2xl border border-slate-700 bg-slate-900 shadow-2xl transition-all ${
            isDragging ? 'cursor-grabbing shadow-2xl shadow-cyan-500/50' : ''
          }`}
          style={{
            transform: `translate(calc(-50% + ${position.x}px), calc(-50% + ${position.y}px))`,
            top: '50%',
            left: '50%',
          }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header (Drag Handle) */}
          <div
            ref={headerRef}
            onMouseDown={handleMouseDown}
            className={`flex items-center justify-between gap-3 border-b border-slate-800 px-6 py-4 ${
              isDragging ? 'bg-slate-800' : 'bg-slate-900 hover:bg-slate-800'
            } transition-colors cursor-grab select-none`}
          >
            <div>
              <h2 id={titleId} className="text-lg font-semibold text-white">
                {labels.title}
              </h2>
              <p id={descId} className="mt-1 text-xs text-slate-400">
                ID: {user.id}
              </p>
            </div>

            <button
              type="button"
              onClick={onClose}
              disabled={saving}
              className="h-9 w-9 rounded-lg grid place-items-center text-slate-300 hover:bg-slate-700 hover:text-white disabled:opacity-60 transition-colors"
              aria-label="Close"
            >
              ×
            </button>
          </div>

          {/* Body */}
          <div className="px-6 py-5 max-h-[70vh] overflow-y-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Email */}
              <div className="md:col-span-2">
                <label className="mb-1 block text-xs font-medium text-slate-300">
                  {labels.email}
                </label>
                <input
                  type="email"
                  value={user.email}
                  readOnly
                  className="w-full rounded-lg border border-slate-700 bg-slate-800 px-3 py-2 text-sm text-slate-300"
                />
              </div>

              {/* Full name */}
              <div className="md:col-span-2">
                <label className="mb-1 block text-xs font-medium text-slate-300">
                  {labels.fullName}
                </label>
                <input
                  data-autofocus="true"
                  type="text"
                  value={user.full_name}
                  onChange={(e) => onChange('full_name', e.target.value)}
                  className="w-full rounded-lg border border-slate-700 bg-slate-800 px-3 py-2 text-sm text-white outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20"
                />
              </div>

              {/* Role */}
              <div>
                <label className="mb-1 block text-xs font-medium text-slate-300">
                  {labels.role}
                </label>
                <select
                  value={user.role}
                  onChange={(e) => onChange('role', e.target.value as Role)}
                  className="w-full rounded-lg border border-slate-700 bg-slate-800 px-3 py-2 text-sm text-white outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20"
                >
                  <option value="student">{labels.student}</option>
                  <option value="instructor">{labels.instructor}</option>
                  <option value="admin">{labels.admin}</option>
                </select>
              </div>

              {/* Status */}
              <div>
                <label className="mb-1 block text-xs font-medium text-slate-300">
                  {labels.status}
                </label>
                <select
                  value={user.is_active ? 'active' : 'inactive'}
                  onChange={(e) => onChange('is_active', e.target.value === 'active')}
                  className="w-full rounded-lg border border-slate-700 bg-slate-800 px-3 py-2 text-sm text-white outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20"
                >
                  <option value="active">{labels.active}</option>
                  <option value="inactive">{labels.inactive}</option>
                </select>
              </div>

              {/* Language */}
              <div>
                <label className="mb-1 block text-xs font-medium text-slate-300">
                  {labels.language}
                </label>
                <select
                  value={user.language}
                  onChange={(e) => onChange('language', e.target.value)}
                  className="w-full rounded-lg border border-slate-700 bg-slate-800 px-3 py-2 text-sm text-white outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20"
                >
                  <option value="ar">العربية</option>
                  <option value="en">English</option>
                </select>
              </div>

              {/* Timezone */}
              <div>
                <label className="mb-1 block text-xs font-medium text-slate-300">
                  {labels.timezone}
                </label>
                <input
                  type="text"
                  value={user.timezone}
                  onChange={(e) => onChange('timezone', e.target.value)}
                  className="w-full rounded-lg border border-slate-700 bg-slate-800 px-3 py-2 text-sm text-white outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20"
                />
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="flex items-center justify-end gap-2 border-t border-slate-800 px-6 py-4 bg-slate-950/60">
            <button
              type="button"
              onClick={onClose}
              disabled={saving}
              className="rounded-lg bg-slate-800 px-4 py-2 text-sm text-slate-200 hover:bg-slate-700 disabled:opacity-60"
            >
              {labels.cancel}
            </button>

            <button
              type="button"
              onClick={onSave}
              disabled={saving}
              className="rounded-lg bg-cyan-600 px-4 py-2 text-sm text-white hover:bg-cyan-700 disabled:opacity-60"
            >
              {saving ? labels.saving : labels.save}
            </button>
          </div>
        </div>
      </div>
    </Portal>
  );
}
