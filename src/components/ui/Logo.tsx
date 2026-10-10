import React from 'react';
import { Link } from 'react-router-dom';

interface LogoProps {
  variant?: 'light' | 'dark';
  size?: 'sm' | 'md' | 'lg';
  showTagline?: boolean;
}

export const Logo: React.FC<LogoProps> = ({
  variant = 'dark',
  size = 'md',
  showTagline = true
}) => {
  const isDark = variant === 'dark';
  
  const iconSize = size === 'sm' ? 32 : size === 'lg' ? 48 : 40;
  const textSize = size === 'sm' ? 'text-lg' : size === 'lg' ? 'text-2xl' : 'text-xl';

  return (
    <Link to="/" className="group flex items-center gap-3 shrink-0 cursor-pointer focus-visible:rounded-lg">
      {/* Authentic CKD Seal Emblem */}
      <div 
        style={{ width: iconSize, height: iconSize }}
        className={`relative shrink-0 rounded-full flex items-center justify-center transition-transform duration-300 group-hover:scale-105 shadow-xs ${
          isDark ? 'bg-[#0E2A2B] text-[#FAF8F4]' : 'bg-[#FAF8F4] text-[#0E2A2B]'
        }`}
      >
        <svg
          viewBox="0 0 100 100"
          className="w-full h-full p-0.5"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Outer circle border */}
          <circle cx="50" cy="50" r="46" stroke="currentColor" strokeWidth="2.5" />
          <circle cx="50" cy="50" r="41" stroke="currentColor" strokeWidth="1" strokeDasharray="3 3" />
          
          {/* Circular Seal Text Path */}
          <path
            id="logoTextPath"
            d="M 50,50 m -34,0 a 34,34 0 1,1 68,0 a 34,34 0 1,1 -68,0"
            fill="none"
          />
          <text fontSize="7.5" fill="currentColor" letterSpacing="1.2" fontWeight="600">
            <textPath href="#logoTextPath" startOffset="0%">
              BETTER LIFE WITH BETTER MEDICINE · C.K.D ·
            </textPath>
          </text>

          {/* Central Apothecary / Laboratory Bell & Flask Silhouette */}
          <g transform="translate(32, 28) scale(0.36)" fill="currentColor">
            <path d="M50 0 C45 0 42 4 42 10 L42 28 C30 46 12 75 12 88 C12 95 18 100 25 100 L75 100 C82 100 88 95 88 88 C88 75 70 46 58 28 L58 10 C58 4 55 0 50 0 Z M50 14 C51 14 52 15 52 16 L52 30 L54 33 C64 48 78 72 79 84 C79 87 77 88 75 88 L25 88 C23 88 21 87 21 84 C22 72 36 48 46 33 L48 30 L48 16 C48 15 49 14 50 14 Z" />
            <circle cx="50" cy="65" r="5" opacity="0.8" />
            <circle cx="40" cy="74" r="4" opacity="0.6" />
            <circle cx="60" cy="76" r="3.5" opacity="0.7" />
          </g>
        </svg>
      </div>

      {/* Brand Wordmark */}
      <div className="flex flex-col">
        <div className="flex items-baseline gap-1.5 leading-none">
          <span className={`font-serif-editorial font-bold tracking-tight ${textSize} ${
            isDark ? 'text-[#0E2A2B]' : 'text-[#FAF8F4]'
          }`}>
            CKD Pharma
          </span>
          <span className="text-[10px] font-semibold tracking-widest uppercase text-[#0F5E5A] bg-[#0F5E5A]/10 px-1.5 py-0.5 rounded-sm">
            PK
          </span>
        </div>
        {showTagline && (
          <span className={`text-[10px] tracking-wider uppercase font-medium mt-0.5 ${
            isDark ? 'text-[#5B6B6C]' : 'text-[#FAF8F4]/70'
          }`}>
            Pharmaceuticals Ltd.
          </span>
        )}
      </div>
    </Link>
  );
};
