import React from 'react';
import { ShieldCheck, Award, CheckCircle2 } from 'lucide-react';
import { siteConfig } from '../../content/site';

export const CertificationsMarquee: React.FC = () => {
  const certifications = [
    { title: 'DRAP Manufacturing License', number: siteConfig.drapLicenseNumber, year: 'Current' },
    { title: 'cGMP Validated Facility', number: 'DRAP-GMP-2024/09', year: 'Audited' },
    { title: 'ISO 9001:2015 Certified', number: 'QA/ISO-PK-4128', year: 'Standard' },
    { title: 'WHO Guideline Compliance', number: 'TRS 986 / Annex 2', year: 'Verified' },
    { title: 'Class 10,000 Cleanroom Specs', number: 'ISO 14644-1 Class 7', year: 'Monitored' },
    { title: 'HPLC Assay Purity Standard', number: 'USP / BP Compliant', year: 'Laboratory' }
  ];

  // Duplicate for seamless loop
  const marqueeItems = [...certifications, ...certifications];

  return (
    <div className="py-4 bg-[#FAF8F4] border-b border-[#0E2A2B]/8 overflow-hidden select-none group">
      <div className="max-w-7xl mx-auto px-4 flex items-center gap-6">
        <div className="shrink-0 flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#0F5E5A] pr-4 border-r border-[#0E2A2B]/10 hidden sm:flex">
          <Award className="w-4 h-4" strokeWidth={1.5} />
          <span>Accreditations</span>
        </div>

        {/* Marquee Track */}
        <div className="flex-1 overflow-hidden relative">
          {/* Subtle gradient fades on edges */}
          <div className="absolute left-0 inset-y-0 w-8 bg-gradient-to-r from-[#FAF8F4] to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 inset-y-0 w-8 bg-gradient-to-l from-[#FAF8F4] to-transparent z-10 pointer-events-none" />

          <div className="flex items-center gap-8 whitespace-nowrap animate-marquee group-hover:[animation-play-state:paused]">
            {marqueeItems.map((cert, idx) => (
              <div
                key={`${cert.title}-${idx}`}
                className="inline-flex items-center gap-2.5 px-3 py-1.5 rounded-lg bg-white/80 border border-[#0E2A2B]/8 hover:border-[#0F5E5A]/30 transition-colors shadow-2xs"
              >
                <ShieldCheck className="w-4 h-4 text-[#0F5E5A] shrink-0" strokeWidth={1.5} />
                <span className="text-xs font-semibold text-[#0E2A2B]">{cert.title}</span>
                <span className="text-[10px] font-mono text-[#5B6B6C] bg-[#0E2A2B]/5 px-1.5 py-0.5 rounded">
                  {cert.number}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
