import { motion } from 'framer-motion';
import { Users, ShoppingBasket } from 'lucide-react';
import { FormData } from '../CustomPackage';

interface Props {
  formData: FormData;
  updateFormData: (updates: Partial<FormData>) => void;
  onNext: () => void;
}

const BasicInfoForm = ({ formData, updateFormData, onNext }: Props) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="bg-white p-8 rounded-xl shadow-lg"
    >
      <h2 className="text-2xl font-bold text-primary mb-6">Basic Information</h2>
      
      <div className="space-y-6">
        <div>
          <label className="block text-gray-700 mb-2">Family Size</label>
          <div className="flex items-center bg-gray-100 rounded-lg p-3">
            <Users className="h-5 w-5 text-gray-500 mr-2" />
            <input
              type="number"
              value={formData.familySize}
              onChange={(e) => updateFormData({ familySize: e.target.value })}
              placeholder="Number of family members"
              className="bg-transparent flex-1 outline-none"
            />
          </div>
        </div>

        <div>
          <label className="block text-gray-700 mb-2">Monthly Grocery Budget</label>
          <div className="flex items-center bg-gray-100 rounded-lg p-3">
            <ShoppingBasket className="h-5 w-5 text-gray-500 mr-2" />
            <input
              type="number"
              value={formData.monthlySpend}
              onChange={(e) => updateFormData({ monthlySpend: e.target.value })}
              placeholder="Monthly spend on vegetables/fruits (₹)"
              className="bg-transparent flex-1 outline-none"
            />
          </div>
        </div>

        <button
          onClick={onNext}
          className="w-full btn bg-primary hover:bg-primary-dark text-white"
        >
          Next Step
        </button>
      </div>
    </motion.div>
  );
};

export default BasicInfoForm;