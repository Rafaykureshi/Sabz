import { useState } from 'react';
import { motion } from 'framer-motion';
import StoreHeader from '../components/store/StoreHeader';
import StoreNav from '../components/store/StoreNav';
import ProductCatalog from '../components/store/ProductCatalog';
import CustomPackage from '../components/store/CustomPackage';
import HealthyGrowing from '../components/store/HealthyGrowing';

export type StoreSection = 'products' | 'custom-package' | 'healthy-growing';

const StorePage = () => {
  const [activeSection, setActiveSection] = useState<StoreSection>('products');

  return (
    <div className="py-32 bg-gradient-to-b from-white to-primary/5 min-h-screen">
      <div className="max-w-7xl mx-auto px-6">
        <StoreHeader />
        <StoreNav activeSection={activeSection} onSectionChange={setActiveSection} />
        
        <motion.div
          key={activeSection}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
        >
          {activeSection === 'products' && <ProductCatalog />}
          {activeSection === 'custom-package' && <CustomPackage />}
          {activeSection === 'healthy-growing' && <HealthyGrowing />}
        </motion.div>
      </div>
    </div>
  );
};

export default StorePage;