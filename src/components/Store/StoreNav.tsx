import { Package, ShoppingBag, Heart } from 'lucide-react';
import { StoreSection } from '../../pages/StorePage';

interface Props {
  activeSection: StoreSection;
  onSectionChange: (section: StoreSection) => void;
}

const StoreNav = ({ activeSection, onSectionChange }: Props) => {
  const sections = [
    {
      id: 'products' as StoreSection,
      label: 'Shop Products',
      icon: ShoppingBag,
      description: 'Browse our gardening essentials'
    },
    {
      id: 'custom-package' as StoreSection,
      label: 'Custom Package',
      icon: Package,
      description: 'Get a personalized gardening kit'
    },
    {
      id: 'healthy-growing' as StoreSection,
      label: 'Healthy Growing',
      icon: Heart,
      description: 'Grow your wellness journey'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12">
      {sections.map((section) => (
        <button
          key={section.id}
          onClick={() => onSectionChange(section.id)}
          className={`p-6 rounded-xl transition-all ${
            activeSection === section.id
              ? 'bg-primary text-white shadow-lg scale-105'
              : 'bg-white text-primary hover:bg-primary/5'
          }`}
        >
          <div className="flex flex-col items-center text-center gap-2">
            <section.icon className={`h-8 w-8 ${
              activeSection === section.id ? 'text-secondary' : 'text-primary'
            }`} />
            <h3 className="text-lg font-semibold">{section.label}</h3>
            <p className={`text-sm ${
              activeSection === section.id ? 'text-white/80' : 'text-gray-600'
            }`}>
              {section.description}
            </p>
          </div>
        </button>
      ))}
    </div>
  );
};

export default StoreNav;