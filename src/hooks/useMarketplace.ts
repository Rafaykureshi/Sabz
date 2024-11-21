import { useState, useEffect } from 'react';
import { getFarmers, getProducts } from '../services/marketplaceService';
import { Farmer, MarketplaceProduct } from '../types/marketplace';

export const useMarketplace = (initialFilters = {}) => {
  const [farmers, setFarmers] = useState<Farmer[]>([]);
  const [products, setProducts] = useState<MarketplaceProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filters, setFilters] = useState(initialFilters);

  useEffect(() => {
    const loadMarketplace = async () => {
      try {
        setLoading(true);
        const [farmersData, productsData] = await Promise.all([
          getFarmers(filters),
          getProducts(filters)
        ]);
        
        setFarmers(farmersData);
        setProducts(productsData);
        setError(null);
      } catch (err) {
        setError('Failed to load marketplace data');
        console.error('Marketplace error:', err);
      } finally {
        setLoading(false);
      }
    };

    loadMarketplace();
  }, [filters]);

  const updateFilters = (newFilters: any) => {
    setFilters({ ...filters, ...newFilters });
  };

  return {
    farmers,
    products,
    loading,
    error,
    filters,
    updateFilters
  };
};