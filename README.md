# CKD Pharma Pakistan — Corporate Portal & OTC eCommerce Store

A bespoke, high-trust pharmaceutical website and direct-to-patient Over-The-Counter (OTC) eCommerce store for **CKD Pharmaceuticals (Pvt.) Limited** (Lahore, Pakistan).

Designed under the **"Clinical Calm"** editorial aesthetic: warm ivory base, atmospheric mist-and-sage washes, subtle film-grain texture, typography pairing *Instrument Serif* with *Manrope*, tabular figures, zero-pill metadata discipline, and strict DRAP (Drug Regulatory Authority of Pakistan) compliance.

---

## 1. Features Overview

### Corporate Portal
- **Hero & Trust Strip:** 40+ Years of Expertise, Global Standards, Research Driven, and 100% DRAP cGMP conformance.
- **Divisions:** Pharma (Finished Dosages), APIs (Active Ingredients), Diagnose (Clinical Reagents), and Temperature-Monitored Distribution.
- **Why Choose Us:** Stringent quality control at every stage, globally recognized certifications, and science-driven approach with advanced R&D.
- **Interactive Heritage Timeline (1984–2026):** Inception, analytical laboratory expansion, Class 10,000 cleanroom commissioning, and BonAid-D release.
- **Manufacturing & Cleanrooms:** Class 10,000 HVAC cascade air differentials, USP-grade purified water loops, and German blister packing automation.
- **R&D & Bioavailability:** In vitro USP dissolution profiling, ICH Zone IVb stability chambers, and formulation trials.
- **Careers:** Current vacancies in Lahore and Karachi with functional CV submission modal.
- **Corporate Media & Bulletins:** Official regulatory and clinical articles with full-text reader and social sharing.
- **Contact & Regional Offices:** Head Office in Lahore, Karachi Distribution Hub, Islamabad Liaison Office, and interactive Google Map embed.

### eCommerce Store (`/shop`)
- **Direct OTC Patient Store:** Sells over-the-counter wellness, bone health, pain relief, and digestive essentials.
- **Prescription Compliance (DRAP Rule):** Products marked *Rx Only* (such as Omeprazole or Aceclofenac) display clinical monographs but strictly hide purchase buttons with regulatory warnings.
- **Pakistani Currency & Pricing:** All prices in PKR (e.g., `Rs. 850`).
- **Free Delivery Threshold:** Free shipping on orders above `Rs. 2,000` (configurable in `src/lib/cart-store.ts`).
- **Multi-Step Pakistani Checkout:**
  - Phone validated for Pakistani mobile networks (`03XX-XXXXXXX`).
  - Province & city dropdowns covering all Pakistani territories (Punjab, Sindh, KPK, Balochistan, Islamabad, AJK, GB).
  - Cash on Delivery (COD) as default nationwide payment method.
  - Adapter architecture for JazzCash, Easypaisa, and Credit/Debit Cards (`src/lib/payments/`).
- **Order Tracking:** Real-time tracking by Order ID (`CKD-XXXXX`) and phone number.

### Advanced SEO & Accessibility
- **Metadata:** Unique title, meta descriptions, canonical URLs, OpenGraph, and Twitter Cards on every route via `<SEO />`.
- **JSON-LD Structured Data:** Organization, WebSite with SearchAction, BreadcrumbList, Product with Offer (PKR), Article, FAQPage, and LocalBusiness.
- **301 Redirects:** Legacy URL preservation in `vercel.json` (`/inside-ckd` → `/manufacturing`, `/news-events` → `/news`, `/contact-us` → `/contact`, etc.).
- **Urdu Language Toggle (`ur-PK`):** Real-time language switch with RTL layout support.
- **Search Command Palette:** `Ctrl/Cmd + K` instant search across formulations and corporate pages.

---

## 2. Local Development Setup

### Prerequisites
- Node.js 18+ or 20+
- npm or pnpm

### Installation
```bash
# 1. Clone repository
git clone https://github.com/your-org/ckd-pharma.git
cd ckd-pharma

# 2. Install dependencies
npm install

# 3. Start local development server (runs on port 3000)
npm run dev
```

Visit `http://localhost:3000` in your browser.

---

## 3. How to Edit Content & Images

### A. Editing Company Information, Addresses & Phone Numbers
All institutional facts are centralized in **`src/content/site.ts`**:
- Edit `siteConfig.contact.headOffice` to update the Kot Lakhpat address or phone.
- Edit `siteConfig.announcements` to change top navigation ticker messages.
- Edit `siteConfig.milestones` or `siteConfig.leadership` to update history or executive bios.

### B. Image Manifest (`src/content/images.ts`)
All photos across the site are managed in **`src/content/images.ts`**. To swap any photography slot with your own facility or product shots:
```typescript
export const siteImages = {
  heroLab: {
    src: "https://your-cdn.com/your-cleanroom-photo.jpg",
    alt: "CKD Pharma Lahore Cleanroom",
    ...
  }
};
```

---

## 4. How to Add New Products

Open **`src/content/products.ts`** and add an entry conforming to the `Product` TypeScript interface:

```typescript
{
  id: 'new-product-id',
  slug: 'new-product-slug',
  name: 'Product Commercial Name',
  genericName: 'Active Chemical Generic Compound',
  category: 'Musculoskeletal & Bone Health', // or Gastrointestinal, etc.
  concern: ['Bone & Joint Health'],
  dosageForm: 'Tablet', // Tablet, Capsule, Syrup, Suspension, etc.
  strength: '500 mg',
  packSize: 'Box of 30 Tablets',
  price: 650, // Price in PKR
  compareAtPrice: 750,
  isOTC: true, // Set to true for OTC shop products; false for Rx
  requiresPrescription: false,
  inStock: true,
  images: ['https://your-image-url.jpg'],
  description: 'Detailed clinical indication description...',
  directions: 'Adult dosage directions...',
  warnings: ['Clinical contraindications...'],
  ingredients: [{ name: 'Active Compound', amount: '500 mg' }],
  drapRegistrationNumber: '098124-NUT-PK'
}
```

*Note:* Setting `isOTC: false` automatically disables the "Add to Cart" button and displays the DRAP prescription warning banner.

---

## 5. Connecting Real Payment Gateways (JazzCash & Easypaisa)

Payment processors are isolated inside **`src/lib/payments/index.ts`**.

### A. Connecting JazzCash
1. Register as a merchant on [JazzCash Merchant Portal](https://sandbox.jazzcash.com.pk/).
2. Obtain your `Merchant ID`, `Password`, and `Integrity Salt`.
3. In `src/lib/payments/index.ts`, replace the mock implementation in `jazzCashAdapter.processPayment`:
   - Compute HMAC-SHA256 signature using the salt and parameters.
   - Post to JazzCash Hosted Checkout or API endpoint.

### B. Connecting Easypaisa
1. Register for an Easypaisa Merchant Account via Telenor Microfinance Bank.
2. In `src/lib/payments/index.ts`, update `easyPaisaAdapter.processPayment`:
   - Generate order token with Store ID and hash key.
   - Redirect to Easypaisa checkout page or trigger direct mobile wallet debit API.

---

## 6. Vercel Deployment Instructions

The project includes a production-ready `vercel.json` configured with clean URLs, asset caching headers, security policies, and 301 redirects.

### Step 1: Push Code to GitHub / GitLab
```bash
git add .
git commit -m "CKD Pharma corporate portal and OTC store"
git push origin main
```

### Step 2: Deploy to Vercel
1. Log in to [Vercel](https://vercel.com).
2. Click **Add New Project** and select your repository.
3. Configure project settings:
   - **Framework Preset:** Vite
   - **Build Command:** `npm run build`
   - **Output Directory:** `dist`
4. Click **Deploy**.

### Step 3: Domain Configuration
Under **Settings → Domains** in Vercel, attach `ckdpharma.com` and `www.ckdpharma.com`.
The store routes under `/shop` will seamlessly function without requiring a separate codebase.
