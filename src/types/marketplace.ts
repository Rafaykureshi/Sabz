export interface Farmer {
  id: string;
  name: string;
  image: string;
  coverImage: string;
  description: string;
  location: {
    latitude: number;
    longitude: number;
    address: string;
  };
  rating: number;
  reviewCount: number;
  certifications: string[];
  deliveryOptions: string[];
  createdAt: Date;
  updatedAt: Date;
}

export interface MarketplaceProduct {
  id: string;
  farmerId: string;
  name: string;
  description: string;
  category: string;
  price: number;
  unit: string;
  image: string;
  stock: number;
  organic: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface Review {
  id: string;
  farmerId: string;
  userId: string;
  rating: number;
  comment: string;
  images?: string[];
  likes: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface Schedule {
  id: string;
  userId: string;
  farmerId: string;
  type: 'delivery' | 'pickup';
  date: Date;
  timeSlot: string;
  address?: string;
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
  createdAt: Date;
  updatedAt: Date;
}