import React, { useState, useMemo } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { SEO } from '../lib/seo';
import { productsData, allCategories } from '../content/products';
import { ProductCard } from '../components/shop/ProductCard';
import { Search, Filter, Pill, ShieldAlert, ArrowRight } from 'lucide-react';
import { DosageForm } from '../types';

export const ProductsPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialCategory = searchParams.get('category') || 'all';
  const initialForm = searchParams.get('form') || 'all';

  const [selectedCategory, setSelectedCategory] = useState<string>(initialCategory);
  const [selectedForm, setSelectedForm] = useState<string>(initialForm);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [prescriptionFilter, setPrescriptionFilter] = useState<'all' | 'otc' | 'rx'>('all');

  const dosageForms: { id: string; label: string }[] = [
    { id: 'all', label: 'All Dosage Forms' },
    { id: 'Tablet', label: 'Tablets' },
    { id: 'Capsule', label: 'Capsules' },
    { id: 'Suspension', label: 'Suspensions' },
    { id: 'Syrup', label: 'Syrups' },
    { id: 'Cream / Ointment', label: 'Creams & Gels' },
    { id: 'Sachet', label: 'Sachets' }
  ];

  const filteredProducts = useMemo(() => {
    return productsData.filter((p) => {
      // Category match
      if (selectedCategory !== 'all') {
        const matchesCat = p.category.toLowerCase().includes(selectedCategory.toLowerCase()) ||
                           selectedCategory.toLowerCase().includes(p.category.toLowerCase());
        if (!matchesCat) return false;
      }

      // Form match
      if (selectedForm !== 'all' && p.dosageForm !== selectedForm) {
        return false;
      }

      // Prescription vs OTC filter
      if (prescriptionFilter === 'otc' && !p.isOTC) return false;
      if (prescriptionFilter === 'rx' && p.isOTC) return false;

      // Text search match
      if (searchQuery.trim() !== '') {
        const query = searchQuery.toLowerCase();
        const matchesText = 
          p.name.toLowerCase().includes(query) ||
          p.genericName.toLowerCase().includes(query) ||
          p.description.toLowerCase().includes(query) ||
          p.category.toLowerCase().includes(query);
        if (!matchesText) return false;
      }

      return true;
    });
  }, [selectedCategory, selectedForm, prescriptionFilter, searchQuery]);

  return (
    <div className="min-h-screen bg-[#FAF8F4] pt-28 pb-20">
      <SEO
        title="Pharmaceutical Formulations Directory | CKD Pharma"
        description="Explore CKD Pharma catalog of 180+ pharmaceutical formulations. Therapeutic monographs, British Pharmacopoeia assays, prescription medicines, and certified OTC lines."
        canonicalPath="/products"
        breadcrumbs={[
          { name: 'Home', url: '/' },
          { name: 'Products', url: '/products' }
        ]}
      />

      {/* Header */}
      <section className="pt-8 pb-12 gradient-calm border-b border-[#0E2A2B]/8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="max-w-2xl space-y-3">
              <span className="text-xs uppercase tracking-widest font-bold text-[#0F5E5A]">
                DRAP LICENSED MONOGRAPHS
              </span>
              <h1 className="font-serif-editorial text-4xl sm:text-5xl font-normal text-[#0E2A2B]">
                Formulations & Products Directory
              </h1>
              <p className="text-sm text-[#5B6B6C]">
                Explore our evidence-based oral solids, liquids, and topical therapeutic lines. Formulated under strict British Pharmacopoeia (BP) and USP specifications.
              </p>
            </div>

            {/* Banner directing to direct OTC checkout */}
            <div className="p-4 rounded-xl bg-white border border-[#0F5E5A]/20 shadow-xs flex items-center gap-4 shrink-0">
              <div className="w-10 h-10 rounded-lg bg-[#0F5E5A]/10 text-[#0F5E5A] flex items-center justify-center shrink-0">
                <Pill className="w-5 h-5" strokeWidth={1.5} />
              </div>
              <div>
                <div className="text-xs font-bold text-[#0E2A2B]">Looking to buy OTC products?</div>
                <Link to="/shop" className="text-xs font-semibold text-[#0F5E5A] hover:underline flex items-center gap-1 mt-0.5">
                  <span>Visit Direct OTC Patient Store</span>
                  <ArrowRight className="w-3.5 h-3.5" strokeWidth={1.5} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Filter and Catalogue Body */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          {/* Controls Bar: Search + Category + Form + Rx/OTC Segmented Controls */}
          <div className="space-y-6 mb-10">
            {/* Search Input */}
            <div className="relative max-w-xl">
              <Search className="w-4.5 h-4.5 text-[#5B6B6C] absolute left-3.5 top-1/2 -translate-y-1/2" strokeWidth={1.5} />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by formulation name, generic compound, or indication..."
                className="w-full text-xs sm:text-sm pl-10 pr-4 py-2.5 rounded-lg border border-[#0E2A2B]/15 bg-white text-[#0E2A2B] placeholder:text-[#5B6B6C]/60 outline-none focus:border-[#0F5E5A]"
              />
            </div>

            {/* Filter Tabs & Segmented Controls (Functional Interactive Buttons per Rule 1A) */}
            <div className="flex flex-wrap items-center justify-between gap-4 pt-2 border-t border-[#0E2A2B]/8">
              {/* Therapeutic Areas */}
              <div className="flex flex-wrap items-center gap-1.5">
                {allCategories.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedCategory(cat.id)}
                    className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors ${
                      selectedCategory === cat.id
                        ? 'bg-[#0E2A2B] text-[#FAF8F4]'
                        : 'bg-white text-[#5B6B6C] border border-[#0E2A2B]/10 hover:border-[#0E2A2B]/30'
                    }`}
                  >
                    {cat.name}
                  </button>
                ))}
              </div>

              {/* Prescription vs OTC Toggle */}
              <div className="flex items-center gap-1 p-1 bg-white border border-[#0E2A2B]/10 rounded-lg text-xs">
                <button
                  onClick={() => setPrescriptionFilter('all')}
                  className={`px-2.5 py-1 rounded-md font-medium transition-colors ${
                    prescriptionFilter === 'all' ? 'bg-[#0F5E5A] text-[#FAF8F4]' : 'text-[#5B6B6C] hover:text-[#0E2A2B]'
                  }`}
                >
                  All Items ({productsData.length})
                </button>
                <button
                  onClick={() => setPrescriptionFilter('otc')}
                  className={`px-2.5 py-1 rounded-md font-medium transition-colors ${
                    prescriptionFilter === 'otc' ? 'bg-[#0F5E5A] text-[#FAF8F4]' : 'text-[#5B6B6C] hover:text-[#0E2A2B]'
                  }`}
                >
                  OTC Store
                </button>
                <button
                  onClick={() => setPrescriptionFilter('rx')}
                  className={`px-2.5 py-1 rounded-md font-medium transition-colors ${
                    prescriptionFilter === 'rx' ? 'bg-[#0F5E5A] text-[#FAF8F4]' : 'text-[#5B6B6C] hover:text-[#0E2A2B]'
                  }`}
                >
                  Rx Only
                </button>
              </div>
            </div>

            {/* Secondary Form Selector */}
            <div className="flex items-center gap-2 overflow-x-auto pb-2 text-xs">
              <span className="text-[#5B6B6C] shrink-0 font-medium">Dosage Form:</span>
              {dosageForms.map((df) => (
                <button
                  key={df.id}
                  onClick={() => setSelectedForm(df.id)}
                  className={`px-2.5 py-1 rounded-md shrink-0 transition-colors ${
                    selectedForm === df.id
                      ? 'bg-[#0F5E5A]/15 text-[#0F5E5A] font-bold'
                      : 'text-[#5B6B6C] hover:text-[#0E2A2B]'
                  }`}
                >
                  {df.label}
                </button>
              ))}
            </div>
          </div>

          {/* Results Summary and Grid */}
          <div className="space-y-6">
            <div className="flex items-center justify-between text-xs text-[#5B6B6C]">
              <span>Showing <strong>{filteredProducts.length}</strong> registered formulations</span>
              {(selectedCategory !== 'all' || selectedForm !== 'all' || searchQuery !== '' || prescriptionFilter !== 'all') && (
                <button
                  onClick={() => {
                    setSelectedCategory('all');
                    setSelectedForm('all');
                    setSearchQuery('');
                    setPrescriptionFilter('all');
                  }}
                  className="text-[#0F5E5A] hover:underline font-medium"
                >
                  Reset all filters
                </button>
              )}
            </div>

            {filteredProducts.length === 0 ? (
              <div className="py-20 text-center bg-white rounded-xl border border-[#0E2A2B]/8 space-y-3">
                <Pill className="w-8 h-8 mx-auto text-[#5B6B6C]/40" strokeWidth={1.5} />
                <h3 className="text-base font-bold text-[#0E2A2B]">No formulations matched your criteria</h3>
                <p className="text-xs text-[#5B6B6C] max-w-sm mx-auto">
                  Try clearing the category filter or searching for another generic compound.
                </p>
                <button
                  onClick={() => {
                    setSelectedCategory('all');
                    setSelectedForm('all');
                    setSearchQuery('');
                    setPrescriptionFilter('all');
                  }}
                  className="px-4 py-2 bg-[#0E2A2B] text-[#FAF8F4] text-xs font-semibold rounded-lg hover:bg-[#163E3F]"
                >
                  View All Formulations
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {filteredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* DRAP Compliance Callout */}
      <section className="mt-16 pt-8 border-t border-[#0E2A2B]/8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="p-6 rounded-xl bg-amber-50/60 border border-amber-200/50 flex items-start gap-4">
            <ShieldAlert className="w-5 h-5 text-amber-800 shrink-0 mt-0.5" strokeWidth={1.5} />
            <div className="text-xs text-amber-900 space-y-1">
              <strong className="block font-bold">DRAP Regulatory Notice on Prescription Medications (Rx)</strong>
              <p className="leading-relaxed">
                Products marked as &ldquo;Rx Only&rdquo; are listed exclusively for licensed medical practitioners, healthcare institutions, and hospital pharmacies. Under the Drug Act 1976 and DRAP regulations, prescription medicines cannot be purchased via retail direct delivery without in-person clinical prescription authentication.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
