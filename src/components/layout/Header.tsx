import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Search, ShoppingBag, ChevronDown, ArrowRight, Menu, X, Phone, Truck, Sparkles } from 'lucide-react';
import { Logo } from '../ui/Logo';
import { siteConfig } from '../../content/site';
import { useCartStore } from '../../lib/cart-store';
import { useI18n } from '../../lib/i18n';
import { MegaMenuProducts } from './MegaMenuProducts';
import { MegaMenuAbout } from './MegaMenuAbout';
import { CommandPalette } from './CommandPalette';

export const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeMegaMenu, setActiveMegaMenu] = useState<'products' | 'about' | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [mobileExpandedSection, setMobileExpandedSection] = useState<'products' | 'about' | null>(null);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [announcementIndex, setAnnouncementIndex] = useState(0);
  
  const headerRef = useRef<HTMLElement>(null);
  const megaMenuTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const location = useLocation();
  const navigate = useNavigate();
  const { language, setLanguage, t } = useI18n();
  const { openCart, getItemCount } = useCartStore();
  const cartCount = getItemCount();

  // Rotate top utility announcements every 5 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setAnnouncementIndex((prev) => (prev + 1) % siteConfig.announcements.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  // Efficient Sticky Header Scroll Listener with Dynamic Scroll Progress Calculation
  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const scrollY = window.scrollY;
          const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
          const progress = totalHeight > 0 ? (scrollY / totalHeight) * 100 : 0;

          setScrollProgress(Math.min(100, Math.max(0, progress)));
          setIsScrolled(scrollY > 24);
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    // Run once on mount
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Click outside to dismiss active mega menu
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (headerRef.current && !headerRef.current.contains(e.target as Node)) {
        setActiveMegaMenu(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileMenuOpen]);

  // Close menus on route change
  useEffect(() => {
    setActiveMegaMenu(null);
    setIsMobileMenuOpen(false);
    setMobileExpandedSection(null);
  }, [location.pathname]);

  // Keyboard shortcut Ctrl/Cmd+K for search, Esc to close menus
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsSearchOpen((prev) => !prev);
      } else if (e.key === 'Escape') {
        setActiveMegaMenu(null);
        setIsMobileMenuOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleMouseEnter = (menu: 'products' | 'about') => {
    if (megaMenuTimeoutRef.current) clearTimeout(megaMenuTimeoutRef.current);
    setActiveMegaMenu(menu);
  };

  const handleMouseLeave = () => {
    if (megaMenuTimeoutRef.current) clearTimeout(megaMenuTimeoutRef.current);
    megaMenuTimeoutRef.current = setTimeout(() => {
      setActiveMegaMenu(null);
    }, 320); // Generous intent buffer to eliminate hover gap
  };

  const toggleMegaMenu = (menu: 'products' | 'about', e: React.MouseEvent) => {
    e.stopPropagation();
    if (megaMenuTimeoutRef.current) clearTimeout(megaMenuTimeoutRef.current);
    setActiveMegaMenu((prev) => (prev === menu ? null : menu));
  };

  const navLinks = [
    { label: t.navAbout, path: '/about', hasMega: 'about' as const },
    { label: t.navProducts, path: '/products', hasMega: 'products' as const },
    { label: t.navQuality, path: '/manufacturing' },
    { label: t.navResearch, path: '/research' },
    { label: t.navCareers, path: '/careers' },
    { label: t.navContact, path: '/contact' }
  ];

  return (
    <>
      {/* ─────────────────────────────────────────────────────────────
          ALWAYS-STICKY EFFICIENT HEADER WITH DYNAMIC ATTENTION-GRABBING STATES
      ────────────────────────────────────────────────────────────── */}
      <header
        ref={headerRef}
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      >
        {/* Top Utility Strip (Smoothly collapses on scroll to minimize vertical footprint) */}
        <div
          className={`bg-[#EBF2F0] border-b border-[#0E2A2B]/6 text-[12px] text-[#0E2A2B] transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] overflow-hidden ${
            isScrolled ? 'max-h-0 opacity-0 py-0 border-none pointer-events-none' : 'max-h-10 opacity-100 py-1.5'
          }`}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between">
            {/* Rotating crossfading announcement */}
            <div className="flex items-center gap-2 overflow-hidden">
              <span className="w-1.5 h-1.5 rounded-full bg-[#0F5E5A] shrink-0 animate-pulse" />
              <div className="relative h-5 overflow-hidden">
                <p 
                  key={announcementIndex}
                  className="font-medium text-[#0E2A2B] animate-in fade-in slide-in-from-bottom-1 duration-300 truncate"
                >
                  {siteConfig.announcements[announcementIndex]}
                </p>
              </div>
            </div>

            {/* Utility links: Phone, Track Order, EN/Urdu Toggle */}
            <div className="hidden md:flex items-center gap-5 text-[#5B6B6C] shrink-0 font-medium">
              <a
                href={`tel:${siteConfig.contact.headOffice.phone.replace(/[^0-9+]/g, '')}`}
                className="flex items-center gap-1.5 hover:text-[#0E2A2B] transition-colors cursor-pointer"
                aria-label="Call CKD Head Office"
              >
                <Phone className="w-3.5 h-3.5 text-[#0F5E5A]" strokeWidth={1.5} />
                <span>{siteConfig.contact.headOffice.phone}</span>
              </a>

              <span className="text-[#0E2A2B]/15" aria-hidden="true">|</span>

              <Link
                to="/track-order"
                className="flex items-center gap-1.5 hover:text-[#0E2A2B] transition-colors cursor-pointer link-draw"
              >
                <Truck className="w-3.5 h-3.5 text-[#0F5E5A]" strokeWidth={1.5} />
                <span>{t.trackOrder}</span>
              </Link>

              <span className="text-[#0E2A2B]/15" aria-hidden="true">|</span>

              {/* Language Switcher */}
              <div className="flex items-center gap-1 text-[11px] font-bold tracking-wider">
                <button
                  type="button"
                  onClick={() => setLanguage('en')}
                  className={`px-1.5 py-0.5 rounded transition-all cursor-pointer ${
                    language === 'en'
                      ? 'bg-[#0E2A2B] text-[#FAF8F4] shadow-xs'
                      : 'text-[#5B6B6C] hover:text-[#0E2A2B]'
                  }`}
                  aria-label="Switch language to English"
                >
                  EN
                </button>
                <span className="text-[#0E2A2B]/20">/</span>
                <button
                  type="button"
                  onClick={() => setLanguage('ur')}
                  className={`px-1.5 py-0.5 rounded transition-all cursor-pointer font-serif ${
                    language === 'ur'
                      ? 'bg-[#0E2A2B] text-[#FAF8F4] shadow-xs'
                      : 'text-[#5B6B6C] hover:text-[#0E2A2B]'
                  }`}
                  aria-label="اردو زبان منتخب کریں"
                >
                  اردو
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Main Navigation Bar — Attention-Grabbing Frosted Surface on Scroll */}
        <div
          className={`relative transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] ${
            isScrolled
              ? 'bg-[#FAF8F4]/95 backdrop-blur-xl shadow-lg shadow-[#0E2A2B]/8 border-b border-[#0F5E5A]/25 py-3'
              : 'bg-[#FAF8F4]/98 backdrop-blur-md border-b border-[#0E2A2B]/8 py-4.5'
          }`}
          onMouseLeave={handleMouseLeave}
        >
          {/* Attention-Grabbing Active Scroll Reading Progress Bar at the very bottom edge */}
          <div 
            className="absolute bottom-0 inset-x-0 h-[2.5px] bg-[#0E2A2B]/5 pointer-events-none overflow-hidden"
            aria-hidden="true"
          >
            <div
              className="h-full bg-gradient-to-r from-[#0F5E5A] via-[#187772] to-[#2DD4BF] transition-all duration-100 ease-out"
              style={{ width: `${scrollProgress}%` }}
            />
          </div>

          {/* Attention-Grabbing Shimmer Accent Line when scrolled */}
          {isScrolled && (
            <div 
              className="absolute bottom-0 inset-x-0 h-[1.5px] header-accent-shimmer pointer-events-none opacity-85" 
              aria-hidden="true" 
            />
          )}

          <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between gap-4 sm:gap-6">
            {/* Zone 1: Brand Wordmark & Seal */}
            <Logo size={isScrolled ? 'sm' : 'md'} />

            {/* Zone 2: Primary Navigation Menu */}
            <nav 
              className="hidden lg:flex items-center gap-1 xl:gap-2"
              aria-label="Main Navigation"
            >
              {navLinks.map((link) => {
                const isActive = location.pathname === link.path || (link.path !== '/' && location.pathname.startsWith(link.path));
                const isMegaOpen = activeMegaMenu === link.hasMega;

                return (
                  <div
                    key={link.path}
                    className="relative"
                    onMouseEnter={() => link.hasMega && handleMouseEnter(link.hasMega)}
                  >
                    <div className="flex items-center">
                      <Link
                        to={link.path}
                        className={`px-3 py-2 rounded-lg text-sm font-semibold transition-all duration-200 inline-flex items-center gap-1.5 whitespace-nowrap cursor-pointer ${
                          isActive
                            ? 'text-[#0E2A2B] bg-[#0E2A2B]/6 font-bold shadow-xs'
                            : 'text-[#5B6B6C] hover:text-[#0E2A2B] hover:bg-[#0E2A2B]/5'
                        } ${isMegaOpen ? 'text-[#0F5E5A] bg-[#0F5E5A]/8' : ''}`}
                      >
                        <span>{link.label}</span>
                        {link.hasMega && (
                          <ChevronDown 
                            className={`w-3.5 h-3.5 transition-transform duration-200 ${
                              isMegaOpen ? 'rotate-180 text-[#0F5E5A]' : 'text-[#5B6B6C]'
                            }`} 
                            strokeWidth={2} 
                          />
                        )}
                      </Link>
                    </div>

                    {/* Active route hairline indicator */}
                    {isActive && (
                      <span className="absolute -bottom-2 left-3 right-3 h-[2px] bg-[#0F5E5A] rounded-full animate-in fade-in duration-300" />
                    )}
                  </div>
                );
              })}
            </nav>

            {/* Zone 3: Search, Cart Badge, Attention-Grabbing "Shop OTC" Button */}
            <div className="flex items-center gap-2 sm:gap-3.5 shrink-0">
              {/* Search Trigger (Hand pointer & tactile feedback) */}
              <button
                type="button"
                onClick={() => setIsSearchOpen(true)}
                className="p-2.5 rounded-lg text-[#0E2A2B] hover:bg-[#0E2A2B]/6 transition-all duration-200 hover:scale-105 active:scale-95 cursor-pointer focus-visible:rounded-lg"
                aria-label="Open search command palette"
                title="Search medications and catalog (Ctrl + K)"
              >
                <Search className="w-4.5 h-4.5" strokeWidth={1.5} />
              </button>

              {/* Cart Drawer Trigger */}
              <button
                type="button"
                onClick={openCart}
                className="relative p-2.5 rounded-lg text-[#0E2A2B] hover:bg-[#0E2A2B]/6 transition-all duration-200 hover:scale-105 active:scale-95 cursor-pointer focus-visible:rounded-lg"
                aria-label={`Open shopping cart (${cartCount} items)`}
              >
                <ShoppingBag className="w-4.5 h-4.5" strokeWidth={1.5} />
                {cartCount > 0 && (
                  <span className="absolute top-1 right-1 w-5 h-5 bg-[#0F5E5A] text-[#FAF8F4] text-[10px] font-bold rounded-full flex items-center justify-center animate-in zoom-in duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)] shadow-sm">
                    {cartCount}
                  </span>
                )}
              </button>

              {/* Attention-Grabbing "Shop OTC" Button with Shimmer and Magnetic Hover */}
              <Link
                to="/shop"
                className={`hidden sm:inline-flex items-center gap-2 px-4.5 py-2 rounded-lg bg-[#0F5E5A] text-[#FAF8F4] text-xs font-bold hover:bg-[#0A4542] btn-action-transition btn-shimmer cursor-pointer group focus-visible:rounded-lg ${
                  isScrolled 
                    ? 'ring-2 ring-[#0F5E5A]/40 shadow-md shadow-[#0F5E5A]/30 scale-102' 
                    : 'shadow-xs hover:shadow-md'
                }`}
              >
                <Sparkles className="w-3.5 h-3.5 text-[#E6F3F2] group-hover:rotate-12 transition-transform duration-300" />
                <span>{t.navShop}</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]" strokeWidth={2} />
              </Link>

              {/* Mobile Hamburger Button */}
              <button
                type="button"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="lg:hidden p-2 rounded-lg text-[#0E2A2B] hover:bg-[#0E2A2B]/6 transition-colors cursor-pointer"
                aria-label={isMobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
                aria-expanded={isMobileMenuOpen}
              >
                {isMobileMenuOpen ? (
                  <X className="w-6 h-6" strokeWidth={1.5} />
                ) : (
                  <Menu className="w-6 h-6" strokeWidth={1.5} />
                )}
              </button>
            </div>
          </div>

          {/* Desktop Mega Menus Flush with Main Bar (Hover Bridge Included) */}
          <div 
            className="w-full"
            onMouseEnter={() => {
              if (megaMenuTimeoutRef.current) clearTimeout(megaMenuTimeoutRef.current);
            }} 
            onMouseLeave={handleMouseLeave}
          >
            {activeMegaMenu === 'products' && (
              <MegaMenuProducts onClose={() => setActiveMegaMenu(null)} />
            )}
            {activeMegaMenu === 'about' && (
              <MegaMenuAbout onClose={() => setActiveMegaMenu(null)} />
            )}
          </div>
        </div>
      </header>

      {/* Dimmed Backdrop Scrim When Desktop Mega Menu is Open */}
      {activeMegaMenu && (
        <div 
          onClick={() => setActiveMegaMenu(null)}
          className="fixed inset-0 bg-[#0E2A2B]/20 backdrop-blur-[2px] z-40 transition-opacity duration-300 cursor-pointer hidden lg:block"
          aria-hidden="true"
        />
      )}

      {/* ─────────────────────────────────────────────────────────────
          FULL-SCREEN MOBILE NAVIGATION DRAWER
      ────────────────────────────────────────────────────────────── */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-50 bg-[#FAF8F4] flex flex-col overflow-y-auto lg:hidden animate-in fade-in duration-200">
          <div className="p-4 flex items-center justify-between border-b border-[#0E2A2B]/8">
            <Logo size="sm" />
            <button
              type="button"
              onClick={() => setIsMobileMenuOpen(false)}
              className="p-2 rounded-lg text-[#0E2A2B] hover:bg-[#0E2A2B]/6 cursor-pointer"
              aria-label="Close navigation"
            >
              <X className="w-6 h-6" strokeWidth={1.5} />
            </button>
          </div>

          <div className="p-6 flex-1 flex flex-col justify-between space-y-6">
            <nav className="space-y-3">
              {/* About with Accordion */}
              <div>
                <div className="flex items-center justify-between py-2 border-b border-[#0E2A2B]/6">
                  <Link
                    to="/about"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="font-serif-editorial text-2xl font-bold text-[#0E2A2B] hover:text-[#0F5E5A] cursor-pointer"
                  >
                    {t.navAbout}
                  </Link>
                  <button
                    type="button"
                    onClick={() => setMobileExpandedSection(prev => prev === 'about' ? null : 'about')}
                    className="p-2 text-[#5B6B6C] cursor-pointer"
                    aria-label="Toggle About Submenu"
                  >
                    <ChevronDown className={`w-5 h-5 transition-transform duration-200 ${mobileExpandedSection === 'about' ? 'rotate-180 text-[#0F5E5A]' : ''}`} />
                  </button>
                </div>
                {mobileExpandedSection === 'about' && (
                  <div className="pl-4 py-2 space-y-2 text-sm text-[#5B6B6C] animate-in fade-in slide-in-from-top-1">
                    <Link to="/about" onClick={() => setIsMobileMenuOpen(false)} className="block py-1.5 hover:text-[#0F5E5A] cursor-pointer">
                      Our 40-Year Journey
                    </Link>
                    <Link to="/about#leadership" onClick={() => setIsMobileMenuOpen(false)} className="block py-1.5 hover:text-[#0F5E5A] cursor-pointer">
                      Executive Leadership
                    </Link>
                    <Link to="/manufacturing" onClick={() => setIsMobileMenuOpen(false)} className="block py-1.5 hover:text-[#0F5E5A] cursor-pointer">
                      Manufacturing & Cleanrooms
                    </Link>
                    <Link to="/news" onClick={() => setIsMobileMenuOpen(false)} className="block py-1.5 hover:text-[#0F5E5A] cursor-pointer">
                      News & Media Releases
                    </Link>
                  </div>
                )}
              </div>

              {/* Products with Accordion */}
              <div>
                <div className="flex items-center justify-between py-2 border-b border-[#0E2A2B]/6">
                  <Link
                    to="/products"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="font-serif-editorial text-2xl font-bold text-[#0E2A2B] hover:text-[#0F5E5A] cursor-pointer"
                  >
                    {t.navProducts}
                  </Link>
                  <button
                    type="button"
                    onClick={() => setMobileExpandedSection(prev => prev === 'products' ? null : 'products')}
                    className="p-2 text-[#5B6B6C] cursor-pointer"
                    aria-label="Toggle Products Submenu"
                  >
                    <ChevronDown className={`w-5 h-5 transition-transform duration-200 ${mobileExpandedSection === 'products' ? 'rotate-180 text-[#0F5E5A]' : ''}`} />
                  </button>
                </div>
                {mobileExpandedSection === 'products' && (
                  <div className="pl-4 py-2 space-y-2 text-sm text-[#5B6B6C] animate-in fade-in slide-in-from-top-1">
                    <Link to="/products" onClick={() => setIsMobileMenuOpen(false)} className="block py-1.5 hover:text-[#0F5E5A] cursor-pointer">
                      All Formulations (180+)
                    </Link>
                    <Link to="/shop" onClick={() => setIsMobileMenuOpen(false)} className="block py-1.5 font-semibold text-[#0F5E5A] cursor-pointer">
                      Visit OTC Patient Store
                    </Link>
                    <Link to="/products?form=Tablet" onClick={() => setIsMobileMenuOpen(false)} className="block py-1.5 hover:text-[#0F5E5A] cursor-pointer">
                      Tablets & Capsules
                    </Link>
                    <Link to="/products?category=Gastrointestinal" onClick={() => setIsMobileMenuOpen(false)} className="block py-1.5 hover:text-[#0F5E5A] cursor-pointer">
                      Gastrointestinal Care
                    </Link>
                  </div>
                )}
              </div>

              <div className="py-2 border-b border-[#0E2A2B]/6">
                <Link
                  to="/manufacturing"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block font-serif-editorial text-2xl font-bold text-[#0E2A2B] hover:text-[#0F5E5A] cursor-pointer"
                >
                  {t.navQuality}
                </Link>
              </div>

              <div className="py-2 border-b border-[#0E2A2B]/6">
                <Link
                  to="/research"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block font-serif-editorial text-2xl font-bold text-[#0E2A2B] hover:text-[#0F5E5A] cursor-pointer"
                >
                  {t.navResearch}
                </Link>
              </div>

              <div className="py-2 border-b border-[#0E2A2B]/6">
                <Link
                  to="/careers"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block font-serif-editorial text-2xl font-bold text-[#0E2A2B] hover:text-[#0F5E5A] cursor-pointer"
                >
                  {t.navCareers}
                </Link>
              </div>

              <div className="py-2 border-b border-[#0E2A2B]/6">
                <Link
                  to="/contact"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block font-serif-editorial text-2xl font-bold text-[#0E2A2B] hover:text-[#0F5E5A] cursor-pointer"
                >
                  {t.navContact}
                </Link>
              </div>

              <div className="pt-2">
                <Link
                  to="/shop"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="inline-flex items-center justify-between w-full p-4 rounded-xl bg-[#0F5E5A] text-[#FAF8F4] font-bold text-base hover:bg-[#0A4542] transition-colors cursor-pointer shadow-md"
                >
                  <span className="flex items-center gap-2">
                    <Sparkles className="w-5 h-5" />
                    <span>{t.navShop} (Online Store)</span>
                  </span>
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </div>
            </nav>

            <div className="space-y-4 pt-6 border-t border-[#0E2A2B]/10">
              <div className="flex items-center justify-between text-sm">
                <span className="text-[#5B6B6C]">Language</span>
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => setLanguage('en')}
                    className={`px-3 py-1 rounded text-xs font-bold cursor-pointer ${
                      language === 'en' ? 'bg-[#0E2A2B] text-white' : 'bg-[#0E2A2B]/5 text-[#0E2A2B]'
                    }`}
                  >
                    English
                  </button>
                  <button
                    type="button"
                    onClick={() => setLanguage('ur')}
                    className={`px-3 py-1 rounded text-xs font-bold font-serif cursor-pointer ${
                      language === 'ur' ? 'bg-[#0E2A2B] text-white' : 'bg-[#0E2A2B]/5 text-[#0E2A2B]'
                    }`}
                  >
                    اردو
                  </button>
                </div>
              </div>

              <div className="text-xs text-[#5B6B6C] space-y-1">
                <p>Helpline: {siteConfig.contact.headOffice.phone}</p>
                <p>Email: {siteConfig.contact.email.general}</p>
                <p>DRAP Lic: {siteConfig.drapLicenseNumber}</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Instant Search Command Palette (Ctrl+K) */}
      <CommandPalette isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </>
  );
};
