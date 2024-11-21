import { motion } from 'framer-motion';
import { ShoppingCart, Heart } from 'lucide-react';

const products = [
  {
    id: 1,
    name: 'Fresh Organic Tomatoes',
    price: 40,
    unit: 'per kg',
    image: 'https://images.unsplash.com/photo-1592921870789-04563d55041c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    farmer: 'Green Valley Farm'
  },
  {
    id: 2,
    name: 'Mixed Salad Greens',
    price: 60,
    unit: 'per 250g',
    image: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    farmer: 'Urban Greens'
  },
  // Add more products as needed
];

const ProductGrid = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {products.map((product) => (
        <motion.div
          key={product.id}
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
                <p className="text-sm text-gray-600">{product.farmer}</p>
              </div>
              <div className="text-right">
                <p className="text-lg font-bold text-primary">₹{product.price}</p>
                <p className="text-sm text-gray-600">{product.unit}</p>
              </div>
            </div>

            <button className="w-full btn bg-primary hover:bg-primary-dark text-white flex items-center justify-center gap-2">
              <ShoppingCart className="h-5 w-5" />
              Add to Cart
            </button>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default ProductGrid;