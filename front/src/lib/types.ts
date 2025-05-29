export type UserRole = 'provider' | 'charity' | 'admin';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  image?: string;
  organization: string;
  address: string;
  phone: string;
}

export type FoodCategory = 
  | 'produce' 
  | 'bakery' 
  | 'dairy' 
  | 'meat' 
  | 'prepared' 
  | 'canned' 
  | 'dry goods' 
  | 'frozen' 
  | 'beverages'
  | 'other';

export type DonationStatus = 
  | 'available' 
  | 'scheduled' 
  | 'in transit' 
  | 'delivered' 
  | 'cancelled';

export interface Donation {
  id: string;
  providerId: string;
  providerName: string;
  title: string;
  description: string;
  category: FoodCategory;
  quantity: string;
  expiration: Date;
  pickupWindow: {
    start: Date;
    end: Date;
  };
  status: DonationStatus;
  createdAt: Date;
  address: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  images?: string[];
  claimedBy?: {
    id: string;
    name: string;
    contactPerson: string;
    phone: string;
  };
  scheduledPickup?: Date;
}

export interface CharityPreference {
  categories: FoodCategory[];
  minQuantity?: string;
  maxQuantity?: string;
  pickupDays: number[]; // 0-6 (Sunday-Saturday)
  pickupTimes: {
    start: string; // 24h format: "08:00"
    end: string; // 24h format: "18:00"
  };
  serviceRadius: number; // in kilometers/miles
}
