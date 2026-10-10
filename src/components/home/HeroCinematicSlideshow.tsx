import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Play, Pause, ChevronRight, ChevronLeft } from 'lucide-react';
import { siteImages } from '../../content/images';

export interface SlideData {
  id: string;
  eyebrow: string;
  line1: string;
  line2Italic: string;
  subline: string;
  ctaText: string;
  ctaLink: string;
  imageSrc: string;
  imageAlt: string;
}

const slides: SlideData[] = [
  {
    id: 'heritage',
    eyebrow: '01 — Heritage & Roots',
    line1: 'Four Decades of',
    line2Italic: 'Uncompromised Purity',
    subline: 'Established in 1984 in Lahore, formulating certified pharmaceuticals trusted across 52+ Pakistani cities.',
    ctaText: 'Our Story',
    ctaLink: '/about',
    imageSrc: siteImages.heroLab.src,
    imageAlt: siteImages.heroLab.alt
  },
  {
    id: 'manufacturing',
    eyebrow: '02 — Quality & cGMP',
    line1: 'Cleanroom Precision &',
    line2Italic: 'Automated Excellence',
    subline: 'Formulated in Class 10,000 cleanroom environments with automated blister lines and continuous HPLC purity assays.',
    ctaText: 'Our Standards',
    ctaLink: '/manufacturing',
    imageSrc: siteImages.manufacturingFacility.src,
    imageAlt: siteImages.manufacturingFacility.alt
  },
  {
    id: 'research',
    eyebrow: '03 — Scientific R&D',
    line1: 'Advancing Health Through',
    line2Italic: 'Bioavailable Science',
    subline: 'Pioneering dissolution stability, pharmacokinetics, and clinical drug release trials for emerging healthcare needs.',
    ctaText: 'Explore R&D',
    ctaLink: '/research',
    imageSrc: siteImages.researchScience.src,
    imageAlt: siteImages.researchScience.alt
  },
  {
    id: 'otc-wellness',
    eyebrow: '04 — Patient Wellness',
    line1: 'Certified Over-The-Counter',
    line2Italic: 'Daily Vitality',
    subline: 'DRAP-approved bone health, analgesics, and essential vitamins dispatched direct to your door nationwide.',
    ctaText: 'Shop OTC',
    ctaLink: '/shop',
    imageSrc: siteImages.pharmacistConsultation.src,
    imageAlt: siteImages.pharmacistConsultation.alt
  },
  {
    id: 'distribution',
    eyebrow: '05 — Nationwide Reach',
    line1: 'Reliable Cold Chain',
    line2Italic: 'Across Pakistan',
    subline: 'Unbroken temperature-controlled pharmaceutical distribution connecting healthcare providers from Karachi to Peshawar.',
    ctaText: 'Find Us',
    ctaLink: '/contact',
    imageSrc: siteImages.distributionFleet.src,
    imageAlt: siteImages.distributionFleet.alt
  }
];

const SLIDE_DURATION = 6500; // 6.5s per slide

export const HeroCinematicSlideshow: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [previousSlide, setPreviousSlide] = useState<number | null>(null);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isPlaying, setIsPlaying] = useState(true);
  const [progress, setProgress] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [mouseParallax, setMouseParallax] = useState({ x: 0, y: 0 });
  const [scrollProgress, setScrollProgress] = useState(0);

  const containerRef = useRef<HTMLDivElement>(null);
  const animationFrameRef = useRef<number | null>(null);
  const slideStartTimeRef = useRef<number>(performance.now());
  const touchStartXRef = useRef<number | null>(null);
  const liveRegionRef = useRef<HTMLDivElement>(null);

  const nextSlideIndex = (currentSlide + 1) % slides.length;

  // Change slide with choreographed sequence
  const goToSlide = useCallback((targetIndex: number, manual: boolean = false) => {
    if (isTransitioning || targetIndex === currentSlide) return;

    if (manual && liveRegionRef.current) {
      liveRegionRef.current.textContent = `Slide ${targetIndex + 1} of ${slides.length}: ${slides[targetIndex].line1} ${slides[targetIndex].line2Italic}`;
    }

    setPreviousSlide(currentSlide);
    setCurrentSlide(targetIndex);
    setIsTransitioning(true);
    setProgress(0);
    slideStartTimeRef.current = performance.now();

    // 1.4s choreographed transition duration
    setTimeout(() => {
      setIsTransitioning(false);
      setPreviousSlide(null);
    }, 1400);
  }, [currentSlide, isTransitioning]);

  const handleNext = useCallback(() => {
    goToSlide((currentSlide + 1) % slides.length, true);
  }, [currentSlide, goToSlide]);

  const handlePrev = useCallback(() => {
    goToSlide((currentSlide - 1 + slides.length) % slides.length, true);
  }, [currentSlide, goToSlide]);

  // Autoplay loop with smooth 60fps progress update
  useEffect(() => {
    slideStartTimeRef.current = performance.now();

    const loop = (now: number) => {
      if (isPlaying && !isHovered && !isTransitioning) {
        const elapsed = now - slideStartTimeRef.current;
        const currentProgress = Math.min(1, elapsed / SLIDE_DURATION);
        setProgress(currentProgress);

        if (currentProgress >= 1) {
          handleNext();
          return;
        }
      }
      animationFrameRef.current = requestAnimationFrame(loop);
    };

    animationFrameRef.current = requestAnimationFrame(loop);

    return () => {
      if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
    };
  }, [isPlaying, isHovered, isTransitioning, handleNext, currentSlide]);

  // Pause when tab is hidden or element is out of viewport
  useEffect(() => {
    const handleVisibility = () => {
      if (document.hidden) {
        setIsPlaying(false);
      } else {
        setIsPlaying(true);
        slideStartTimeRef.current = performance.now();
      }
    };

    document.addEventListener('visibilitychange', handleVisibility);

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        slideStartTimeRef.current = performance.now();
      } else {
        setIsPlaying(false);
      }
    }, { threshold: 0.2 });

    if (containerRef.current) observer.observe(containerRef.current);

    return () => {
      document.removeEventListener('visibilitychange', handleVisibility);
      observer.disconnect();
    };
  }, []);

  // Keyboard navigation
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') {
        handleNext();
      } else if (e.key === 'ArrowLeft') {
        handlePrev();
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [handleNext, handlePrev]);

  // Mouse parallax on desktop
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced || window.innerWidth < 768) return;

    const { clientX, clientY, currentTarget } = e;
    const { width, height, left, top } = currentTarget.getBoundingClientRect();

    const normX = (clientX - left) / width - 0.5;
    const normY = (clientY - top) / height - 0.5;

    setMouseParallax({
      x: normX * 12, // image moves up to 12px
      y: normY * 12
    });
  };

  // Scroll down scale and corner rounding effect
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const heroHeight = window.innerHeight;
      const factor = Math.min(1, Math.max(0, scrollY / heroHeight));
      setScrollProgress(factor);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Touch and drag support
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartXRef.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartXRef.current === null) return;
    const diff = e.changedTouches[0].clientX - touchStartXRef.current;
    if (diff > 50) {
      handlePrev();
    } else if (diff < -50) {
      handleNext();
    }
    touchStartXRef.current = null;
  };

  const current = slides[currentSlide];
  const nextSlide = slides[nextSlideIndex];
  const prevSlide = previousSlide !== null ? slides[previousSlide] : null;

  return (
    <section
      ref={containerRef}
      role="region"
      aria-roledescription="carousel"
      aria-label="CKD Pharma Hero Showcase"
      className="relative w-full h-[100svh] min-h-[640px] max-h-[1100px] overflow-hidden bg-[#FAF8F4] select-none"
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        setMouseParallax({ x: 0, y: 0 });
      }}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      style={{
        transform: `scale(${1 - scrollProgress * 0.04}) translateY(${scrollProgress * 20}px)`,
        borderRadius: `${scrollProgress * 24}px`,
        transition: 'transform 0.1s ease-out, border-radius 0.1s ease-out'
      }}
      data-cursor="drag"
    >
      {/* Screen reader live announcement */}
      <div ref={liveRegionRef} className="sr-only" aria-live="polite" />

      {/* ─────────────────────────────────────────────────────────────
          1. FULL-BLEED PHOTOGRAPHY LAYERS WITH KEN BURNS & PARALLAX
      ────────────────────────────────────────────────────────────── */}
      <div className="absolute inset-0 w-full h-full overflow-hidden">
        {/* Outgoing previous image during transition (drifts left 6% and darkens) */}
        {prevSlide && isTransitioning && (
          <div
            className="absolute inset-0 w-full h-full transition-all duration-1400 ease-[cubic-bezier(0.76,0,0.24,1)] pointer-events-none"
            style={{
              transform: 'translateX(-6%) scale(1.02)',
              opacity: 0.35,
              filter: 'brightness(0.7)'
            }}
          >
            <img
              src={prevSlide.imageSrc}
              alt={prevSlide.imageAlt}
              className="w-full h-full object-cover"
            />
          </div>
        )}

        {/* Current Active Hero Image with subtle Ken Burns drift & mouse parallax */}
        <div
          className={`absolute inset-0 w-full h-full transition-transform duration-300 ease-out ${
            isTransitioning ? 'animate-in fade-in duration-700' : ''
          }`}
          style={{
            transform: `translate3d(${-mouseParallax.x}px, ${-mouseParallax.y}px, 0)`
          }}
        >
          <img
            src={current.imageSrc}
            alt={current.imageAlt}
            fetchPriority={currentSlide === 0 ? 'high' : 'auto'}
            className="w-full h-full object-cover transition-transform duration-6500 ease-linear scale-100 will-change-transform"
            style={{
              transform: isHovered ? 'scale(1.02)' : `scale(${1 + progress * 0.055})`
            }}
          />
        </div>

        {/* Signature Soft Ivory Atmospheric Gradient Fade (Ensures high readability on left) */}
        <div 
          className="absolute inset-0 pointer-events-none bg-gradient-to-r from-[#FAF8F4] via-[#FAF8F4]/85 md:via-[#FAF8F4]/70 to-transparent"
          aria-hidden="true" 
        />

        {/* Soft bottom vignette for control contrast */}
        <div 
          className="absolute inset-x-0 bottom-0 h-40 pointer-events-none bg-gradient-to-t from-[#FAF8F4]/90 via-[#FAF8F4]/40 to-transparent"
          aria-hidden="true" 
        />
      </div>

      {/* ─────────────────────────────────────────────────────────────
          2. ASYMMETRIC 12-COLUMN CONTENT & HEADLINE GRID
      ────────────────────────────────────────────────────────────── */}
      <div className="relative z-10 w-full h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col justify-end pb-12 sm:pb-16 pt-32">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">
          {/* Left Text Block (7 cols) with Masked Line Reveals */}
          <div
            className="lg:col-span-7 space-y-4"
            style={{
              transform: `translate3d(${mouseParallax.x * 0.35}px, ${mouseParallax.y * 0.35}px, 0)`,
              transition: 'transform 0.25s ease-out'
            }}
          >
            {/* Eyebrow Label with expanding horizontal line */}
            <div className="flex items-center gap-2.5 overflow-hidden">
              <span className="w-8 h-[2px] bg-[#0F5E5A] transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]" />
              <span
                key={`eyebrow-${currentSlide}`}
                className="text-xs font-bold tracking-widest uppercase text-[#0F5E5A] animate-in fade-in slide-in-from-bottom-2 duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]"
              >
                {current.eyebrow}
              </span>
            </div>

            {/* 2-Line Fraunces / Plus Jakarta Sans Headline with masked slide-up & italic word */}
            <div className="overflow-hidden py-1">
              {currentSlide === 0 ? (
                <h1
                  key={`headline-${currentSlide}`}
                  className="font-serif-editorial text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-normal text-[#0E2A2B] leading-[1.06] tracking-tight"
                >
                  <span className="block overflow-hidden">
                    <span className="block animate-in fade-in slide-in-from-bottom-6 duration-600 ease-[cubic-bezier(0.22,1,0.36,1)]">
                      {current.line1}
                    </span>
                  </span>
                  <span className="block overflow-hidden mt-1">
                    <span className="block animate-in fade-in slide-in-from-bottom-6 duration-700 delay-100 ease-[cubic-bezier(0.22,1,0.36,1)] font-serif italic text-[#0E2A2B]">
                      {current.line2Italic}
                    </span>
                  </span>
                </h1>
              ) : (
                <h2
                  key={`headline-${currentSlide}`}
                  className="font-serif-editorial text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-normal text-[#0E2A2B] leading-[1.06] tracking-tight"
                >
                  <span className="block overflow-hidden">
                    <span className="block animate-in fade-in slide-in-from-bottom-6 duration-600 ease-[cubic-bezier(0.22,1,0.36,1)]">
                      {current.line1}
                    </span>
                  </span>
                  <span className="block overflow-hidden mt-1">
                    <span className="block animate-in fade-in slide-in-from-bottom-6 duration-700 delay-100 ease-[cubic-bezier(0.22,1,0.36,1)] font-serif italic text-[#0E2A2B]">
                      {current.line2Italic}
                    </span>
                  </span>
                </h2>
              )}
            </div>

            {/* One-sentence Sub-line */}
            <p
              key={`subline-${currentSlide}`}
              className="text-sm sm:text-base text-[#5B6B6C] max-w-xl leading-relaxed animate-in fade-in slide-in-from-bottom-2 duration-500 delay-150 ease-[cubic-bezier(0.22,1,0.36,1)]"
            >
              {current.subline}
            </p>

            {/* Slide Primary CTA */}
            <div className="pt-2">
              <Link
                to={current.ctaLink}
                className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-lg bg-[#0F5E5A] text-[#FAF8F4] text-xs font-bold hover:bg-[#0A4542] btn-action-transition btn-shimmer cursor-pointer shadow-md group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0F5E5A]"
              >
                <span>{current.ctaText}</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]" strokeWidth={2} />
              </Link>
            </div>
          </div>

          {/* Right Controls Block (5 cols) with Thumbnail Preview & Progress Lines */}
          <div className="lg:col-span-5 flex flex-col items-start lg:items-end space-y-6">
            {/* Signature Next-Slide Preview Card (Expands smoothly on slide switch) */}
            <div
              onClick={handleNext}
              className="group relative cursor-pointer rounded-xl overflow-hidden border border-[#0E2A2B]/12 bg-white/90 backdrop-blur-md p-2 shadow-lg transition-all duration-300 hover:scale-102 hover:border-[#0F5E5A]/40 flex items-center gap-3 w-full sm:w-auto max-w-xs"
              data-cursor="next"
              title="Jump to next slide"
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  handleNext();
                }
              }}
            >
              {/* Framed Next Image Thumbnail with Zoom */}
              <div className="relative w-16 h-12 rounded-lg overflow-hidden shrink-0 bg-[#0E2A2B]/10">
                <img
                  src={nextSlide.imageSrc}
                  alt={nextSlide.imageAlt}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-115"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-[#0E2A2B]/15 group-hover:bg-transparent transition-colors" />
              </div>

              {/* Next Slide Meta */}
              <div className="flex-1 pr-1 text-left">
                <span className="text-[10px] font-bold tracking-wider uppercase text-[#0F5E5A] block">
                  Up Next · 0{nextSlideIndex + 1}
                </span>
                <span className="text-xs font-bold text-[#0E2A2B] line-clamp-1 block">
                  {nextSlide.line1}
                </span>
              </div>

              <div className="w-7 h-7 rounded-full bg-[#0E2A2B]/6 flex items-center justify-center text-[#0E2A2B] group-hover:bg-[#0F5E5A] group-hover:text-white transition-colors">
                <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </div>
            </div>

            {/* Slide Counter & Play/Pause Controls */}
            <div className="flex items-center gap-6 w-full lg:w-auto justify-between lg:justify-end">
              {/* Rolling Vertical Slide Counter "01 / 05" in Tabular Figures */}
              <div className="flex items-center gap-1.5 font-mono text-sm font-bold text-[#0E2A2B] tabular-nums">
                <div className="relative h-6 overflow-hidden w-6 text-center">
                  <span
                    key={`counter-${currentSlide}`}
                    className="block animate-in fade-in slide-in-from-bottom-2 duration-300 font-bold"
                  >
                    0{currentSlide + 1}
                  </span>
                </div>
                <span className="text-[#0E2A2B]/30 font-normal">/</span>
                <span className="text-[#5B6B6C]">0{slides.length}</span>
              </div>

              {/* Prev / Next & Pause Buttons */}
              <div className="flex items-center gap-1.5">
                <button
                  type="button"
                  onClick={handlePrev}
                  className="p-2 rounded-lg text-[#0E2A2B] hover:bg-[#0E2A2B]/8 transition-colors cursor-pointer"
                  aria-label="Previous slide"
                >
                  <ChevronLeft className="w-4 h-4" strokeWidth={2} />
                </button>

                <button
                  type="button"
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="p-2 rounded-lg text-[#0E2A2B] hover:bg-[#0E2A2B]/8 transition-colors cursor-pointer"
                  aria-label={isPlaying ? 'Pause slideshow' : 'Play slideshow'}
                >
                  {isPlaying ? (
                    <Pause className="w-4 h-4 text-[#0F5E5A]" strokeWidth={2} />
                  ) : (
                    <Play className="w-4 h-4 text-[#0F5E5A]" strokeWidth={2} />
                  )}
                </button>

                <button
                  type="button"
                  onClick={handleNext}
                  className="p-2 rounded-lg text-[#0E2A2B] hover:bg-[#0E2A2B]/8 transition-colors cursor-pointer"
                  aria-label="Next slide"
                >
                  <ChevronRight className="w-4 h-4" strokeWidth={2} />
                </button>
              </div>
            </div>

            {/* Five Thin Progress Lines (fill as each slide's time runs; click to jump) */}
            <div className="flex items-center gap-2 w-full max-w-sm">
              {slides.map((slide, idx) => {
                const isActive = idx === currentSlide;
                const isPast = idx < currentSlide;

                return (
                  <button
                    key={slide.id}
                    type="button"
                    onClick={() => goToSlide(idx, true)}
                    className="flex-1 h-1 bg-[#0E2A2B]/10 hover:bg-[#0E2A2B]/20 rounded-full overflow-hidden transition-all duration-200 cursor-pointer p-0 group"
                    aria-label={`Jump to slide ${idx + 1}: ${slide.eyebrow}`}
                  >
                    <div
                      className={`h-full rounded-full transition-all ease-linear ${
                        isActive
                          ? 'bg-[#0F5E5A]'
                          : isPast
                          ? 'bg-[#0E2A2B]/40'
                          : 'bg-transparent'
                      }`}
                      style={{
                        width: isActive ? `${progress * 100}%` : isPast ? '100%' : '0%'
                      }}
                    />
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
