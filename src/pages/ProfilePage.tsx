import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { User, Mail, Phone, Home, Camera } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { getUserProfile, updateUserProfile } from '../services/userService';
import { UserProfile } from '../types/models';

const ProfilePage = () => {
  const { user, updateUserProfile: updateAuthProfile } = useAuth();
  const [editing, setEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [formData, setFormData] = useState({
    displayName: '',
    phoneNumber: '',
    address: '',
  });

  useEffect(() => {
    const loadProfile = async () => {
      if (user) {
        const userProfile = await getUserProfile(user.uid);
        if (userProfile) {
          setProfile(userProfile);
          setFormData({
            displayName: userProfile.displayName,
            phoneNumber: userProfile.phoneNumber || '',
            address: userProfile.address || '',
          });
        }
      }
      setLoading(false);
    };

    loadProfile();
  }, [user]);

  const handleSave = async () => {
    try {
      if (!user) return;

      await updateUserProfile(user.uid, {
        displayName: formData.displayName,
        phoneNumber: formData.phoneNumber,
        address: formData.address,
      });

      await updateAuthProfile(formData.displayName);
      
      setProfile(prev => prev ? {
        ...prev,
        ...formData,
        updatedAt: new Date()
      } : null);
      
      setEditing(false);
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

  if (loading) {
    return (
      <div className="py-32 bg-gradient-to-b from-white to-primary/5 min-h-screen">
        <div className="max-w-4xl mx-auto px-6">
          <div className="animate-pulse">
            <div className="h-32 bg-gray-200 rounded-xl mb-8"></div>
            <div className="space-y-4">
              <div className="h-12 bg-gray-200 rounded-lg"></div>
              <div className="h-12 bg-gray-200 rounded-lg"></div>
              <div className="h-12 bg-gray-200 rounded-lg"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="py-32 bg-gradient-to-b from-white to-primary/5 min-h-screen">
      <div className="max-w-4xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white p-8 rounded-xl shadow-lg"
        >
          <div className="flex items-center gap-6 mb-8">
            <div className="relative">
              {user?.photoURL ? (
                <img
                  src={user.photoURL}
                  alt={user.displayName || ''}
                  className="w-24 h-24 rounded-full"
                />
              ) : (
                <div className="w-24 h-24 rounded-full bg-gray-200 flex items-center justify-center">
                  <User className="h-12 w-12 text-gray-400" />
                </div>
              )}
              <button className="absolute bottom-0 right-0 p-2 bg-white rounded-full shadow-lg">
                <Camera className="h-5 w-5 text-gray-500" />
              </button>
            </div>
            <div>
              <h1 className="text-3xl font-bold text-primary">
                {formData.displayName || 'Your Profile'}
              </h1>
              <p className="text-gray-600">Manage your account settings</p>
            </div>
          </div>

          <div className="space-y-6">
            <div>
              <label className="block text-gray-700 mb-2">Full Name</label>
              <div className="flex items-center bg-gray-100 rounded-lg p-3">
                <User className="h-5 w-5 text-gray-500 mr-2" />
                <input
                  type="text"
                  value={formData.displayName}
                  onChange={(e) => setFormData({ ...formData, displayName: e.target.value })}
                  disabled={!editing}
                  className="bg-transparent flex-1 outline-none disabled:text-gray-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-gray-700 mb-2">Email</label>
              <div className="flex items-center bg-gray-100 rounded-lg p-3">
                <Mail className="h-5 w-5 text-gray-500 mr-2" />
                <input
                  type="email"
                  value={user?.email || ''}
                  disabled
                  className="bg-transparent flex-1 outline-none text-gray-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-gray-700 mb-2">Phone</label>
              <div className="flex items-center bg-gray-100 rounded-lg p-3">
                <Phone className="h-5 w-5 text-gray-500 mr-2" />
                <input
                  type="tel"
                  value={formData.phoneNumber}
                  onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })}
                  disabled={!editing}
                  className="bg-transparent flex-1 outline-none disabled:text-gray-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-gray-700 mb-2">Address</label>
              <div className="flex items-center bg-gray-100 rounded-lg p-3">
                <Home className="h-5 w-5 text-gray-500 mr-2" />
                <input
                  type="text"
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  disabled={!editing}
                  className="bg-transparent flex-1 outline-none disabled:text-gray-500"
                />
              </div>
            </div>

            <div className="flex gap-4">
              {editing ? (
                <>
                  <button
                    onClick={() => setEditing(false)}
                    className="flex-1 btn border border-primary text-primary hover:bg-primary/5"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSave}
                    className="flex-1 btn bg-primary hover:bg-primary-dark text-white"
                  >
                    Save Changes
                  </button>
                </>
              ) : (
                <button
                  onClick={() => setEditing(true)}
                  className="flex-1 btn bg-primary hover:bg-primary-dark text-white"
                >
                  Edit Profile
                </button>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ProfilePage;