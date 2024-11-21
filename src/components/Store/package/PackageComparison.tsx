import { motion } from 'framer-motion';
import { Check, X } from 'lucide-react';
import { FormData } from '../CustomPackage';

interface Props {
  formData: FormData;
  onBack: () => void;
  onNext: () => void;
}

const packages = [
  {
    id: 'starter',
    name: 'Starter Package',
    price: 1499,
    features: [
      'Essential gardening tools',
      'Basic soil mix',
      'Seasonal seeds',
      'Basic planters',
      'Getting started guide'
    ]
  },
  {
    id: 'premium',
    name: 'Premium Package',
    price: 2999,
    features: [
      'Professional tool set',
      'Premium soil & fertilizers',
      'Year-round seeds',
      'Self-watering planters',
      'Smart monitoring tools',
      'Expert consultation',
      'Monthly maintenance guide'
    ]
  },
  {
    id: 'custom',
    name: 'Custom Package',
    price: null,
    features: [
      'Tailored to your space',
      'Personalized plant selection',
      'Custom soil mix',
      'Specialized tools',
      'Expert guidance',
      'Maintenance schedule',
      'Growth tracking'
    ]
  }
];

const PackageComparison = ({ formData, onBack, onNext }: Props) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="bg-white p-8 rounded-xl shadow-lg"
    >
      <h2 className="text-2xl font-bold text-primary mb-6">Choose Your Package</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {packages.map((pkg) => (
          <div
            key={pkg.id}
            className="border-2 border-gray-200 rounded-xl p-6 hover:border-secondary transition-all"
          >
            <h3 className="text-xl font-bold text-primary mb-2">{pkg.name}</h3>
            {pkg.price ? (
              <p className="text-2xl font-bold text-secondary mb-4">
                ₹{pkg.price}
              </p>
            ) : (
              <p className="text-2xl font-bold text-secondary mb-4">
                Custom Price
              </p>
            )}
            <ul className="space-y-3">
              {pkg.features.map((feature, index) => (
                <li key={index} className="flex items-center gap-2">
                  <Check className="h-5 w-5 text-secondary" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
            <button
              onClick={onNext}
              className="w-full btn bg-primary hover:bg-primary-dark text-white mt-6"
            >
              Select Package
            </button>
          </div>
        ))}
      </div>

      <div className="flex gap-4">
        <button
          onClick={onBack}
          className="flex-1 btn border border-primary text-primary hover:bg-primary/5"
        >
          Back
        </button>
      </div>
    </motion.div>
  );
};

export default PackageComparison;