import React, { useState } from 'react';
import { MessageCircle, X } from 'lucide-react';
import { siteConfig } from '../../content/site';

export const WhatsAppFloat: React.FC = () => {
  const [showTooltip, setShowTooltip] = useState(false);

  const phoneDigits = siteConfig.contact.whatsappNumber.replace(/[^0-9]/g, '');
  const prefilledMessage = encodeURIComponent('Assalam-o-Alaikum, I am inquiring about CKD Pharma OTC products and order delivery status.');
  const whatsappUrl = `https://wa.me/${phoneDigits}?text=${prefilledMessage}`;

  return (
    <div className="fixed bottom-6 right-6 z-30 flex flex-col items-end">
      {/* Tooltip banner on hover/tap */}
      {showTooltip && (
        <div className="mb-2 bg-[#FAF8F4] border border-[#0E2A2B]/10 shadow-lg rounded-xl p-3 max-w-xs text-xs animate-in fade-in slide-in-from-bottom-2 duration-200 relative">
          <button
            type="button"
            onClick={() => setShowTooltip(false)}
            className="absolute top-1.5 right-1.5 text-[#5B6B6C] hover:text-[#0E2A2B] cursor-pointer"
            aria-label="Dismiss assistance tooltip"
          >
            <X className="w-3.5 h-3.5" strokeWidth={1.5} />
          </button>
          <div className="font-bold text-[#0E2A2B] pr-4">Pharmacist Advisory on WhatsApp</div>
          <p className="text-[#5B6B6C] mt-1 text-[11px] leading-tight">
            Chat with our licensed dispensing pharmacist regarding OTC dosage or delivery inquiries.
          </p>
        </div>
      )}

      {/* Floating Action Button */}
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
        className="group flex items-center gap-2.5 bg-[#0F5E5A] text-[#FAF8F4] px-4 py-3 rounded-full shadow-lg hover:bg-[#0A4542] btn-action-transition cursor-pointer focus-visible:outline-2 focus-visible:outline-[#0F5E5A]"
        aria-label="Chat with CKD Pharma Pharmacist on WhatsApp"
      >
        <MessageCircle className="w-5 h-5 fill-current" strokeWidth={1.5} />
        <span className="text-xs font-semibold tracking-wide pr-1">
          WhatsApp Advisory
        </span>
      </a>
    </div>
  );
};
