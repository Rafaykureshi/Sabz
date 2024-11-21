import { doc, getDoc, setDoc, updateDoc } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { UserProfile } from '../types/models';

export const createUserProfile = async (userId: string, data: Partial<UserProfile>) => {
  const userRef = doc(db, 'users', userId);
  const now = new Date();
  
  const userProfile: UserProfile = {
    id: userId,
    displayName: data.displayName || '',
    email: data.email || '',
    photoURL: data.photoURL,
    phoneNumber: data.phoneNumber,
    address: data.address,
    createdAt: now,
    updatedAt: now
  };

  await setDoc(userRef, userProfile);
  return userProfile;
};

export const getUserProfile = async (userId: string) => {
  const userRef = doc(db, 'users', userId);
  const userSnap = await getDoc(userRef);
  
  if (userSnap.exists()) {
    return userSnap.data() as UserProfile;
  }
  return null;
};

export const updateUserProfile = async (userId: string, data: Partial<UserProfile>) => {
  const userRef = doc(db, 'users', userId);
  const updates = {
    ...data,
    updatedAt: new Date()
  };
  
  await updateDoc(userRef, updates);
  return updates;
};