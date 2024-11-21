import { 
  collection, 
  addDoc, 
  updateDoc,
  deleteDoc,
  doc,
  query,
  where,
  getDocs
} from 'firebase/firestore';
import { db } from '../lib/firebase';
import { FIREBASE_COLLECTIONS } from '../lib/constants';

export interface Schedule {
  id?: string;
  userId: string;
  type: 'watering' | 'fertilizing' | 'pruning' | 'harvesting';
  frequency: string;
  time: string;
  notes: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export const scheduleService = {
  async createSchedule(userId: string, scheduleData: Partial<Schedule>): Promise<Schedule> {
    const schedulesRef = collection(db, FIREBASE_COLLECTIONS.SCHEDULES);
    const now = new Date();
    
    const schedule: Partial<Schedule> = {
      userId,
      ...scheduleData,
      isActive: true,
      createdAt: now,
      updatedAt: now
    };

    const docRef = await addDoc(schedulesRef, schedule);
    return { id: docRef.id, ...schedule } as Schedule;
  },

  async getUserSchedules(userId: string): Promise<Schedule[]> {
    const schedulesRef = collection(db, FIREBASE_COLLECTIONS.SCHEDULES);
    const q = query(
      schedulesRef,
      where('userId', '==', userId),
      where('isActive', '==', true)
    );
    
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    })) as Schedule[];
  },

  async updateSchedule(scheduleId: string, updates: Partial<Schedule>): Promise<void> {
    const scheduleRef = doc(db, FIREBASE_COLLECTIONS.SCHEDULES, scheduleId);
    await updateDoc(scheduleRef, {
      ...updates,
      updatedAt: new Date()
    });
  },

  async deleteSchedule(scheduleId: string): Promise<void> {
    const scheduleRef = doc(db, FIREBASE_COLLECTIONS.SCHEDULES, scheduleId);
    await deleteDoc(scheduleRef);
  }
};