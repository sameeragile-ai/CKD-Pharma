import React from 'react';
import { Link } from 'react-router-dom';
import { SEO } from '../lib/seo';
import { siteConfig } from '../content/site';
import { siteImages } from '../content/images';
import { ShieldCheck, CheckCircle2, Award, Microscope, Droplets, Wind, ArrowRight } from 'lucide-react';

export const ManufacturingPage: React.FC = () => {
  const steps = [
    {
      step: '01',
      title: 'Active Raw Material Quarantine & Assay',
      description: 'Incoming APIs and excipients undergo strict quarantine. QC chemists run HPLC identification, chromatographic purity, and heavy metal screening against BP/USP monographs before warehouse release.'
    },
    {
      step: '02',
      title: 'Class 10,000 Cleanroom Granulation & Drying',
      description: 'Formulation suites operate under positive HEPA-filtered air pressure, controlled 45% relative humidity, and strict temperature maintenance to protect moisture-sensitive granules.'
    },
    {
      step: '03',
      title: 'Rotary Tablet Compression & Core Hardness',
      description: 'High-speed automated tablet presses incorporate continuous weight-variation feedback, friability monitoring, and multi-stage hardness validation.'
    },
    {
      step: '04',
      title: 'Aqueous Film Coating & Enteric Barrier',
      description: 'Perforated coating pans apply uniform, plasticizer-free polymers protecting active ingredients from gastric acid degradation (e.g. Omeprazole pellets).'
    },
    {
      step: '05',
      title: 'Alu-Alu Blister Packing & Anti-Counterfeit Serialization',
      description: 'German blister packaging automation embeds 2D data-matrix barcodes, batch codes, and tamper-evident heat seals combating illicit drug counterfeiting in Pakistan.'
    },
    {
      step: '06',
      title: 'Finished Batch QC Release & Retained Stability',
      description: 'Final release requires microbiological sterility certificates, dissolution rate curves, and sample retention in ICH climatic stability chambers.'
    }
  ];

  return (
    <div className="min-h-screen bg-[#FAF8F4] pt-28 pb-20">
      <SEO
        title="Manufacturing & Quality Excellence | CKD Pharma"
        description="Inside CKD Pharma Kot Lakhpat campus. Class 10,000 sterile cleanrooms, DRAP cGMP certifications, automated blister packaging, and QA/QC testing protocols."
        canonicalPath="/manufacturing"
        breadcrumbs={[
          { name: 'Home', url: '/' },
          { name: 'Manufacturing & Quality', url: '/manufacturing' }
        ]}
      />

      {/* Header */}
      <section className="pt-8 pb-16 gradient-calm border-b border-[#0E2A2B]/8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="max-w-3xl space-y-4">
            <span className="text-xs uppercase tracking-widest font-bold text-[#0F5E5A]">
              03 — MANUFACTURING & QUALITY
            </span>
            <h1 className="font-serif-editorial text-4xl sm:text-5xl md:text-6xl font-normal text-[#0E2A2B] leading-tight text-balance">
              Sterile cleanrooms engineered for <span className="italic font-serif">uncompromising</span> patient safety.
            </h1>
            <p className="text-base sm:text-lg text-[#5B6B6C] leading-relaxed">
              Inside our 120,000 sq.ft facility in Kot Lakhpat, Lahore, every process is governed by DRAP Schedule B-II guidelines, continuous HEPA filtration, and rigorous chemical analytics.
            </p>
          </div>
        </div>
      </section>

      {/* Facility Infrastructure Metrics */}
      <section className="py-16 border-b border-[#0E2A2B]/8 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="space-y-1">
              <div className="text-xs uppercase font-bold text-[#5B6B6C]">Cleanroom Classification</div>
              <div className="font-serif-editorial text-3xl font-bold text-[#0E2A2B]">Class 10,000</div>
              <div className="text-xs text-[#5B6B6C]">ISO 7 certified HVAC suites</div>
            </div>

            <div className="space-y-1">
              <div className="text-xs uppercase font-bold text-[#5B6B6C]">Water Generation</div>
              <div className="font-serif-editorial text-3xl font-bold text-[#0E2A2B]">USP Grade</div>
              <div className="text-xs text-[#5B6B6C]">Double-pass Reverse Osmosis loops</div>
            </div>

            <div className="space-y-1">
              <div className="text-xs uppercase font-bold text-[#5B6B6C]">Solid Oral Capacity</div>
              <div className="font-serif-editorial text-3xl font-bold text-[#0E2A2B]">1.2B Units</div>
              <div className="text-xs text-[#5B6B6C]">Tablets & capsules annually</div>
            </div>

            <div className="space-y-1">
              <div className="text-xs uppercase font-bold text-[#5B6B6C]">Liquid Packaging</div>
              <div className="font-serif-editorial text-3xl font-bold text-[#0E2A2B]">15M Bottles</div>
              <div className="text-xs text-[#5B6B6C]">Syrups & pediatric suspensions</div>
            </div>
          </div>
        </div>
      </section>

      {/* Large Facility Photography Split */}
      <section className="py-20 border-b border-[#0E2A2B]/8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-6 space-y-6">
              <span className="text-xs uppercase tracking-widest font-bold text-[#0F5E5A]">
                ENGINEERING & HVAC INTEGRITY
              </span>
              <h2 className="font-serif-editorial text-3xl sm:text-4xl font-normal text-[#0E2A2B]">
                Closed-System Processing & Environmental Containment
              </h2>
              <p className="text-sm text-[#5B6B6C] leading-relaxed">
                Cross-contamination prevention is the cornerstone of our manufacturing design. Each processing suite is equipped with independent air handling units (AHUs) delivering 30+ air changes per hour with terminal HEPA filters yielding 99.97% particulate arrestance at 0.3 microns.
              </p>
              
              <div className="space-y-3 pt-2">
                <div className="flex items-center gap-3 text-xs font-semibold text-[#0E2A2B]">
                  <Wind className="w-4 h-4 text-[#0F5E5A]" />
                  <span>Cascade air pressure differentials (15–30 Pascals)</span>
                </div>
                <div className="flex items-center gap-3 text-xs font-semibold text-[#0E2A2B]">
                  <Droplets className="w-4 h-4 text-[#0F5E5A]" />
                  <span>Sanitized SS-316L stainless steel pharmaceutical contact piping</span>
                </div>
                <div className="flex items-center gap-3 text-xs font-semibold text-[#0E2A2B]">
                  <Microscope className="w-4 h-4 text-[#0F5E5A]" />
                  <span>Routine settle-plate and airborne viable particle microbiology</span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-6">
              <div className="relative rounded-2xl overflow-hidden shadow-lg border border-[#0E2A2B]/10 aspect-4/3">
                <img
                  src={siteImages.manufacturingFacility.src}
                  alt={siteImages.manufacturingFacility.alt}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.currentTarget.src = siteImages.heroLab.src;
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6-Step QA/QC Process */}
      <section className="py-20 bg-gradient-to-b from-[#FAF8F4] via-[#E8F0EA]/30 to-[#FAF8F4] border-b border-[#0E2A2B]/8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs uppercase tracking-widest font-bold text-[#0F5E5A] block mb-2">
              QUALITY CONTROL PROTOCOL
            </span>
            <h2 className="font-serif-editorial text-3xl sm:text-4xl font-normal text-[#0E2A2B]">
              From Raw Inbound Assay to Batch Release
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {steps.map((st) => (
              <div
                key={st.step}
                className="p-6 rounded-xl bg-white border border-[#0E2A2B]/8 shadow-xs hover:border-[#0E2A2B]/20 transition-all space-y-3"
              >
                <div className="flex items-center justify-between">
                  <span className="font-mono text-sm font-bold text-[#0F5E5A]">
                    {st.step}
                  </span>
                  <ShieldCheck className="w-4 h-4 text-[#0F5E5A]" strokeWidth={1.5} />
                </div>
                <h3 className="text-base font-bold text-[#0E2A2B]">
                  {st.title}
                </h3>
                <p className="text-xs text-[#5B6B6C] leading-relaxed">
                  {st.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Regulatory Certifications Grid */}
      <section className="py-20 border-b border-[#0E2A2B]/8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="max-w-2xl mb-12">
            <span className="text-xs uppercase tracking-widest font-bold text-[#0F5E5A] block mb-2">
              REGULATORY ACCREDITATIONS
            </span>
            <h2 className="font-serif-editorial text-3xl sm:text-4xl font-normal text-[#0E2A2B]">
              Audited by National & International Authorities
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {siteConfig.certifications.map((cert) => (
              <div
                key={cert.id}
                className="p-6 rounded-xl bg-white border border-[#0E2A2B]/8 shadow-xs space-y-3 flex flex-col justify-between"
              >
                <div>
                  <div className="w-8 h-8 rounded-lg bg-[#0F5E5A]/10 text-[#0F5E5A] flex items-center justify-center mb-3">
                    <Award className="w-4 h-4" strokeWidth={1.5} />
                  </div>
                  <h3 className="text-sm font-bold text-[#0E2A2B]">
                    {cert.name}
                  </h3>
                  <p className="text-xs font-semibold text-[#0F5E5A] mt-0.5">
                    {cert.authority}
                  </p>
                  <p className="text-xs text-[#5B6B6C] mt-2 leading-relaxed">
                    {cert.description}
                  </p>
                </div>
                <div className="pt-3 border-t border-[#0E2A2B]/6 text-[11px] font-mono font-medium text-[#5B6B6C]">
                  {cert.validThrough}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};
