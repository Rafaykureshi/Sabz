import { 
  collection, 
  doc,
  getDoc,
  getDocs, 
  query, 
  where,
  addDoc,
  Timestamp
} from 'firebase/firestore';
import { db } from '../lib/firebase';

interface Promotion {
  id?: string;
  title: string;
  description: string;
  type: 'discount' | 'bogo' | 'bundle';
  value: number;
  minPurchase?: number;
  products: string[];
  startDate: Date;
  endDate: Date;
  isActive: boolean;
}

export const promotionService = {
  async createPromotion(promotion: Omit<Promotion, 'id'>) {
    const promotionsRef = collection(db, 'promotions');
    const newPromotion = {
      ...promotion,
      startDate: Timestamp.fromDate(promotion.startDate),
      endDate: Timestamp.fromDate(promotion.endDate)
    };
    
    const docRef = await addDoc(promotionsRef, newPromotion);
    return { id: docRef.id, ...newPromotion };
  },

  async getActivePromotions() {
    const promotionsRef = collection(db, 'promotions');
    const now = new Date();
    
    const q = query(
      promotionsRef,
      where('isActive', '==', true),
      where('startDate', '<=', now),
      where('endDate', '>=', now)
    );
    
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
  },

  async getProductPromotions(productId: string) {
    const promotionsRef = collection(db, 'promotions');
    const now = new Date();
    
    const q = query(
      promotionsRef,
      where('isActive', '==', true),
      where('startDate', '<=', now),
      where('endDate', '>=', now),
      where('products', 'array-contains', productId)
    );
    
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
  }
};