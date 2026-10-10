import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, X, Pill, Building2, FlaskConical, FileText, ArrowRight } from 'lucide-react';
import { productsData } from '../../content/products';
import { useI18n } from '../../lib/i18n';

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CommandPalette: React.FC<CommandPaletteProps> = ({ isOpen, onClose }) => {
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();
  const { t } = useI18n();

  // Navigation pages list for search
  const corporatePages = [
    { title: 'Corporate About & 40-Year Heritage', path: '/about', icon: Building2, category: 'Company' },
    { title: 'Manufacturing Plant & Cleanroom Facility', path: '/manufacturing', icon: Building2, category: 'Quality & cGMP' },
    { title: 'Research & Development (Bioavailability Labs)', path: '/research', icon: FlaskConical, category: 'Scientific R&D' },
    { title: 'Career Opportunities in Lahore & Karachi', path: '/careers', icon: FileText, category: 'Careers' },
    { title: 'News & Clinical Formulations Updates', path: '/news', icon: FileText, category: 'Media' },
    { title: 'Contact Head Office & Regional Hubs', path: '/contact', icon: Building2, category: 'Support' },
    { title: 'Track Nationwide OTC Order', path: '/track-order', icon: FileText, category: 'eCommerce' },
    { title: 'Browse All Over-The-Counter Essentials', path: '/shop/catalog', icon: Pill, category: 'OTC Store' }
  ];

  // Filter products
  const filteredProducts = query.trim() === '' ? [] : productsData.filter(p => 
    p.name.toLowerCase().includes(query.toLowerCase()) ||
    p.genericName.toLowerCase().includes(query.toLowerCase()) ||
    p.category.toLowerCase().includes(query.toLowerCase()) ||
    p.concern.some(c => c.toLowerCase().includes(query.toLowerCase()))
  ).slice(0, 5);

  // Filter corporate pages
  const filteredPages = query.trim() === '' ? [] : corporatePages.filter(p =>
    p.title.toLowerCase().includes(query.toLowerCase()) ||
    p.category.toLowerCase().includes(query.toLowerCase())
  ).slice(0, 3);

  const totalResults = [...filteredProducts.map(p => ({ type: 'product', data: p })), ...filteredPages.map(p => ({ type: 'page', data: p }))];

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
      setQuery('');
      setSelectedIndex(0);
    }
  }, [isOpen]);

  useEffect(() => {
    setSelectedIndex(0);
  }, [query]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;

      if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
      } else if (e.key === 'ArrowDown') {
        e.preventDefault();
        setSelectedIndex(prev => (totalResults.length > 0 ? (prev + 1) % totalResults.length : 0));
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setSelectedIndex(prev => (totalResults.length > 0 ? (prev - 1 + totalResults.length) % totalResults.length : 0));
      } else if (e.key === 'Enter') {
        e.preventDefault();
        if (totalResults.length > 0) {
          const item = totalResults[selectedIndex];
          if (item.type === 'product') {
            const p = item.data as typeof productsData[0];
            navigate(p.isOTC ? `/shop/product/${p.slug}` : `/products/${p.slug}`);
          } else {
            const p = item.data as typeof corporatePages[0];
            navigate(p.path);
          }
          onClose();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, selectedIndex, totalResults, navigate, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4 bg-[#0E2A2B]/40 backdrop-blur-xs animate-in fade-in duration-250">
      <div 
        className="w-full max-w-2xl bg-[#FAF8F4] rounded-xl shadow-2xl border border-[#0E2A2B]/10 overflow-hidden flex flex-col animate-in zoom-in-95 slide-in-from-top-4 duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]"
        onClick={e => e.stopPropagation()}
      >
        {/* Search Input Bar */}
        <div className="flex items-center px-4 py-3.5 border-b border-[#0E2A2B]/8 gap-3 bg-[#FAF8F4]">
          <Search className="w-5 h-5 text-[#5B6B6C] shrink-0" strokeWidth={1.5} />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder={t.searchPlaceholder}
            className="flex-1 bg-transparent text-base text-[#0E2A2B] placeholder:text-[#5B6B6C]/60 outline-none"
            aria-label="Search pharmaceutical products and corporate pages"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="p-1 text-[#5B6B6C] hover:text-[#0E2A2B] rounded-md transition-colors"
              aria-label="Clear search input"
            >
              <X className="w-4 h-4" strokeWidth={1.5} />
            </button>
          )}
          <kbd className="hidden sm:inline-block px-2 py-0.5 text-xs text-[#5B6B6C] bg-[#0E2A2B]/5 rounded font-mono">
            ESC
          </kbd>
        </div>

        {/* Results / Suggestions View */}
        <div className="max-h-[60vh] overflow-y-auto p-3 space-y-4">
          {query.trim() === '' ? (
            <div className="p-4 space-y-3">
              <span className="text-xs uppercase tracking-wider font-semibold text-[#5B6B6C]">
                Suggested Topics & Formulations
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {productsData.slice(0, 4).map(product => (
                  <button
                    key={product.id}
                    onClick={() => {
                      navigate(product.isOTC ? `/shop/product/${product.slug}` : `/products/${product.slug}`);
                      onClose();
                    }}
                    className="flex items-center justify-between p-2.5 rounded-lg border border-[#0E2A2B]/6 hover:bg-[#0E2A2B]/4 text-left transition-colors group"
                  >
                    <div>
                      <div className="text-sm font-medium text-[#0E2A2B] group-hover:text-[#0F5E5A]">
                        {product.name}
                      </div>
                      <div className="text-xs text-[#5B6B6C]">{product.genericName}</div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-[#5B6B6C] group-hover:text-[#0F5E5A] group-hover:translate-x-0.5 transition-all" strokeWidth={1.5} />
                  </button>
                ))}
              </div>
            </div>
          ) : totalResults.length === 0 ? (
            <div className="py-12 text-center text-[#5B6B6C]">
              <Pill className="w-8 h-8 mx-auto mb-2 text-[#5B6B6C]/40" strokeWidth={1.5} />
              <p className="text-sm">No formulations or pages found for &ldquo;{query}&rdquo;.</p>
              <p className="text-xs text-[#5B6B6C]/70 mt-1">Try searching for generic terms like &ldquo;Paracetamol&rdquo;, &ldquo;Calcium&rdquo;, or &ldquo;Quality&rdquo;.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {filteredProducts.length > 0 && (
                <div>
                  <div className="px-3 py-1 text-xs uppercase tracking-wider font-semibold text-[#5B6B6C]">
                    Medicines & Products ({filteredProducts.length})
                  </div>
                  <div className="space-y-1 mt-1">
                    {filteredProducts.map((p, idx) => {
                      const isSelected = selectedIndex === idx;
                      return (
                        <div
                          key={p.id}
                          onClick={() => {
                            navigate(p.isOTC ? `/shop/product/${p.slug}` : `/products/${p.slug}`);
                            onClose();
                          }}
                          className={`flex items-center justify-between p-2.5 rounded-lg cursor-pointer transition-colors ${
                            isSelected ? 'bg-[#0F5E5A]/10 text-[#0E2A2B]' : 'hover:bg-[#0E2A2B]/4'
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-md bg-[#0E2A2B]/5 flex items-center justify-center text-[#0F5E5A] shrink-0">
                              <Pill className="w-4 h-4" strokeWidth={1.5} />
                            </div>
                            <div>
                              <div className="text-sm font-semibold text-[#0E2A2B] flex items-center gap-2">
                                <span>{p.name}</span>
                                {p.isOTC ? (
                                  <span className="text-[10px] text-[#0F5E5A] font-medium bg-[#0F5E5A]/10 px-1.5 py-0.2 rounded">
                                    OTC · Rs. {p.price}
                                  </span>
                                ) : (
                                  <span className="text-[10px] text-amber-700 font-medium bg-amber-50 px-1.5 py-0.2 rounded">
                                    Rx Only
                                  </span>
                                )}
                              </div>
                              <div className="text-xs text-[#5B6B6C]">{p.genericName} · {p.dosageForm}</div>
                            </div>
                          </div>
                          <ArrowRight className="w-4 h-4 text-[#5B6B6C]" strokeWidth={1.5} />
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {filteredPages.length > 0 && (
                <div>
                  <div className="px-3 py-1 text-xs uppercase tracking-wider font-semibold text-[#5B6B6C]">
                    Corporate Sections ({filteredPages.length})
                  </div>
                  <div className="space-y-1 mt-1">
                    {filteredPages.map((pg, idx) => {
                      const overallIdx = filteredProducts.length + idx;
                      const isSelected = selectedIndex === overallIdx;
                      const Icon = pg.icon;
                      return (
                        <div
                          key={pg.path}
                          onClick={() => {
                            navigate(pg.path);
                            onClose();
                          }}
                          className={`flex items-center justify-between p-2.5 rounded-lg cursor-pointer transition-colors ${
                            isSelected ? 'bg-[#0F5E5A]/10 text-[#0E2A2B]' : 'hover:bg-[#0E2A2B]/4'
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-md bg-[#0E2A2B]/5 flex items-center justify-center text-[#5B6B6C] shrink-0">
                              <Icon className="w-4 h-4" strokeWidth={1.5} />
                            </div>
                            <div>
                              <div className="text-sm font-medium text-[#0E2A2B]">{pg.title}</div>
                              <div className="text-xs text-[#5B6B6C]">{pg.category}</div>
                            </div>
                          </div>
                          <ArrowRight className="w-4 h-4 text-[#5B6B6C]" strokeWidth={1.5} />
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Footer shortcuts */}
        <div className="px-4 py-2.5 border-t border-[#0E2A2B]/8 bg-[#FAF8F4]/80 text-[11px] text-[#5B6B6C] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span><kbd className="font-mono bg-[#0E2A2B]/5 px-1 rounded">↑↓</kbd> to navigate</span>
            <span><kbd className="font-mono bg-[#0E2A2B]/5 px-1 rounded">Enter</kbd> to select</span>
            <span><kbd className="font-mono bg-[#0E2A2B]/5 px-1 rounded">ESC</kbd> to close</span>
          </div>
          <span className="hidden sm:inline">Certified DRAP Catalog</span>
        </div>
      </div>
    </div>
  );
};
