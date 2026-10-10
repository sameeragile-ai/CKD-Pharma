import { Certification, LeadershipMember, Milestone } from '../types';

export const siteConfig = {
  name: 'CKD Pharma',
  legalName: 'CKD Pharmaceuticals (Pvt.) Limited',
  tagline: 'Advancing Healthcare With Trust & Innovation',
  subheading: 'Delivering high-quality pharmaceutical solutions backed by global safety and efficacy standards.',
  brandMotto: 'Better Life with Better Medicine — C.K.D.',
  foundingYear: 1984,
  yearsOfExpertise: '40+',
  drapLicenseNumber: 'DRAP-MFG-004128/PK',
  stats: [
    { label: 'Years of Expertise', value: 40, suffix: '+', note: 'Founded in 1984' },
    { label: 'Registered Formulations', value: 180, suffix: '+', note: 'Across 8 therapeutic areas' },
    { label: 'Cities Reached', value: 52, suffix: '+', note: 'Nationwide cold chain network' },
    { label: 'DRAP & cGMP Compliance', value: 100, suffix: '%', note: 'Audited & certified' }
  ],
  announcements: [
    'Free nationwide home delivery on orders above Rs. 2,000',
    'Cash on Delivery (COD) available across 50+ Pakistani cities',
    '100% DRAP-approved, batch-tested Over-The-Counter healthcare products',
    'Dedicated Pharmacist advisory support: 0800-CKD-CARE (Toll Free)'
  ],
  contact: {
    headOffice: {
      title: 'Head Office & Manufacturing Facility',
      address: 'Plot 42-B, Industrial Estate, Kot Lakhpat',
      city: 'Lahore',
      province: 'Punjab',
      postalCode: '54770',
      country: 'Pakistan',
      phone: '+92 (0)42 3578 9120',
      fax: '+92 (0)42 3578 9125',
      coordinates: { lat: 31.4485, lng: 74.3328 }
    },
    karachiHub: {
      title: 'Karachi Distribution Hub',
      address: 'Suite 408, Business Avenue, PECHS Block 6, Shahrah-e-Faisal',
      city: 'Karachi',
      province: 'Sindh',
      postalCode: '75400',
      country: 'Pakistan',
      phone: '+92 (0)21 3438 8810'
    },
    islamabadOffice: {
      title: 'Islamabad Liaison Office',
      address: 'Executive Center, Sector I-9/2, Industrial Triangle',
      city: 'Islamabad',
      province: 'Federal Capital',
      postalCode: '44000',
      country: 'Pakistan',
      phone: '+92 (0)51 4441 290'
    },
    email: {
      general: 'info@ckdpharma.com',
      orders: 'orders@ckdpharma.com',
      regulatory: 'regulatory@ckdpharma.com',
      careers: 'careers@ckdpharma.com',
      pharmacovigilance: 'safety@ckdpharma.com'
    },
    tollFree: '0800-253-2273',
    whatsappNumber: '+923008495521',
    whatsappDisplay: '0300-8495521',
    socials: {
      linkedin: 'https://linkedin.com/company/ckd-pharma-pakistan',
      facebook: 'https://facebook.com/ckdpharmapakistan',
      twitter: 'https://twitter.com/ckdpharma'
    }
  },
  divisions: [
    {
      id: 'pharma',
      title: 'Pharma',
      subtitle: 'Finished Dosage Forms',
      description: 'Manufacture and distribution of solid oral tablets, coated capsules, therapeutic syrups, and sterile injectables compliant with British Pharmacopoeia (BP) and USP specifications.'
    },
    {
      id: 'apis',
      title: 'APIs',
      subtitle: 'Active Ingredients',
      description: 'High-purity chemical syntheses and pharmaceutical raw materials adhering to strict assay, microbiological purity, and residual solvent thresholds.'
    },
    {
      id: 'diagnose',
      title: 'Diagnose',
      subtitle: 'Clinical Reagents',
      description: 'Medical diagnostics, laboratory test strips, and clinical biochemistry testing reagents designed for hospitals, diagnostic labs, and medical centers.'
    },
    {
      id: 'distribution',
      title: 'Distribution',
      subtitle: 'Cold-Chain Logistics',
      description: 'Temperature-monitored distribution fleet supplying registered pharmacies, primary health clinics, and leading hospitals across 52+ cities in Pakistan.'
    }
  ],
  certifications: [
    {
      id: 'drap',
      name: 'DRAP Good Manufacturing Practice',
      authority: 'Drug Regulatory Authority of Pakistan',
      badge: 'DRAP cGMP Certified',
      description: 'Fully audited facility conforming strictly to DRAP Schedule B-II cGMP guidelines for pharmaceutical manufacturing.',
      validThrough: 'Current & Fully Licensed'
    },
    {
      id: 'iso-9001',
      name: 'ISO 9001:2015',
      authority: 'International Organization for Standardization',
      badge: 'Quality Management System',
      description: 'Certified operational management protocols across raw material sourcing, synthesis, and final product release.',
      validThrough: 'Recertified 2025–2028'
    },
    {
      id: 'iso-14001',
      name: 'ISO 14001:2015',
      authority: 'Environmental Management Systems',
      badge: 'Environmental Standard',
      description: 'Advanced zero-discharge effluent treatment and sustainable waste management at our Kot Lakhpat facility.',
      validThrough: 'Recertified 2025–2028'
    },
    {
      id: 'iso-17025',
      name: 'ISO/IEC 17025',
      authority: 'Testing & Calibration Laboratories',
      badge: 'QC Laboratory Competence',
      description: 'Accreditation validating chemical, microbiological, and instrumental analysis reliability in our QA laboratories.',
      validThrough: 'Active Accreditation'
    }
  ] as Certification[],
  milestones: [
    {
      year: '1984',
      title: 'Company Foundation in Lahore',
      description: 'Established as an indigenous pharmaceutical manufacturer dedicated to bringing accessible, high-purity essential medicines to Pakistan.',
      location: 'Kot Lakhpat, Lahore'
    },
    {
      year: '1996',
      title: 'Commissioning of Sterile Quality Labs',
      description: 'Installed state-of-the-art HPLC chromatography and microbiological testing suites to match British Pharmacopoeia standards.'
    },
    {
      year: '2005',
      title: 'Facility Modernization & Liquid Dosage Line',
      description: 'Expanded into pediatric suspensions, dry syrups, and respiratory care with computerized formulation reactors.'
    },
    {
      year: '2016',
      title: 'Class 10,000 Cleanroom & Blister Automation',
      description: 'Installed high-speed German blister packing and secondary packaging automation with serialization tracking.'
    },
    {
      year: '2022',
      title: 'Launch of the BonAid-D Wellness Line',
      description: 'Introduced targeted OTC bone density and essential mineral nutrition backed by clinical pharmacokinetic studies.'
    },
    {
      year: '2026',
      title: 'Digital Patient Access & Nationwide Supply',
      description: 'Launched the integrated OTC eCommerce storefront for direct, tamper-proof home delivery of everyday healthcare essentials.'
    }
  ] as Milestone[],
  leadership: [
    {
      id: 'ceo',
      name: 'Dr. Tariq Mahmood Khan',
      role: 'Chief Executive Officer & Managing Director',
      qualifications: 'Pharm.D, M.Phil (Pharmaceutics), Punjab University',
      bio: 'Over 32 years of pharmaceutical industrial leadership, directing corporate governance, strategic expansion, and regulatory partnerships across Pakistan and MENA regions.',
      image: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&w=600&q=80'
    },
    {
      id: 'head-qa',
      name: 'Dr. Asma Riaz',
      role: 'Director of Quality Assurance & Regulatory Affairs',
      qualifications: 'Ph.D in Pharmaceutical Chemistry, Bradford UK',
      bio: 'Leads our 28-member QA and regulatory compliance division, ensuring unwavering conformance with DRAP, WHO cGMP, and international pharmacopoeial standards.',
      image: 'https://images.unsplash.com/photo-1594824813637-236b2b509ef4?auto=format&fit=crop&w=600&q=80'
    },
    {
      id: 'head-plant',
      name: 'Engr. Kamran Farooq',
      role: 'Head of Plant Operations & Engineering',
      qualifications: 'B.Sc Chemical Engineering, UET Lahore; PMP Certified',
      bio: 'Oversees manufacturing operations, sterile HVAC engineering, continuous automated tablet compression, and environmental sustainability systems.',
      image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=600&q=80'
    },
    {
      id: 'head-rd',
      name: 'Dr. Zeeshan Haider',
      role: 'Chief Scientific Officer & Head of R&D',
      qualifications: 'M.Sc Drug Formulation Science, London; Ph.D (Pharmaceutics)',
      bio: 'Directs formulation innovation, novel bioavailability optimization, and stability trials for our oral solid and nutritional healthcare portfolios.',
      image: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=600&q=80'
    }
  ] as LeadershipMember[],
  therapeuticAreas: [
    {
      slug: 'gastrointestinal',
      title: 'Gastrointestinal Care',
      count: '24 Formulations',
      description: 'Proton pump inhibitors, antacids, digestive enzymes, and antispasmodics formulated for acid peptic disease and functional GI disorders.'
    },
    {
      slug: 'analgesics',
      title: 'Analgesics & Pain Relief',
      count: '32 Formulations',
      description: 'Evidence-based non-steroidal anti-inflammatory drugs (NSAIDs) and antipyretics delivering rapid somatic and musculoskeletal pain relief.'
    },
    {
      slug: 'bone-health',
      title: 'Bone Health & Nutrition',
      count: '18 Formulations',
      description: 'Advanced calcium, magnesium, vitamin D3, and zinc complexes scientifically formulated to combat osteoporosis and support bone density.'
    },
    {
      slug: 'respiratory',
      title: 'Respiratory & Cough',
      count: '26 Formulations',
      description: 'Antihistamines, bronchodilators, expectorants, and soothing throat syrups engineered for acute and allergic upper respiratory conditions.'
    },
    {
      slug: 'cardiovascular',
      title: 'Cardiovascular Health',
      count: '22 Formulations',
      description: 'Antihypertensives, lipid-lowering agents, and cardiovascular adjuncts designed to support long-term arterial integrity.'
    },
    {
      slug: 'anti-infective',
      title: 'Anti-infective & Antibacterial',
      count: '38 Formulations',
      description: 'Broad-spectrum antimicrobial agents rigorously tested for assay potency and minimal therapeutic resistance.'
    }
  ]
};
