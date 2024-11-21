import { motion } from 'framer-motion';
import { Flower2 } from 'lucide-react';
import { FormData } from '../../pages/StorePage';

interface Props {
  formData: FormData;
  setFormData: (data: FormData) => void;
  onBack: () => void;
  onSubmit: () => void;
}

const PreferencesForm = ({ formData, setFormData, onBack, onSubmit }: Props) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      className="bg-white p-8 rounded-xl shadow-lg"
    >
      <h2 className="text-2xl font-bold text-primary mb-6">Garden Preferences</h2>
      <div className="space-y-6">
        <div>
          <label className="block text-gray-700 mb-2">Available space for gardening</label>
          <div className="flex items-center bg-gray-100 rounded-lg p-3">
            <Flower2 className="h-5 w-5 text-gray-500 mr-2" />
            <select
              value={formData.spaceAvailable}
              onChange={(e) => setFormData({ ...formData, spaceAvailable: e.target.value })}
              className="bg-transparent flex-1 outline-none"
            >
              <option value="">Select available space</option>
              <option value="balcony">Balcony</option>
              <option value="terrace">Terrace</option>
              <option value="backyard">Backyard</option>
            </select>
          </div>
        </div>

        <div>
          <label className="block text-gray-700 mb-2">What would you like to grow?</label>
          <div className="grid grid-cols-2 gap-4">
            {['Vegetables', 'Herbs', 'Fruits', 'Flowers'].map((item) => (
              <label key={item} className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={formData.preferences.includes(item)}
                  onChange={(e) => {
                    const newPreferences = e.target.checked
                      ? [...formData.preferences, item]
                      : formData.preferences.filter(p => p !== item);
                    setFormData({ ...formData, preferences: newPreferences });
                  }}
                  className="form-checkbox h-5 w-5 text-secondary"
                />
                <span>{item}</span>
              </label>
            ))}
          </div>
        </div>

        <div className="flex gap-4">
          <button
            onClick={onBack}
            className="flex-1 btn border border-primary text-primary hover:bg-primary/5"
          >
            Back
          </button>
          <button
            onClick={onSubmit}
            className="flex-1 btn bg-primary hover:bg-primary-dark text-white"
          >
            Get Recommendation
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default PreferencesForm;