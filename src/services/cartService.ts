import { 
  collection, 
  doc, 
  getDoc, 
  getDocs, 
  query, 
  where, 
  addDoc,
  updateDoc,
  deleteDoc
} from 'firebase/firestore';
import { db } from '../lib/firebase';
import { CartItem } from '../types/models';

export const addToCart = async (userId: string, productId: string, quantity: number) => {
  const cartRef = collection(db, 'cart');
  const q = query(
    cartRef,
    where('userId', '==', userId),
    where('productId', '==', productId)
  );
  
  const querySnapshot = await getDocs(q);
  const now = new Date();

  if (!querySnapshot.empty) {
    const existingItem = querySnapshot.docs[0];
    const currentQuantity = existingItem.data().quantity;
    
    await updateDoc(existingItem.ref, {
      quantity: currentQuantity + quantity,
      updatedAt: now
    });
    
    return { 
      id: existingItem.id, 
      ...existingItem.data(), 
      quantity: currentQuantity + quantity 
    } as CartItem;
  }

  const cartItem: Partial<CartItem> = {
    userId,
    productId,
    quantity,
    createdAt: now,
    updatedAt: now
  };

  const docRef = await addDoc(cartRef, cartItem);
  return { id: docRef.id, ...cartItem } as CartItem;
};

export const getUserCart = async (userId: string) => {
  const cartRef = collection(db, 'cart');
  const q = query(cartRef, where('userId', '==', userId));
  
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map(doc => ({ 
    id: doc.id, 
    ...doc.data() 
  })) as CartItem[];
};

export const updateCartItemQuantity = async (itemId: string, quantity: number) => {
  const cartItemRef = doc(db, 'cart', itemId);
  const updates = {
    quantity,
    updatedAt: new Date()
  };
  
  await updateDoc(cartItemRef, updates);
  return updates;
};

export const removeFromCart = async (itemId: string) => {
  const cartItemRef = doc(db, 'cart', itemId);
  await deleteDoc(cartItemRef);
};