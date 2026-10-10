import React, { useEffect } from 'react';

export interface BreadcrumbItem {
  name: string;
  url: string;
}

export interface FAQItem {
  question: string;
  answer: string;
}

export interface SEOProps {
  title: string;
  description: string;
  canonicalPath?: string;
  ogType?: 'website' | 'article' | 'product';
  ogImage?: string;
  breadcrumbs?: BreadcrumbItem[];
  jsonLd?: Record<string, unknown> | Record<string, unknown>[];
  articleData?: {
    publishedTime: string;
    author: string;
    section: string;
  };
  productData?: {
    name: string;
    image: string;
    description: string;
    sku: string;
    price: number;
    priceCurrency?: string;
    availability: 'https://schema.org/InStock' | 'https://schema.org/OutOfStock';
    brand?: string;
  };
  faqItems?: FAQItem[];
}

const BASE_URL = 'https://ckdpharma.com';

export const SEO: React.FC<SEOProps> = ({
  title,
  description,
  canonicalPath = '',
  ogType = 'website',
  ogImage = 'https://images.unsplash.com/photo-1582719471384-894fbb16e074?auto=format&fit=crop&w=1200&q=80',
  breadcrumbs,
  jsonLd,
  articleData,
  productData,
  faqItems
}) => {
  const fullTitle = title.includes('CKD Pharma') ? title : `${title} | CKD Pharma Pakistan`;
  const canonicalUrl = `${BASE_URL}${canonicalPath.startsWith('/') ? canonicalPath : `/${canonicalPath}`}`;

  useEffect(() => {
    // 1. Update Document Title
    document.title = fullTitle;

    // Helper to update or create meta tags
    const setMetaTag = (attr: string, key: string, content: string) => {
      let element = document.querySelector(`meta[${attr}="${key}"]`) as HTMLMetaElement;
      if (!element) {
        element = document.createElement('meta');
        element.setAttribute(attr, key);
        document.head.appendChild(element);
      }
      element.setAttribute('content', content);
    };

    // Helper for canonical link
    let canonicalLink = document.querySelector('link[rel="canonical"]') as HTMLLinkElement;
    if (!canonicalLink) {
      canonicalLink = document.createElement('link');
      canonicalLink.setAttribute('rel', 'canonical');
      document.head.appendChild(canonicalLink);
    }
    canonicalLink.setAttribute('href', canonicalUrl);

    // Standard Meta
    setMetaTag('name', 'description', description);
    setMetaTag('name', 'robots', 'index, follow, max-image-preview:large');

    // OpenGraph
    setMetaTag('property', 'og:title', fullTitle);
    setMetaTag('property', 'og:description', description);
    setMetaTag('property', 'og:url', canonicalUrl);
    setMetaTag('property', 'og:type', ogType);
    setMetaTag('property', 'og:image', ogImage);
    setMetaTag('property', 'og:site_name', 'CKD Pharma Pakistan');
    setMetaTag('property', 'og:locale', 'en_PK');

    // Twitter Card
    setMetaTag('name', 'twitter:card', 'summary_large_image');
    setMetaTag('name', 'twitter:title', fullTitle);
    setMetaTag('name', 'twitter:description', description);
    setMetaTag('name', 'twitter:image', ogImage);

    // Dynamic JSON-LD injection
    const jsonLdScripts: HTMLScriptElement[] = [];

    // Base Organization & WebSite Schemas
    const schemas: Record<string, unknown>[] = [
      {
        '@context': 'https://schema.org',
        '@type': 'Organization',
        'name': 'CKD Pharmaceuticals (Pvt.) Limited',
        'alternateName': 'CKD Pharma Pakistan',
        'url': BASE_URL,
        'logo': `${BASE_URL}/logo.svg`,
        'foundingDate': '1984',
        'description': 'Leading pharmaceutical manufacturer in Pakistan providing cGMP-certified finished dosages, APIs, diagnostics, and OTC medicines.',
        'address': {
          '@type': 'PostalAddress',
          'streetAddress': 'Plot 42-B, Industrial Estate, Kot Lakhpat',
          'addressLocality': 'Lahore',
          'addressRegion': 'Punjab',
          'postalCode': '54770',
          'addressCountry': 'PK'
        },
        'contactPoint': {
          '@type': 'ContactPoint',
          'telephone': '+92-42-35789120',
          'contactType': 'customer service',
          'areaServed': 'PK',
          'availableLanguage': ['English', 'Urdu']
        }
      },
      {
        '@context': 'https://schema.org',
        '@type': 'WebSite',
        'name': 'CKD Pharma Pakistan',
        'url': BASE_URL,
        'potentialAction': {
          '@type': 'SearchAction',
          'target': `${BASE_URL}/shop/catalog?search={search_term_string}`,
          'query-input': 'required name=search_term_string'
        }
      }
    ];

    // Breadcrumbs Schema
    if (breadcrumbs && breadcrumbs.length > 0) {
      schemas.push({
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        'itemListElement': breadcrumbs.map((crumb, index) => ({
          '@type': 'ListItem',
          'position': index + 1,
          'name': crumb.name,
          'item': crumb.url.startsWith('http') ? crumb.url : `${BASE_URL}${crumb.url}`
        }))
      });
    }

    // Product Schema
    if (productData) {
      schemas.push({
        '@context': 'https://schema.org',
        '@type': 'Product',
        'name': productData.name,
        'image': [productData.image],
        'description': productData.description,
        'sku': productData.sku,
        'brand': {
          '@type': 'Brand',
          'name': productData.brand || 'CKD Pharma'
        },
        'offers': {
          '@type': 'Offer',
          'url': canonicalUrl,
          'priceCurrency': productData.priceCurrency || 'PKR',
          'price': productData.price,
          'priceValidUntil': '2027-12-31',
          'itemCondition': 'https://schema.org/NewCondition',
          'availability': productData.availability,
          'seller': {
            '@type': 'Organization',
            'name': 'CKD Pharma Pakistan'
          }
        }
      });
    }

    // FAQ Schema
    if (faqItems && faqItems.length > 0) {
      schemas.push({
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        'mainEntity': faqItems.map(faq => ({
          '@type': 'Question',
          'name': faq.question,
          'acceptedAnswer': {
            '@type': 'Answer',
            'text': faq.answer
          }
        }))
      });
    }

    // Custom provided schemas
    if (jsonLd) {
      if (Array.isArray(jsonLd)) {
        schemas.push(...jsonLd);
      } else {
        schemas.push(jsonLd);
      }
    }

    // Clean existing custom schema scripts
    document.querySelectorAll('script[data-seo-jsonld]').forEach(el => el.remove());

    // Inject scripts
    schemas.forEach((schema, idx) => {
      const script = document.createElement('script');
      script.type = 'application/ld+json';
      script.setAttribute('data-seo-jsonld', `schema-${idx}`);
      script.text = JSON.stringify(schema);
      document.head.appendChild(script);
      jsonLdScripts.push(script);
    });

    return () => {
      jsonLdScripts.forEach(el => el.remove());
    };
  }, [fullTitle, description, canonicalUrl, ogType, ogImage, breadcrumbs, jsonLd, articleData, productData, faqItems]);

  return null;
};
