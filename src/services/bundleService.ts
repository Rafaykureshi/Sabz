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

interface Bundle {
  id?: string;
  name: string;
  description: string;
  products: Array<{
    productId: string;
    quantity: number;
  }>;
  price: number;
  discount: number;
  startDate: Date;
  endDate: Date;
  isActive: boolean;
}

export const bundleService = {
  async createBundle(bundle: Omit<Bundle, 'id'>) {
    const bundlesRef = collection(db, 'bundles');
    const newBundle = {
      ...bundle,
      startDate: Timestamp.fromDate(bundle.startDate),
      endDate: Timestamp.fromDate(bundle.endDate)
    };
    
    const docRef = await addDoc(bundlesRef, newBundle);
    return { id: docRef.id, ...newBundle };
  },

  async getActiveBundles() {
    const bundlesRef = collection(db, 'bundles');
    const now = new Date();
    
    const q = query(
      bundlesRef,
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

  async getBundle(bundleId: string) {
    const bundleRef = doc(db, 'bundles', bundleId);
    const bundleSnap = await getDoc(bundleRef);
    
    if (!bundleSnap.exists()) {
      throw new Error('Bundle not found');
    }
    
    return {
      id: bundleSnap.id,
      ...bundleSnap.data()
    };
  }
};