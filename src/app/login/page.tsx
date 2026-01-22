// src/app/login/page.tsx
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/lib/store';
import { useLocaleStore } from '@/lib/localeStore';
import ar from '@/locales/ar.json';
import en from '@/locales/en.json';

const translations = { ar, en };

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const locale = useLocaleStore((state) => state.locale);
  const router = useRouter();

  // نفس الدالة setAuth كما في التسجيل
  const setAuth = useAuthStore((state) => state.setAuth);

  const t = translations[locale as keyof typeof translations] || translations.en;
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await fetch('https://week1-backend.onrender.com/api/auth/login/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || t.auth.error);
        return;
      }

      // نتوقع نفس البنية: user + token
      const { user, token } = data;

      if (!user || !token) {
        setError(t.auth.error);
        return;
      }

      // تخزين بيانات المستخدم من قاعدة البيانات عبر الباك إند
      setAuth(user, token);

      router.push('/dashboard');
    } catch (err) {
      setError(t.auth.error);
    } finally {
      setLoading(false);
    }
  };

  return (
    // نفس تصميم النموذج الذي عندك حالياً مع الفورم الذي يستدعي handleSubmit
    // مع حذف الأيقونات إن رغبت، لا تؤثر على المنطق
    // ...
    // استخدم نفس JSX الحالي فقط غيّر دالة handleSubmit أعلاه
    <div className="min-h-screen w-full bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center px-4 py-12">
      {/* ضع هنا نفس الـ JSX الذي تملكه الآن، مع onSubmit={handleSubmit} */}
    </div>
  );
}
