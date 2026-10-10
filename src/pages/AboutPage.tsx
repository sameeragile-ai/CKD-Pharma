import React from 'react';
import { Link } from 'react-router-dom';
import { SEO } from '../lib/seo';
import { siteConfig } from '../content/site';
import { siteImages } from '../content/images';
import { ShieldCheck, Award, Microscope, HeartHandshake, ArrowRight } from 'lucide-react';

export const AboutPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#FAF8F4] pt-28 pb-20">
      <SEO
        title="About CKD Pharma | 40-Year Heritage & Executive Governance"
        description="Discover the 40-year story of CKD Pharmaceuticals (Pvt.) Limited in Pakistan. Our heritage since 1984, executive leadership team, core values, and pharmaceutical standards."
        canonicalPath="/about"
        breadcrumbs={[
          { name: 'Home', url: '/' },
          { name: 'About Us', url: '/about' }
        ]}
      />

      {/* Hero Header */}
      <section className="pt-8 pb-16 gradient-calm border-b border-[#0E2A2B]/8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="max-w-3xl space-y-4">
            <span className="text-xs uppercase tracking-widest font-bold text-[#0F5E5A]">
              01 — OUR HERITAGE & INSTITUTION
            </span>
            <h1 className="font-serif-editorial text-4xl sm:text-5xl md:text-6xl font-normal text-[#0E2A2B] leading-tight text-balance">
              Four decades of unwavering <span className="italic font-serif">pharmaceutical integrity</span> in Pakistan.
            </h1>
            <p className="text-base sm:text-lg text-[#5B6B6C] leading-relaxed">
              Established in 1984 in Lahore, CKD Pharma has evolved from an indigenous formulation facility into an integrated healthcare manufacturer trusted by hospitals, pharmacies, and families across 52+ cities.
            </p>
          </div>
        </div>
      </section>

      {/* Vision & Values Grid */}
      <section className="py-20 border-b border-[#0E2A2B]/8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-8 rounded-2xl bg-white border border-[#0E2A2B]/10 shadow-xs space-y-3">
              <div className="w-10 h-10 rounded-lg bg-[#0F5E5A]/10 text-[#0F5E5A] flex items-center justify-center">
                <Award className="w-5 h-5" strokeWidth={1.5} />
              </div>
              <h3 className="font-serif-editorial text-2xl font-bold text-[#0E2A2B]">
                Our Vision
              </h3>
              <p className="text-xs text-[#5B6B6C] leading-relaxed">
                To lead the transformation of healthcare in Pakistan and emerging markets through scientific advancement, certified quality, and sustainable community access.
              </p>
            </div>

            <div className="p-8 rounded-2xl bg-white border border-[#0E2A2B]/10 shadow-xs space-y-3">
              <div className="w-10 h-10 rounded-lg bg-[#0F5E5A]/10 text-[#0F5E5A] flex items-center justify-center">
                <HeartHandshake className="w-5 h-5" strokeWidth={1.5} />
              </div>
              <h3 className="font-serif-editorial text-2xl font-bold text-[#0E2A2B]">
                Our Mission
              </h3>
              <p className="text-xs text-[#5B6B6C] leading-relaxed">
                To formulate, manufacture, and distribute uncompromised medicinal solutions that empower patients and support clinical practitioners, upholding strict DRAP standards.
              </p>
            </div>

            <div className="p-8 rounded-2xl bg-white border border-[#0E2A2B]/10 shadow-xs space-y-3">
              <div className="w-10 h-10 rounded-lg bg-[#0F5E5A]/10 text-[#0F5E5A] flex items-center justify-center">
                <Microscope className="w-5 h-5" strokeWidth={1.5} />
              </div>
              <h3 className="font-serif-editorial text-2xl font-bold text-[#0E2A2B]">
                Quality Imperative
              </h3>
              <p className="text-xs text-[#5B6B6C] leading-relaxed">
                Zero compromise on pharmacopoeial monographs. Every raw active ingredient, blister seal, and finished batch undergoes multi-stage assay before nationwide release.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Story Timeline */}
      <section className="py-20 bg-gradient-to-b from-[#FAF8F4] via-[#E8F0EA]/20 to-[#FAF8F4] border-b border-[#0E2A2B]/8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-16">
            <span className="text-xs uppercase tracking-widest font-bold text-[#0F5E5A] block mb-2">
              MILESTONES & HISTORY
            </span>
            <h2 className="font-serif-editorial text-3xl sm:text-4xl font-normal text-[#0E2A2B]">
              The CKD Pharma Journey (1984–2026)
            </h2>
          </div>

          <div className="relative pl-6 sm:pl-8 border-l-2 border-[#0F5E5A]/30 space-y-12">
            {siteConfig.milestones.map((m) => (
              <div key={m.year} className="relative group">
                {/* Node on vertical line */}
                <div className="absolute -left-[31px] sm:-left-[39px] top-1 w-4 h-4 rounded-full bg-[#FAF8F4] border-2 border-[#0F5E5A] group-hover:bg-[#0F5E5A] transition-colors" />

                <div className="bg-white p-6 rounded-xl border border-[#0E2A2B]/8 shadow-xs hover:border-[#0E2A2B]/20 transition-all">
                  <div className="flex items-baseline justify-between mb-2">
                    <span className="text-sm font-bold font-mono text-[#0F5E5A] tabular-nums">
                      {m.year}
                    </span>
                    {m.location && (
                      <span className="text-[11px] text-[#5B6B6C]">{m.location}</span>
                    )}
                  </div>
                  <h3 className="text-base font-bold text-[#0E2A2B] mb-1">
                    {m.title}
                  </h3>
                  <p className="text-xs text-[#5B6B6C] leading-relaxed">
                    {m.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Executive Leadership Grid */}
      <section id="leadership" className="py-20 border-b border-[#0E2A2B]/8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="max-w-2xl mb-14">
            <span className="text-xs uppercase tracking-widest font-bold text-[#0F5E5A] block mb-2">
              EXECUTIVE GOVERNANCE
            </span>
            <h2 className="font-serif-editorial text-3xl sm:text-4xl font-normal text-[#0E2A2B]">
              Leadership Dedicated to Patient Safety
            </h2>
            <p className="text-xs text-[#5B6B6C] mt-2">
              Our executive board pairs veteran pharmaceutical scientists, chemical production engineers, and regulatory specialists.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {siteConfig.leadership.map((member) => (
              <div
                key={member.id}
                className="bg-white rounded-xl border border-[#0E2A2B]/8 overflow-hidden hover:border-[#0E2A2B]/20 hover:shadow-xs transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="aspect-square overflow-hidden bg-[#FAF8F4]">
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-full h-full object-cover filter grayscale hover:grayscale-0 transition-all duration-500"
                      loading="lazy"
                    />
                  </div>
                  <div className="p-5 space-y-1.5">
                    <h3 className="text-sm font-bold text-[#0E2A2B]">
                      {member.name}
                    </h3>
                    <p className="text-xs font-medium text-[#0F5E5A]">
                      {member.role}
                    </p>
                    <p className="text-[10px] text-[#5B6B6C] font-mono">
                      {member.qualifications}
                    </p>
                    <p className="text-xs text-[#5B6B6C] pt-2 border-t border-[#0E2A2B]/5 leading-relaxed">
                      {member.bio}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Facility & Certifications Callout */}
      <section className="py-20 gradient-calm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="p-8 sm:p-12 rounded-2xl bg-white border border-[#0E2A2B]/10 shadow-sm flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="space-y-3 max-w-xl">
              <span className="text-xs uppercase tracking-widest font-bold text-[#0F5E5A]">
                MANUFACTURING EXCELLENCE
              </span>
              <h3 className="font-serif-editorial text-2xl sm:text-3xl font-normal text-[#0E2A2B]">
                120,000 sq.ft Kot Lakhpat Campus
              </h3>
              <p className="text-xs text-[#5B6B6C] leading-relaxed">
                Tour our automated fluid bed dryers, rotary tablet presses, blister thermoforming lines, and ISO-accredited microbiological laboratories.
              </p>
            </div>
            <Link
              to="/manufacturing"
              className="px-6 py-3 rounded-lg bg-[#0E2A2B] text-[#FAF8F4] text-xs font-semibold hover:bg-[#163E3F] transition-colors shrink-0 flex items-center gap-2"
            >
              <span>Explore Cleanroom Facility</span>
              <ArrowRight className="w-4 h-4" strokeWidth={1.5} />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};
