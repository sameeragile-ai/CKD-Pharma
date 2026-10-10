import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { SEO } from '../lib/seo';
import { productsData } from '../content/products';
import { useCartStore } from '../lib/cart-store';
import { ProductCard } from '../components/shop/ProductCard';
import { 
  ShoppingBag, 
  Plus, 
  Minus, 
  ShieldCheck, 
  AlertTriangle, 
  Lock, 
  ArrowLeft, 
  Check, 
  FileText,
  PhoneCall,
  Clock
} from 'lucide-react';

export const ProductDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const { addItem } = useCartStore();
  
  const [quantity, setQuantity] = useState(1);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [isAdded, setIsAdded] = useState(false);

  // Find product by slug
  const product = productsData.find(p => p.slug === slug) || productsData[0];

  // Related products in the same category
  const relatedProducts = productsData
    .filter(p => p.id !== product.id && (p.category === product.category || p.concern.some(c => product.concern.includes(c))))
    .slice(0, 3);

  const handleAddToCart = () => {
    if (!product.isOTC) return;
    addItem(product, quantity);
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 1200);
  };

  return (
    <div className="min-h-screen bg-[#FAF8F4] pt-28 pb-20">
      <SEO
        title={`${product.name} | CKD Pharma Pakistan`}
        description={product.description}
        canonicalPath={`/shop/product/${product.slug}`}
        ogType="product"
        ogImage={product.images[0]}
        breadcrumbs={[
          { name: 'Home', url: '/' },
          { name: product.isOTC ? 'OTC Store' : 'Products', url: product.isOTC ? '/shop' : '/products' },
          { name: product.name, url: `/shop/product/${product.slug}` }
        ]}
        productData={{
          name: product.name,
          image: product.images[0],
          description: product.description,
          sku: product.id,
          price: product.price || 0,
          availability: product.inStock ? 'https://schema.org/InStock' : 'https://schema.org/OutOfStock'
        }}
      />

      {/* Breadcrumb strip */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4">
        <div className="flex items-center gap-2 text-xs text-[#5B6B6C]">
          <Link to="/" className="hover:text-[#0E2A2B]">Home</Link>
          <span>/</span>
          <Link to={product.isOTC ? '/shop' : '/products'} className="hover:text-[#0E2A2B]">
            {product.isOTC ? 'OTC Store' : 'Clinical Products'}
          </Link>
          <span>/</span>
          <span className="text-[#0E2A2B] font-medium truncate">{product.name}</span>
        </div>
      </div>

      {/* Main PDP Grid */}
      <section className="py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            {/* Gallery (5 cols) */}
            <div className="lg:col-span-5 space-y-4">
              <div className="aspect-square rounded-2xl bg-white border border-[#0E2A2B]/10 overflow-hidden p-8 flex items-center justify-center shadow-xs">
                <img
                  src={product.images[selectedImageIndex] || product.images[0]}
                  alt={product.name}
                  className="w-full h-full object-contain mix-blend-multiply"
                  onError={(e) => {
                    e.currentTarget.src = 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=800&q=80';
                  }}
                />
              </div>

              {product.images.length > 1 && (
                <div className="flex gap-3">
                  {product.images.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedImageIndex(idx)}
                      className={`w-20 h-20 rounded-xl bg-white border overflow-hidden p-2 transition-all cursor-pointer ${
                        selectedImageIndex === idx
                          ? 'border-[#0F5E5A] ring-2 ring-[#0F5E5A]/20'
                          : 'border-[#0E2A2B]/10 hover:border-[#0E2A2B]/30'
                      }`}
                    >
                      <img
                        src={img}
                        alt=""
                        className="w-full h-full object-contain mix-blend-multiply"
                        onError={(e) => {
                          e.currentTarget.src = 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=800&q=80';
                        }}
                      />
                    </button>
                  ))}
                </div>
              )}

              {/* Regulatory Assurance Callout */}
              <div className="p-4 rounded-xl bg-[#E6F3F2]/50 border border-[#0F5E5A]/15 text-xs text-[#0E2A2B] space-y-1.5">
                <div className="flex items-center gap-2 font-bold text-[#0F5E5A]">
                  <ShieldCheck className="w-4 h-4" strokeWidth={1.5} />
                  <span>Verified Pharmaceutical Monograph</span>
                </div>
                <div className="text-[11px] text-[#5B6B6C]">
                  DRAP Registration No: <strong>{product.drapRegistrationNumber || 'DRAP-09214-PK'}</strong>
                </div>
                <div className="text-[11px] text-[#5B6B6C]">
                  {product.storageConditions || 'Store below 30°C in a dry place.'}
                </div>
              </div>
            </div>

            {/* Contiguous Purchase Module & Details (7 cols) */}
            <div className="lg:col-span-7 space-y-6">
              {/* Category & Status Tags */}
              <div className="flex items-center gap-2 text-xs font-medium">
                <span className="text-[#0F5E5A]">{product.category}</span>
                <span className="text-[#0E2A2B]/20">·</span>
                <span className="text-[#5B6B6C]">{product.dosageForm}</span>
                <span className="text-[#0E2A2B]/20">·</span>
                {product.isOTC ? (
                  <span className="text-[#0F5E5A] font-semibold bg-[#0F5E5A]/10 px-2 py-0.5 rounded">
                    DRAP Over-The-Counter
                  </span>
                ) : (
                  <span className="text-amber-800 font-semibold bg-amber-50 px-2 py-0.5 rounded flex items-center gap-1">
                    <Lock className="w-3 h-3" />
                    <span>Prescription Medicine (Rx)</span>
                  </span>
                )}
              </div>

              {/* Title & Generic Composition */}
              <div>
                <h1 className="font-serif-editorial text-3xl sm:text-4xl font-normal text-[#0E2A2B] leading-tight">
                  {product.name}
                </h1>
                <p className="text-sm font-medium text-[#5B6B6C] mt-1">
                  Active Composition: <strong className="text-[#0E2A2B] font-mono text-xs">{product.genericName}</strong>
                </p>
                {product.strength && (
                  <p className="text-xs text-[#5B6B6C] mt-0.5">
                    Strength: {product.strength}
                  </p>
                )}
                <p className="text-xs text-[#5B6B6C] mt-0.5">
                  Packaging: {product.packSize}
                </p>
              </div>

              {/* Pricing & Purchase or Rx Block */}
              <div className="p-6 rounded-2xl bg-white border border-[#0E2A2B]/10 shadow-xs space-y-4">
                {product.isOTC ? (
                  <>
                    <div className="flex items-baseline justify-between">
                      <div className="flex items-baseline gap-3">
                        <span className="font-serif-editorial text-3xl sm:text-4xl font-bold text-[#0E2A2B] tabular-nums">
                          Rs. {product.price?.toLocaleString()}
                        </span>
                        {product.compareAtPrice && (
                          <span className="text-sm text-[#5B6B6C] line-through tabular-nums">
                            Rs. {product.compareAtPrice.toLocaleString()}
                          </span>
                        )}
                      </div>
                      <span className="text-xs font-semibold text-[#0F5E5A]">
                        {product.inStock ? 'In Stock (Direct Delivery)' : 'Out of Stock'}
                      </span>
                    </div>

                    {/* Quantity Stepper & Add to Bag */}
                    <div className="flex flex-col sm:flex-row items-stretch gap-4 pt-2">
                      <div className="flex items-center border border-[#0E2A2B]/15 rounded-lg bg-[#FAF8F4] justify-between sm:justify-start">
                        <button
                          onClick={() => setQuantity(Math.max(1, quantity - 1))}
                          className="px-3.5 py-3 text-[#0E2A2B] hover:bg-[#0E2A2B]/5 transition-colors"
                          aria-label="Decrease quantity"
                        >
                          <Minus className="w-4 h-4" strokeWidth={1.5} />
                        </button>
                        <span className="px-4 text-sm font-bold tabular-nums text-[#0E2A2B]">
                          {quantity}
                        </span>
                        <button
                          onClick={() => setQuantity(quantity + 1)}
                          className="px-3.5 py-3 text-[#0E2A2B] hover:bg-[#0E2A2B]/5 transition-colors"
                          aria-label="Increase quantity"
                        >
                          <Plus className="w-4 h-4" strokeWidth={1.5} />
                        </button>
                      </div>

                      <button
                        onClick={handleAddToCart}
                        disabled={!product.inStock}
                        className="flex-1 py-3 px-6 rounded-lg bg-[#0F5E5A] text-[#FAF8F4] text-sm font-semibold hover:bg-[#0A4542] btn-action-transition shadow-xs flex items-center justify-center gap-2 group"
                      >
                        {isAdded ? (
                          <>
                            <Check className="w-4 h-4" strokeWidth={2} />
                            <span>Added to Healthcare Bag!</span>
                          </>
                        ) : (
                          <>
                            <ShoppingBag className="w-4 h-4" strokeWidth={1.5} />
                            <span>Add to Healthcare Bag (Rs. {((product.price || 0) * quantity).toLocaleString()})</span>
                          </>
                        )}
                      </button>
                    </div>

                    <div className="flex items-center gap-2 text-[11px] text-[#5B6B6C] pt-1">
                      <Clock className="w-3.5 h-3.5 text-[#0F5E5A]" strokeWidth={1.5} />
                      <span>Same-day dispatch in Lahore & Karachi; nationwide 2-3 business days.</span>
                    </div>
                  </>
                ) : (
                  /* Prescription Medicine Warning Banner */
                  <div className="space-y-3">
                    <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 text-xs text-amber-900 space-y-2">
                      <div className="flex items-center gap-2 font-bold text-amber-950">
                        <AlertTriangle className="w-4 h-4 text-amber-800" strokeWidth={1.5} />
                        <span>Prescription Required (Schedule Drug Act 1976)</span>
                      </div>
                      <p className="leading-relaxed">
                        Under DRAP regulatory compliance, this medication cannot be purchased online without a verified doctor prescription. It is supplied directly to licensed pharmacies and healthcare institutions.
                      </p>
                    </div>
                    <div className="flex flex-wrap items-center gap-3 pt-1">
                      <Link
                        to="/contact?inquiry=pharmacy"
                        className="px-5 py-2.5 rounded-lg bg-[#0E2A2B] text-[#FAF8F4] text-xs font-semibold hover:bg-[#163E3F] transition-colors"
                      >
                        Institutional / Pharmacy Supply Inquiry
                      </Link>
                      <a
                        href="tel:08002532273"
                        className="text-xs font-semibold text-[#0F5E5A] hover:underline flex items-center gap-1"
                      >
                        <PhoneCall className="w-3.5 h-3.5" />
                        <span>Medical Support Toll-Free: 0800-CKD-CARE</span>
                      </a>
                    </div>
                  </div>
                )}
              </div>

              {/* Description & Clinical Information */}
              <div className="space-y-6 pt-2">
                <div>
                  <h3 className="text-xs uppercase tracking-widest font-bold text-[#5B6B6C] mb-2">
                    Therapeutic Description
                  </h3>
                  <p className="text-xs sm:text-sm text-[#0E2A2B] leading-relaxed">
                    {product.description}
                  </p>
                </div>

                <div>
                  <h3 className="text-xs uppercase tracking-widest font-bold text-[#5B6B6C] mb-2">
                    Clinical Indications
                  </h3>
                  <p className="text-xs sm:text-sm text-[#0E2A2B] leading-relaxed">
                    {product.indications}
                  </p>
                </div>

                <div>
                  <h3 className="text-xs uppercase tracking-widest font-bold text-[#5B6B6C] mb-2">
                    Directions & Administration
                  </h3>
                  <p className="text-xs sm:text-sm text-[#0E2A2B] leading-relaxed bg-white p-4 rounded-xl border border-[#0E2A2B]/8">
                    {product.directions}
                  </p>
                </div>

                {/* Active Ingredients Table */}
                {product.ingredients.length > 0 && (
                  <div>
                    <h3 className="text-xs uppercase tracking-widest font-bold text-[#5B6B6C] mb-2">
                      Active Chemical Assay
                    </h3>
                    <div className="bg-white rounded-xl border border-[#0E2A2B]/8 overflow-hidden text-xs">
                      {product.ingredients.map((ing, i) => (
                        <div
                          key={i}
                          className="flex justify-between p-3 border-b border-[#0E2A2B]/5 last:border-b-0"
                        >
                          <span className="font-medium text-[#0E2A2B]">{ing.name}</span>
                          <span className="font-mono text-[#0F5E5A] font-semibold">{ing.amount}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Contraindications & Warnings */}
                {product.warnings.length > 0 && (
                  <div>
                    <h3 className="text-xs uppercase tracking-widest font-bold text-amber-900 mb-2">
                      Precautions & Warnings
                    </h3>
                    <ul className="space-y-1.5 text-xs text-[#5B6B6C] list-disc pl-5">
                      {product.warnings.map((warn, i) => (
                        <li key={i}>{warn}</li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Pharmacist Consult Disclaimer */}
                <div className="p-4 rounded-xl bg-[#FAF8F4] border border-[#0E2A2B]/10 text-xs text-[#5B6B6C] italic leading-relaxed">
                  <strong>Consult Your Pharmacist:</strong> Always read the enclosed package leaflet carefully. If symptoms persist for more than 3 days, consult a qualified medical physician. Do not exceed the stated dose.
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <section className="mt-20 pt-16 border-t border-[#0E2A2B]/8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="flex items-center justify-between mb-8">
              <h2 className="font-serif-editorial text-2xl sm:text-3xl font-normal text-[#0E2A2B]">
                Related Therapeutic Formulations
              </h2>
              <Link to="/products" className="text-xs font-semibold text-[#0F5E5A] hover:underline">
                View all in directory →
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedProducts.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
};
