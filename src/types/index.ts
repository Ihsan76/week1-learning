/**
 * User & Modal Types - Matches backend structure exactly
 */

export interface User {
  id: number;
  email: string;
  full_name: string;
  role: 'student' | 'instructor' | 'admin';
  is_active: boolean;
  language: string;
  timezone: string;
  created_at?: string;
}

export interface EditUserModalLabels {
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
  saving?: string;
}

export interface EditUserModalProps {
  open: boolean;
  user: User | null;
  saving?: boolean;
  labels: EditUserModalLabels;
  onClose: () => void;
  onSave: () => Promise<void> | void;
  onChange: (
    field: keyof Pick<User, 'full_name' | 'role' | 'language' | 'timezone' | 'is_active'>,
    value: string | boolean
  ) => void;
}