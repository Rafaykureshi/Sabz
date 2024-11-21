import { motion } from 'framer-motion';
import { Users, ShoppingBasket, ArrowRight } from 'lucide-react';
import { FormData } from '../../pages/StorePage';

interface Props {
  formData: FormData;
  setFormData: (data: FormData) => void;
  onNext: () => void;
}

const BasicInfoForm = ({ formData, setFormData, onNext }: Props) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      className="bg-white p-8 rounded-xl shadow-lg"
    >
      <h2 className="text-2xl font-bold text-primary mb-6">Basic Information</h2>
      <div className="space-y-6">
        <div>
          <label className="block text-gray-700 mb-2">How many family members?</label>
          <div className="flex items-center bg-gray-100 rounded-lg p-3">
            <Users className="h-5 w-5 text-gray-500 mr-2" />
            <input
              type="number"
              value={formData.familySize}
              onChange={(e) => setFormData({ ...formData, familySize: e.target.value })}
              className="bg-transparent flex-1 outline-none"
              placeholder="Enter number of family members"
            />
          </div>
        </div>

        <div>
          <label className="block text-gray-700 mb-2">Monthly spending on vegetables/fruits (₹)</label>
          <div className="flex items-center bg-gray-100 rounded-lg p-3">
            <ShoppingBasket className="h-5 w-5 text-gray-500 mr-2" />
            <input
              type="number"
              value={formData.monthlySpend}
              onChange={(e) => setFormData({ ...formData, monthlySpend: e.target.value })}
              className="bg-transparent flex-1 outline-none"
              placeholder="Enter monthly spend"
            />
          </div>
        </div>

        <button
          onClick={onNext}
          className="w-full btn bg-primary hover:bg-primary-dark text-white"
        >
          Next Step
          <ArrowRight className="h-5 w-5 ml-2" />
        </button>
      </div>
    </motion.div>
  );
};

export default BasicInfoForm;