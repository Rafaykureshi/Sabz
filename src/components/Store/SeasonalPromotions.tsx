import { motion } from 'framer-motion';
import { Calendar, Tag } from 'lucide-react';
import { promotionService } from '../../services/promotionService';
import { useEffect, useState } from 'react';
import LoadingSpinner from '../LoadingSpinner';

interface Promotion {
  id: string;
  title: string;
  description: string;
  type: 'discount' | 'bogo' | 'bundle';
  value: number;
  minPurchase?: number;
  startDate: Date;
  endDate: Date;
}

const SeasonalPromotions = () => {
  const [promotions, setPromotions] = useState<Promotion[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadPromotions = async () => {
      try {
        const activePromotions = await promotionService.getActivePromotions();
        setPromotions(activePromotions);
      } catch (error) {
        console.error('Error loading promotions:', error);
      } finally {
        setLoading(false);
      }
    };

    loadPromotions();
  }, []);

  if (loading) {
    return <LoadingSpinner />;
  }

  if (promotions.length === 0) return null;

  return (
    <section className="py-12 bg-gradient-to-b from-primary/5 to-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 bg-secondary/20 text-secondary px-4 py-2 rounded-full mb-4"
          >
            <Calendar className="h-5 w-5" />
            <span className="font-medium">Seasonal Offers</span>
          </motion.div>
          <h2 className="text-3xl font-bold text-primary mb-4">
            Limited Time Promotions
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Take advantage of our seasonal deals and save on your gardening essentials
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {promotions.map((promo, index) => (
            <motion.div
              key={promo.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white p-6 rounded-xl shadow-lg relative overflow-hidden"
            >
              {/* Decorative background pattern */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-secondary/10 rounded-full -translate-y-16 translate-x-16" />
              
              <div className="relative">
                <div className="flex items-center gap-3 mb-4">
                  <Tag className="h-6 w-6 text-secondary" />
                  <h3 className="font-semibold text-primary">{promo.title}</h3>
                </div>

                <p className="text-gray-600 mb-4">{promo.description}</p>

                <div className="space-y-2 mb-6">
                  {promo.type === 'discount' && (
                    <div className="text-2xl font-bold text-primary">
                      {promo.value}% OFF
                    </div>
                  )}
                  {promo.type === 'bogo' && (
                    <div className="text-xl font-bold text-primary">
                      Buy One Get One Free
                    </div>
                  )}
                  {promo.minPurchase && (
                    <div className="text-sm text-gray-500">
                      Minimum purchase: ₹{promo.minPurchase}
                    </div>
                  )}
                </div>

                <div className="flex items-center justify-between text-sm text-gray-500">
                  <span>Valid until:</span>
                  <span>{new Date(promo.endDate).toLocaleDateString()}</span>
                </div>

                <button className="w-full btn bg-primary hover:bg-primary-dark text-white mt-4">
                  Shop Now
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SeasonalPromotions;