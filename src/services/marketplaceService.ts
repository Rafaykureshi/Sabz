import { 
  collection, 
  doc, 
  getDoc, 
  getDocs, 
  query, 
  where, 
  orderBy,
  addDoc,
  updateDoc,
  GeoPoint,
  startAfter,
  limit
} from 'firebase/firestore';
import { db } from '../lib/firebase';
import { MarketplaceProduct, Farmer, Review } from '../types/marketplace';

// Farmer related functions
export const getFarmers = async (filters?: any) => {
  const farmersRef = collection(db, 'farmers');
  let q = query(farmersRef, orderBy('rating', 'desc'));
  
  if (filters?.radius && filters?.location) {
    // Implement geofencing query when needed
  }

  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  })) as Farmer[];
};

// Product related functions
export const getProducts = async (filters?: any) => {
  const productsRef = collection(db, 'products');
  let q = query(productsRef);
  
  if (filters?.category) {
    q = query(q, where('category', '==', filters.category));
  }
  
  if (filters?.minPrice) {
    q = query(q, where('price', '>=', filters.minPrice));
  }
  
  if (filters?.maxPrice) {
    q = query(q, where('price', '<=', filters.maxPrice));
  }

  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  })) as MarketplaceProduct[];
};

// Review related functions
export const addReview = async (farmerId: string, review: Partial<Review>) => {
  const reviewsRef = collection(db, 'reviews');
  const now = new Date();
  
  const newReview = {
    ...review,
    farmerId,
    createdAt: now,
    updatedAt: now
  };

  const docRef = await addDoc(reviewsRef, newReview);
  return { id: docRef.id, ...newReview } as Review;
};

export const getFarmerReviews = async (farmerId: string) => {
  const reviewsRef = collection(db, 'reviews');
  const q = query(
    reviewsRef,
    where('farmerId', '==', farmerId),
    orderBy('createdAt', 'desc')
  );
  
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  })) as Review[];
};

// Schedule related functions
export const scheduleDelivery = async (userId: string, farmerId: string, details: any) => {
  const schedulesRef = collection(db, 'schedules');
  const now = new Date();
  
  const schedule = {
    userId,
    farmerId,
    ...details,
    status: 'pending',
    createdAt: now,
    updatedAt: now
  };

  const docRef = await addDoc(schedulesRef, schedule);
  return { id: docRef.id, ...schedule };
};