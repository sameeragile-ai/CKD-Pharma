import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  ArrowRight, 
  ShieldCheck, 
  FlaskConical, 
  Award, 
  Truck, 
  Microscope, 
  Building2, 
  CheckCircle2, 
  Pill, 
  ChevronRight,
  ExternalLink,
  Users
} from 'lucide-react';
import { SEO } from '../lib/seo';
import { siteConfig } from '../content/site';
import { siteImages } from '../content/images';
import { productsData } from '../content/products';
import { articlesData } from '../content/articles';
import { ProductCard } from '../components/shop/ProductCard';
import { useI18n } from '../lib/i18n';

import { HeroCinematicSlideshow } from '../components/home/HeroCinematicSlideshow';
import { CertificationsMarquee } from '../components/home/CertificationsMarquee';

export const HomePage: React.FC = () => {
  const { t } = useI18n();
  const [activeAreaIndex, setActiveAreaIndex] = useState(0);

  // Four products extracted from current website screenshot
  const screenshotProducts = productsData.filter(p => 
    ['bonaid-d-tablet', 'cekamol-500mg-tablet', 'cekofen-p-tablet', 'mippi-20mg-capsule'].includes(p.id)
  );

  return (
    <div className="min-h-screen bg-[#FAF8F4] overflow-hidden">
      <SEO
        title="CKD Pharma Pakistan | Advancing Healthcare With Trust & Innovation"
        description="Official portal of CKD Pharmaceuticals (Pvt.) Limited Pakistan. 40+ years of cGMP-certified manufacturing, APIs, diagnostics, and DRAP-approved OTC healthcare essentials."
        canonicalPath="/"
      />

      {/* ─────────────────────────────────────────────────────────────
          1. SIGNATURE CINEMATIC HERO SLIDESHOW (Award-Winning Editorial)
      ────────────────────────────────────────────────────────────── */}
      <HeroCinematicSlideshow />

      {/* Institutional Trust Indicators Bar (Direct from authentic CKD data) */}
      <section className="py-6 bg-[#FAF8F4] border-b border-[#0E2A2B]/8 relative z-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-left divide-y sm:divide-y-0 sm:divide-x divide-[#0E2A2B]/8">
            <div className="pt-2 sm:pt-0 sm:px-4">
              <div className="font-serif-editorial text-2xl sm:text-3xl font-bold text-[#0E2A2B] tabular-nums">
                40+ Years
              </div>
              <div className="text-xs text-[#5B6B6C] font-medium mt-0.5">
                Pharmaceutical Expertise (Est. 1984)
              </div>
            </div>

            <div className="pt-2 sm:pt-0 sm:px-4">
              <div className="font-serif-editorial text-2xl sm:text-3xl font-bold text-[#0E2A2B] tabular-nums">
                100%
              </div>
              <div className="text-xs text-[#5B6B6C] font-medium mt-0.5">
                DRAP & cGMP Validated Compliance
              </div>
            </div>

            <div className="pt-2 sm:pt-0 sm:px-4">
              <div className="font-serif-editorial text-2xl sm:text-3xl font-bold text-[#0E2A2B] tabular-nums">
                180+
              </div>
              <div className="text-xs text-[#5B6B6C] font-medium mt-0.5">
                Registered Therapeutic Formulations
              </div>
            </div>

            <div className="pt-2 sm:pt-0 sm:px-4">
              <div className="font-serif-editorial text-2xl sm:text-3xl font-bold text-[#0E2A2B] tabular-nums">
                52+ Cities
              </div>
              <div className="text-xs text-[#5B6B6C] font-medium mt-0.5">
                Nationwide Cold-Chain Reach
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Infinite Certifications & DRAP Accreditation Marquee */}
      <CertificationsMarquee />

      {/* ─────────────────────────────────────────────────────────────
          2. OUR DIVISIONS (Exact match from current website screenshot)
      ────────────────────────────────────────────────────────────── */}
      <section className="py-20 bg-[#FAF8F4] border-b border-[#0E2A2B]/8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="text-xs uppercase tracking-widest font-bold text-[#0F5E5A] block mb-2">
              OUR DIVISIONS
            </span>
            <h2 className="font-serif-editorial text-3xl sm:text-4xl font-normal text-[#0E2A2B]">
              What We Offer
            </h2>
            <p className="text-sm text-[#5B6B6C] mt-3">
              Comprehensive pharmaceutical capabilities spanning active chemical synthesis to patient-ready finished dosage forms and cold-chain logistics.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {siteConfig.divisions.map((div, index) => {
              const isDistribution = div.id === 'distribution';
              return (
                <div
                  key={div.id}
                  className={`p-6 rounded-xl border card-hover-lift flex flex-col justify-between ${
                    isDistribution
                      ? 'bg-[#0E2A2B] text-[#FAF8F4] border-[#0E2A2B] shadow-md'
                      : 'bg-white border-[#0E2A2B]/8 hover:border-[#0E2A2B]/20'
                  }`}
                >
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className={`text-xs font-mono font-semibold ${isDistribution ? 'text-[#FAF8F4]/60' : 'text-[#5B6B6C]'}`}>
                        0{index + 1}
                      </span>
                      {div.id === 'pharma' && <Pill className="w-5 h-5 text-[#0F5E5A]" strokeWidth={1.5} />}
                      {div.id === 'apis' && <FlaskConical className="w-5 h-5 text-[#0F5E5A]" strokeWidth={1.5} />}
                      {div.id === 'diagnose' && <Microscope className="w-5 h-5 text-[#0F5E5A]" strokeWidth={1.5} />}
                      {div.id === 'distribution' && <Truck className="w-5 h-5 text-[#FAF8F4]" strokeWidth={1.5} />}
                    </div>

                    <div>
                      <h3 className={`text-xl font-bold font-serif-editorial ${isDistribution ? 'text-[#FAF8F4]' : 'text-[#0E2A2B]'}`}>
                        {div.title}
                      </h3>
                      <p className={`text-xs font-medium mt-0.5 ${isDistribution ? 'text-[#FAF8F4]/80' : 'text-[#0F5E5A]'}`}>
                        {div.subtitle}
                      </p>
                    </div>

                    <p className={`text-xs leading-relaxed ${isDistribution ? 'text-[#FAF8F4]/75' : 'text-[#5B6B6C]'}`}>
                      {div.description}
                    </p>
                  </div>

                  <div className="pt-6 mt-6 border-t border-current/10">
                    <Link
                      to={div.id === 'pharma' ? '/products' : div.id === 'distribution' ? '/contact' : '/manufacturing'}
                      className={`text-xs font-semibold inline-flex items-center gap-1 link-draw ${
                        isDistribution ? 'text-[#FAF8F4]' : 'text-[#0F5E5A]'
                      }`}
                    >
                      <span>Learn more</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" strokeWidth={1.5} />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          3. WHY CHOOSE US / QUALITY YOU CAN RELY ON (Exact text)
      ────────────────────────────────────────────────────────────── */}
      <section className="py-20 bg-gradient-to-b from-[#FAF8F4] via-[#E8F0EA]/30 to-[#FAF8F4] border-b border-[#0E2A2B]/8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Narrative */}
            <div className="lg:col-span-7 space-y-6">
              <span className="text-xs uppercase tracking-widest font-bold text-[#0F5E5A] block">
                WHY CHOOSE US
              </span>
              <h2 className="font-serif-editorial text-3xl sm:text-4xl md:text-5xl font-normal text-[#0E2A2B]">
                Quality You Can Rely On
              </h2>
              <p className="text-base text-[#5B6B6C] leading-relaxed max-w-xl">
                We are committed to delivering pharmaceutical solutions that meet the highest standards of safety, purity, and consistency. Backed by certified processes and a team of industry experts, we ensure every product reflects excellence and trust.
              </p>

              {/* Exact Bullets from screenshot */}
              <div className="space-y-4 pt-2">
                <div className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-[#0F5E5A]/10 text-[#0F5E5A] flex items-center justify-center shrink-0 mt-0.5">
                    <CheckCircle2 className="w-3.5 h-3.5" strokeWidth={2} />
                  </div>
                  <div>
                    <strong className="text-sm text-[#0E2A2B] block">Stringent quality control at every stage</strong>
                    <span className="text-xs text-[#5B6B6C]">From active raw material validation to in-process friability, dissolution, and microbiological assay.</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-[#0F5E5A]/10 text-[#0F5E5A] flex items-center justify-center shrink-0 mt-0.5">
                    <CheckCircle2 className="w-3.5 h-3.5" strokeWidth={2} />
                  </div>
                  <div>
                    <strong className="text-sm text-[#0E2A2B] block">Globally recognized certifications & standards</strong>
                    <span className="text-xs text-[#5B6B6C]">Compliant with DRAP Schedule B-II, WHO cGMP, ISO 9001:2015, and British Pharmacopoeia specifications.</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-[#0F5E5A]/10 text-[#0F5E5A] flex items-center justify-center shrink-0 mt-0.5">
                    <CheckCircle2 className="w-3.5 h-3.5" strokeWidth={2} />
                  </div>
                  <div>
                    <strong className="text-sm text-[#0E2A2B] block">Science-driven approach with advanced R&D</strong>
                    <span className="text-xs text-[#5B6B6C]">Continuous stability testing, pharmacokinetic bioavailability optimization, and patient-centric delivery.</span>
                  </div>
                </div>
              </div>

              <div className="pt-4 flex items-center gap-4">
                <Link
                  to="/manufacturing"
                  className="px-5 py-2.5 rounded-lg bg-[#0E2A2B] text-[#FAF8F4] text-xs font-semibold hover:bg-[#163E3F] transition-colors"
                >
                  Tour Quality & Cleanrooms
                </Link>
                <Link
                  to="/research"
                  className="text-xs font-semibold text-[#0F5E5A] hover:underline"
                >
                  Explore R&D Capabilities →
                </Link>
              </div>
            </div>

            {/* Right Pillars Cards (matching flask, partnership, team icons from screenshot) */}
            <div className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-1 gap-4">
              <div className="p-5 rounded-xl border border-[#0E2A2B]/10 bg-white shadow-xs flex items-center gap-4">
                <div className="w-12 h-12 rounded-lg bg-[#0F5E5A]/10 text-[#0F5E5A] flex items-center justify-center shrink-0">
                  <FlaskConical className="w-6 h-6" strokeWidth={1.5} />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-[#0E2A2B]">Analytical Precision</h4>
                  <p className="text-xs text-[#5B6B6C]">HPLC chromatography, spectrophotometry, and micro assays.</p>
                </div>
              </div>

              <div className="p-5 rounded-xl border border-[#0E2A2B]/10 bg-white shadow-xs flex items-center gap-4">
                <div className="w-12 h-12 rounded-lg bg-[#0F5E5A]/10 text-[#0F5E5A] flex items-center justify-center shrink-0">
                  <ShieldCheck className="w-6 h-6" strokeWidth={1.5} />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-[#0E2A2B]">DRAP Compliance</h4>
                  <p className="text-xs text-[#5B6B6C]">Unconditional licensing under Pakistan Drug Act regulations.</p>
                </div>
              </div>

              <div className="p-5 rounded-xl border border-[#0E2A2B]/10 bg-white shadow-xs flex items-center gap-4">
                <div className="w-12 h-12 rounded-lg bg-[#0F5E5A]/10 text-[#0F5E5A] flex items-center justify-center shrink-0">
                  <Users className="w-6 h-6" strokeWidth={1.5} />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-[#0E2A2B]">Qualified Scientists</h4>
                  <p className="text-xs text-[#5B6B6C]">Team of licensed doctors of pharmacy and formulation chemists.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          4. OUR PRODUCTS (Directly highlighting screenshot formulations)
      ────────────────────────────────────────────────────────────── */}
      <section className="py-20 bg-[#0E2A2B] text-[#FAF8F4]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
            <div>
              <span className="text-xs uppercase tracking-widest font-bold text-[#FAF8F4]/70 block mb-2">
                PORTFOLIO SPOTLIGHT
              </span>
              <h2 className="font-serif-editorial text-3xl sm:text-4xl md:text-5xl font-normal text-[#FAF8F4]">
                Our Products
              </h2>
              <p className="text-sm text-[#FAF8F4]/80 mt-2 max-w-lg">
                Explore our cornerstone therapeutic formulations and over-the-counter wellness staples trusted by physicians across Pakistan.
              </p>
            </div>

            <Link
              to="/products"
              className="px-5 py-2.5 rounded-lg border border-[#FAF8F4]/30 text-[#FAF8F4] text-xs font-semibold hover:bg-[#FAF8F4] hover:text-[#0E2A2B] transition-colors self-start md:self-auto shrink-0"
            >
              View All Formulations
            </Link>
          </div>

          {/* Grid of the 4 visible products from the screenshot: MIPPI, Cekamol, Cekofen P, BonAid-D */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {screenshotProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          <div className="mt-12 text-center">
            <Link
              to="/products"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-lg border border-[#FAF8F4]/40 text-[#FAF8F4] text-sm font-semibold hover:bg-[#FAF8F4] hover:text-[#0E2A2B] transition-colors"
            >
              <span>View Full Formulations Directory</span>
              <ArrowRight className="w-4 h-4" strokeWidth={1.5} />
            </Link>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          5. THERAPEUTIC AREAS (Editorial Horizontal Showcase)
      ────────────────────────────────────────────────────────────── */}
      <section className="py-20 bg-[#FAF8F4] border-b border-[#0E2A2B]/8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
            <div>
              <span className="text-xs uppercase tracking-widest font-bold text-[#0F5E5A] block mb-2">
                02 — CLINICAL SCOPE
              </span>
              <h2 className="font-serif-editorial text-3xl sm:text-4xl font-normal text-[#0E2A2B]">
                Therapeutic Disciplines
              </h2>
            </div>
            <p className="text-xs text-[#5B6B6C] max-w-md">
              Specialized manufacturing across gastrointestinal, analgesics, bone health, respiratory, and cardiovascular healthcare.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {siteConfig.therapeuticAreas.map((area, idx) => (
              <div
                key={area.slug}
                className="p-6 rounded-xl border border-[#0E2A2B]/8 bg-white/70 hover:bg-white hover:border-[#0E2A2B]/20 transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between text-xs text-[#5B6B6C] mb-3">
                    <span className="font-mono">0{idx + 1}</span>
                    <span className="font-semibold text-[#0F5E5A]">{area.count}</span>
                  </div>
                  <h3 className="text-lg font-bold text-[#0E2A2B] group-hover:text-[#0F5E5A] transition-colors">
                    {area.title}
                  </h3>
                  <p className="text-xs text-[#5B6B6C] mt-2 leading-relaxed">
                    {area.description}
                  </p>
                </div>

                <div className="pt-6 mt-6 border-t border-[#0E2A2B]/6">
                  <Link
                    to={`/products?category=${encodeURIComponent(area.title)}`}
                    className="text-xs font-semibold text-[#0E2A2B] group-hover:text-[#0F5E5A] inline-flex items-center gap-1"
                  >
                    <span>Explore monograph list</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" strokeWidth={1.5} />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          6. ABOUT US & CORPORATE VISION (Screenshot text verbatim)
      ────────────────────────────────────────────────────────────── */}
      <section className="py-20 bg-gradient-to-b from-[#FAF8F4] to-[#E6EEF5]/40 border-b border-[#0E2A2B]/8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="text-xs uppercase tracking-widest font-bold text-[#0F5E5A] block mb-2">
              About Us
            </span>
            <h2 className="font-serif-editorial text-3xl sm:text-4xl md:text-5xl font-normal text-[#0E2A2B]">
              Committed to a Healthier Tomorrow
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-6 space-y-6">
              {/* Vision verbatim from screenshot */}
              <div className="p-8 rounded-2xl bg-white border border-[#0E2A2B]/10 shadow-xs space-y-3">
                <span className="text-xs uppercase tracking-widest font-bold text-[#0F5E5A] block">
                  Vision Statement
                </span>
                <p className="font-serif-editorial text-2xl sm:text-3xl font-normal text-[#0E2A2B] leading-snug">
                  “To lead the transformation of healthcare in Pakistan and emerging markets through scientific advancement and sustainable growth.”
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-[#E6F3F2]/60 border border-[#0F5E5A]/15 space-y-2">
                <span className="text-xs uppercase tracking-widest font-bold text-[#0F5E5A] block">
                  Our Mission
                </span>
                <p className="text-xs sm:text-sm text-[#0E2A2B] leading-relaxed">
                  To formulate, manufacture, and distribute uncompromised medicinal solutions that empower patients and support clinical practitioners, upholding strict DRAP standards and compassionate service.
                </p>
              </div>

              <div className="pt-2">
                <Link
                  to="/about"
                  className="inline-flex items-center gap-2 text-xs font-semibold text-[#0E2A2B] hover:text-[#0F5E5A] group"
                >
                  <span>Read our complete 40-year corporate history</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" strokeWidth={1.5} />
                </Link>
              </div>
            </div>

            <div className="lg:col-span-6">
              <div className="relative rounded-2xl overflow-hidden shadow-lg border border-[#0E2A2B]/10 aspect-4/3">
                <img
                  src={siteImages.lahoreHeadquarters.src}
                  alt="CKD Pharma Lahore Headquarters"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0E2A2B]/80 via-transparent to-transparent flex items-end p-6">
                  <div className="text-white">
                    <div className="text-sm font-bold">Kot Lakhpat Industrial Estate, Lahore</div>
                    <div className="text-xs text-white/80">Corporate Head Office & Formulation Suites</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          7. CLINICAL INSIGHTS & NEWS TEASER (3 Articles)
      ────────────────────────────────────────────────────────────── */}
      <section className="py-20 bg-[#FAF8F4] border-b border-[#0E2A2B]/8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
            <div>
              <span className="text-xs uppercase tracking-widest font-bold text-[#0F5E5A] block mb-2">
                COMMUNICATIONS & REGULATORY
              </span>
              <h2 className="font-serif-editorial text-3xl sm:text-4xl font-normal text-[#0E2A2B]">
                Clinical Insights & Media
              </h2>
            </div>
            <Link to="/news" className="text-xs font-semibold text-[#0F5E5A] hover:underline flex items-center gap-1">
              <span>View all releases</span>
              <ArrowRight className="w-3.5 h-3.5" strokeWidth={1.5} />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {articlesData.slice(0, 3).map((article) => (
              <article
                key={article.id}
                className="group flex flex-col justify-between rounded-xl border border-[#0E2A2B]/8 bg-white overflow-hidden card-hover-lift"
              >
                <div>
                  <div className="aspect-16/9 overflow-hidden bg-[#FAF8F4]">
                    <img
                      src={article.coverImage}
                      alt={article.title}
                      className="w-full h-full object-cover img-zoom-hover"
                      loading="lazy"
                    />
                  </div>
                  <div className="p-5 space-y-2">
                    <div className="flex items-center gap-2 text-[11px] text-[#5B6B6C]">
                      <span>{article.category}</span>
                      <span>·</span>
                      <span>{article.date}</span>
                    </div>
                    <h3 className="font-bold text-sm text-[#0E2A2B] group-hover:text-[#0F5E5A] transition-colors line-clamp-2">
                      {article.title}
                    </h3>
                    <p className="text-xs text-[#5B6B6C] line-clamp-2 leading-relaxed">
                      {article.excerpt}
                    </p>
                  </div>
                </div>

                <div className="p-5 pt-0">
                  <Link
                    to={`/news?slug=${article.slug}`}
                    className="text-xs font-semibold text-[#0F5E5A] group-hover:underline inline-flex items-center gap-1"
                  >
                    <span>Read complete dispatch</span>
                    <ArrowRight className="w-3 h-3" strokeWidth={1.5} />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          8. CAREERS CTA BAND & NATIONWIDE DISTRIBUTION INQUIRY
      ────────────────────────────────────────────────────────────── */}
      <section className="py-20 gradient-calm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="rounded-2xl bg-[#0E2A2B] text-[#FAF8F4] p-8 sm:p-12 md:p-16 relative overflow-hidden shadow-xl">
            <div className="relative z-10 max-w-2xl space-y-6">
              <span className="text-xs uppercase tracking-widest font-bold text-[#E6F3F2]">
                JOIN OUR SCIENTIFIC MISSION
              </span>
              <h2 className="font-serif-editorial text-3xl sm:text-4xl md:text-5xl font-normal leading-tight">
                Shape the future of pharmaceutical manufacturing in Pakistan.
              </h2>
              <p className="text-sm text-[#FAF8F4]/80 leading-relaxed">
                Explore openings across our HPLC analytical laboratories, formulation cleanrooms, regulatory affairs, and nationwide institutional distribution networks.
              </p>
              <div className="flex flex-wrap items-center gap-4 pt-2">
                <Link
                  to="/careers"
                  className="px-6 py-3 rounded-lg bg-[#FAF8F4] text-[#0E2A2B] text-xs font-semibold hover:bg-white transition-colors"
                >
                  Explore Careers & Open Roles
                </Link>
                <Link
                  to="/contact"
                  className="px-6 py-3 rounded-lg border border-[#FAF8F4]/30 text-[#FAF8F4] text-xs font-semibold hover:bg-[#FAF8F4]/10 transition-colors"
                >
                  Distributor & Hospital Inquiries
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
