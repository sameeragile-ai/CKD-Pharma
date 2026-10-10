import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Pill, Sparkles } from 'lucide-react';
import { siteConfig } from '../../content/site';
import { productsData } from '../../content/products';

interface MegaMenuProductsProps {
  onClose: () => void;
}

export const MegaMenuProducts: React.FC<MegaMenuProductsProps> = ({ onClose }) => {
  const featuredProduct = productsData.find(p => p.id === 'bonaid-d-tablet') || productsData[0];

  const dosageForms = [
    { name: 'Film-Coated Tablets', count: '64 Items', param: 'Tablet' },
    { name: 'Enteric Capsules', count: '38 Items', param: 'Capsule' },
    { name: 'Pediatric Suspensions', count: '22 Items', param: 'Suspension' },
    { name: 'Soothing Cough Syrups', count: '18 Items', param: 'Syrup' },
    { name: 'Topical Creams & Gels', count: '14 Items', param: 'Cream / Ointment' },
    { name: 'Effervescent Formulations', count: '8 Items', param: 'Tablet' }
  ];

  return (
    <div className="absolute top-full left-0 w-full bg-[#FAF8F4]/98 backdrop-blur-md border-b border-[#0E2A2B]/10 shadow-2xl z-40 animate-in fade-in slide-in-from-top-2 duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] before:absolute before:-top-4 before:inset-x-0 before:h-4 before:content-['']">
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-12 gap-8">
          {/* Column 1: Therapeutic Areas (5 cols) */}
          <div className="col-span-5 border-r border-[#0E2A2B]/8 pr-6">
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs uppercase tracking-widest font-bold text-[#5B6B6C]">
                Therapeutic Disciplines
              </span>
              <span className="text-[11px] text-[#0F5E5A] font-semibold">
                8 Core Divisions
              </span>
            </div>
            <div className="grid grid-cols-2 gap-x-4 gap-y-2.5">
              {siteConfig.therapeuticAreas.map((area) => (
                <Link
                  key={area.slug}
                  to={`/products?category=${encodeURIComponent(area.title)}`}
                  onClick={onClose}
                  className="group flex flex-col p-2.5 rounded-lg hover:bg-[#0E2A2B]/5 hover:translate-x-1 transition-all duration-200 cursor-pointer"
                >
                  <span className="text-xs font-semibold text-[#0E2A2B] group-hover:text-[#0F5E5A] transition-colors line-clamp-1">
                    {area.title}
                  </span>
                  <span className="text-[10px] text-[#5B6B6C]">{area.count}</span>
                </Link>
              ))}
            </div>
          </div>

          {/* Column 2: Dosage Forms (3 cols) */}
          <div className="col-span-3 border-r border-[#0E2A2B]/8 pr-6">
            <span className="text-xs uppercase tracking-widest font-bold text-[#5B6B6C] block mb-4">
              Dosage Forms
            </span>
            <div className="space-y-1.5">
              {dosageForms.map((df) => (
                <Link
                  key={df.name}
                  to={`/products?form=${encodeURIComponent(df.param)}`}
                  onClick={onClose}
                  className="flex items-center justify-between p-2 rounded-lg hover:bg-[#0E2A2B]/4 transition-colors group"
                >
                  <span className="text-xs font-medium text-[#0E2A2B] group-hover:text-[#0F5E5A]">
                    {df.name}
                  </span>
                  <span className="text-[10px] text-[#5B6B6C] tabular-nums font-mono">
                    {df.count}
                  </span>
                </Link>
              ))}
            </div>
          </div>

          {/* Column 3: Featured OTC Spotlight (4 cols) */}
          <div className="col-span-4 pl-2 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-1.5 text-xs font-semibold text-[#0F5E5A] mb-3">
                <Sparkles className="w-3.5 h-3.5" strokeWidth={1.5} />
                <span>Featured Patient Wellness Formulation</span>
              </div>
              <div className="p-4 rounded-xl border border-[#0E2A2B]/8 bg-white/70 space-y-3">
                <div className="flex gap-4">
                  <img
                    src={featuredProduct.images[0]}
                    alt={featuredProduct.name}
                    className="w-20 h-20 object-cover rounded-lg border border-[#0E2A2B]/6 shrink-0 bg-[#FAF8F4]"
                  />
                  <div>
                    <span className="text-[10px] font-bold tracking-wider uppercase text-[#0F5E5A]">
                      DRAP Approved · OTC
                    </span>
                    <h4 className="text-sm font-bold text-[#0E2A2B] line-clamp-2 mt-0.5">
                      {featuredProduct.name}
                    </h4>
                    <p className="text-xs font-semibold text-[#0E2A2B] mt-1 tabular-nums">
                      Rs. {featuredProduct.price} <span className="text-[10px] text-[#5B6B6C] font-normal">/ {featuredProduct.packSize}</span>
                    </p>
                  </div>
                </div>
                <p className="text-[11px] text-[#5B6B6C] line-clamp-2">
                  {featuredProduct.description}
                </p>
                <Link
                  to={`/shop/product/${featuredProduct.slug}`}
                  onClick={onClose}
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#0F5E5A] hover:text-[#0A4542] group"
                >
                  <span>Order Directly via OTC Store</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" strokeWidth={1.5} />
                </Link>
              </div>
            </div>

            <div className="pt-4 border-t border-[#0E2A2B]/8 flex items-center justify-between text-xs font-medium text-[#5B6B6C]">
              <Link to="/products" onClick={onClose} className="hover:text-[#0E2A2B] flex items-center gap-1">
                <span>View All 180+ Formulations</span>
                <ArrowRight className="w-3 h-3" strokeWidth={1.5} />
              </Link>
              <Link to="/shop" onClick={onClose} className="text-[#0F5E5A] font-semibold hover:underline flex items-center gap-1">
                <Pill className="w-3.5 h-3.5" strokeWidth={1.5} />
                <span>Visit Online OTC Store</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
