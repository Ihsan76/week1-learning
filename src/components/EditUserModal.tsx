// src/components/EditUserModal.tsx

'use client';

import { useEffect, useId, useRef, useState } from 'react';
import { createPortal } from 'react-dom';

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
  const titleId = useId();
  const dialogRef = useRef<HTMLDivElement | null>(null);

  const [mounted, setMounted] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setMounted(true);
    setIsMobile(window.innerWidth < 768);

    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (!open) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [open, onClose]);

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

  useEffect(() => {
    if (open) {
      setPosition({ x: 0, y: 0 });
    }
  }, [open]);

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

  useEffect(() => {
    if (!isDragging || !mounted || isMobile) return;

    const handleMouseMove = (e: MouseEvent) => {
      const newX = e.clientX - dragOffset.x - (window.innerWidth / 2) + (window.innerWidth < 768 ? (window.innerWidth * 0.9) / 2 : 380);
      const newY = e.clientY - dragOffset.y - (window.innerHeight / 2) + (500 / 2);

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

  const content = (
    <>
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        @keyframes slideInScale {
          from {
            opacity: 0;
            transform: scale(0.95);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(40px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .modal-backdrop {
          animation: fadeIn 300ms ease-out;
        }

        .modal-content {
          animation: slideInScale 300ms cubic-bezier(0.16, 1, 0.3, 1);
          position: fixed;
          width: min(650px, 90vw);
          max-width: 90vw;
          left: 50%;
          top: 50%;
          transform: translate(calc(-50% + ${position.x}px), calc(-50% + ${position.y}px));
          z-index: 9999;
          border-radius: 14px;
          border: 1px solid rgba(71, 85, 105, 0.3);
          background: linear-gradient(135deg, rgba(15, 23, 42, 0.95) 0%, rgba(20, 29, 47, 0.9) 100%);
          backdrop-filter: blur(20px);
          box-shadow: 0 25px 80px rgba(0, 0, 0, 0.6), 0 0 60px rgba(59, 130, 246, 0.08);
          overflow: hidden;
          max-height: 90vh;
          display: flex;
          flex-direction: column;
        }

        @media (max-width: 640px) {
          .modal-content {
            width: 95vw;
            border-radius: 12px;
            top: auto;
            bottom: 0;
            transform: translateX(calc(-50% + ${position.x}px));
            border-radius: 16px 16px 0 0;
            animation: slideUp 300ms cubic-bezier(0.16, 1, 0.3, 1);
          }
        }

        .form-field {
          animation: slideInScale 300ms cubic-bezier(0.16, 1, 0.3, 1);
          animation-fill-mode: both;
        }

        .form-field:nth-child(1) { animation-delay: 50ms; }
        .form-field:nth-child(2) { animation-delay: 100ms; }
        .form-field:nth-child(3) { animation-delay: 150ms; }
        .form-field:nth-child(4) { animation-delay: 200ms; }
        .form-field:nth-child(5) { animation-delay: 250ms; }
        .form-field:nth-child(6) { animation-delay: 300ms; }

        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(59, 130, 246, 0.3);
          border-radius: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(59, 130, 246, 0.6);
        }

        .modal-header {
          user-select: none;
          cursor: ${isMobile ? 'default' : isDragging ? 'grabbing' : 'grab'} !important;
          background: linear-gradient(90deg, rgba(37, 99, 235, 0.15) 0%, rgba(79, 70, 229, 0.1) 100%);
          border-bottom: 1px solid rgba(59, 130, 246, 0.2);
          padding: 9px 20px;
          flex-shrink: 0;
        }

        @media (max-width: 640px) {
          .modal-header {
            padding: 8px 16px;
          }
        }

        .modal-body {
          background: linear-gradient(180deg, rgba(15, 23, 42, 0.5) 0%, rgba(20, 29, 47, 0.3) 100%);
          padding: 20px;
          flex: 1;
          overflow-y: auto;
        }

        @media (max-width: 640px) {
          .modal-body {
            padding: 16px;
          }
        }

        .modal-footer {
          background: linear-gradient(90deg, rgba(15, 23, 42, 0.8), rgba(20, 29, 47, 0.6));
          border-top: 1px solid rgba(59, 130, 246, 0.2);
          padding: 12px 20px;
          display: flex;
          align-items: center;
          justify-content: flex-end;
          gap: 10px;
          flex-shrink: 0;
        }

        @media (max-width: 640px) {
          .modal-footer {
            padding: 12px 16px;
            gap: 8px;
          }
        }

        input, select {
          background-color: rgba(30, 41, 59, 0.6) !important;
          border: 1px solid rgba(59, 130, 246, 0.25) !important;
          color: #e2e8f0 !important;
          transition: all 200ms ease !important;
          border-radius: 8px !important;
          padding: 8px 11px !important;
          font-size: 13px !important;
          width: 96% !important; /* ✅ تقليل من 100% لإظهار الحواف بشكل أفضل */
          margin: 0 auto !important; /* توسيط الـ input */
        }

        @media (max-width: 640px) {
          input, select {
            width: 95% !important; /* شوية أقل على الموبايل */
            padding: 7px 10px !important;
            font-size: 14px !important;
          }
        }


        input::placeholder {
          color: rgba(226, 232, 240, 0.4) !important;
        }

        input:focus, select:focus {
          border-color: rgba(59, 130, 246, 0.6) !important;
          background-color: rgba(30, 41, 59, 0.8) !important;
          box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.15) !important;
          outline: none !important;
        }

        input:read-only {
          background-color: rgba(15, 23, 42, 0.6) !important;
          color: rgba(226, 232, 240, 0.6) !important;
          cursor: not-allowed !important;
        }

        .form-label {
          display: block;
          font-size: 13px;
          font-weight: 600;
          color: rgba(226, 232, 240, 0.7);
          text-transform: uppercase;
          letter-spacing: 0.4px;
          margin-bottom: 6px;
        }

        @media (max-width: 640px) {
          .form-label {
            font-size: 10px;
          }
        }

        .btn-cancel, .btn-save {
          border: none;
          border-radius: 6px;
          font-size: 13px;
          font-weight: 600;
          cursor: pointer;
          transition: all 200ms ease;
          padding: 8px 16px;
        }

        @media (max-width: 640px) {
          .btn-cancel, .btn-save {
            padding: 7px 12px;
            font-size: 12px;
          }
        }

        .btn-cancel {
          background: rgba(30, 41, 59, 0.5);
          color: rgba(226, 232, 240, 0.8);
          border: 1px solid rgba(71, 85, 105, 0.4);
        }

        .btn-cancel:hover:not(:disabled) {
          background: rgba(30, 41, 59, 0.8);
          color: rgba(226, 232, 240, 1);
        }

        .btn-save {
          background: linear-gradient(90deg, #3b82f6 0%, #2563eb 100%);
          color: white;
          box-shadow: 0 4px 12px rgba(59, 130, 246, 0.3);
        }

        .btn-save:hover:not(:disabled) {
          background: linear-gradient(90deg, #2563eb 0%, #1d4ed8 100%);
          box-shadow: 0 6px 20px rgba(59, 130, 246, 0.5);
        }

        .btn-cancel:disabled, .btn-save:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }
      `}</style>

      {/* Backdrop */}
      <div
        className="modal-backdrop fixed inset-0 bg-black/50 backdrop-blur-sm z-[9998]"
        onClick={onClose}
      />

      {/* Modal */}
      <div
        ref={dialogRef}
        className="modal-content"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-labelledby={titleId}
      >
        {/* Header */}
        <div
          onMouseDown={handleHeaderMouseDown}
          className="modal-header"
          style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}
        >
          {/* Row: Title + Close */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '12px',
              flexDirection: user.language === 'ar' ? 'row' : 'row-reverse'  // X على اليسار للعربي
            }}
          >
            <h2
              id={titleId}
              className="truncate"
              style={{ fontSize: '15px', fontWeight: 700, margin: 0, color: '#fff' }}
            >
              {labels.title}
            </h2>
              
            <button
              type="button"
              onClick={onClose}
              disabled={saving}
              style={{
                width: '32px',
                height: '32px',
                minWidth: '32px',
                borderRadius: '6px',
                background: 'transparent',
                color: 'rgba(226, 232, 240, 0.6)',
                border: 'none',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '18px',
                transition: 'all 200ms ease',
                opacity: saving ? 0.6 : 1,
                flexShrink: 0,
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'rgba(239, 68, 68, 0.15)';
                e.currentTarget.style.color = 'rgba(239, 68, 68, 0.8)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'transparent';
                e.currentTarget.style.color = 'rgba(226, 232, 240, 0.6)';
              }}
              aria-label="Close"
            >
              ✕
            </button>
          </div>

          {/* Row: ID 
          <p
            className="truncate"
            style={{
              fontSize: '11px',
              color: 'rgba(226, 232, 240, 0.5)',
              margin: 0,
              textAlign: user.language === 'ar' ? 'right' : 'left', // ID في نفس الاتجاه
            }}
          >
            ID: {user.id}
          </p> */}
        </div>


        {/* Body */}
        <div className="modal-body">
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: '14px',
            maxWidth: '100%',
            overflow: 'hidden'
          }}>
            {/* Email - صف كامل */}
            <div className="form-field" style={{
              minWidth: 0,
              gridColumn: '1 / -1' // full width
            }}>
              <label className="form-label">{labels.email}</label>
              <input
                type="email"
                value={user.email}
                readOnly
                style={{ overflow: 'hidden', textOverflow: 'ellipsis', fontSize: '12px' }}
              />
            </div>


            {/* Full name - صف كامل */}
            <div className="form-field" style={{
              minWidth: 0,
              gridColumn: '1 / -1' // full width
            }}>
              <label className="form-label">{labels.fullName}</label>
              <input
                data-autofocus="true"
                type="text"
                value={user.full_name}
                onChange={(e) => onChange('full_name', e.target.value)}
                style={{ overflow: 'hidden', textOverflow: 'ellipsis' }}
              />
            </div>


            {/* Role */}
            <div className="form-field" style={{ minWidth: 0 }}>
              <label className="form-label">{labels.role}</label>
              <select
                value={user.role}
                onChange={(e) => onChange('role', e.target.value as Role)}
              >
                <option value="student">{labels.student}</option>
                <option value="instructor">{labels.instructor}</option>
                <option value="admin">{labels.admin}</option>
              </select>
            </div>

            {/* Status */}
            <div className="form-field" style={{ minWidth: 0 }}>
              <label className="form-label">{labels.status}</label>
              <select
                value={user.is_active ? 'active' : 'inactive'}
                onChange={(e) => onChange('is_active', e.target.value === 'active')}
              >
                <option value="active">{labels.active}</option>
                <option value="inactive">{labels.inactive}</option>
              </select>
            </div>

            {/* Language */}
            <div className="form-field" style={{ minWidth: 0 }}>
              <label className="form-label">{labels.language}</label>
              <select
                value={user.language}
                onChange={(e) => onChange('language', e.target.value)}
              >
                <option value="ar">العربية</option>
                <option value="en">English</option>
              </select>
            </div>

            {/* Timezone - ممكن يأخذ صف كامل على Mobile */}
            <div className="form-field" style={{
              minWidth: 0,
              gridColumn: 'auto'
            }}>
              <label className="form-label">{labels.timezone}</label>
              <select
                value={user.timezone}
                onChange={(e) => onChange('timezone', e.target.value)}
              >
                <option value="">-- Select Timezone --</option>
                <optgroup label="Africa">
                  <option value="Africa/Cairo">Cairo (UTC+2)</option>
                  <option value="Africa/Johannesburg">Johannesburg (UTC+2)</option>
                  <option value="Africa/Lagos">Lagos (UTC+1)</option>
                  <option value="Africa/Nairobi">Nairobi (UTC+3)</option>
                </optgroup>

                <optgroup label="Asia">
                  <option value="Asia/Amman">Amman (UTC+3)</option>
                  <option value="Asia/Baghdad">Baghdad (UTC+3)</option>
                  <option value="Asia/Bangkok">Bangkok (UTC+7)</option>
                  <option value="Asia/Beijing">Beijing (UTC+8)</option>
                  <option value="Asia/Dubai">Dubai (UTC+4)</option>
                  <option value="Asia/Hong_Kong">Hong Kong (UTC+8)</option>
                  <option value="Asia/Jakarta">Jakarta (UTC+7)</option>
                  <option value="Asia/Jerusalem">Jerusalem (UTC+2)</option>
                  <option value="Asia/Karachi">Karachi (UTC+5)</option>
                  <option value="Asia/Kolkata">Kolkata (UTC+5:30)</option>
                  <option value="Asia/Manila">Manila (UTC+8)</option>
                  <option value="Asia/Seoul">Seoul (UTC+9)</option>
                  <option value="Asia/Shanghai">Shanghai (UTC+8)</option>
                  <option value="Asia/Singapore">Singapore (UTC+8)</option>
                  <option value="Asia/Tehran">Tehran (UTC+3:30)</option>
                  <option value="Asia/Tokyo">Tokyo (UTC+9)</option>
                </optgroup>

                <optgroup label="Europe">
                  <option value="Europe/Amsterdam">Amsterdam (UTC+1)</option>
                  <option value="Europe/Athens">Athens (UTC+2)</option>
                  <option value="Europe/Berlin">Berlin (UTC+1)</option>
                  <option value="Europe/Brussels">Brussels (UTC+1)</option>
                  <option value="Europe/Budapest">Budapest (UTC+1)</option>
                  <option value="Europe/Dublin">Dublin (UTC+0)</option>
                  <option value="Europe/Istanbul">Istanbul (UTC+3)</option>
                  <option value="Europe/London">London (UTC+0)</option>
                  <option value="Europe/Madrid">Madrid (UTC+1)</option>
                  <option value="Europe/Moscow">Moscow (UTC+3)</option>
                  <option value="Europe/Paris">Paris (UTC+1)</option>
                  <option value="Europe/Rome">Rome (UTC+1)</option>
                  <option value="Europe/Stockholm">Stockholm (UTC+1)</option>
                  <option value="Europe/Vienna">Vienna (UTC+1)</option>
                  <option value="Europe/Zurich">Zurich (UTC+1)</option>
                </optgroup>

                <optgroup label="Americas">
                  <option value="America/Anchorage">Anchorage (UTC-9)</option>
                  <option value="America/Argentina/Buenos_Aires">Buenos Aires (UTC-3)</option>
                  <option value="America/Chicago">Chicago (UTC-6)</option>
                  <option value="America/Denver">Denver (UTC-7)</option>
                  <option value="America/Los_Angeles">Los Angeles (UTC-8)</option>
                  <option value="America/Mexico_City">Mexico City (UTC-6)</option>
                  <option value="America/New_York">New York (UTC-5)</option>
                  <option value="America/Toronto">Toronto (UTC-5)</option>
                  <option value="America/Vancouver">Vancouver (UTC-8)</option>
                  <option value="America/Sao_Paulo">São Paulo (UTC-3)</option>
                </optgroup>

                <optgroup label="Australia & Pacific">
                  <option value="Australia/Melbourne">Melbourne (UTC+10)</option>
                  <option value="Australia/Sydney">Sydney (UTC+10)</option>
                  <option value="Pacific/Auckland">Auckland (UTC+12)</option>
                  <option value="Pacific/Fiji">Fiji (UTC+12)</option>
                  <option value="Pacific/Honolulu">Honolulu (UTC-10)</option>
                </optgroup>
              </select>
            </div>
          </div>
        </div>


        {/* Footer */}
        <div className="modal-footer">
          <button
            type="button"
            onClick={onClose}
            disabled={saving}
            className="btn-cancel"
          >
            {labels.cancel}
          </button>

          <button
            type="button"
            onClick={onSave}
            disabled={saving}
            className="btn-save"
          >
            {saving ? (
              <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <svg className="animate-spin" style={{ width: '14px', height: '14px' }} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
                {labels.saving}
              </span>
            ) : (
              labels.save
            )}
          </button>
        </div>
      </div>
    </>
  );

  return typeof document !== 'undefined'
    ? createPortal(content, document.body)
    : null;
}
