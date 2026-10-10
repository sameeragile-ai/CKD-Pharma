import React, { useState, useEffect } from 'react';

interface IntroPreloaderProps {
  onComplete?: () => void;
}

export const IntroPreloader: React.FC<IntroPreloaderProps> = ({ onComplete }) => {
  const [visible, setVisible] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isSplitting, setIsSplitting] = useState(false);

  useEffect(() => {
    // Check if user already saw the intro in this session or prefers reduced motion
    const hasSeen = sessionStorage.getItem('ckd_intro_preloader_seen');
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (hasSeen || prefersReduced) {
      onComplete?.();
      return;
    }

    setVisible(true);

    const startTime = performance.now();
    const duration = 1200; // 1.2s counter

    const updateCounter = (now: number) => {
      const elapsed = now - startTime;
      const pct = Math.min(100, Math.round((elapsed / duration) * 100));
      setProgress(pct);

      if (pct < 100) {
        requestAnimationFrame(updateCounter);
      } else {
        // Start split curtain animation
        setTimeout(() => {
          setIsSplitting(true);
          sessionStorage.setItem('ckd_intro_preloader_seen', 'true');
          setTimeout(() => {
            setVisible(false);
            onComplete?.();
          }, 600);
        }, 150);
      }
    };

    requestAnimationFrame(updateCounter);
  }, [onComplete]);

  if (!visible) return null;

  return (
    <div className="fixed inset-0 z-9999 pointer-events-none overflow-hidden select-none" aria-hidden="true">
      {/* Top half curtain */}
      <div
        className={`absolute inset-x-0 top-0 h-1/2 bg-[#FAF8F4] border-b border-[#0E2A2B]/10 transition-transform duration-600 ease-[cubic-bezier(0.76,0,0.24,1)] ${
          isSplitting ? '-translate-y-full' : 'translate-y-0'
        }`}
      />

      {/* Bottom half curtain */}
      <div
        className={`absolute inset-x-0 bottom-0 h-1/2 bg-[#FAF8F4] border-t border-[#0E2A2B]/10 transition-transform duration-600 ease-[cubic-bezier(0.76,0,0.24,1)] ${
          isSplitting ? 'translate-y-full' : 'translate-y-0'
        }`}
      />

      {/* Center content */}
      <div
        className={`absolute inset-0 flex flex-col items-center justify-center transition-opacity duration-300 ${
          isSplitting ? 'opacity-0 scale-95' : 'opacity-100 scale-100'
        }`}
      >
        <div className="flex flex-col items-center gap-4">
          {/* Animated SVG Emblem Stroke */}
          <div className="w-16 h-16 rounded-full border border-[#0E2A2B]/20 p-2 flex items-center justify-center bg-white shadow-sm">
            <svg viewBox="0 0 100 100" className="w-full h-full text-[#0F5E5A]" fill="none" stroke="currentColor">
              <circle
                cx="50"
                cy="50"
                r="44"
                strokeWidth="3"
                strokeDasharray="276"
                strokeDashoffset={276 - (276 * progress) / 100}
                className="transition-all duration-75"
              />
              <path
                d="M50 20 L50 80 M30 50 L70 50"
                strokeWidth="4"
                strokeLinecap="round"
                strokeDasharray="60"
                strokeDashoffset={60 - (60 * progress) / 100}
              />
            </svg>
          </div>

          <div className="text-center space-y-1">
            <span className="text-xs font-bold tracking-widest uppercase text-[#0E2A2B]">
              CKD Pharmaceuticals
            </span>
            <div className="font-mono text-xs text-[#0F5E5A] font-semibold tabular-nums">
              {progress.toString().padStart(3, '0')} %
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
