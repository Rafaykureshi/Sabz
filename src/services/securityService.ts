import { 
  getAuth, 
  updatePassword, 
  reauthenticateWithCredential,
  EmailAuthProvider
} from 'firebase/auth';
import { doc, updateDoc } from 'firebase/firestore';
import { db } from '../lib/firebase';

interface SecuritySettings {
  twoFactorEnabled: boolean;
  lastPasswordChange: Date;
  loginNotifications: boolean;
}

export const securityService = {
  async updatePassword(currentPassword: string, newPassword: string) {
    const auth = getAuth();
    const user = auth.currentUser;
    
    if (!user || !user.email) {
      throw new Error('No authenticated user found');
    }

    // Re-authenticate user before password change
    const credential = EmailAuthProvider.credential(user.email, currentPassword);
    await reauthenticateWithCredential(user, credential);
    
    // Update password
    await updatePassword(user, newPassword);
    
    // Update last password change timestamp
    const userRef = doc(db, 'users', user.uid);
    await updateDoc(userRef, {
      'security.lastPasswordChange': new Date()
    });
  },

  async updateSecuritySettings(userId: string, settings: Partial<SecuritySettings>) {
    const userRef = doc(db, 'users', userId);
    await updateDoc(userRef, {
      'security': settings
    });
  },

  async getSecuritySettings(userId: string) {
    const userRef = doc(db, 'users', userId);
    const userDoc = await getDoc(userRef);
    
    if (!userDoc.exists()) {
      throw new Error('User not found');
    }
    
    return userDoc.data().security as SecuritySettings;
  }
};