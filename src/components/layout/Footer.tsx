import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Logo } from '../ui/Logo';
import { siteConfig } from '../../content/site';
import { useI18n } from '../../lib/i18n';
import { ShieldCheck, Mail, ArrowRight, CheckCircle2 } from 'lucide-react';

export const Footer: React.FC = () => {
  const { t } = useI18n();
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newsletterEmail.trim()) {
      setIsSubscribed(true);
      setNewsletterEmail('');
    }
  };

  return (
    <footer className="bg-[#FAF8F4] border-t border-[#0E2A2B]/10 text-[#0E2A2B] pt-16 pb-12 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Large Editorial Serif Tagline Banner */}
        <div className="border-b border-[#0E2A2B]/8 pb-14 mb-14">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">
            <div className="lg:col-span-8">
              <span className="text-xs uppercase tracking-widest font-semibold text-[#0F5E5A] block mb-3">
                C.K.D. Pharmaceuticals · 40 Years of Science & Integrity
              </span>
              <h2 className="font-serif-editorial text-3xl sm:text-4xl md:text-5xl font-normal leading-tight text-[#0E2A2B] text-balance">
                Advancing healthcare in Pakistan through <span className="italic font-serif">uncompromising purity</span>, research, and patient trust.
              </h2>
            </div>
            
            {/* Newsletter Subscription */}
            <div className="lg:col-span-4 space-y-3">
              <span className="text-xs uppercase tracking-wider font-semibold text-[#5B6B6C] block">
                Healthcare & Formulation Dispatch
              </span>
              {isSubscribed ? (
                <div className="flex items-center gap-2 p-3 bg-[#E6F3F2] rounded-lg text-xs font-semibold text-[#0F5E5A]">
                  <CheckCircle2 className="w-4 h-4 shrink-0" strokeWidth={1.5} />
                  <span>Thank you. You are subscribed to CKD clinical updates.</span>
                </div>
              ) : (
                <form onSubmit={handleNewsletterSubmit} className="flex gap-2">
                  <div className="relative flex-1">
                    <input
                      type="email"
                      required
                      value={newsletterEmail}
                      onChange={(e) => setNewsletterEmail(e.target.value)}
                      placeholder="Enter physician / pharmacy email"
                      className="w-full text-xs px-3.5 py-2.5 rounded-lg border border-[#0E2A2B]/15 bg-white text-[#0E2A2B] placeholder:text-[#5B6B6C]/60 outline-none focus:border-[#0F5E5A]"
                    />
                  </div>
                  <button
                    type="submit"
                    className="px-4 py-2.5 rounded-lg bg-[#0E2A2B] text-[#FAF8F4] text-xs font-semibold hover:bg-[#0F5E5A] btn-action-transition cursor-pointer flex items-center gap-1 shrink-0"
                    aria-label="Subscribe to newsletter"
                  >
                    <span>Subscribe</span>
                    <ArrowRight className="w-3.5 h-3.5" strokeWidth={1.5} />
                  </button>
                </form>
              )}
              <p className="text-[11px] text-[#5B6B6C]">
                Quarterly therapeutic digests and regulatory notices. No promotional spam.
              </p>
            </div>
          </div>
        </div>

        {/* Sitemap Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 mb-14 text-xs">
          {/* Col 1: Brand Info */}
          <div className="col-span-2 md:col-span-4 lg:col-span-2 space-y-4">
            <Logo size="md" />
            <p className="text-[#5B6B6C] leading-relaxed max-w-sm text-xs">
              CKD Pharmaceuticals (Pvt.) Limited is an indigenous manufacturer licensed by the Drug Regulatory Authority of Pakistan (DRAP), dedicated to cGMP-certified therapeutics and accessible over-the-counter wellness solutions.
            </p>
            <div className="space-y-1 text-[#5B6B6C]">
              <div className="font-semibold text-[#0E2A2B]">Kot Lakhpat Campus:</div>
              <div>{siteConfig.contact.headOffice.address}, {siteConfig.contact.headOffice.city}, Pakistan</div>
              <div className="pt-1">UAN Toll-Free: <strong className="text-[#0E2A2B]">{siteConfig.contact.tollFree}</strong></div>
            </div>
          </div>

          {/* Col 2: Institutional */}
          <div className="space-y-3">
            <h4 className="text-xs uppercase tracking-wider font-bold text-[#0E2A2B]">
              Institutional
            </h4>
            <ul className="space-y-2 text-[#5B6B6C]">
              <li><Link to="/about" className="hover:text-[#0F5E5A] transition-colors">Company Story & 1984 Roots</Link></li>
              <li><Link to="/about#leadership" className="hover:text-[#0F5E5A] transition-colors">Executive Governance</Link></li>
              <li><Link to="/manufacturing" className="hover:text-[#0F5E5A] transition-colors">Cleanroom Manufacturing</Link></li>
              <li><Link to="/research" className="hover:text-[#0F5E5A] transition-colors">R&D & Bioavailability</Link></li>
              <li><Link to="/careers" className="hover:text-[#0F5E5A] transition-colors">Careers & Openings</Link></li>
              <li><Link to="/news" className="hover:text-[#0F5E5A] transition-colors">Clinical & Press Releases</Link></li>
            </ul>
          </div>

          {/* Col 3: Therapeutics & OTC */}
          <div className="space-y-3">
            <h4 className="text-xs uppercase tracking-wider font-bold text-[#0E2A2B]">
              Formulations & Store
            </h4>
            <ul className="space-y-2 text-[#5B6B6C]">
              <li><Link to="/shop" className="hover:text-[#0F5E5A] transition-colors font-semibold text-[#0F5E5A]">Visit OTC Storefront</Link></li>
              <li><Link to="/shop/catalog?concern=Bone+%26+Joint+Health" className="hover:text-[#0F5E5A] transition-colors">BonAid-D Bone Health</Link></li>
              <li><Link to="/shop/catalog?concern=Pain+Relief" className="hover:text-[#0F5E5A] transition-colors">Cekamol & Pain Relief</Link></li>
              <li><Link to="/shop/catalog?concern=Digestive+Health" className="hover:text-[#0F5E5A] transition-colors">Gastrointestinal Care</Link></li>
              <li><Link to="/products" className="hover:text-[#0F5E5A] transition-colors">Prescription Catalog (Rx)</Link></li>
              <li><Link to="/track-order" className="hover:text-[#0F5E5A] transition-colors">Track Nationwide Order</Link></li>
            </ul>
          </div>

          {/* Col 4: Regulatory & Compliance */}
          <div className="space-y-3">
            <h4 className="text-xs uppercase tracking-wider font-bold text-[#0E2A2B]">
              Compliance & Legal
            </h4>
            <ul className="space-y-2 text-[#5B6B6C]">
              <li><Link to="/legal?tab=drap" className="hover:text-[#0F5E5A] transition-colors">DRAP License Verification</Link></li>
              <li><Link to="/legal?tab=privacy" className="hover:text-[#0F5E5A] transition-colors">Privacy Policy</Link></li>
              <li><Link to="/legal?tab=terms" className="hover:text-[#0F5E5A] transition-colors">Terms of Supply</Link></li>
              <li><Link to="/legal?tab=returns" className="hover:text-[#0F5E5A] transition-colors">Refund & Return Policy</Link></li>
              <li><Link to="/legal?tab=shipping" className="hover:text-[#0F5E5A] transition-colors">Nationwide Shipping Policy</Link></li>
              <li><Link to="/legal?tab=disclaimer" className="hover:text-[#0F5E5A] transition-colors">Medical Disclaimer</Link></li>
            </ul>
          </div>
        </div>

        {/* Certifications Strip */}
        <div className="py-6 border-y border-[#0E2A2B]/8 flex flex-wrap items-center justify-between gap-4 text-xs text-[#5B6B6C]">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-[#0F5E5A]" strokeWidth={1.5} />
            <span>Manufacturing License: <strong>{siteConfig.drapLicenseNumber}</strong></span>
          </div>
          <div className="flex flex-wrap items-center gap-6">
            <span>WHO cGMP Conformance</span>
            <span>·</span>
            <span>ISO 9001:2015</span>
            <span>·</span>
            <span>ISO 14001:2015</span>
            <span>·</span>
            <span>British Pharmacopoeia (BP) Standards</span>
          </div>
        </div>

        {/* Bottom Bar: Copyright & DRAP Disclaimer */}
        <div className="pt-8 space-y-4 text-[11px] text-[#5B6B6C]/80">
          <p className="leading-relaxed">
            {t.medicalDisclaimer} Prescription drugs featured in our clinical monographs are not sold online and require a physical prescription verified by a licensed medical practitioner under the Drug Act 1976 and DRAP Act 2012. Over-the-counter (OTC) products are dispensed in accordance with DRAP over-the-counter schedules.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
            <div>
              © {new Date().getFullYear()} {siteConfig.legalName}. {t.rightsReserved}
            </div>
            <div className="flex items-center gap-4">
              <a href={siteConfig.contact.socials.linkedin} target="_blank" rel="noopener noreferrer" className="hover:text-[#0E2A2B] transition-colors">
                LinkedIn
              </a>
              <a href={siteConfig.contact.socials.facebook} target="_blank" rel="noopener noreferrer" className="hover:text-[#0E2A2B] transition-colors">
                Facebook
              </a>
              <Link to="/contact" className="hover:text-[#0E2A2B] transition-colors">
                Distributor Inquiries
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
