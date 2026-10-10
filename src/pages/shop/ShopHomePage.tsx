import React from 'react';
import { Link } from 'react-router-dom';
import { SEO } from '../../lib/seo';
import { productsData, allConcerns } from '../../content/products';
import { siteImages } from '../../content/images';
import { ProductCard } from '../../components/shop/ProductCard';
import { 
  Pill, 
  ShieldCheck, 
  Truck, 
  ArrowRight, 
  Sparkles, 
  Heart, 
  CheckCircle2, 
  Clock, 
  PhoneCall 
} from 'lucide-react';

export const ShopHomePage: React.FC = () => {
  // Only OTC products in store
  const otcProducts = productsData.filter(p => p.isOTC);
  const bestsellers = otcProducts.filter(p => p.bestseller || p.featured).slice(0, 4);

  const concernTiles = [
    { name: 'Bone & Joint Health', concern: 'Bone & Joint Health', icon: Heart, count: '3 Products', desc: 'Calcium, D3, Glucosamine' },
    { name: 'Pain Relief & Fever', concern: 'Pain Relief', icon: Pill, count: '4 Products', desc: 'Cekamol, Paracetamol, Topicals' },
    { name: 'Digestive & Gastric', concern: 'Digestive Health', icon: ShieldCheck, count: '3 Products', desc: 'Antacids, Probiotics, ORS' },
    { name: 'Vitamins & Immunity', concern: 'Vitamins & Supplements', icon: Sparkles, count: '4 Products', desc: 'VitaCee 1000, Magnesium' },
    { name: 'Cold, Cough & Flu', concern: 'Cold & Flu', icon: Clock, count: '3 Products', desc: 'Decongestants, Ivy Leaf' },
    { name: 'First Aid & Skin', concern: 'First Aid', icon: CheckCircle2, count: '3 Products', desc: 'Antiseptics, Barrier Creams' }
  ];

  return (
    <div className="min-h-screen bg-[#FAF8F4] pt-28 pb-20">
      <SEO
        title="Official OTC Healthcare Store | CKD Pharma Pakistan"
        description="Buy DRAP-licensed over-the-counter medicines online in Pakistan. BonAid-D calcium, Cekamol paracetamol, digestive antacids, and immune vitamins with nationwide Cash on Delivery."
        canonicalPath="/shop"
        breadcrumbs={[
          { name: 'Home', url: '/' },
          { name: 'OTC Store', url: '/shop' }
        ]}
      />

      {/* Store Hero Banner */}
      <section className="pt-8 pb-16 gradient-calm border-b border-[#0E2A2B]/8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 text-xs font-bold tracking-widest uppercase text-[#0F5E5A]">
                <span className="w-2 h-2 rounded-full bg-[#0F5E5A]" />
                <span>Certified DRAP Over-The-Counter Dispensary</span>
              </div>

              <h1 className="font-serif-editorial text-4xl sm:text-5xl md:text-6xl font-normal text-[#0E2A2B] leading-tight text-balance">
                Direct patient access to <span className="italic font-serif">trusted everyday</span> healthcare essentials.
              </h1>

              <p className="text-base sm:text-lg text-[#5B6B6C] leading-relaxed max-w-xl">
                Batch-tested, temperature-guaranteed oral nutrition, pain relief, and seasonal immunity delivered directly to your doorstep across Pakistan.
              </p>

              <div className="flex flex-wrap items-center gap-4 pt-2">
                <Link
                  to="/shop/catalog"
                  className="px-6 py-3.5 rounded-lg bg-[#0F5E5A] text-[#FAF8F4] text-xs font-semibold hover:bg-[#0A4542] transition-colors shadow-sm flex items-center gap-2 group"
                >
                  <span>Browse All OTC Products</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" strokeWidth={1.5} />
                </Link>

                <Link
                  to="/track-order"
                  className="px-5 py-3.5 rounded-lg border border-[#0E2A2B]/20 text-[#0E2A2B] text-xs font-semibold hover:bg-[#0E2A2B]/4 transition-colors"
                >
                  Track Existing Order
                </Link>
              </div>

              {/* Service Trust Indicators */}
              <div className="pt-6 border-t border-[#0E2A2B]/8 grid grid-cols-3 gap-4 text-xs text-[#5B6B6C]">
                <div>
                  <strong className="text-[#0E2A2B] block font-bold">Free Delivery</strong>
                  <span>On orders above Rs. 2,000</span>
                </div>
                <div>
                  <strong className="text-[#0E2A2B] block font-bold">Cash on Delivery</strong>
                  <span>Available nationwide in 50+ cities</span>
                </div>
                <div>
                  <strong className="text-[#0E2A2B] block font-bold">100% Genuine</strong>
                  <span>Direct from Kot Lakhpat Plant</span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="relative rounded-2xl overflow-hidden shadow-xl border border-[#0E2A2B]/10 aspect-square group bg-white p-8 flex items-center justify-center">
                <img
                  src={siteImages.bonaidBottle.src}
                  alt="CKD Pharma BonAid-D Supplement Bottle"
                  className="w-full h-full object-contain mix-blend-multiply group-hover:scale-104 transition-transform duration-500"
                />
                <div className="absolute top-4 right-4 bg-[#0F5E5A] text-[#FAF8F4] text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider">
                  Bestseller · Bone Health
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Shop By Health Concern */}
      <section className="py-20 border-b border-[#0E2A2B]/8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 gap-4">
            <div>
              <span className="text-xs uppercase tracking-widest font-bold text-[#0F5E5A] block mb-2">
                TARGETED HEALTHCARE
              </span>
              <h2 className="font-serif-editorial text-3xl sm:text-4xl font-normal text-[#0E2A2B]">
                Shop by Health Concern
              </h2>
            </div>
            <Link to="/shop/catalog" className="text-xs font-semibold text-[#0F5E5A] hover:underline flex items-center gap-1">
              <span>View full OTC catalog</span>
              <ArrowRight className="w-3.5 h-3.5" strokeWidth={1.5} />
            </Link>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {concernTiles.map((tile) => {
              const Icon = tile.icon;
              return (
                <Link
                  key={tile.name}
                  to={`/shop/catalog?concern=${encodeURIComponent(tile.concern)}`}
                  className="p-5 rounded-xl border border-[#0E2A2B]/8 bg-white hover:border-[#0F5E5A] hover:shadow-sm transition-all group flex flex-col justify-between"
                >
                  <div>
                    <div className="w-10 h-10 rounded-lg bg-[#0F5E5A]/10 text-[#0F5E5A] flex items-center justify-center mb-3 group-hover:bg-[#0F5E5A] group-hover:text-[#FAF8F4] transition-colors">
                      <Icon className="w-5 h-5" strokeWidth={1.5} />
                    </div>
                    <h3 className="text-xs font-bold text-[#0E2A2B] group-hover:text-[#0F5E5A] transition-colors">
                      {tile.name}
                    </h3>
                    <p className="text-[11px] text-[#5B6B6C] mt-1">
                      {tile.desc}
                    </p>
                  </div>
                  <span className="text-[10px] text-[#0F5E5A] font-semibold mt-4 block">
                    {tile.count} →
                  </span>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Bestsellers Section */}
      <section className="py-20 border-b border-[#0E2A2B]/8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 gap-4">
            <div>
              <span className="text-xs uppercase tracking-widest font-bold text-[#0F5E5A] block mb-2">
                VERIFIED ESSENTIALS
              </span>
              <h2 className="font-serif-editorial text-3xl sm:text-4xl font-normal text-[#0E2A2B]">
                Bestselling Over-the-Counter Formulations
              </h2>
            </div>
            <Link to="/shop/catalog" className="text-xs font-semibold text-[#0F5E5A] hover:underline">
              View all 12+ OTC medicines →
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {bestsellers.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Safety & Pharmacist Advisory Callout */}
      <section className="py-20 gradient-calm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="p-8 sm:p-12 rounded-2xl bg-white border border-[#0E2A2B]/10 shadow-xs flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="space-y-3 max-w-xl">
              <span className="text-xs uppercase tracking-widest font-bold text-[#0F5E5A]">
                PHARMACY CONSULTATION SERVICE
              </span>
              <h3 className="font-serif-editorial text-2xl sm:text-3xl font-normal text-[#0E2A2B]">
                Need guidance selecting the right OTC formulation?
              </h3>
              <p className="text-xs text-[#5B6B6C] leading-relaxed">
                Our qualified dispensing pharmacists are available Monday through Saturday from 9 AM to 6 PM PKT to advise on potential drug interactions, pediatric dosages, or usage directions.
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-4 shrink-0">
              <a
                href="tel:08002532273"
                className="px-6 py-3 rounded-lg bg-[#0E2A2B] text-[#FAF8F4] text-xs font-semibold hover:bg-[#163E3F] transition-colors flex items-center gap-2"
              >
                <PhoneCall className="w-4 h-4" />
                <span>Call 0800-CKD-CARE</span>
              </a>
              <a
                href="https://wa.me/923008495521"
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 rounded-lg bg-[#0F5E5A] text-[#FAF8F4] text-xs font-semibold hover:bg-[#0A4542] transition-colors"
              >
                Chat on WhatsApp
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
