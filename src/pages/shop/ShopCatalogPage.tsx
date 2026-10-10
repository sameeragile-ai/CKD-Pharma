import React, { useState, useMemo } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { SEO } from '../../lib/seo';
import { productsData, allConcerns } from '../../content/products';
import { ProductCard } from '../../components/shop/ProductCard';
import { Search, LayoutGrid, List, Pill, SlidersHorizontal, ArrowUpDown } from 'lucide-react';
import { HealthConcern } from '../../types';

export const ShopCatalogPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialConcern = searchParams.get('concern') || 'all';

  const [selectedConcern, setSelectedConcern] = useState<string>(initialConcern);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [sortBy, setSortBy] = useState<'popular' | 'price-asc' | 'price-desc' | 'name'>('popular');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  // Strict constraint: OTC only in shop
  const otcOnlyProducts = useMemo(() => {
    return productsData.filter(p => p.isOTC);
  }, []);

  const filteredProducts = useMemo(() => {
    let result = otcOnlyProducts.filter((product) => {
      // Concern filter
      if (selectedConcern !== 'all') {
        const matchesConcern = product.concern.some(c => 
          c.toLowerCase() === selectedConcern.toLowerCase() ||
          c.toLowerCase().includes(selectedConcern.toLowerCase())
        );
        if (!matchesConcern) return false;
      }

      // Search match
      if (searchQuery.trim() !== '') {
        const q = searchQuery.toLowerCase();
        const matches = 
          product.name.toLowerCase().includes(q) ||
          product.genericName.toLowerCase().includes(q) ||
          product.description.toLowerCase().includes(q);
        if (!matches) return false;
      }

      return true;
    });

    // Sorting
    if (sortBy === 'price-asc') {
      result = [...result].sort((a, b) => (a.price || 0) - (b.price || 0));
    } else if (sortBy === 'price-desc') {
      result = [...result].sort((a, b) => (b.price || 0) - (a.price || 0));
    } else if (sortBy === 'name') {
      result = [...result].sort((a, b) => a.name.localeCompare(b.name));
    } else {
      // Popular / bestseller first
      result = [...result].sort((a, b) => (b.bestseller ? 1 : 0) - (a.bestseller ? 1 : 0));
    }

    return result;
  }, [otcOnlyProducts, selectedConcern, searchQuery, sortBy]);

  return (
    <div className="min-h-screen bg-[#FAF8F4] pt-28 pb-20">
      <SEO
        title="Browse OTC Healthcare Products | CKD Pharma Pakistan"
        description="Explore the complete collection of DRAP-licensed OTC healthcare formulations in Pakistan. Filter by symptom, concern, and form with transparent PKR pricing."
        canonicalPath="/shop/catalog"
        breadcrumbs={[
          { name: 'Home', url: '/' },
          { name: 'OTC Store', url: '/shop' },
          { name: 'All Products', url: '/shop/catalog' }
        ]}
      />

      {/* Header */}
      <section className="pt-8 pb-12 gradient-calm border-b border-[#0E2A2B]/8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="max-w-3xl space-y-3">
            <span className="text-xs uppercase tracking-widest font-bold text-[#0F5E5A]">
              CKD DIRECT PATIENT DISPENSARY
            </span>
            <h1 className="font-serif-editorial text-4xl sm:text-5xl font-normal text-[#0E2A2B]">
              Over-the-Counter Healthcare Catalog
            </h1>
            <p className="text-sm text-[#5B6B6C]">
              Order verified wellness essentials, bone density nutrition, fast-acting analgesics, and digestive comfort. Delivered in tamper-proof pharmaceutical packaging nationwide.
            </p>
          </div>
        </div>
      </section>

      {/* Main Body */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          {/* Controls: Search + Concern tabs + Sort + View Mode */}
          <div className="space-y-6 mb-10">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              {/* Search */}
              <div className="relative w-full sm:max-w-md">
                <Search className="w-4.5 h-4.5 text-[#5B6B6C] absolute left-3.5 top-1/2 -translate-y-1/2" strokeWidth={1.5} />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search by medicine name or generic active..."
                  className="w-full text-xs sm:text-sm pl-10 pr-4 py-2.5 rounded-lg border border-[#0E2A2B]/15 bg-white text-[#0E2A2B] placeholder:text-[#5B6B6C]/60 outline-none focus:border-[#0F5E5A]"
                />
              </div>

              {/* Sort & Grid/List view controls */}
              <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
                <div className="flex items-center gap-2 text-xs text-[#5B6B6C] bg-white border border-[#0E2A2B]/10 rounded-lg px-3 py-1.5">
                  <ArrowUpDown className="w-3.5 h-3.5" />
                  <label htmlFor="sort-select" className="sr-only">Sort By</label>
                  <select
                    id="sort-select"
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value as any)}
                    className="bg-transparent text-[#0E2A2B] font-medium outline-none cursor-pointer"
                  >
                    <option value="popular">Most Popular</option>
                    <option value="price-asc">Price: Low to High</option>
                    <option value="price-desc">Price: High to Low</option>
                    <option value="name">Alphabetical (A–Z)</option>
                  </select>
                </div>

                <div className="flex items-center border border-[#0E2A2B]/10 rounded-lg p-1 bg-white">
                  <button
                    onClick={() => setViewMode('grid')}
                    className={`p-1.5 rounded transition-colors ${
                      viewMode === 'grid' ? 'bg-[#0E2A2B] text-white' : 'text-[#5B6B6C] hover:text-[#0E2A2B]'
                    }`}
                    aria-label="Grid layout"
                  >
                    <LayoutGrid className="w-4 h-4" strokeWidth={1.5} />
                  </button>
                  <button
                    onClick={() => setViewMode('list')}
                    className={`p-1.5 rounded transition-colors ${
                      viewMode === 'list' ? 'bg-[#0E2A2B] text-white' : 'text-[#5B6B6C] hover:text-[#0E2A2B]'
                    }`}
                    aria-label="List layout"
                  >
                    <List className="w-4 h-4" strokeWidth={1.5} />
                  </button>
                </div>
              </div>
            </div>

            {/* Health Concern Category Filter Buttons */}
            <div className="flex flex-wrap items-center gap-1.5 pt-2 border-t border-[#0E2A2B]/8">
              {allConcerns.map((con) => (
                <button
                  key={con.id}
                  onClick={() => setSelectedConcern(con.id)}
                  className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors ${
                    selectedConcern === con.id
                      ? 'bg-[#0F5E5A] text-[#FAF8F4]'
                      : 'bg-white text-[#5B6B6C] border border-[#0E2A2B]/10 hover:border-[#0E2A2B]/30'
                  }`}
                >
                  {con.label}
                </button>
              ))}
            </div>
          </div>

          {/* Results Summary */}
          <div className="space-y-6">
            <div className="flex items-center justify-between text-xs text-[#5B6B6C]">
              <span>Showing <strong>{filteredProducts.length}</strong> over-the-counter products</span>
              {(selectedConcern !== 'all' || searchQuery !== '') && (
                <button
                  onClick={() => { setSelectedConcern('all'); setSearchQuery(''); }}
                  className="text-[#0F5E5A] font-medium hover:underline"
                >
                  Clear all filters
                </button>
              )}
            </div>

            {/* Product Grid or List */}
            {filteredProducts.length === 0 ? (
              <div className="py-20 text-center bg-white rounded-xl border border-[#0E2A2B]/8 space-y-3">
                <Pill className="w-8 h-8 mx-auto text-[#5B6B6C]/40" strokeWidth={1.5} />
                <h3 className="text-base font-bold text-[#0E2A2B]">No OTC products found</h3>
                <p className="text-xs text-[#5B6B6C] max-w-sm mx-auto">
                  Try adjusting your health concern or search term.
                </p>
                <button
                  onClick={() => { setSelectedConcern('all'); setSearchQuery(''); }}
                  className="px-4 py-2 bg-[#0F5E5A] text-[#FAF8F4] text-xs font-semibold rounded-lg"
                >
                  View All OTC Items
                </button>
              </div>
            ) : viewMode === 'grid' ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {filteredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <div className="space-y-4">
                {filteredProducts.map((product) => (
                  <div
                    key={product.id}
                    className="p-4 sm:p-6 rounded-xl bg-white border border-[#0E2A2B]/8 hover:border-[#0E2A2B]/20 transition-all flex flex-col sm:flex-row items-center justify-between gap-6"
                  >
                    <div className="flex items-center gap-4 w-full sm:w-auto">
                      <img
                        src={product.images[0]}
                        alt={product.name}
                        className="w-20 h-20 object-contain rounded-lg bg-[#FAF8F4] border border-[#0E2A2B]/6 p-1 shrink-0"
                        onError={(e) => {
                          e.currentTarget.src = 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=800&q=80';
                        }}
                      />
                      <div className="space-y-1 min-w-0">
                        <div className="text-[11px] text-[#5B6B6C]">{product.category} · {product.dosageForm}</div>
                        <Link to={`/shop/product/${product.slug}`} className="font-bold text-sm text-[#0E2A2B] hover:text-[#0F5E5A] block truncate">
                          {product.name}
                        </Link>
                        <div className="text-xs font-mono text-[#5B6B6C]">{product.genericName}</div>
                        <div className="text-[11px] text-[#5B6B6C]">Pack: {product.packSize}</div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between sm:justify-end gap-6 w-full sm:w-auto pt-4 sm:pt-0 border-t sm:border-t-0 border-[#0E2A2B]/8">
                      <div className="text-left sm:text-right">
                        <div className="text-base font-bold text-[#0E2A2B] tabular-nums">
                          Rs. {product.price?.toLocaleString()}
                        </div>
                        <div className="text-[11px] text-[#0F5E5A] font-medium">In Stock</div>
                      </div>

                      <Link
                        to={`/shop/product/${product.slug}`}
                        className="px-4 py-2 rounded-lg bg-[#0F5E5A] text-[#FAF8F4] text-xs font-semibold hover:bg-[#0A4542] transition-colors"
                      >
                        View & Order
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};
