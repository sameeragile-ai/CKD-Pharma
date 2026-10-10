import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Award, ShieldCheck, Microscope, Users } from 'lucide-react';
import { siteImages } from '../../content/images';

interface MegaMenuAboutProps {
  onClose: () => void;
}

export const MegaMenuAbout: React.FC<MegaMenuAboutProps> = ({ onClose }) => {
  const sections = [
    {
      title: 'Our 40-Year Journey',
      description: 'Indigenous Pakistani pharmaceutical pioneering since 1984.',
      path: '/about',
      icon: Award
    },
    {
      title: 'Executive Leadership',
      description: 'Seasoned pharmacy doctors and chemical manufacturing engineers.',
      path: '/about#leadership',
      icon: Users
    },
    {
      title: 'Manufacturing & Cleanrooms',
      description: 'Kot Lakhpat facility, Class 10,000 suites and automated blister lines.',
      path: '/manufacturing',
      icon: ShieldCheck
    },
    {
      title: 'Research & Bioavailability',
      description: 'Pharmacokinetics, dissolution stability, and formulation trials.',
      path: '/research',
      icon: Microscope
    }
  ];

  return (
    <div className="absolute top-full left-0 w-full bg-[#FAF8F4]/98 backdrop-blur-md border-b border-[#0E2A2B]/10 shadow-2xl z-40 animate-in fade-in slide-in-from-top-2 duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] before:absolute before:-top-4 before:inset-x-0 before:h-4 before:content-['']">
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-12 gap-8">
          {/* Column 1: Core Navigation Pillars (7 cols) */}
          <div className="col-span-7 border-r border-[#0E2A2B]/8 pr-8">
            <span className="text-xs uppercase tracking-widest font-bold text-[#5B6B6C] block mb-4">
              Institutional Pillars & Integrity
            </span>
            <div className="grid grid-cols-2 gap-4">
              {sections.map((sec) => {
                const Icon = sec.icon;
                return (
                  <Link
                    key={sec.title}
                    to={sec.path}
                    onClick={onClose}
                    className="p-3.5 rounded-xl border border-[#0E2A2B]/6 hover:border-[#0F5E5A]/30 hover:bg-[#0E2A2B]/4 transition-all duration-200 group flex gap-3 cursor-pointer card-hover-lift"
                  >
                    <div className="w-9 h-9 rounded-lg bg-[#0F5E5A]/10 text-[#0F5E5A] flex items-center justify-center shrink-0 group-hover:bg-[#0F5E5A] group-hover:text-[#FAF8F4] transition-colors duration-200">
                      <Icon className="w-4 h-4" strokeWidth={1.5} />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-[#0E2A2B] group-hover:text-[#0F5E5A] transition-colors flex items-center gap-1">
                        <span>{sec.title}</span>
                        <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all" strokeWidth={1.5} />
                      </h4>
                      <p className="text-[11px] text-[#5B6B6C] mt-1 leading-relaxed">
                        {sec.description}
                      </p>
                    </div>
                  </Link>
                );
              })}
            </div>

            <div className="mt-6 pt-4 border-t border-[#0E2A2B]/8 flex items-center justify-between text-xs text-[#5B6B6C]">
              <span>Corporate DRAP License: <strong>DRAP-MFG-004128/PK</strong></span>
              <Link to="/news" onClick={onClose} className="text-[#0F5E5A] font-semibold hover:underline flex items-center gap-1">
                <span>View News & Media Releases</span>
                <ArrowRight className="w-3 h-3" strokeWidth={1.5} />
              </Link>
            </div>
          </div>

          {/* Column 2: Facility Snapshot (5 cols) */}
          <div className="col-span-5 pl-2 flex flex-col justify-between">
            <div className="space-y-3">
              <span className="text-xs uppercase tracking-widest font-bold text-[#5B6B6C] block">
                Kot Lakhpat Campus, Lahore
              </span>
              <div className="relative rounded-xl overflow-hidden aspect-16/9 border border-[#0E2A2B]/8 group">
                <img
                  src={siteImages.manufacturingFacility.src}
                  alt={siteImages.manufacturingFacility.alt}
                  className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-500"
                  onError={(e) => {
                    e.currentTarget.src = siteImages.heroLab.src;
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0E2A2B]/80 via-transparent to-transparent flex items-end p-4">
                  <div className="text-white space-y-1">
                    <p className="text-xs font-semibold">120,000 sq.ft High-Containment Facility</p>
                    <p className="text-[11px] text-white/80">ISO 9001:2015 & cGMP Validated Operations</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-[#0E2A2B]/8 flex items-center justify-between text-xs font-medium text-[#5B6B6C]">
              <Link to="/careers" onClick={onClose} className="hover:text-[#0E2A2B]">
                Careers at CKD Pharma →
              </Link>
              <Link to="/contact" onClick={onClose} className="text-[#0F5E5A] font-semibold hover:underline">
                Regional Distribution Network →
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
