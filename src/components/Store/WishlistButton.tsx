import { useState } from 'react';
import { Heart } from 'lucide-react';
import { motion } from 'framer-motion';
import { useAuth } from '../../contexts/AuthContext';
import { wishlistService } from '../../services/wishlistService';

interface Props {
  productId: string;
  initialState?: boolean;
}

const WishlistButton = ({ productId, initialState = false }: Props) => {
  const { user } = useAuth();
  const [isWishlisted, setIsWishlisted] = useState(initialState);
  const [isLoading, setIsLoading] = useState(false);

  const handleClick = async () => {
    if (!user) {
      // Handle not logged in state
      return;
    }

    setIsLoading(true);
    try {
      if (isWishlisted) {
        await wishlistService.removeFromWishlist(productId);
      } else {
        await wishlistService.addToWishlist(user.uid, productId);
      }
      setIsWishlisted(!isWishlisted);
    } catch (error) {
      console.error('Error updating wishlist:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <motion.button
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      onClick={handleClick}
      disabled={isLoading}
      className={`p-2 rounded-full transition-colors ${
        isWishlisted 
          ? 'bg-red-50 text-red-500' 
          : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
      }`}
    >
      <Heart className={`h-5 w-5 ${isWishlisted ? 'fill-current' : ''}`} />
    </motion.button>
  );
};

export default WishlistButton;