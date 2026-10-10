export type DosageForm = 
  | 'Tablet'
  | 'Capsule'
  | 'Syrup'
  | 'Suspension'
  | 'Injection'
  | 'Cream / Ointment'
  | 'Drops'
  | 'Sachet';

export type TherapeuticCategory =
  | 'Gastrointestinal'
  | 'Analgesics & Antipyretics'
  | 'Musculoskeletal & Bone Health'
  | 'Vitamins & Supplements'
  | 'Respiratory & Cold'
  | 'Cardiovascular'
  | 'Anti-infective'
  | 'Dermatology';

export type HealthConcern =
  | 'Pain Relief'
  | 'Cold & Flu'
  | 'Digestive Health'
  | 'Vitamins & Supplements'
  | 'Skin Care'
  | 'First Aid'
  | 'Bone & Joint Health';

export interface Ingredient {
  name: string;
  amount: string;
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  genericName: string;
  category: TherapeuticCategory;
  concern: HealthConcern[];
  dosageForm: DosageForm;
  strength?: string;
  packSize: string;
  price?: number; // In PKR. Undefined if Rx without store checkout
  compareAtPrice?: number;
  isOTC: boolean; // Over-the-counter vs Prescription
  requiresPrescription: boolean;
  inStock: boolean;
  featured?: boolean;
  bestseller?: boolean;
  images: string[];
  description: string;
  indications: string;
  directions: string;
  warnings: string[];
  ingredients: Ingredient[];
  drapRegistrationNumber?: string;
  storageConditions?: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface CustomerInfo {
  fullName: string;
  email: string;
  phone: string; // Formatted 03XX-XXXXXXX
  addressLine1: string;
  addressLine2?: string;
  city: string;
  province: string;
  postalCode?: string;
  notes?: string;
}

export type PaymentMethodId = 'cod' | 'jazzcash' | 'easypaisa' | 'card';

export interface Order {
  id: string; // e.g. CKD-78214
  createdAt: string;
  customer: CustomerInfo;
  items: CartItem[];
  subtotal: number;
  deliveryFee: number;
  discount: number;
  total: number;
  paymentMethod: PaymentMethodId;
  paymentStatus: 'Pending' | 'Paid' | 'Cash on Delivery';
  orderStatus: 'Confirmed' | 'Processing' | 'Shipped' | 'Delivered';
  trackingNumber: string;
  estimatedDelivery: string;
  trackingUpdates: {
    title: string;
    description: string;
    timestamp: string;
    completed: boolean;
  }[];
}

export interface Article {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  author: string;
  category: string;
  readTime: string;
  coverImage: string;
  tags: string[];
  paragraphs: string[];
}

export interface JobOpening {
  id: string;
  title: string;
  department: string;
  location: string;
  employmentType: 'Full-time' | 'Contract' | 'Part-time';
  experience: string;
  description: string;
  responsibilities: string[];
  requirements: string[];
  postedDate: string;
}

export interface LeadershipMember {
  id: string;
  name: string;
  role: string;
  qualifications: string;
  bio: string;
  image: string;
}

export interface Milestone {
  year: string;
  title: string;
  description: string;
  location?: string;
}

export interface Certification {
  id: string;
  name: string;
  authority: string;
  badge: string;
  description: string;
  validThrough: string;
}
