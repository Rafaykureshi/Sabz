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

interface Resource {
  id?: string;
  type: 'guide' | 'tutorial' | 'documentation';
  title: string;
  content: string;
  category: string;
  tags: string[];
  author: string;
  createdAt: Date;
  updatedAt: Date;
}

export const resourceService = {
  async createResource(resource: Omit<Resource, 'id' | 'createdAt' | 'updatedAt'>) {
    const resourcesRef = collection(db, 'resources');
    const now = new Date();
    const newResource = {
      ...resource,
      createdAt: Timestamp.fromDate(now),
      updatedAt: Timestamp.fromDate(now)
    };
    
    const docRef = await addDoc(resourcesRef, newResource);
    return { id: docRef.id, ...newResource };
  },

  async getResources(type?: string, category?: string) {
    const resourcesRef = collection(db, 'resources');
    let q = query(resourcesRef, orderBy('createdAt', 'desc'));
    
    if (type) {
      q = query(q, where('type', '==', type));
    }
    
    if (category) {
      q = query(q, where('category', '==', category));
    }
    
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
  },

  async searchResources(searchTerm: string) {
    // Note: For proper search functionality, consider using Algolia or similar
    const resourcesRef = collection(db, 'resources');
    const snapshot = await getDocs(resourcesRef);
    
    return snapshot.docs
      .map(doc => ({
        id: doc.id,
        ...doc.data()
      }))
      .filter(resource => 
        resource.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        resource.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
        resource.tags.some(tag => 
          tag.toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
  }
};