import { motion } from 'framer-motion';
import { ShoppingCart, Heart } from 'lucide-react';
import { Product } from '../../data/products';
import { useCart } from './CartContext';

interface Props {
  product: Product;
}

const ProductCard = ({ product }: Props) => {
  const { addItem } = useCart();

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="bg-white rounded-xl shadow-lg overflow-hidden group"
    >
      <div className="relative overflow-hidden">
        <img 
          src={product.image} 
          alt={product.name}
          className="w-full h-48 object-cover transition-transform group-hover:scale-110"
        />
        <button className="absolute top-4 right-4 p-2 rounded-full bg-white/80 hover:bg-white text-primary transition-all">
          <Heart className="h-5 w-5" />
        </button>
      </div>
      
      <div className="p-4">
        <div className="flex items-start justify-between mb-2">
          <div>
            <h3 className="font-semibold text-primary">{product.name}</h3>
            <p className="text-sm text-gray-600">{product.description}</p>
          </div>
          <span className="text-lg font-bold text-primary">₹{product.price}</span>
        </div>

        <button 
          onClick={() => addItem(product)}
          className="w-full btn bg-primary hover:bg-primary-dark text-white flex items-center justify-center gap-2"
        >
          <ShoppingCart className="h-5 w-5" />
          Add to Cart
        </button>
      </div>
    </motion.div>
  );
};

export default ProductCard;