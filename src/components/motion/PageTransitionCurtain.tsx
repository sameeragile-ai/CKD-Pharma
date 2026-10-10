import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const routeTitles: Record<string, string> = {
  '/': 'CKD Pharma',
  '/about': 'Institutional Heritage',
  '/about-us': 'Institutional Heritage',
  '/products': 'Therapeutic Formulations',
  '/manufacturing': 'Manufacturing & cGMP',
  '/research': 'Research & Bioavailability',
  '/careers': 'Talent & Careers',
  '/news': 'Media & Dispatches',
  '/contact': 'Nationwide Network',
  '/legal': 'Compliance & DRAP',
  '/shop': 'OTC Healthcare Store',
  '/shop/catalog': 'Patient Formulations',
  '/cart': 'Prescription & Care Bag',
  '/checkout': 'Secure Checkout',
  '/track-order': 'Nationwide Tracking'
};

export const PageTransitionCurtain: React.FC = () => {
  const location = useLocation();
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [displayTitle, setDisplayTitle] = useState('CKD Pharma');

  useEffect(() => {
    // Check if prefers reduced motion
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;

    // Get readable title
    const currentPath = location.pathname;
    let title = routeTitles[currentPath];
    if (!title) {
      if (currentPath.startsWith('/products/')) title = 'Product Monograph';
      else if (currentPath.startsWith('/shop/product/')) title = 'OTC Formulation';
      else title = 'CKD Pharma';
    }

    setDisplayTitle(title);
    setIsTransitioning(true);

    // Reset scroll at middle of transition
    const timerMiddle = setTimeout(() => {
      window.scrollTo(0, 0);
    }, 400);

    const timerEnd = setTimeout(() => {
      setIsTransitioning(false);
    }, 850);

    return () => {
      clearTimeout(timerMiddle);
      clearTimeout(timerEnd);
    };
  }, [location.pathname]);

  if (!isTransitioning) return null;

  return (
    <div className="fixed inset-0 z-9998 pointer-events-none overflow-hidden select-none" aria-hidden="true">
      {/* Panel 1: Teal Accent Curtain */}
      <div
        className="absolute inset-0 bg-[#0F5E5A] transform -translate-y-full animate-curtain-teal"
        style={{
          animation: 'curtainSweep 0.85s cubic-bezier(0.76, 0, 0.24, 1) forwards'
        }}
      />

      {/* Panel 2: Warm Ivory Brand Curtain (offset by 0.08s) */}
      <div
        className="absolute inset-0 bg-[#FAF8F4] transform -translate-y-full"
        style={{
          animation: 'curtainSweep 0.85s cubic-bezier(0.76, 0, 0.24, 1) 0.08s forwards'
        }}
      />

      {/* Center Title in Fraunces / Serif Display */}
      <div
        className="absolute inset-0 flex items-center justify-center text-center p-6"
        style={{
          animation: 'curtainTitle 0.85s cubic-bezier(0.22, 1, 0.36, 1) forwards'
        }}
      >
        <div className="space-y-1">
          <span className="text-[11px] font-bold tracking-widest uppercase text-[#0F5E5A] block">
            CKD Pharmaceuticals
          </span>
          <h2 className="font-serif-editorial text-3xl sm:text-4xl text-[#0E2A2B] font-normal italic">
            {displayTitle}
          </h2>
        </div>
      </div>
    </div>
  );
};
