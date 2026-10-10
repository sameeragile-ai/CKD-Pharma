import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { I18nProvider } from './lib/i18n';
import { initSmoothScroll, destroySmoothScroll } from './lib/smooth-scroll';
import { Header } from './components/layout/Header';
import { Footer } from './components/layout/Footer';
import { CartDrawer } from './components/layout/CartDrawer';
import { WhatsAppFloat } from './components/layout/WhatsAppFloat';
import { IntroPreloader } from './components/motion/IntroPreloader';
import { PageTransitionCurtain } from './components/motion/PageTransitionCurtain';

// Pages
import { HomePage } from './pages/HomePage';
import { AboutPage } from './pages/AboutPage';
import { ProductsPage } from './pages/ProductsPage';
import { ProductDetailPage } from './pages/ProductDetailPage';
import { ManufacturingPage } from './pages/ManufacturingPage';
import { ResearchPage } from './pages/ResearchPage';
import { CareersPage } from './pages/CareersPage';
import { NewsPage } from './pages/NewsPage';
import { ContactPage } from './pages/ContactPage';
import { LegalPage } from './pages/LegalPage';

// eCommerce Store Routes
import { ShopHomePage } from './pages/shop/ShopHomePage';
import { ShopCatalogPage } from './pages/shop/ShopCatalogPage';
import { CartPage } from './pages/shop/CartPage';
import { CheckoutPage } from './pages/shop/CheckoutPage';
import { OrderConfirmationPage } from './pages/shop/OrderConfirmationPage';
import { TrackOrderPage } from './pages/shop/TrackOrderPage';
import { NotFoundPage } from './pages/NotFoundPage';

// Scroll to top helper on route navigation
const ScrollToTop: React.FC = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

// Route Transition Wrapper providing smooth cubic-bezier entrance animation
const RouteTransitionWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const location = useLocation();

  return (
    <div key={location.pathname} className="page-transition-enter flex-1 flex flex-col">
      {children}
    </div>
  );
};

export default function App() {
  // Initialize Lenis smooth scroll on mount
  useEffect(() => {
    initSmoothScroll();
    return () => {
      destroySmoothScroll();
    };
  }, []);

  return (
    <I18nProvider>
      <Router>
        <ScrollToTop />

        {/* First Visit Session Intro Preloader */}
        <IntroPreloader />

        {/* Layered Teal & Ivory Curtain Page Transition */}
        <PageTransitionCurtain />

        <div className="flex flex-col min-h-screen bg-[#FAF8F4] text-[#0E2A2B]">
          {/* Top Bar with utility strip & mega menus */}
          <Header />

          {/* Main Route Content with smooth transition */}
          <main className="flex-1 flex flex-col">
            <RouteTransitionWrapper>
              <Routes>
                {/* Corporate Pages */}
                <Route path="/" element={<HomePage />} />
                <Route path="/about" element={<AboutPage />} />
                <Route path="/about-us" element={<AboutPage />} />
                <Route path="/products" element={<ProductsPage />} />
                <Route path="/products/:slug" element={<ProductDetailPage />} />
                <Route path="/manufacturing" element={<ManufacturingPage />} />
                <Route path="/inside-ckd" element={<ManufacturingPage />} />
                <Route path="/research" element={<ResearchPage />} />
                <Route path="/careers" element={<CareersPage />} />
                <Route path="/career" element={<CareersPage />} />
                <Route path="/news" element={<NewsPage />} />
                <Route path="/news-events" element={<NewsPage />} />
                <Route path="/contact" element={<ContactPage />} />
                <Route path="/contact-us" element={<ContactPage />} />
                <Route path="/legal" element={<LegalPage />} />

                {/* OTC Storefront Routes (/shop) */}
                <Route path="/shop" element={<ShopHomePage />} />
                <Route path="/shop/catalog" element={<ShopCatalogPage />} />
                <Route path="/shop/product/:slug" element={<ProductDetailPage />} />
                <Route path="/cart" element={<CartPage />} />
                <Route path="/checkout" element={<CheckoutPage />} />
                <Route path="/order-confirmation/:id" element={<OrderConfirmationPage />} />
                <Route path="/track-order" element={<TrackOrderPage />} />

                {/* 404 Fallback */}
                <Route path="*" element={<NotFoundPage />} />
              </Routes>
            </RouteTransitionWrapper>
          </main>

          {/* Editorial Footer */}
          <Footer />

          {/* Slide-out Cart Drawer */}
          <CartDrawer />

          {/* Floating WhatsApp Pharmacist Advisory Button */}
          <WhatsAppFloat />
        </div>
      </Router>
    </I18nProvider>
  );
}
