import { useState } from 'react';
import { motion } from 'framer-motion';
import { Filter, MapPin, Star, TrendingUp, Users } from 'lucide-react';
import MarketplaceFilters from '../components/marketplace/MarketplaceFilters';
import FarmerCard from '../components/marketplace/FarmerCard';
import ProductGrid from '../components/marketplace/ProductGrid';
import MarketMap from '../components/marketplace/MarketMap';
import { useMediaQuery } from '../hooks/useMediaQuery';

type ViewMode = 'grid' | 'map';

const MarketplacePage = () => {
  const [viewMode, setViewMode] = useState<ViewMode>('grid');
  const [showFilters, setShowFilters] = useState(false);
  const isMobile = useMediaQuery('(max-width: 768px)');

  return (
    <div className="py-32 bg-gradient-to-b from-white to-primary/5 min-h-screen">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 bg-secondary/20 text-secondary px-4 py-2 rounded-full mb-4"
          >
            <Users className="h-5 w-5" />
            <span className="font-medium">Local Urban Farmers</span>
          </motion.div>
          <h1 className="text-4xl font-bold text-primary mb-6">
            Fresh From Your Neighborhood
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Connect directly with urban farmers in your area and get fresh, organic produce
          </p>
        </div>

        <div className="flex flex-col md:flex-row gap-8">
          {/* Filters Section */}
          <div className={`${showFilters ? 'block' : 'hidden md:block'} w-full md:w-64 flex-shrink-0`}>
            <MarketplaceFilters onClose={() => setShowFilters(false)} />
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {/* View Controls */}
            <div className="flex items-center justify-between mb-6">
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="md:hidden p-2 rounded-lg bg-white shadow-sm"
              >
                <Filter className="h-5 w-5" />
              </button>

              <div className="flex items-center gap-4">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 rounded-lg ${
                    viewMode === 'grid' ? 'bg-primary text-white' : 'bg-white'
                  }`}
                >
                  <TrendingUp className="h-5 w-5" />
                </button>
                <button
                  onClick={() => setViewMode('map')}
                  className={`p-2 rounded-lg ${
                    viewMode === 'map' ? 'bg-primary text-white' : 'bg-white'
                  }`}
                >
                  <MapPin className="h-5 w-5" />
                </button>
              </div>
            </div>

            {/* Content View */}
            {viewMode === 'grid' ? (
              <div className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FarmerCard />
                  <FarmerCard />
                </div>
                <ProductGrid />
              </div>
            ) : (
              <MarketMap />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MarketplacePage;