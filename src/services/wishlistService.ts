import { 
  collection, 
  doc,
  getDoc,
  getDocs, 
  query, 
  where,
  addDoc,
  deleteDoc,
  Timestamp
} from 'firebase/firestore';
import { db } from '../lib/firebase';

interface WishlistItem {
  id?: string;
  userId: string;
  productId: string;
  addedAt: Date;
}

export const wishlistService = {
  async addToWishlist(userId: string, productId: string) {
    const wishlistRef = collection(db, 'wishlists');
    const newItem = {
      userId,
      productId,
      addedAt: Timestamp.fromDate(new Date())
    };
    
    const docRef = await addDoc(wishlistRef, newItem);
    return { id: docRef.id, ...newItem };
  },

  async removeFromWishlist(itemId: string) {
    const wishlistRef = doc(db, 'wishlists', itemId);
    await deleteDoc(wishlistRef);
  },

  async getWishlist(userId: string) {
    const wishlistRef = collection(db, 'wishlists');
    const q = query(
      wishlistRef,
      where('userId', '==', userId),
      orderBy('addedAt', 'desc')
    );
    
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
  },

  async isInWishlist(userId: string, productId: string) {
    const wishlistRef = collection(db, 'wishlists');
    const q = query(
      wishlistRef,
      where('userId', '==', userId),
      where('productId', '==', productId),
      limit(1)
    );
    
    const snapshot = await getDocs(q);
    return !snapshot.empty;
  }
};