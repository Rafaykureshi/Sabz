import { createContext, useContext, useState } from 'react';
import { MarketplaceProduct } from '../../types/marketplace';

interface MarketplaceContextType {
  selectedProducts: MarketplaceProduct[];
  addToSelection: (product: MarketplaceProduct) => void;
  removeFromSelection: (productId: string) => void;
  clearSelection: () => void;
}

const MarketplaceContext = createContext<MarketplaceContextType>({
  selectedProducts: [],
  addToSelection: () => {},
  removeFromSelection: () => {},
  clearSelection: () => {}
});

export const useMarketplaceContext = () => useContext(MarketplaceContext);

export const MarketplaceProvider = ({ children }: { children: React.ReactNode }) => {
  const [selectedProducts, setSelectedProducts] = useState<MarketplaceProduct[]>([]);

  const addToSelection = (product: MarketplaceProduct) => {
    setSelectedProducts(prev => [...prev, product]);
  };

  const removeFromSelection = (productId: string) => {
    setSelectedProducts(prev => prev.filter(p => p.id !== productId));
  };

  const clearSelection = () => {
    setSelectedProducts([]);
  };

  return (
    <MarketplaceContext.Provider
      value={{
        selectedProducts,
        addToSelection,
        removeFromSelection,
        clearSelection
      }}
    >
      {children}
    </MarketplaceContext.Provider>
  );
};