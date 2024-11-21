import { useState } from 'react';
import { Star, MapPin, Truck, MessageCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import ReviewSection from './ReviewSection';
import DeliveryScheduler from './DeliveryScheduler';

const mockReviews = [
  {
    id: '1',
    userId: 'user1',
    userName: 'John Doe',
    userImage: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80',
    rating: 5,
    comment: 'Amazing fresh produce! The tomatoes were incredibly flavorful.',
    date: new Date('2024-03-10'),
    likes: 12,
    hasLiked: true
  },
  {
    id: '2',
    userId: 'user2',
    userName: 'Jane Smith',
    userImage: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80',
    rating: 4,
    comment: 'Great quality vegetables. Delivery was prompt.',
    date: new Date('2024-03-09'),
    likes: 8
  }
];

const FarmerCard = () => {
  const [showReviews, setShowReviews] = useState(false);
  const [showScheduler, setShowScheduler] = useState(false);

  const handleSchedule = (details: any) => {
    console.log('Scheduled:', details);
    setShowScheduler(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-xl shadow-lg overflow-hidden"
    >
      <div className="relative">
        <img
          src="https://images.unsplash.com/photo-1595273670150-bd0c3c392e46?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
          alt="Urban Farm"
          className="w-full h-48 object-cover"
        />
        <div className="absolute top-4 right-4 bg-white/90 px-3 py-1 rounded-full flex items-center gap-1">
          <Star className="h-4 w-4 text-yellow-400 fill-current" />
          <span className="font-medium">4.8</span>
        </div>
      </div>

      <div className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div>
            <h3 className="text-xl font-semibold text-primary">Green Valley Farm</h3>
            <div className="flex items-center gap-2 text-gray-600 text-sm">
              <MapPin className="h-4 w-4" />
              <span>2.5 km away</span>
            </div>
          </div>
          <img
            src="https://images.unsplash.com/photo-1595273670150-bd0c3c392e46?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80"
            alt="Farmer"
            className="w-12 h-12 rounded-full border-2 border-white shadow"
          />
        </div>

        <div className="flex items-center gap-4 mb-6">
          <span className="px-3 py-1 bg-green-100 text-green-600 rounded-full text-sm">
            Organic Certified
          </span>
          <span className="px-3 py-1 bg-blue-100 text-blue-600 rounded-full text-sm">
            Free Delivery
          </span>
        </div>

        <div className="flex gap-4">
          <button 
            onClick={() => setShowScheduler(true)}
            className="flex-1 btn bg-primary hover:bg-primary-dark text-white"
          >
            <Truck className="h-5 w-5 mr-2" />
            Schedule Order
          </button>
          <button 
            onClick={() => setShowReviews(true)}
            className="btn border border-primary text-primary hover:bg-primary/5"
          >
            <MessageCircle className="h-5 w-5" />
          </button>
        </div>
      </div>

      <AnimatePresence>
        {showReviews && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="border-t"
          >
            <div className="p-6">
              <ReviewSection farmerId="123" reviews={mockReviews} />
            </div>
          </motion.div>
        )}

        {showScheduler && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="border-t"
          >
            <div className="p-6">
              <DeliveryScheduler farmerId="123" onSchedule={handleSchedule} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default FarmerCard;