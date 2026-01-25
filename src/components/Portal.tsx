// src/components/Portal.tsx

'use client';

import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

export default function Portal({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = useState(false);
  const [container, setContainer] = useState<HTMLElement | null>(null);

  useEffect(() => {
    const modalRoot = document.getElementById('modal-root');
    setContainer(modalRoot || document.body);
    setMounted(true);
  }, []);

  if (!mounted || !container) return null;

  // Portal.tsx
  return createPortal(children, document.body);
}
