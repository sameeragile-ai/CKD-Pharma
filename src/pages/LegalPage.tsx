import React, { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { SEO } from '../lib/seo';
import { siteConfig } from '../content/site';

export const LegalPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const activeTabParam = searchParams.get('tab') || 'drap';
  const [activeTab, setActiveTab] = useState<string>(activeTabParam);

  const tabs = [
    { id: 'drap', label: 'DRAP License & Regulatory Status' },
    { id: 'disclaimer', label: 'Medical & Product Disclaimer' },
    { id: 'shipping', label: 'Nationwide Delivery Policy' },
    { id: 'returns', label: 'Return & Refund Policy' },
    { id: 'privacy', label: 'Data Protection & Privacy Policy' },
    { id: 'terms', label: 'Terms & Conditions of Supply' }
  ];

  const handleTabChange = (id: string) => {
    setActiveTab(id);
    setSearchParams({ tab: id });
  };

  return (
    <div className="min-h-screen bg-[#FAF8F4] pt-28 pb-20">
      <SEO
        title="Regulatory Compliance, Privacy & Legal Terms | CKD Pharma"
        description="Review CKD Pharma DRAP licensing particulars, medical disclaimer, terms of supply, patient privacy protocols, and nationwide return policies in Pakistan."
        canonicalPath="/legal"
        breadcrumbs={[
          { name: 'Home', url: '/' },
          { name: 'Compliance & Legal', url: '/legal' }
        ]}
      />

      <section className="pt-8 pb-12 gradient-calm border-b border-[#0E2A2B]/8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="max-w-3xl space-y-3">
            <span className="text-xs uppercase tracking-widest font-bold text-[#0F5E5A]">
              GOVERNANCE & STATUTORY COMPLIANCE
            </span>
            <h1 className="font-serif-editorial text-4xl sm:text-5xl font-normal text-[#0E2A2B]">
              Regulatory Disclosures & Legal Framework
            </h1>
            <p className="text-sm text-[#5B6B6C]">
              Transparent compliance under the Drug Act 1976, DRAP Act 2012, and Pakistan Electronic Transactions Ordinance.
            </p>
          </div>
        </div>
      </section>

      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            {/* Sidebar Tabs (4 cols) */}
            <div className="lg:col-span-4 space-y-2">
              <span className="text-xs uppercase tracking-widest font-bold text-[#5B6B6C] block px-3 mb-2">
                Legal Documents
              </span>
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => handleTabChange(tab.id)}
                  className={`w-full text-left p-3.5 rounded-xl text-xs font-semibold transition-all ${
                    activeTab === tab.id
                      ? 'bg-[#0E2A2B] text-[#FAF8F4] shadow-xs'
                      : 'bg-white text-[#5B6B6C] hover:text-[#0E2A2B] border border-[#0E2A2B]/6'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Document Content (8 cols) */}
            <div className="lg:col-span-8 bg-white p-8 sm:p-12 rounded-2xl border border-[#0E2A2B]/10 shadow-xs text-xs sm:text-sm text-[#0E2A2B] leading-relaxed space-y-6">
              {activeTab === 'drap' && (
                <div className="space-y-4">
                  <h2 className="font-serif-editorial text-2xl font-bold text-[#0E2A2B]">
                    DRAP Licensing & cGMP Verification
                  </h2>
                  <p>
                    CKD Pharmaceuticals (Pvt.) Limited operates under valid pharmaceutical manufacturing licenses issued by the Drug Regulatory Authority of Pakistan (DRAP), Ministry of National Health Services, Regulations & Coordination, Government of Pakistan.
                  </p>
                  <div className="p-4 rounded-xl bg-[#FAF8F4] border border-[#0E2A2B]/8 space-y-2 font-mono text-xs">
                    <div><strong>Manufacturing License:</strong> {siteConfig.drapLicenseNumber}</div>
                    <div><strong>Registered Campus:</strong> Plot 42-B, Industrial Estate, Kot Lakhpat, Lahore, Punjab</div>
                    <div><strong>Scope:</strong> Oral Solid Dosage Forms (Tablets, Coated Tablets, Capsules), Oral Liquids (Suspensions, Syrups), Dry Powders for Suspension.</div>
                  </div>
                  <p>
                    All formulations adhere strictly to British Pharmacopoeia (BP) and United States Pharmacopeia (USP) analytical release specifications. Batch samples are retained for regulatory counter-testing for a minimum of 12 months beyond expiration.
                  </p>
                </div>
              )}

              {activeTab === 'disclaimer' && (
                <div className="space-y-4">
                  <h2 className="font-serif-editorial text-2xl font-bold text-[#0E2A2B]">
                    Medical & Clinical Disclaimer
                  </h2>
                  <p>
                    The information contained on this website (including product monographs, nutritional profiles, and clinical summaries) is intended solely for general awareness, education, and licensed healthcare practitioner reference in Pakistan.
                  </p>
                  <p className="p-4 rounded-xl bg-amber-50 border border-amber-200 text-amber-900">
                    <strong>Critical Notice:</strong> Nothing on this platform constitutes medical diagnosis, prognosis, or personalized therapeutic advice. Patients must consult their registered medical practitioner or licensed clinical pharmacist prior to initiating or modifying any medication regimen.
                  </p>
                  <p>
                    Prescription medicines (marked &ldquo;Rx Only&rdquo;) cannot be purchased or dispensed without physical doctor verification in compliance with Section 23 of the Drug Act 1976.
                  </p>
                </div>
              )}

              {activeTab === 'shipping' && (
                <div className="space-y-4">
                  <h2 className="font-serif-editorial text-2xl font-bold text-[#0E2A2B]">
                    Nationwide Shipping & Cold-Chain Protocol
                  </h2>
                  <p>
                    CKD Pharma delivers over-the-counter (OTC) healthcare products to residential and commercial addresses across all provinces of Pakistan (Punjab, Sindh, Khyber Pakhtunkhwa, Balochistan, Islamabad Capital Territory, Gilgit-Baltistan, and Azad Jammu & Kashmir).
                  </p>
                  <div className="space-y-2">
                    <strong className="block text-[#0E2A2B]">Delivery Timelines:</strong>
                    <ul className="list-disc pl-5 space-y-1 text-[#5B6B6C]">
                      <li><strong>Lahore & Karachi Metros:</strong> 1 to 2 business days.</li>
                      <li><strong>Islamabad, Rawalpindi, Faisalabad, Multan, Peshawar:</strong> 2 to 3 business days.</li>
                      <li><strong>Regional & Remote Districts:</strong> 3 to 5 business days via temperature-controlled courier network.</li>
                    </ul>
                  </div>
                  <p>
                    <strong>Delivery Charges:</strong> Standard delivery fee is Rs. 150 nationwide. Orders totaling <strong>Rs. 2,000 or more qualify for 100% Free Nationwide Delivery</strong>.
                  </p>
                </div>
              )}

              {activeTab === 'returns' && (
                <div className="space-y-4">
                  <h2 className="font-serif-editorial text-2xl font-bold text-[#0E2A2B]">
                    Return, Damage & Refund Policy
                  </h2>
                  <p>
                    Due to strict pharmaceutical temperature stability and product integrity regulations under DRAP rules, medicines cannot be returned once their tamper-evident security foil has been breached.
                  </p>
                  <div className="space-y-2">
                    <strong className="block text-[#0E2A2B]">Eligible Return Conditions (Within 7 Days of Receipt):</strong>
                    <ul className="list-disc pl-5 space-y-1 text-[#5B6B6C]">
                      <li>Shipment arrived with visible transit crushing or damaged outer packaging.</li>
                      <li>The delivered formulation does not match the confirmed order manifest.</li>
                      <li>Dispatched with an expiration date of less than 6 months remaining.</li>
                    </ul>
                  </div>
                  <p>
                    To claim an exchange or full refund, please photograph the parcel label and batch code and send it to <strong>orders@ckdpharma.com</strong> or WhatsApp <strong>0300-8495521</strong>.
                  </p>
                </div>
              )}

              {activeTab === 'privacy' && (
                <div className="space-y-4">
                  <h2 className="font-serif-editorial text-2xl font-bold text-[#0E2A2B]">
                    Data Protection & Patient Confidentiality
                  </h2>
                  <p>
                    CKD Pharmaceuticals respects the confidentiality of all patient healthcare inquiries and eCommerce order records. Customer shipping details, telephone numbers, and email addresses are encrypted in transit and never shared with third-party marketing brokers.
                  </p>
                  <p>
                    Information collected during OTC checkout is utilized strictly for logistics dispatch, courier SMS status notifications, and statutory tax invoicing under Federal Board of Revenue (FBR) rules.
                  </p>
                </div>
              )}

              {activeTab === 'terms' && (
                <div className="space-y-4">
                  <h2 className="font-serif-editorial text-2xl font-bold text-[#0E2A2B]">
                    Terms and Conditions of Supply
                  </h2>
                  <p>
                    By placing an order on ckdpharma.com, the customer certifies that they are at least 18 years of age and reside at the stated delivery address in Pakistan.
                  </p>
                  <p>
                    All prices are denominated in Pakistani Rupees (PKR) and include statutory federal and provincial duties. CKD Pharma reserves the right to restrict purchase quantities of single formulations where commercial hoarding or unauthorized resale is suspected.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
