import { 
  collection, 
  addDoc, 
  query, 
  where, 
  orderBy, 
  getDocs,
  Timestamp 
} from 'firebase/firestore';
import { db } from '../lib/firebase';

interface PerformanceMetric {
  id?: string;
  type: 'api' | 'database' | 'render';
  operation: string;
  duration: number;
  timestamp: Date;
  metadata?: Record<string, any>;
}

interface ErrorLog {
  id?: string;
  type: string;
  message: string;
  stack?: string;
  timestamp: Date;
  metadata?: Record<string, any>;
}

export const performanceService = {
  async logMetric(metric: Omit<PerformanceMetric, 'id' | 'timestamp'>) {
    const metricsRef = collection(db, 'performance_metrics');
    const newMetric = {
      ...metric,
      timestamp: Timestamp.fromDate(new Date())
    };
    
    const docRef = await addDoc(metricsRef, newMetric);
    return { id: docRef.id, ...newMetric };
  },

  async getMetrics(type: string, startDate: Date, endDate: Date) {
    const metricsRef = collection(db, 'performance_metrics');
    const q = query(
      metricsRef,
      where('type', '==', type),
      where('timestamp', '>=', Timestamp.fromDate(startDate)),
      where('timestamp', '<=', Timestamp.fromDate(endDate)),
      orderBy('timestamp', 'desc')
    );
    
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
  },

  async logError(error: Omit<ErrorLog, 'id' | 'timestamp'>) {
    const errorsRef = collection(db, 'error_logs');
    const newError = {
      ...error,
      timestamp: Timestamp.fromDate(new Date())
    };
    
    const docRef = await addDoc(errorsRef, newError);
    return { id: docRef.id, ...newError };
  },

  async getErrors(startDate: Date, endDate: Date) {
    const errorsRef = collection(db, 'error_logs');
    const q = query(
      errorsRef,
      where('timestamp', '>=', Timestamp.fromDate(startDate)),
      where('timestamp', '<=', Timestamp.fromDate(endDate)),
      orderBy('timestamp', 'desc')
    );
    
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
  }
};