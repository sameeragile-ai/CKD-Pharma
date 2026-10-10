import React, { useEffect, useState, useRef } from 'react';

export type CursorMode = 'default' | 'hover' | 'drag' | 'next' | 'view' | 'hidden';

export const CustomCursor: React.FC = () => {
  const [enabled, setEnabled] = useState(false);
  const [cursorMode, setCursorMode] = useState<CursorMode>('default');
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const pos = useRef({ x: -100, y: -100, targetX: -100, targetY: -100 });
  const rafId = useRef<number | null>(null);

  useEffect(() => {
    // Only enable on desktop with fine pointer and no reduced motion
    const isTouch = window.matchMedia('(pointer: coarse)').matches;
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (isTouch || prefersReduced || window.innerWidth < 768) {
      setEnabled(false);
      return;
    }

    setEnabled(true);

    const onMouseMove = (e: MouseEvent) => {
      pos.current.targetX = e.clientX;
      pos.current.targetY = e.clientY;

      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;
      }

      // Check hovered element
      const target = e.target as HTMLElement | null;
      if (!target) return;

      if (target.closest('input, textarea, select, [contenteditable="true"]')) {
        setCursorMode('hidden');
      } else if (target.closest('[data-cursor="drag"]')) {
        setCursorMode('drag');
      } else if (target.closest('[data-cursor="next"]')) {
        setCursorMode('next');
      } else if (target.closest('[data-cursor="view"]')) {
        setCursorMode('view');
      } else if (target.closest('a, button, [role="button"], .cursor-pointer')) {
        setCursorMode('hover');
      } else {
        setCursorMode('default');
      }
    };

    const renderLoop = () => {
      // Smooth lerp for trailing ring
      pos.current.x += (pos.current.targetX - pos.current.x) * 0.16;
      pos.current.y += (pos.current.targetY - pos.current.y) * 0.16;

      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${pos.current.x}px, ${pos.current.y}px, 0)`;
      }

      rafId.current = requestAnimationFrame(renderLoop);
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    rafId.current = requestAnimationFrame(renderLoop);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      if (rafId.current) cancelAnimationFrame(rafId.current);
    };
  }, []);

  if (!enabled || cursorMode === 'hidden') return null;

  const isInteractive = cursorMode === 'drag' || cursorMode === 'next' || cursorMode === 'view';

  return (
    <div className="pointer-events-none fixed inset-0 z-100 overflow-hidden select-none" aria-hidden="true">
      {/* Central ink dot */}
      <div
        ref={dotRef}
        className={`fixed top-0 left-0 -ml-1 -mt-1 w-2 h-2 rounded-full bg-[#0E2A2B] transition-opacity duration-200 ${
          isInteractive ? 'opacity-0' : 'opacity-90'
        }`}
      />

      {/* Smooth trailing ring with state label */}
      <div
        ref={ringRef}
        className={`fixed top-0 left-0 rounded-full flex items-center justify-center transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] ${
          cursorMode === 'default'
            ? '-ml-4 -mt-4 w-8 h-8 border border-[#0E2A2B]/25 bg-transparent'
            : cursorMode === 'hover'
            ? '-ml-6 -mt-6 w-12 h-12 border border-[#0F5E5A]/40 bg-[#0F5E5A]/8 scale-105 backdrop-blur-[0.5px]'
            : isInteractive
            ? '-ml-9 -mt-9 w-18 h-18 bg-[#0E2A2B] text-[#FAF8F4] shadow-xl text-[11px] font-bold tracking-wider uppercase'
            : '-ml-4 -mt-4 w-8 h-8 border border-[#0E2A2B]/25'
        }`}
      >
        {cursorMode === 'drag' && <span>Drag</span>}
        {cursorMode === 'next' && <span>Next</span>}
        {cursorMode === 'view' && <span>View</span>}
      </div>
    </div>
  );
};
