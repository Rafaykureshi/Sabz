import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Product } from '../../types/models';
import ProductCard from './ProductCard';

interface Props {
  currentProduct: Product;
  products: Product[];
}

const RelatedProducts = ({ currentProduct, products }: Props) => {
  // Filter related products based on category and exclude current product
  const relatedProducts = products
    .filter(p => 
      p.category === currentProduct.category && 
      p.id !== currentProduct.id
    )
    .slice(0, 4);

  if (relatedProducts.length === 0) return null;

  return (
    <div className="mt-12">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-semibold text-primary">Related Products</h3>
        <button className="text-secondary hover:text-secondary-dark flex items-center gap-2">
          View All
          <ArrowRight className="h-4 w-4" />
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {relatedProducts.map((product, index) => (
          <motion.div
            key={product.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <ProductCard product={product} />
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default RelatedProducts;