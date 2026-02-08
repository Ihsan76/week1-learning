// src/app/admin/layout.tsx

'use client';

import { useState, useEffect } from 'react';
import AdminSidebar from '@/components/AdminSidebar';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
  <div className="admin-layout flex w-full min-h-screen">
    <AdminSidebar />

    <main id="admin-main" className="flex-1 min-w-0 w-full">
      {children}
    </main>
  </div>
);


}
