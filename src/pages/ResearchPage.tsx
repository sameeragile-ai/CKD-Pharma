import React from 'react';
import { Link } from 'react-router-dom';
import { SEO } from '../lib/seo';
import { siteImages } from '../content/images';
import { Microscope, FlaskConical, Sparkles, ShieldCheck, ArrowRight } from 'lucide-react';

export const ResearchPage: React.FC = () => {
  const pillars = [
    {
      title: 'Bioavailability & Dissolution Profiling',
      description: 'Using in vitro multi-channel USP dissolution apparatuses (baskets and paddles) under simulated gastric and intestinal fluid buffers to benchmark dissolution kinetic rates against global reference innovatory products.'
    },
    {
      title: 'Accelerated & Long-Term Stability Chambers',
      description: 'Testing batches under ICH Zone IVb climatic conditions (40°C ± 2°C / 75% RH ± 5% RH) for 6 months and Zone IVa ambient conditions for 36 months to validate shelf-life integrity across Pakistani summer temperature extremes.'
    },
    {
      title: 'Novel OTC Synergistic Formulations',
      description: 'Developing multi-mineral combinations like BonAid-D, balancing micronutrient competition (e.g. Zinc and Calcium transport pathways) through delayed release matrix carriers and enteric coatings.'
    },
    {
      title: 'Analytical Method Validation (ICH Q2)',
      description: 'Developing high-resolution reverse-phase HPLC methods with photodiode array detection for assay specificity, linearity, precision, limits of detection, and robustness.'
    }
  ];

  return (
    <div className="min-h-screen bg-[#FAF8F4] pt-28 pb-20">
      <SEO
        title="Research & Formulation Development | CKD Pharma"
        description="Explore CKD Pharma scientific research and development capabilities. Bioavailability optimization, ICH stability testing, and novel oral solid dosage formulation."
        canonicalPath="/research"
        breadcrumbs={[
          { name: 'Home', url: '/' },
          { name: 'R&D', url: '/research' }
        ]}
      />

      <section className="pt-8 pb-16 gradient-calm border-b border-[#0E2A2B]/8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="max-w-3xl space-y-4">
            <span className="text-xs uppercase tracking-widest font-bold text-[#0F5E5A]">
              04 — SCIENTIFIC RESEARCH & INNOVATION
            </span>
            <h1 className="font-serif-editorial text-4xl sm:text-5xl md:text-6xl font-normal text-[#0E2A2B] leading-tight text-balance">
              Formulation science translating chemistry into <span className="italic font-serif">clinical efficacy</span>.
            </h1>
            <p className="text-base sm:text-lg text-[#5B6B6C] leading-relaxed">
              Our 32-member R&D team in Lahore investigates novel excipients, modified release kinetics, and pharmacokinetic bioavailability to deliver dependable therapy for the healthcare needs of Pakistan.
            </p>
          </div>
        </div>
      </section>

      {/* R&D Overview Split */}
      <section className="py-20 border-b border-[#0E2A2B]/8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-6 space-y-6">
              <span className="text-xs uppercase tracking-widest font-bold text-[#0F5E5A]">
                LABORATORY CAPABILITIES
              </span>
              <h2 className="font-serif-editorial text-3xl sm:text-4xl font-normal text-[#0E2A2B]">
                Investigational Pharmaceutics
              </h2>
              <p className="text-sm text-[#5B6B6C] leading-relaxed">
                From pre-formulation polymorph characterization to pilot-scale batch optimization, our research suites are equipped with computerized tablet disintegration baths, UV-Vis spectrophotometers, differential scanning calorimetry, and high-performance liquid chromatography.
              </p>
              <div className="p-4 rounded-xl bg-white border border-[#0E2A2B]/8 space-y-2 text-xs">
                <div className="font-bold text-[#0E2A2B]">Academic Collaboration & Clinical Studies</div>
                <p className="text-[#5B6B6C] leading-relaxed">
                  We actively collaborate with university pharmacy faculties and leading teaching hospitals in Lahore and Karachi to conduct bioavailability crossover studies and clinical tolerance trials for our registered molecules.
                </p>
              </div>
            </div>

            <div className="lg:col-span-6">
              <div className="relative rounded-2xl overflow-hidden shadow-lg border border-[#0E2A2B]/10 aspect-4/3">
                <img
                  src={siteImages.researchScience.src}
                  alt={siteImages.researchScience.alt}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.currentTarget.src = siteImages.qualityControlLab.src;
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4 Pillars Grid */}
      <section className="py-20 bg-gradient-to-b from-[#FAF8F4] via-[#E8F0EA]/20 to-[#FAF8F4] border-b border-[#0E2A2B]/8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs uppercase tracking-widest font-bold text-[#0F5E5A] block mb-2">
              CORE SCIENTIFIC PILLARS
            </span>
            <h2 className="font-serif-editorial text-3xl sm:text-4xl font-normal text-[#0E2A2B]">
              Methodological Rigor in Every Formulation
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {pillars.map((pil, idx) => (
              <div
                key={idx}
                className="p-8 rounded-2xl bg-white border border-[#0E2A2B]/8 shadow-xs hover:border-[#0E2A2B]/20 transition-all space-y-3"
              >
                <div className="w-10 h-10 rounded-lg bg-[#0F5E5A]/10 text-[#0F5E5A] flex items-center justify-center">
                  <FlaskConical className="w-5 h-5" strokeWidth={1.5} />
                </div>
                <h3 className="text-lg font-bold text-[#0E2A2B]">
                  {pil.title}
                </h3>
                <p className="text-xs sm:text-sm text-[#5B6B6C] leading-relaxed">
                  {pil.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* R&D Call to Action */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="p-8 sm:p-12 rounded-2xl bg-[#0E2A2B] text-[#FAF8F4] flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="space-y-3 max-w-xl">
              <span className="text-xs uppercase tracking-widest font-bold text-[#E6F3F2]">
                CLINICAL PARTNERSHIPS
              </span>
              <h3 className="font-serif-editorial text-2xl sm:text-3xl font-normal">
                Contract Research & Analytical Testing Inquiries
              </h3>
              <p className="text-xs text-[#FAF8F4]/80 leading-relaxed">
                Connect with our Scientific Advisory Board to discuss stability testing, method transfer, or clinical bioequivalence studies.
              </p>
            </div>
            <Link
              to="/contact?inquiry=rd"
              className="px-6 py-3 rounded-lg bg-[#FAF8F4] text-[#0E2A2B] text-xs font-semibold hover:bg-white transition-colors shrink-0 flex items-center gap-2"
            >
              <span>Connect with R&D Directorate</span>
              <ArrowRight className="w-4 h-4" strokeWidth={1.5} />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};
