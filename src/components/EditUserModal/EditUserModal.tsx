// src/components/EditUserModal/EditUserModal.tsx

'use client';

import { useEffect, useId, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import styles from './EditUserModal.module.css';
import { TIMEZONES } from './constants';



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
    unsavedTitle: string;
    unsavedText: string;
    stay: string;        // زر "إلغاء/البقاء"
    discard: string;     // زر "خروج بدون حفظ"
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
  const titleId = useId();
  const dialogRef = useRef<HTMLDivElement | null>(null);

  const [mounted, setMounted] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [isMobile, setIsMobile] = useState(false);

  // Initialize on mount
  useEffect(() => {
    setMounted(true);
    setIsMobile(window.innerWidth < 768);

    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Handle Escape key
  useEffect(() => {
    if (!open) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') requestClose();
    };

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [open, onClose]);

  // Auto-focus first input
  useEffect(() => {
    if (!open || !mounted) return;

    const timer = setTimeout(() => {
      const input = dialogRef.current?.querySelector<HTMLInputElement>(
        'input[data-autofocus="true"]'
      );
      input?.focus();
    }, 100);

    return () => clearTimeout(timer);
  }, [open, mounted]);

  // Reset position when modal opens
  useEffect(() => {
    if (open) {
      setPosition({ x: 0, y: 0 });
    }
  }, [open]);

  const [isDirty, setIsDirty] = useState(false);
  const [showCloseConfirm, setShowCloseConfirm] = useState(false);
  // عندما يفتح المودال من جديد اعتبره بدون تغييرات
  useEffect(() => {
    if (open) setIsDirty(false);
    setShowCloseConfirm(false);
  }, [open]);

  const requestClose = () => {
    if (saving) return;

    if (isDirty) {
      setShowCloseConfirm(true);
      if (isDirty) return;
    }

    onClose();
  };
  const confirmClose = () => {
    setShowCloseConfirm(false);
    onClose();
  };

  const cancelClose = () => {
    setShowCloseConfirm(false);
  };
  const handleChange = <
    K extends keyof Pick<User, 'full_name' | 'role' | 'language' | 'timezone' | 'is_active'>
  >(
    field: K,
    value: User[K]
  ) => {
    setIsDirty(true);
    onChange(field, value);
  };


  // Handle drag start
  const handleHeaderMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isMobile || (e.target as HTMLElement).closest('button')) return;

    setIsDragging(true);

    const rect = dialogRef.current?.getBoundingClientRect();
    if (rect) {
      setDragOffset({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      });
    }
  };

  // Handle dragging
  useEffect(() => {
    if (!isDragging || !mounted || isMobile) return;

    const handleMouseMove = (e: MouseEvent) => {
      const newX =
        e.clientX -
        dragOffset.x -
        (window.innerWidth / 2) +
        (window.innerWidth < 768 ? (window.innerWidth * 0.9) / 2 : 380);
      const newY = e.clientY - dragOffset.y - (window.innerHeight / 2) + 500 / 2;

      setPosition({ x: newX, y: newY });
    };

    const handleMouseUp = () => {
      setIsDragging(false);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, dragOffset, mounted, isMobile]);

  if (!mounted || !open || !user) return null;

  const isRTL = user.language === 'ar';

  const content = (
    <>
      {/* Backdrop */}
      <div
        className={styles.backdrop}
        onClick={requestClose}
        aria-hidden="true"
      />

      {/* Modal */}
      <div
        ref={dialogRef}
        className={styles.modal}
        style={
          isMobile
            ? { transform: 'translate(-50%, -50%)' }
            : {
              transform: `translate(calc(-50% + ${position.x}px), calc(-50% + ${position.y}px))`,
            }
        }
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-labelledby={titleId}
      >

        {/* Header */}
        <div
          className={styles.header}
          onMouseDown={handleHeaderMouseDown}
          style={{
            flexDirection: isRTL ? 'row' : 'row',
          }}
        >
          <div className={styles.headerTop}>
            <h2 id={titleId} className={styles.title}>
              {labels.title}
            </h2>

            <button
              type="button"
              onClick={requestClose}
              disabled={saving}
              className={styles.closeButton}
              aria-label="Close"
            >
              ✕
            </button>
          </div>
        </div>

        {/* Body */}
        <div className={styles.body}>
          <div className={styles.formGrid}>
            {/* Email */}
            <div className={`${styles.formField} ${styles.fullWidth}`}>
              <label className={styles.label}>{labels.email}</label>
              <input
                type="email"
                value={user.email}
                readOnly
                className={styles.input}
              />
            </div>

            {/* Full Name */}
            <div className={`${styles.formField} ${styles.fullWidth}`}>
              <label className={styles.label}>{labels.fullName}</label>
              <input
                data-autofocus="true"
                type="text"
                value={user.full_name}
                onChange={(e) => handleChange('full_name', e.target.value)}
                className={styles.input}
              />
            </div>

            {/* Role */}
            <div className={styles.formField}>
              <label className={styles.label}>{labels.role}</label>
              <select
                value={user.role}
                onChange={(e) => handleChange('role', e.target.value as Role)}
                className={styles.select}
              >
                <option value="student">{labels.student}</option>
                <option value="instructor">{labels.instructor}</option>
                <option value="admin">{labels.admin}</option>
              </select>
            </div>

            {/* Status */}
            <div className={styles.formField}>
              <label className={styles.label}>{labels.status}</label>
              <select
                value={user.is_active ? 'active' : 'inactive'}
                onChange={(e) => handleChange('is_active', e.target.value === 'active')}
                className={styles.select}
              >
                <option value="active">{labels.active}</option>
                <option value="inactive">{labels.inactive}</option>
              </select>
            </div>

            {/* Language */}
            <div className={styles.formField}>
              <label className={styles.label}>{labels.language}</label>
              <select
                value={user.language}
                onChange={(e) => handleChange('language', e.target.value)}
                className={styles.select}
              >
                <option value="ar">العربية</option>
                <option value="en">English</option>
              </select>
            </div>

            {/* Timezone */}
            <div className={styles.formField}>
              <label className={styles.label}>{labels.timezone}</label>
              <select
                value={user.timezone}
                onChange={(e) => handleChange('timezone', e.target.value)}
                className={styles.select}
              >
                <option value="">-- Select Timezone --</option>

                {TIMEZONES.map((group) => (
                  <optgroup key={group.label} label={group.label}>
                    {group.options.map((tz) => (
                      <option key={tz.value} value={tz.value}>
                        {tz.label}
                      </option>
                    ))}
                  </optgroup>
                ))}
              </select>


            </div>
          </div>
        </div>

        {/* Footer */}
        <div className={styles.footer}>
          <button
            type="button"
            onClick={requestClose}
            disabled={saving}
            className={styles.btnCancel}
          >
            {labels.cancel}
          </button>

          <button
            type="button"
            onClick={onSave}
            disabled={saving}
            className={styles.btnSave}
          >
            {saving ? (
              <span className={styles.savingState}>
                <svg
                  className={styles.spinner}
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className={styles.spinnerCircle}
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    className={styles.spinnerPath}
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  />
                </svg>
                {labels.saving}
              </span>
            ) : (
              labels.save
            )}
          </button>
        </div>

        {showCloseConfirm && (
          <div className={styles.confirmOverlay} onClick={(e) => e.stopPropagation()}>
            <div className={styles.confirmBox} role="alertdialog" aria-modal="true">
              <h3 className={styles.confirmTitle}>{labels.unsavedTitle}</h3>
              <p className={styles.confirmText}>
                {labels.unsavedText}
              </p>

              <div className={styles.confirmActions}>
                <button
                  type="button"
                  className={styles.btnCancel}
                  onClick={cancelClose}
                  disabled={saving}
                >
                  {labels.stay}
                </button>

                <button
                  type="button"
                  className={styles.btnDanger}
                  onClick={confirmClose}
                  disabled={saving}
                >
                  {labels.discard}
                </button>
              </div>
            </div>
          </div>
        )}

      </div>
    </>
  );

  return typeof document !== 'undefined'
    ? createPortal(content, document.body)
    : null;
}