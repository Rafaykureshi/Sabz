import { 
  collection, 
  getDocs,
  query,
  where,
  Timestamp,
  writeBatch,
  doc 
} from 'firebase/firestore';
import { db } from '../lib/firebase';

interface BackupMetadata {
  id?: string;
  timestamp: Date;
  collections: string[];
  status: 'pending' | 'completed' | 'failed';
  error?: string;
}

export const backupService = {
  async createBackup(collections: string[]) {
    const backupsRef = collection(db, 'backups');
    const batch = writeBatch(db);
    
    // Create backup metadata
    const metadata: Omit<BackupMetadata, 'id'> = {
      timestamp: new Date(),
      collections,
      status: 'pending'
    };
    
    const metadataRef = doc(backupsRef);
    batch.set(metadataRef, metadata);
    
    try {
      // Backup each collection
      for (const collectionName of collections) {
        const collectionRef = collection(db, collectionName);
        const snapshot = await getDocs(collectionRef);
        
        const backupCollectionRef = collection(db, `backups/${metadataRef.id}/${collectionName}`);
        
        snapshot.docs.forEach(doc => {
          const backupDocRef = doc(backupCollectionRef, doc.id);
          batch.set(backupDocRef, doc.data());
        });
      }
      
      // Update metadata status
      batch.update(metadataRef, { status: 'completed' });
      
      await batch.commit();
      
      return {
        id: metadataRef.id,
        ...metadata,
        status: 'completed'
      };
    } catch (error) {
      // Update metadata with error
      batch.update(metadataRef, { 
        status: 'failed',
        error: error.message
      });
      
      await batch.commit();
      throw error;
    }
  },

  async getBackups() {
    const backupsRef = collection(db, 'backups');
    const q = query(backupsRef, orderBy('timestamp', 'desc'));
    
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
  },

  async restoreFromBackup(backupId: string) {
    const backupRef = doc(db, 'backups', backupId);
    const backupDoc = await getDoc(backupRef);
    
    if (!backupDoc.exists()) {
      throw new Error('Backup not found');
    }
    
    const backup = backupDoc.data() as BackupMetadata;
    const batch = writeBatch(db);
    
    try {
      for (const collectionName of backup.collections) {
        const backupCollectionRef = collection(db, `backups/${backupId}/${collectionName}`);
        const targetCollectionRef = collection(db, collectionName);
        
        const snapshot = await getDocs(backupCollectionRef);
        
        snapshot.docs.forEach(doc => {
          const targetDocRef = doc(targetCollectionRef, doc.id);
           <boltAction type="file" filePath="src/services/backupService.ts">
          batch.set(targetDocRef, doc.data());
        });
      }
      
      await batch.commit();
      return true;
    } catch (error) {
      console.error('Error restoring backup:', error);
      throw error;
    }
  }
};