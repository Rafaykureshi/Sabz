import { createContext, useContext, useState, ReactNode } from 'react';
import { MarketplaceProduct, Farmer } from '../types/marketplace';

interface MarketplaceContextType {
  selectedProducts: MarketplaceProduct[];
  selectedFarmers: Farmer[];
  filters: {
    category?: string;
    priceRange?: [number, number];
    rating?: number;
    location?: string;
  };
  addProduct: (product: MarketplaceProduct) => void;
  removeProduct: (productId: string) => void;
  addFarmer: (farmer: Farmer) => void;
  removeFarmer: (farmerId: string) => void;
  updateFilters: (newFilters: Partial<MarketplaceContextType['filters']>) => void;
  clearAll: () => void;
}

const MarketplaceContext = createContext<MarketplaceContextType>({
  selectedProducts: [],
  selectedFarmers: [],
  filters: {},
  addProduct: () => {},
  removeProduct: () => {},
  addFarmer: () => {},
  removeFarmer: () => {},
  updateFilters: () => {},
  clearAll: () => {}
});

export const useMarketplace = () => useContext(MarketplaceContext);

export const MarketplaceProvider = ({ children }: { children: ReactNode }) => {
  const [selectedProducts, setSelectedProducts] = useState<MarketplaceProduct[]>([]);
  const [selectedFarmers, setSelectedFarmers] = useState<Farmer[]>([]);
  const [filters, setFilters] = useState<MarketplaceContextType['filters']>({});

  const addProduct = (product: MarketplaceProduct) => {
    setSelectedProducts(prev => [...prev, product]);
  };

  const removeProduct = (productId: string) => {
    setSelectedProducts(prev => prev.filter(p => p.id !== productId));
  };

  const addFarmer = (farmer: Farmer) => {
    setSelectedFarmers(prev => [...prev, farmer]);
  };

  const removeFarmer = (farmerId: string) => {
    setSelectedFarmers(prev => prev.filter(f => f.id !== farmerId));
  };

  const updateFilters = (newFilters: Partial<MarketplaceContextType['filters']>) => {
    setFilters(prev => ({ ...prev, ...newFilters }));
  };

  const clearAll = () => {
    setSelectedProducts([]);
    setSelectedFarmers([]);
    setFilters({});
  };

  return (
    <MarketplaceContext.Provider
      value={{
        selectedProducts,
        selectedFarmers,
        filters,
        addProduct,
        removeProduct,
        addFarmer,
        removeFarmer,
        updateFilters,
        clearAll
      }}
    >
      {children}
    </MarketplaceContext.Provider>
  );
};