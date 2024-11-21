import { motion } from 'framer-motion';
import { Package, ArrowRight } from 'lucide-react';
import { bundleService } from '../../services/bundleService';
import { useEffect, useState } from 'react';
import LoadingSpinner from '../LoadingSpinner';

interface Bundle {
  id: string;
  name: string;
  description: string;
  products: Array<{
    productId: string;
    quantity: number;
  }>;
  price: number;
  discount: number;
  startDate: Date;
  endDate: Date;
}

const BundleDeals = () => {
  const [bundles, setBundles] = useState<Bundle[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadBundles = async () => {
      try {
        const activeBundles = await bundleService.getActiveBundles();
        setBundles(activeBundles);
      } catch (error) {
        console.error('Error loading bundles:', error);
      } finally {
        setLoading(false);
      }
    };

    loadBundles();
  }, []);

  if (loading) {
    return <LoadingSpinner />;
  }

  if (bundles.length === 0) return null;

  return (
    <section className="py-12">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl font-bold text-primary mb-2">Bundle Deals</h2>
            <p className="text-gray-600">Save more with our curated bundles</p>
          </div>
          <button className="text-secondary hover:text-secondary-dark flex items-center gap-2">
            View All
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {bundles.map((bundle, index) => (
            <motion.div
              key={bundle.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white p-6 rounded-xl shadow-lg"
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="p-3 bg-secondary/20 rounded-full">
                  <Package className="h-6 w-6 text-secondary" />
                </div>
                <div>
                  <h3 className="font-semibold text-primary">{bundle.name}</h3>
                  <p className="text-sm text-gray-600">{bundle.description}</p>
                </div>
              </div>

              <div className="space-y-2 mb-4">
                <div className="flex items-center justify-between text-sm text-gray-600">
                  <span>Regular Price</span>
                  <span className="line-through">₹{bundle.price}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="font-medium">Bundle Price</span>
                  <span className="text-xl font-bold text-primary">
                    ₹{bundle.price - (bundle.price * bundle.discount)}
                  </span>
                </div>
                <div className="text-sm text-green-500">
                  Save {bundle.discount * 100}%
                </div>
              </div>

              <button className="w-full btn bg-primary hover:bg-primary-dark text-white">
                Add Bundle to Cart
              </button>

              <p className="text-xs text-gray-500 mt-4 text-center">
                Offer valid until {new Date(bundle.endDate).toLocaleDateString()}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BundleDeals;