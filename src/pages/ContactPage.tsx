import React, { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { SEO } from '../lib/seo';
import { siteConfig } from '../content/site';
import { MapPin, Phone, Mail, Clock, MessageSquare, CheckCircle2, Building, ShieldCheck } from 'lucide-react';

export const ContactPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const initialTab = searchParams.get('inquiry') === 'pharmacy' ? 'distributor' : 'general';
  const [activeTab, setActiveTab] = useState<'general' | 'distributor'>(initialTab);

  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [organization, setOrganization] = useState('');
  const [city, setCity] = useState('');
  const [message, setMessage] = useState('');
  const [licenseNumber, setLicenseNumber] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-[#FAF8F4] pt-28 pb-20">
      <SEO
        title="Contact & Distribution Network | CKD Pharma Pakistan"
        description="Connect with CKD Pharmaceuticals in Lahore, Karachi, and Islamabad. Inquire about hospital supply tenders, wholesale pharmacy distribution, and patient support."
        canonicalPath="/contact"
        breadcrumbs={[
          { name: 'Home', url: '/' },
          { name: 'Contact', url: '/contact' }
        ]}
      />

      <section className="pt-8 pb-16 gradient-calm border-b border-[#0E2A2B]/8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="max-w-3xl space-y-4">
            <span className="text-xs uppercase tracking-widest font-bold text-[#0F5E5A]">
              07 — HEADQUARTERS & DISTRIBUTION
            </span>
            <h1 className="font-serif-editorial text-4xl sm:text-5xl md:text-6xl font-normal text-[#0E2A2B] leading-tight text-balance">
              Connecting nationwide healthcare with <span className="italic font-serif">reliable supply</span>.
            </h1>
            <p className="text-base sm:text-lg text-[#5B6B6C] leading-relaxed">
              Reach our corporate management in Lahore, our cold-chain distribution centers in Karachi and Islamabad, or our dedicated Pharmacist Helpline.
            </p>
          </div>
        </div>
      </section>

      {/* Regional Hubs Cards */}
      <section className="py-16 border-b border-[#0E2A2B]/8 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Lahore */}
            <div className="p-6 rounded-2xl border border-[#0E2A2B]/8 bg-[#FAF8F4] space-y-3">
              <div className="flex items-center gap-2 text-xs font-bold text-[#0F5E5A] uppercase tracking-wider">
                <Building className="w-4 h-4" />
                <span>Head Office & Campus</span>
              </div>
              <h3 className="text-lg font-bold text-[#0E2A2B]">Lahore, Punjab</h3>
              <p className="text-xs text-[#5B6B6C] leading-relaxed">
                {siteConfig.contact.headOffice.address}, {siteConfig.contact.headOffice.city} {siteConfig.contact.headOffice.postalCode}
              </p>
              <div className="pt-2 space-y-1 text-xs text-[#0E2A2B]">
                <div>Phone: <strong>{siteConfig.contact.headOffice.phone}</strong></div>
                <div>Toll-Free: <strong>{siteConfig.contact.tollFree}</strong></div>
              </div>
            </div>

            {/* Karachi */}
            <div className="p-6 rounded-2xl border border-[#0E2A2B]/8 bg-[#FAF8F4] space-y-3">
              <div className="flex items-center gap-2 text-xs font-bold text-[#0F5E5A] uppercase tracking-wider">
                <Building className="w-4 h-4" />
                <span>Sindh Distribution Hub</span>
              </div>
              <h3 className="text-lg font-bold text-[#0E2A2B]">Karachi, Sindh</h3>
              <p className="text-xs text-[#5B6B6C] leading-relaxed">
                {siteConfig.contact.karachiHub.address}, {siteConfig.contact.karachiHub.city}
              </p>
              <div className="pt-2 space-y-1 text-xs text-[#0E2A2B]">
                <div>Phone: <strong>{siteConfig.contact.karachiHub.phone}</strong></div>
                <div>Support: <strong>karachi@ckdpharma.com</strong></div>
              </div>
            </div>

            {/* Islamabad */}
            <div className="p-6 rounded-2xl border border-[#0E2A2B]/8 bg-[#FAF8F4] space-y-3">
              <div className="flex items-center gap-2 text-xs font-bold text-[#0F5E5A] uppercase tracking-wider">
                <Building className="w-4 h-4" />
                <span>Capital Liaison Office</span>
              </div>
              <h3 className="text-lg font-bold text-[#0E2A2B]">Islamabad Capital Territory</h3>
              <p className="text-xs text-[#5B6B6C] leading-relaxed">
                {siteConfig.contact.islamabadOffice.address}, {siteConfig.contact.islamabadOffice.city}
              </p>
              <div className="pt-2 space-y-1 text-xs text-[#0E2A2B]">
                <div>Phone: <strong>{siteConfig.contact.islamabadOffice.phone}</strong></div>
                <div>Support: <strong>islamabad@ckdpharma.com</strong></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Contact & Distributor Form Split */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            {/* Form Column (7 cols) */}
            <div className="lg:col-span-7 bg-white p-8 sm:p-10 rounded-2xl border border-[#0E2A2B]/10 shadow-xs">
              {/* Tabs */}
              <div className="flex items-center gap-2 p-1 bg-[#FAF8F4] rounded-lg border border-[#0E2A2B]/8 mb-8 text-xs font-semibold">
                <button
                  type="button"
                  onClick={() => { setActiveTab('general'); setIsSubmitted(false); }}
                  className={`flex-1 py-2 rounded-md transition-colors ${
                    activeTab === 'general' ? 'bg-[#0E2A2B] text-[#FAF8F4]' : 'text-[#5B6B6C] hover:text-[#0E2A2B]'
                  }`}
                >
                  General & Patient Inquiries
                </button>
                <button
                  type="button"
                  onClick={() => { setActiveTab('distributor'); setIsSubmitted(false); }}
                  className={`flex-1 py-2 rounded-md transition-colors ${
                    activeTab === 'distributor' ? 'bg-[#0F5E5A] text-[#FAF8F4]' : 'text-[#5B6B6C] hover:text-[#0E2A2B]'
                  }`}
                >
                  Distributor & Pharmacy Wholesale
                </button>
              </div>

              {isSubmitted ? (
                <div className="py-16 text-center space-y-4">
                  <div className="w-14 h-14 mx-auto rounded-full bg-[#0F5E5A]/10 text-[#0F5E5A] flex items-center justify-center">
                    <CheckCircle2 className="w-8 h-8" strokeWidth={1.5} />
                  </div>
                  <h3 className="font-serif-editorial text-2xl font-bold text-[#0E2A2B]">
                    Inquiry Transmitted Successfully
                  </h3>
                  <p className="text-xs text-[#5B6B6C] max-w-sm mx-auto leading-relaxed">
                    Thank you, {fullName}. Your reference ticket has been logged with our customer operations department. A representative will contact you at {phone || email} within 1 business day.
                  </p>
                  <button
                    onClick={() => setIsSubmitted(false)}
                    className="px-5 py-2 rounded-lg bg-[#0E2A2B] text-white text-xs font-semibold hover:bg-[#0F5E5A]"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <h2 className="font-serif-editorial text-2xl font-bold text-[#0E2A2B]">
                      {activeTab === 'general' ? 'Send a General Inquiry' : 'Apply for Wholesale Pharmacy Supply'}
                    </h2>
                    <p className="text-xs text-[#5B6B6C] mt-1">
                      {activeTab === 'general'
                        ? 'Questions regarding OTC usage directions, product availability, or corporate information.'
                        : 'Wholesale accounts for licensed medical stores, chain pharmacies, and hospital procurement.'}
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                    <div>
                      <label className="block text-xs font-semibold text-[#0E2A2B] mb-1">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        placeholder="Dr. / Mr. / Ms. Name"
                        className="w-full text-xs px-3.5 py-2.5 rounded-lg border border-[#0E2A2B]/15 bg-[#FAF8F4] text-[#0E2A2B] outline-none focus:border-[#0F5E5A]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-[#0E2A2B] mb-1">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="name@domain.com"
                        className="w-full text-xs px-3.5 py-2.5 rounded-lg border border-[#0E2A2B]/15 bg-[#FAF8F4] text-[#0E2A2B] outline-none focus:border-[#0F5E5A]"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-[#0E2A2B] mb-1">
                        Contact Number (WhatsApp enabled) *
                      </label>
                      <input
                        type="tel"
                        required
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="03XX-XXXXXXX"
                        className="w-full text-xs px-3.5 py-2.5 rounded-lg border border-[#0E2A2B]/15 bg-[#FAF8F4] text-[#0E2A2B] outline-none focus:border-[#0F5E5A]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-[#0E2A2B] mb-1">
                        City / District *
                      </label>
                      <input
                        type="text"
                        required
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        placeholder="e.g. Lahore, Rawalpindi, Faisalabad"
                        className="w-full text-xs px-3.5 py-2.5 rounded-lg border border-[#0E2A2B]/15 bg-[#FAF8F4] text-[#0E2A2B] outline-none focus:border-[#0F5E5A]"
                      />
                    </div>
                  </div>

                  {activeTab === 'distributor' && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 rounded-xl bg-[#E6F3F2]/40 border border-[#0F5E5A]/15">
                      <div>
                        <label className="block text-xs font-semibold text-[#0E2A2B] mb-1">
                          Pharmacy / Hospital Name *
                        </label>
                        <input
                          type="text"
                          required
                          value={organization}
                          onChange={(e) => setOrganization(e.target.value)}
                          placeholder="e.g. Al-Shifa Pharmacy Chain"
                          className="w-full text-xs px-3.5 py-2.5 rounded-lg border border-[#0E2A2B]/15 bg-white text-[#0E2A2B] outline-none focus:border-[#0F5E5A]"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-[#0E2A2B] mb-1">
                          Drug Sale License No. (DSL) *
                        </label>
                        <input
                          type="text"
                          required
                          value={licenseNumber}
                          onChange={(e) => setLicenseNumber(e.target.value)}
                          placeholder="e.g. DSL-PB-LHR-2024-89"
                          className="w-full text-xs px-3.5 py-2.5 rounded-lg border border-[#0E2A2B]/15 bg-white text-[#0E2A2B] outline-none focus:border-[#0F5E5A]"
                        />
                      </div>
                    </div>
                  )}

                  <div>
                    <label className="block text-xs font-semibold text-[#0E2A2B] mb-1">
                      Inquiry Details / Message *
                    </label>
                    <textarea
                      required
                      rows={4}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Please specify formulations of interest, bulk order volume, or question..."
                      className="w-full text-xs p-3 rounded-lg border border-[#0E2A2B]/15 bg-[#FAF8F4] text-[#0E2A2B] outline-none focus:border-[#0F5E5A]"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 rounded-lg bg-[#0F5E5A] text-[#FAF8F4] text-xs font-semibold hover:bg-[#0A4542] transition-colors"
                  >
                    Submit {activeTab === 'general' ? 'General Inquiry' : 'Wholesale Application'}
                  </button>
                </form>
              )}
            </div>

            {/* Map Embed and Hours Column (5 cols) */}
            <div className="lg:col-span-5 space-y-6">
              <div className="rounded-2xl overflow-hidden border border-[#0E2A2B]/10 shadow-xs bg-white">
                {/* Responsive Map Frame Container for Kot Lakhpat Industrial Estate, Lahore */}
                <div className="aspect-4/3 w-full bg-[#EBF0EE] relative">
                  <iframe
                    title="CKD Pharma Kot Lakhpat Lahore Map"
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d108892.48523315843!2d74.2492161271168!3d31.44853046124584!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3919069d2753a479%3A0xe5ebef70f555c4d3!2sKot%20Lakhpat%20Industrial%20Area%2C%20Lahore%2C%20Punjab%2C%20Pakistan!5e0!3m2!1sen!2s!4v1700000000000!5m2!1sen!2s"
                    className="w-full h-full border-0"
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  />
                </div>
                <div className="p-5 space-y-2 text-xs">
                  <div className="font-bold text-[#0E2A2B]">Location Coordinates</div>
                  <p className="text-[#5B6B6C]">
                    Kot Lakhpat Industrial Estate, Lahore, Punjab, Pakistan. Conveniently accessible via Ferozepur Road and Lahore Ring Road.
                  </p>
                </div>
              </div>

              {/* Operating Hours */}
              <div className="p-6 rounded-2xl bg-white border border-[#0E2A2B]/8 space-y-3 text-xs">
                <div className="flex items-center gap-2 font-bold text-[#0E2A2B]">
                  <Clock className="w-4 h-4 text-[#0F5E5A]" strokeWidth={1.5} />
                  <span>Administrative & Dispatch Operating Hours</span>
                </div>
                <div className="space-y-1 text-[#5B6B6C]">
                  <div className="flex justify-between">
                    <span>Monday – Friday:</span>
                    <strong className="text-[#0E2A2B]">08:30 AM – 05:30 PM PKT</strong>
                  </div>
                  <div className="flex justify-between">
                    <span>Saturday:</span>
                    <strong className="text-[#0E2A2B]">09:00 AM – 02:00 PM PKT</strong>
                  </div>
                  <div className="flex justify-between">
                    <span>Sunday:</span>
                    <span className="text-[#0F5E5A]">Closed (Emergency Cold Chain Active)</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
