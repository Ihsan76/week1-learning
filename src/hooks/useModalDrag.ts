// src/hooks/useModalDrag.ts

import { useState, useCallback } from 'react';

interface DragState {
  isDragging: boolean;
  offsetX: number;
  offsetY: number;
}

export const useModalDrag = (modalRef: React.RefObject<HTMLDivElement>) => {
  const [dragState, setDragState] = useState<DragState>({
    isDragging: false,
    offsetX: 0,
    offsetY: 0,
  });

  const startDrag = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (window.innerWidth < 768) return;

    const target = e.target as HTMLElement;
    if (!target.closest('[id="modalHeader"]')) return;

    const modal = modalRef.current;
    if (!modal) return;

    const rect = modal.getBoundingClientRect();
    setDragState({
      isDragging: true,
      offsetX: e.clientX - rect.left,
      offsetY: e.clientY - rect.top,
    });

    const handleDrag = (moveEvent: MouseEvent) => {
      const newX = Math.max(
        10,
        Math.min(
          moveEvent.clientX - dragState.offsetX,
          window.innerWidth - modal.offsetWidth - 10
        )
      );
      const newY = Math.max(
        10,
        Math.min(
          moveEvent.clientY - dragState.offsetY,
          window.innerHeight - modal.offsetHeight - 10
        )
      );

      modal.style.position = 'absolute';
      modal.style.left = newX + 'px';
      modal.style.top = newY + 'px';
    };

    const handleStopDrag = () => {
      setDragState((prev) => ({ ...prev, isDragging: false }));
      document.removeEventListener('mousemove', handleDrag);
      document.removeEventListener('mouseup', handleStopDrag);
    };

    document.addEventListener('mousemove', handleDrag);
    document.addEventListener('mouseup', handleStopDrag);
  }, [dragState.offsetX, dragState.offsetY, modalRef]);

  return {
    isDragging: dragState.isDragging,
    startDrag,
  };
};