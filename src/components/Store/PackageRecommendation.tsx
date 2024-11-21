import { motion } from 'framer-motion';
import { Flower2 } from 'lucide-react';
import { RecommendationPackage } from '../../pages/StorePage';

interface Props {
  recommendation: RecommendationPackage;
  onStartOver: () => void;
}

const PackageRecommendation = ({ recommendation, onStartOver }: Props) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      className="bg-white p-8 rounded-xl shadow-lg"
    >
      <h2 className="text-2xl font-bold text-primary mb-6">Your Recommended Package</h2>
      <div className="space-y-6">
        <div className="bg-secondary/10 p-6 rounded-lg">
          <h3 className="text-xl font-semibold text-primary mb-4">{recommendation.title}</h3>
          <ul className="space-y-2 mb-6">
            {recommendation.items.map((item, index) => (
              <li key={index} className="flex items-center gap-2">
                <Flower2 className="h-5 w-5 text-secondary" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
          <div className="flex items-center justify-between p-4 bg-white rounded-lg">
            <div>
              <p className="text-sm text-gray-600">One-time investment</p>
              <p className="text-2xl font-bold text-primary">₹{recommendation.price.toFixed(2)}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Monthly savings</p>
              <p className="text-2xl font-bold text-green-500">₹{recommendation.savings.toFixed(2)}</p>
            </div>
          </div>
        </div>

        <div className="flex gap-4">
          <button
            onClick={onStartOver}
            className="flex-1 btn border border-primary text-primary hover:bg-primary/5"
          >
            Start Over
          </button>
          <button
            className="flex-1 btn bg-primary hover:bg-primary-dark text-white"
          >
            Order Package
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default PackageRecommendation;