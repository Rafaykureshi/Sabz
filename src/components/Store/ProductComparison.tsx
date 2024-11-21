import { useState } from 'react';
import { motion } from 'framer-motion';
import { X, Plus, Check } from 'lucide-react';
import { Product } from '../../types/models';

interface Props {
  products: Product[];
  onClose: () => void;
}

const ProductComparison = ({ products, onClose }: Props) => {
  const features = [
    'Price',
    'Category',
    'Organic',
    'Stock',
    'Delivery Options',
    'Return Policy'
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="relative bg-white rounded-xl shadow-xl w-full max-w-4xl max-h-[80vh] overflow-auto"
      >
        <div className="sticky top-0 bg-white p-4 border-b flex items-center justify-between">
          <h3 className="font-semibold text-primary">Product Comparison</h3>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full">
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="p-6">
          <div className="grid grid-cols-[200px_repeat(auto-fit,minmax(200px,1fr))] gap-6">
            {/* Header */}
            <div className="pt-20"></div>
            {products.map((product) => (
              <div key={product.id} className="text-center">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-48 object-cover rounded-lg mb-4"
                />
                <h4 className="font-semibold text-primary">{product.name}</h4>
                <p className="text-sm text-gray-600">{product.description}</p>
              </div>
            ))}

            {/* Features */}
            {features.map((feature) => (
              <div key={feature} className="contents">
                <div className="font-medium text-gray-700 py-4 border-t">
                  {feature}
                </div>
                {products.map((product) => (
                  <div key={`${product.id}-${feature}`} className="py-4 border-t text-center">
                    {feature === 'Price' && `₹${product.price}`}
                    {feature === 'Category' && product.category}
                    {feature === 'Organic' && (
                      product.organic ? (
                        <Check className="h-5 w-5 text-green-500 mx-auto" />
                      ) : (
                        <X className="h-5 w-5 text-red-500 mx-auto" />
                      )
                    )}
                    {feature === 'Stock' && product.stock}
                    {/* Add more feature comparisons */}
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default ProductComparison;