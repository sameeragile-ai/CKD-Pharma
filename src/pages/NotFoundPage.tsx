import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { SEO } from '../lib/seo';
import { Search, Pill, Building2, ArrowRight } from 'lucide-react';

export const NotFoundPage: React.FC = () => {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/shop/catalog?search=${encodeURIComponent(query)}`);
    }
  };

  return (
    <div className="min-h-screen bg-[#FAF8F4] pt-40 pb-24 flex items-center justify-center">
      <SEO
        title="Page Not Found (404) | CKD Pharma Pakistan"
        description="The requested page could not be located on the CKD Pharma corporate portal. Search our registered formulation catalog or visit the home page."
        canonicalPath="/404"
      />

      <div className="max-w-xl mx-auto px-4 text-center space-y-6">
        <span className="font-mono text-xs font-bold uppercase tracking-widest text-[#0F5E5A]">
          ERROR 404 — MONOGRAPH OR ROUTE NOT FOUND
        </span>

        <h1 className="font-serif-editorial text-4xl sm:text-5xl font-normal text-[#0E2A2B]">
          The requested page is not in our directory.
        </h1>

        <p className="text-xs sm:text-sm text-[#5B6B6C] max-w-md mx-auto leading-relaxed">
          The link you followed may have moved or been updated. You can search our active pharmaceutical database or return to the main portal.
        </p>

        {/* Quick Search */}
        <form onSubmit={handleSearch} className="max-w-md mx-auto flex gap-2">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-[#5B6B6C] absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search formulations (e.g. Paracetamol, BonAid-D)..."
              className="w-full text-xs pl-9 pr-3 py-2.5 rounded-lg border border-[#0E2A2B]/15 bg-white text-[#0E2A2B] outline-none focus:border-[#0F5E5A]"
            />
          </div>
          <button
            type="submit"
            className="px-4 py-2.5 bg-[#0E2A2B] text-white text-xs font-semibold rounded-lg hover:bg-[#0F5E5A]"
          >
            Search
          </button>
        </form>

        {/* Quick Links */}
        <div className="pt-6 border-t border-[#0E2A2B]/8 grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs">
          <Link to="/" className="p-3 rounded-lg border border-[#0E2A2B]/8 bg-white hover:text-[#0F5E5A] font-medium">
            Corporate Home
          </Link>
          <Link to="/products" className="p-3 rounded-lg border border-[#0E2A2B]/8 bg-white hover:text-[#0F5E5A] font-medium">
            All Formulations
          </Link>
          <Link to="/shop" className="p-3 rounded-lg border border-[#0E2A2B]/8 bg-white hover:text-[#0F5E5A] font-medium text-[#0F5E5A]">
            OTC Store
          </Link>
        </div>
      </div>
    </div>
  );
};
