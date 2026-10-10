import { Article } from '../types';
import { siteImages } from './images';

export const articlesData: Article[] = [
  {
    id: 'drap-cgmp-recertification-2026',
    slug: 'ckd-pharma-achieves-flawless-drap-cgmp-recertification',
    title: 'CKD Pharma Achieves Unconditional DRAP cGMP Recertification',
    excerpt: 'Following comprehensive multi-day regulatory audits at our Kot Lakhpat manufacturing facility, the Drug Regulatory Authority of Pakistan renewed our cGMP accreditation across all solid oral and liquid dosage lines.',
    date: 'February 18, 2026',
    author: 'Regulatory Affairs Division',
    category: 'Regulatory & Quality',
    readTime: '4 min read',
    coverImage: siteImages.qualityControlLab.src,
    tags: ['DRAP', 'cGMP', 'Quality Assurance', 'Kot Lakhpat'],
    paragraphs: [
      'The Drug Regulatory Authority of Pakistan (DRAP) concluded its triennial comprehensive surveillance audit of CKD Pharma manufacturing campus in Kot Lakhpat, Lahore. The audit scrutinized our automated tablet compression suites, Class 10,000 cleanrooms, purified water loops (USP grade), and our state-of-the-art analytical quality control laboratories.',
      'The inspection team commended our implementation of continuous computerized Environmental Monitoring Systems (EMS), barcode-based material traceability, and automated serializing packaging machines that combat counterfeit distribution in Pakistan.',
      '“Unconditional recertification reaffirms our forty-year commitment to uncompromising medicine purity,” stated Dr. Asma Riaz, Director of Quality Assurance. “Every blister pack bearing the CKD emblem embodies safety protocols aligned with international pharmacopoeial standards.”',
      'The recertification covers all registered oral solids, effervescent lines, pediatric liquid suspensions, and our growing range of over-the-counter wellness formulations including BonAid-D.'
    ]
  },
  {
    id: 'osteoporosis-bone-density-pakistan-study',
    slug: 'addressing-pakistans-silent-osteoporosis-crisis-through-balanced-mineral-nutrition',
    title: 'Addressing Pakistan’s Silent Osteoporosis Burden Through Targeted Mineral Nutrition',
    excerpt: 'Epidemiological studies indicate that over 65% of adult women in urban Pakistan exhibit suboptimal bone mineral density. A clinical review of micro-mineral synergism between Calcium, Magnesium, Vitamin D3, and Zinc.',
    date: 'January 24, 2026',
    author: 'Dr. Zeeshan Haider, Head of R&D',
    category: 'Clinical Research',
    readTime: '6 min read',
    coverImage: siteImages.researchScience.src,
    tags: ['Osteoporosis', 'Bone Density', 'BonAid-D', 'Preventative Healthcare'],
    paragraphs: [
      'Osteopenia and osteoporosis represent an underdiagnosed public health challenge in Pakistan, especially among post-menopausal women and sedentary urban populations. Conventional single-entity calcium supplementation often suffers from poor intestinal bioavailability and non-compliance due to gastrointestinal upset.',
      'Our clinical formulation research demonstrated that combining Calcium Carbonate with bioavailable Magnesium Oxide, Cholecalciferol (Vitamin D3), and Zinc significantly amplifies intestinal calcium transport while preventing renal precipitation.',
      'Magnesium functions as an essential enzymatic cofactor in converting Vitamin D into its biologically active calcitriol form, while Zinc stimulates osteoblast bone-matrix deposition and alkaline phosphatase activity.',
      'Through BonAid-D, CKD Pharma delivers this quad-synergy matrix in an enteric-tolerant, film-coated tablet manufactured under strict pharmaceutical cleanroom controls, providing an accessible daily preventative shield for households across Pakistan.'
    ]
  },
  {
    id: 'cold-chain-nationwide-distribution-expansion',
    slug: 'expanding-climate-controlled-distribution-across-52-cities',
    title: 'Expanding Climate-Controlled Logistics Fleet to 52 Cities in Pakistan',
    excerpt: 'To counter extreme summer heatwaves and safeguard temperature-sensitive therapeutics, CKD Pharma completes phase two of its real-time IoT temperature-monitored logistics fleet.',
    date: 'December 12, 2025',
    author: 'Supply Chain Operations',
    category: 'Supply Chain & Infrastructure',
    readTime: '3 min read',
    coverImage: siteImages.distributionFleet.src,
    tags: ['Cold Chain', 'Logistics', 'Patient Safety', 'Distribution'],
    paragraphs: [
      'Maintaining unbroken cold chain and thermal stability during peak Pakistani summers, when ambient temperatures frequently breach 45°C, is vital for therapeutic efficacy and drug shelf-life integrity.',
      'CKD Pharma has deployed dedicated temperature-controlled logistics vans equipped with continuous wireless IoT telemetry. Every vehicle logs internal cabinet temperature, humidity, and door-opening durations directly to our central logistics dispatch center in Lahore and Karachi.',
      'If thermal thresholds deviate by more than 1.5°C, automated alerts redirect logistics and trigger proactive inspection before delivery to licensed pharmacies and hospitals.',
      'With direct distribution hubs operating in Lahore, Karachi, Rawalpindi, Multan, and Peshawar, CKD Pharma ensures that patients nationwide receive pristine medicines whose biochemical efficacy matches the day they left our manufacturing line.'
    ]
  }
];
