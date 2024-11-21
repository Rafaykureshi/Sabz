import { 
  collection, 
  doc, 
  getDoc, 
  getDocs, 
  query, 
  where, 
  addDoc,
  updateDoc,
  orderBy
} from 'firebase/firestore';
import { db } from '../lib/firebase';
import { Order } from '../types/models';

export const createOrder = async (userId: string, orderData: Partial<Order>) => {
  const ordersRef = collection(db, 'orders');
  const now = new Date();
  
  const order: Partial<Order> = {
    ...orderData,
    userId,
    status: 'pending',
    createdAt: now,
    updatedAt: now
  };

  const docRef = await addDoc(ordersRef, order);
  return { id: docRef.id, ...order } as Order;
};

export const getOrder = async (orderId: string) => {
  const orderRef = doc(db, 'orders', orderId);
  const orderSnap = await getDoc(orderRef);
  
  if (orderSnap.exists()) {
    return { id: orderSnap.id, ...orderSnap.data() } as Order;
  }
  return null;
};

export const getUserOrders = async (userId: string) => {
  const ordersRef = collection(db, 'orders');
  const q = query(
    ordersRef, 
    where('userId', '==', userId),
    orderBy('createdAt', 'desc')
  );
  
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map(doc => ({ 
    id: doc.id, 
    ...doc.data() 
  })) as Order[];
};

export const updateOrderStatus = async (orderId: string, status: Order['status']) => {
  const orderRef = doc(db, 'orders', orderId);
  const updates = {
    status,
    updatedAt: new Date()
  };
  
  await updateDoc(orderRef, updates);
  return updates;
};