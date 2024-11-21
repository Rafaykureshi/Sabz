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

interface Expert {
  id?: string;
  userId: string;
  specialization: string[];
  experience: number;
  rating: number;
  availability: {
    days: string[];
    hours: string[];
  };
  consultationFee: number;
}

interface Consultation {
  id?: string;
  expertId: string;
  userId: string;
  date: Date;
  duration: number;
  status: 'scheduled' | 'completed' | 'cancelled';
  notes?: string;
  rating?: number;
  review?: string;
}

export const expertService = {
  async registerExpert(expert: Omit<Expert, 'id' | 'rating'>) {
    const expertsRef = collection(db, 'experts');
    const newExpert = {
      ...expert,
      rating: 0
    };
    
    const docRef = await addDoc(expertsRef, newExpert);
    return { id: docRef.id, ...newExpert };
  },

  async getExperts(specialization?: string) {
    const expertsRef = collection(db, 'experts');
    let q = query(expertsRef, orderBy('rating', 'desc'));
    
    if (specialization) {
      q = query(q, where('specialization', 'array-contains', specialization));
    }
    
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
  },

  async scheduleConsultation(consultation: Omit<Consultation, 'id' | 'status'>) {
    const consultationsRef = collection(db, 'consultations');
    const newConsultation = {
      ...consultation,
      status: 'scheduled',
      date: Timestamp.fromDate(consultation.date)
    };
    
    const docRef = await addDoc(consultationsRef, newConsultation);
    return { id: docRef.id, ...newConsultation };
  },

  async getUserConsultations(userId: string) {
    const consultationsRef = collection(db, 'consultations');
    const q = query(
      consultationsRef,
      where('userId', '==', userId),
      orderBy('date', 'desc')
    );
    
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
  },

  async getExpertConsultations(expertId: string) {
    const consultationsRef = collection(db, 'consultations');
    const q = query(
      consultationsRef,
      where('expertId', '==', expertId),
      orderBy('date', 'desc')
    );
    
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
  }
};