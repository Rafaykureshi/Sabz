import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Filter, ShoppingCart, SlidersHorizontal, Star, TrendingUp } from 'lucide-react';
import ProductCard from './ProductCard';
import CartDrawer from './CartDrawer';
import { products, ProductCategory } from '../../data/products';

const ProductCatalog = () => {
  const [activeCategory, setActiveCategory] = useState<ProductCategory>('all');
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 5000]);
  const [sortBy, setSortBy] = useState<'price-asc' | 'price-desc' | 'popular' | 'newest'>('popular');
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [showFilters, setShowFilters] = useState(false);

  const categories = [
    { id: 'all', label: 'All Products' },
    { id: 'seeds', label: 'Seeds' },
    { id: 'tools', label: 'Tools' },
    { id: 'soil', label: 'Soil & Compost' },
    { id: 'planters', label: 'Planters' },
    { id: 'irrigation', label: 'Irrigation' }
  ];

  const sortOptions = [
    { id: 'popular', label: 'Most Popular', icon: Star },
    { id: 'newest', label: 'Newest', icon: TrendingUp },
    { id: 'price-asc', label: 'Price: Low to High', icon: TrendingUp },
    { id: 'price-desc', label: 'Price: High to Low', icon: TrendingUp }
  ];

  const filteredProducts = products
    .filter(p => activeCategory === 'all' || p.category === activeCategory)
    .filter(p => p.price >= priceRange[0] && p.price <= priceRange[1])
    .sort((a, b) => {
      switch (sortBy) {
        case 'price-asc':
          return a.price - b.price;
        case 'price-desc':
          return b.price - a.price;
        case 'popular':
          return (b.rating || 0) - (a.rating || 0);
        case 'newest':
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
        default:
          return 0;
      }
    });

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-4">
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="p-2 rounded-lg bg-primary text-white"
          >
            <Filter className="h-5 w-5" />
          </button>
          <div className="flex gap-2 overflow-x-auto pb-2">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id as ProductCategory)}
                className={`px-4 py-2 rounded-full text-sm transition-all whitespace-nowrap ${
                  activeCategory === category.id
                    ? 'bg-primary text-white'
                    : 'bg-white text-primary hover:bg-primary/5'
                }`}
              >
                {category.label}
              </button>
            ))}
          </div>
        </div>
        <button 
          onClick={() => setIsCartOpen(true)}
          className="btn btn-secondary flex items-center gap-2"
        >
          <ShoppingCart className="h-5 w-5" />
          <span>Cart (0)</span>
        </button>
      </div>

      <AnimatePresence>
        {showFilters && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="mb-8 bg-white p-6 rounded-xl shadow-lg"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                  <SlidersHorizontal className="h-5 w-5" />
                  Price Range
                </h3>
                <div className="space-y-4">
                  <input
                    type="range"
                    min="0"
                    max="5000"
                    value={priceRange[1]}
                    onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                    className="w-full"
                  />
                  <div className="flex justify-between text-sm text-gray-600">
                    <span>₹{priceRange[0]}</span>
                    <span>₹{priceRange[1]}</span>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-4">Sort By</h3>
                <div className="grid grid-cols-2 gap-2">
                  {sortOptions.map((option) => (
                    <button
                      key={option.id}
                      onClick={() => setSortBy(option.id as any)}
                      className={`p-2 rounded-lg flex items-center gap-2 ${
                        sortBy === option.id
                          ? 'bg-secondary text-white'
                          : 'bg-gray-100 hover:bg-gray-200'
                      }`}
                    >
                      <option.icon className="h-4 w-4" />
                      <span className="text-sm">{option.label}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </div>
  );
};

export default ProductCatalog;