import { 
  collection, 
  doc,
  getDoc,
  getDocs, 
  query, 
  where,
  addDoc,
  updateDoc,
  increment,
  Timestamp
} from 'firebase/firestore';
import { db } from '../lib/firebase';

interface InventoryItem {
  id?: string;
  farmerId: string;
  productId: string;
  quantity: number;
  minQuantity: number;
  maxQuantity: number;
  lastRestocked: Date;
  nextRestock: Date;
}

interface StockMovement {
  id?: string;
  itemId: string;
  type: 'in' | 'out';
  quantity: number;
  reason: string;
  date: Date;
}

export const inventoryService = {
  async addInventoryItem(item: Omit<InventoryItem, 'id'>) {
    const inventoryRef = collection(db, 'inventory');
    const docRef = await addDoc(inventoryRef, {
      ...item,
      lastRestocked: Timestamp.fromDate(item.lastRestocked),
      nextRestock: Timestamp.fromDate(item.nextRestock)
    });
    return { id: docRef.id, ...item };
  },

  async updateStock(itemId: string, quantity: number, type: 'in' | 'out') {
    const itemRef = doc(db, 'inventory', itemId);
    await updateDoc(itemRef, {
      quantity: increment(type === 'in' ? quantity : -quantity),
      lastRestocked: type === 'in' ? Timestamp.fromDate(new Date()) : undefined
    });

    // Record stock movement
    const movementRef = collection(db, 'stock_movements');
    await addDoc(movementRef, {
      itemId,
      type,
      quantity,
      reason: type === 'in' ? 'Restock' : 'Sale',
      date: Timestamp.fromDate(new Date())
    });
  },

  async getInventory(farmerId: string) {
    const inventoryRef = collection(db, 'inventory');
    const q = query(inventoryRef, where('farmerId', '==', farmerId));
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
  },

  async getLowStockItems(farmerId: string) {
    const inventoryRef = collection(db, 'inventory');
    const q = query(
      inventoryRef,
      where('farmerId', '==', farmerId),
      where('quantity', '<=', where('minQuantity'))
    );
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
  },

  async getStockMovements(itemId: string, startDate: Date, endDate: Date) {
    const movementsRef = collection(db, 'stock_movements');
    const q = query(
      movementsRef,
      where('itemId', '==', itemId),
      where('date', '>=', Timestamp.fromDate(startDate)),
      where('date', '<=', Timestamp.fromDate(endDate))
    );
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
  }
};