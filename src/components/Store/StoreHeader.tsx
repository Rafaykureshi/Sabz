import { motion } from 'framer-motion';
import { Package } from 'lucide-react';

const StoreHeader = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="text-center mb-16"
    >
      <div className="inline-flex items-center gap-2 bg-secondary/20 text-secondary px-4 py-2 rounded-full mb-4">
        <Package className="h-5 w-5" />
        <span className="font-medium">Personalized Garden Packages</span>
      </div>
      <h1 className="text-4xl font-bold text-primary mb-6">
        Get Your Custom Garden Package
      </h1>
      <p className="text-xl text-gray-600 max-w-2xl mx-auto">
        Tell us about your needs, and we'll recommend the perfect gardening package for you
      </p>
    </motion.div>
  );
};

export default StoreHeader;