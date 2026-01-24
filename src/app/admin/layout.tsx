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
    <div className="admin-layout">
       <aside className="admin-sidebar">
    
      <AdminSidebar />
      </aside>  
      <main className="flex-1">
        {children}
      </main>
    </div>
    
  );
}
