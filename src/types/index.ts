export interface Dimensions {
  lengthInches: number;
  widthInches: number;
  heightInches: number;
  seatingHeightInches?: number;
}

export interface MaterialSpecs {
  frame: string;
  foam: string;
  fabric: string;
  legs: string;
}

export interface ColorVariant {
  name: string;
  hex: string;
  inStock: boolean;
}

export interface FabricOption {
  id: string;
  name: string;
  category: string;
  pricePerMeter: number;
  durability: string; // e.g. "8-12 Years"
  description: string;
  texturePattern: string;
  popularFor: string;
}

export interface Product {
  id: string;
  sku: string;
  name: string;
  slug: string;
  categoryId: string;
  categoryName: string;
  price: number;
  originalPrice?: number;
  isCustomizable: boolean;
  isFeatured: boolean;
  inStock: boolean;
  stockQuantity: number;
  leadTimeDays: number;
  seatingCapacity: string;
  dimensions: Dimensions;
  materials: MaterialSpecs;
  description: string;
  features: string[];
  image?: string;
  images: string[];
  colorVariants: ColorVariant[];
  fabricOptions: string[];
  ratings: {
    average: number;
    count: number;
  };
  hasPullOutMechanism?: boolean;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
  image: string;
  itemCount: number;
  displayOrder: number;
  isActive: boolean;
}

export interface CartItem {
  productId: string;
  name: string;
  sku: string;
  price: number;
  quantity: number;
  selectedColor?: string;
  selectedFabric?: string;
  orientation?: 'Left-Hand Facing' | 'Right-Hand Facing' | 'Standard';
  customNotes?: string;
  image: string;
}

export interface OrderCustomer {
  name: string;
  phone: string;
  email: string;
  address: string;
  landmark?: string;
  city: string;
  state: string;
  pincode: string;
  notes?: string;
}

export interface OrderPricing {
  subtotal: number;
  deliveryFee: number;
  taxGst: number;
  discount: number;
  total: number;
}

export interface OrderPayment {
  method: 'COD' | 'UPI' | 'ONLINE_GATEWAY';
  status: 'PENDING' | 'VERIFIED' | 'FAILED';
  transactionRef?: string;
}

export type OrderStatus =
  | 'PENDING'
  | 'CONFIRMED'
  | 'IN_PRODUCTION'
  | 'READY_FOR_DELIVERY'
  | 'DISPATCHED'
  | 'DELIVERED'
  | 'CANCELLED';

export interface Order {
  id: string;
  customer: OrderCustomer;
  items: CartItem[];
  pricing: OrderPricing;
  payment: OrderPayment;
  status: OrderStatus;
  internalNotes?: string;
  trackingDetails?: string;
  createdAt: string;
  updatedAt: string;
}

export interface CustomQuote {
  id: string;
  customerName: string;
  customerPhone: string;
  sofaType: string;
  seatingCapacity: string;
  fabric: string;
  foamGrade: string;
  estimatedPrice: number;
  notes: string;
  status: 'NEW' | 'CONTACTED' | 'CONVERTED' | 'CLOSED';
  createdAt: string;
}

export interface RepairEnquiry {
  id: string;
  customerName: string;
  customerPhone: string;
  issueType: 'SAG_REPAIR' | 'FOAM_REPLACE' | 'FULL_REUPHOLSTERY' | 'FRAME_REPAIR' | 'FABRIC_CHANGE';
  seatingCount: string;
  sofaAge: string;
  address: string;
  pincode: string;
  preferredDate?: string;
  description: string;
  status: 'NEW' | 'INSPECTED' | 'IN_PROGRESS' | 'COMPLETED';
  createdAt: string;
}

export interface Review {
  id: string;
  author: string;
  location: string;
  rating: number;
  date: string;
  text: string;
  isVerifiedGoogle: boolean;
  productMentioned?: string;
}

export interface StoreSettings {
  businessName: string;
  phone: string;
  whatsapp: string;
  email: string;
  address: string;
  pincode: string;
  city: string;
  hours: string;
  googleMapsUrl: string;
  justdialUrl: string;
  googleRating: number;
  googleReviewCount: number;
  freeDeliveryThreshold: number;
  defaultDeliveryFee: number;
  gstPercentage: number;
  enableCod: boolean;
  enableUpi: boolean;
  enableGateway: boolean;
  upiId: string;
  workshopVideoUrl?: string;
  catalogDriveUrl?: string;
}
