import React, { createContext, useContext, useState, useEffect } from 'react';

export type Language = 'en' | 'ur';

export interface Translations {
  tagline: string;
  subheading: string;
  navAbout: string;
  navProducts: string;
  navQuality: string;
  navResearch: string;
  navCareers: string;
  navContact: string;
  navShop: string;
  exploreProducts: string;
  contactUs: string;
  visitStore: string;
  trackOrder: string;
  cart: string;
  searchPlaceholder: string;
  ourDivisions: string;
  whatWeOffer: string;
  whyChooseUs: string;
  qualityTitle: string;
  viewAll: string;
  freeDeliveryNote: string;
  otcNotice: string;
  drapCertified: string;
  addToCart: string;
  viewDetails: string;
  prescriptionRequired: string;
  rxNotice: string;
  priceRs: string;
  checkout: string;
  subtotal: string;
  deliveryFee: string;
  total: string;
  cashOnDelivery: string;
  yearsOfExpertise: string;
  globalStandards: string;
  researchDriven: string;
  rightsReserved: string;
  medicalDisclaimer: string;
}

const translationsEn: Translations = {
  tagline: 'Advancing Healthcare With Trust & Innovation',
  subheading: 'Delivering high-quality pharmaceutical solutions backed by global safety and efficacy standards.',
  navAbout: 'About',
  navProducts: 'Products',
  navQuality: 'Quality & Facility',
  navResearch: 'R&D',
  navCareers: 'Careers',
  navContact: 'Contact',
  navShop: 'Shop OTC',
  exploreProducts: 'Explore Products',
  contactUs: 'Contact Us',
  visitStore: 'Visit OTC Store',
  trackOrder: 'Track Order',
  cart: 'Bag',
  searchPlaceholder: 'Search medicines, generic ingredients, or therapeutic areas (Ctrl+K)...',
  ourDivisions: 'OUR DIVISIONS',
  whatWeOffer: 'What We Offer',
  whyChooseUs: 'WHY CHOOSE US',
  qualityTitle: 'Quality You Can Rely On',
  viewAll: 'View All Formulations',
  freeDeliveryNote: 'Free nationwide delivery on orders above Rs. 2,000',
  otcNotice: 'DRAP-Approved Over-the-Counter Healthcare Essentials',
  drapCertified: 'DRAP Licensed & cGMP Certified',
  addToCart: 'Add to Bag',
  viewDetails: 'Product Details',
  prescriptionRequired: 'Prescription Required (Rx)',
  rxNotice: 'This formulation requires a valid prescription and is available only through licensed pharmacies.',
  priceRs: 'Rs.',
  checkout: 'Proceed to Checkout',
  subtotal: 'Subtotal',
  deliveryFee: 'Delivery Fee',
  total: 'Grand Total',
  cashOnDelivery: 'Cash on Delivery (COD)',
  yearsOfExpertise: '40+ Years of Expertise',
  globalStandards: 'Global Standards',
  researchDriven: 'Research Driven',
  rightsReserved: 'All rights reserved.',
  medicalDisclaimer: 'Medical Disclaimer: Information on this portal is provided for informational and clinical awareness purposes only and does not substitute professional medical advice.'
};

const translationsUr: Translations = {
  tagline: 'اعتماد اور جدت کے ساتھ صحت کی دیکھ بھال میں پیش پیش',
  subheading: 'عالمی معیار اور حفاظت کے مطابق اعلیٰ معیار کے فارماسیوٹیکل سلوشنز کی فراہمی۔',
  navAbout: 'ہمارے متعلق',
  navProducts: 'ادویات',
  navQuality: 'معیار اور پلانٹ',
  navResearch: 'تحقیق و ترقی',
  navCareers: 'ملازمت کے مواقع',
  navContact: 'رابطہ',
  navShop: 'آن لائن او ٹی سی شاپ',
  exploreProducts: 'ادویات دریافت کریں',
  contactUs: 'رابطہ کریں',
  visitStore: 'او ٹی سی اسٹور وزٹ کریں',
  trackOrder: 'آرڈر ٹریک کریں',
  cart: 'بیگ',
  searchPlaceholder: 'ادویات، فارمولیشن یا بیماری تلاش کریں...',
  ourDivisions: 'ہمارے شعبہ جات',
  whatWeOffer: 'ہماری خدمات',
  whyChooseUs: 'ہمیں کیوں منتخب کریں',
  qualityTitle: 'معیار جس پر آپ کا بھروسا ہے',
  viewAll: 'تمام مصنوعات دیکھیں',
  freeDeliveryNote: '2,000 روپے سے زائد کے آرڈرز پر مفت ملک گیر ڈیلیوری',
  otcNotice: 'ڈریپ (DRAP) سے منظور شدہ اوور دی کاؤنٹر ادویات',
  drapCertified: 'ڈریپ لائسنس یافتہ اور جی ایم پی سرٹیفائیڈ',
  addToCart: 'بیگ میں شامل کریں',
  viewDetails: 'تفصیلات دیکھیں',
  prescriptionRequired: 'ڈاکٹر کا نسخہ لازمی ہے',
  rxNotice: 'یہ دوا صرف مستند ڈاکٹر کے نسخے پر مجاز میڈیکل اسٹورز سے دستیاب ہے۔',
  priceRs: 'روپے',
  checkout: 'چیک آؤٹ مکمل کریں',
  subtotal: 'ذیلی کل',
  deliveryFee: 'ڈیلیوری فیس',
  total: 'کل رقم',
  cashOnDelivery: 'کیش آن ڈیلیوری',
  yearsOfExpertise: '40+ سالہ تجربہ',
  globalStandards: 'عالمی معیارات',
  researchDriven: 'سائنسی تحقیق پر مبنی',
  rightsReserved: 'جملہ حقوق محفوظ ہیں۔',
  medicalDisclaimer: 'طبی انتباہ: یہ معلومات صرف تعلیمی اور آگاہی مقاصد کے لیے ہیں اور کسی مستند ڈاکٹر کے مشورے کا نعم البدل نہیں ہیں۔'
};

interface I18nContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: Translations;
  isRTL: boolean;
}

const I18nContext = createContext<I18nContextType>({
  language: 'en',
  setLanguage: () => {},
  t: translationsEn,
  isRTL: false
});

export const I18nProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('ckd_lang');
      if (saved === 'ur' || saved === 'en') return saved;
    }
    return 'en';
  });

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    if (typeof window !== 'undefined') {
      localStorage.setItem('ckd_lang', lang);
      document.documentElement.lang = lang === 'ur' ? 'ur-PK' : 'en-PK';
      document.documentElement.dir = lang === 'ur' ? 'rtl' : 'ltr';
    }
  };

  useEffect(() => {
    document.documentElement.lang = language === 'ur' ? 'ur-PK' : 'en-PK';
    document.documentElement.dir = language === 'ur' ? 'rtl' : 'ltr';
  }, [language]);

  const value = {
    language,
    setLanguage,
    t: language === 'ur' ? translationsUr : translationsEn,
    isRTL: language === 'ur'
  };

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
};

export const useI18n = () => useContext(I18nContext);
