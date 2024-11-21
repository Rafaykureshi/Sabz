import { motion } from 'framer-motion';
import { Leaf, Clock } from 'lucide-react';
import { FormData } from '../CustomPackage';

interface Props {
  formData: FormData;
  updateFormData: (updates: Partial<FormData>) => void;
  onBack: () => void;
  onNext: () => void;
}

const PreferencesForm = ({ formData, updateFormData, onBack, onNext }: Props) => {
  const preferences = [
    'Vegetables',
    'Herbs',
    'Fruits',
    'Flowers',
    'Organic Only',
    'Low Maintenance',
    'Kid-Friendly',
    'Pet-Safe'
  ];

  const maintenanceLevels = [
    { value: 'low', label: 'Low (2-3 hours/week)' },
    { value: 'medium', label: 'Medium (4-6 hours/week)' },
    { value: 'high', label: 'High (7+ hours/week)' }
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="bg-white p-8 rounded-xl shadow-lg"
    >
      <h2 className="text-2xl font-bold text-primary mb-6">Garden Preferences</h2>
      
      <div className="space-y-8">
        <div>
          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <Leaf className="h-5 w-5 text-secondary" />
            What would you like to grow?
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {preferences.map((pref) => (
              <label
                key={pref}
                className="flex items-center gap-2 cursor-pointer"
              >
                <input
                  type="checkbox"
                  checked={formData.preferences.includes(pref)}
                  onChange={(e) => {
                    const newPrefs = e.target.checked
                      ? [...formData.preferences, pref]
                      : formData.preferences.filter(p => p !== pref);
                    updateFormData({ preferences: newPrefs });
                  }}
                  className="rounded border-gray-300 text-secondary focus:ring-secondary"
                />
                <span>{pref}</span>
              </label>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <Clock className="h-5 w-5 text-secondary" />
            Maintenance Level
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {maintenanceLevels.map((level) => (
              <button
                key={level.value}
                onClick={() => updateFormData({ maintenanceLevel: level.value as any })}
                className={`p-4 rounded-lg border-2 transition-all ${
                  formData.maintenanceLevel === level.value
                    ? 'border-secondary bg-secondary/10'
                    : 'border-gray-200 hover:border-secondary/50'
                }`}
              >
                {level.label}
              </button>
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
            onClick={onNext}
            className="flex-1 btn bg-primary hover:bg-primary-dark text-white"
          >
            Next
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default PreferencesForm;