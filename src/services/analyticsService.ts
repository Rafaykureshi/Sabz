import { 
  collection, 
  query, 
  where, 
  getDocs, 
  addDoc,
  Timestamp 
} from 'firebase/firestore';
import { db } from '../lib/firebase';

interface GrowthData {
  plantId: string;
  height: number;
  leaves: number;
  health: number;
  date: Date;
}

interface WaterUsage {
  plantId: string;
  amount: number;
  date: Date;
}

interface YieldData {
  plantId: string;
  amount: number;
  quality: number;
  date: Date;
}

export const analyticsService = {
  async trackGrowth(data: GrowthData) {
    const growthRef = collection(db, 'growth_tracking');
    await addDoc(growthRef, {
      ...data,
      date: Timestamp.fromDate(data.date)
    });
  },

  async trackWaterUsage(data: WaterUsage) {
    const waterRef = collection(db, 'water_usage');
    await addDoc(waterRef, {
      ...data,
      date: Timestamp.fromDate(data.date)
    });
  },

  async trackYield(data: YieldData) {
    const yieldRef = collection(db, 'yield_tracking');
    await addDoc(yieldRef, {
      ...data,
      date: Timestamp.fromDate(data.date)
    });
  },

  async getGrowthHistory(plantId: string, startDate: Date, endDate: Date) {
    const growthRef = collection(db, 'growth_tracking');
    const q = query(
      growthRef,
      where('plantId', '==', plantId),
      where('date', '>=', Timestamp.fromDate(startDate)),
      where('date', '<=', Timestamp.fromDate(endDate))
    );

    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
  },

  async getWaterUsageHistory(plantId: string, startDate: Date, endDate: Date) {
    const waterRef = collection(db, 'water_usage');
    const q = query(
      waterRef,
      where('plantId', '==', plantId),
      where('date', '>=', Timestamp.fromDate(startDate)),
      where('date', '<=', Timestamp.fromDate(endDate))
    );

    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
  },

  async getYieldHistory(plantId: string, startDate: Date, endDate: Date) {
    const yieldRef = collection(db, 'yield_tracking');
    const q = query(
      yieldRef,
      where('plantId', '==', plantId),
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