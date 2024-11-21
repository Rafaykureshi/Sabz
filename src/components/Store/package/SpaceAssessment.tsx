import { motion } from 'framer-motion';
import { Sun, Cloud, Droplets } from 'lucide-react';
import { FormData } from '../CustomPackage';

interface Props {
  formData: FormData;
  updateFormData: (updates: Partial<FormData>) => void;
  onBack: () => void;
  onNext: () => void;
}

const SpaceAssessment = ({ formData, updateFormData, onBack, onNext }: Props) => {
  const spaceTypes = [
    { id: 'balcony', label: 'Balcony' },
    { id: 'terrace', label: 'Terrace' },
    { id: 'backyard', label: 'Backyard' },
    { id: 'indoor', label: 'Indoor' }
  ];

  const sunlightOptions = [
    { id: 'full', label: 'Full Sun', icon: Sun },
    { id: 'partial', label: 'Partial Sun', icon: Cloud },
    { id: 'shade', label: 'Shade', icon: Cloud }
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="bg-white p-8 rounded-xl shadow-lg"
    >
      <h2 className="text-2xl font-bold text-primary mb-6">Space Assessment</h2>
      
      <div className="space-y-8">
        <div>
          <h3 className="text-lg font-semibold mb-4">Space Type</h3>
          <div className="grid grid-cols-2 gap-4">
            {spaceTypes.map((type) => (
              <button
                key={type.id}
                onClick={() => updateFormData({
                  spaceDetails: { ...formData.spaceDetails, type: type.id }
                })}
                className={`p-4 rounded-lg border-2 transition-all ${
                  formData.spaceDetails.type === type.id
                    ? 'border-secondary bg-secondary/10'
                    : 'border-gray-200 hover:border-secondary/50'
                }`}
              >
                {type.label}
              </button>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-4">Space Size</h3>
          <input
            type="text"
            placeholder="Enter space dimensions (e.g., 10x10 ft)"
            value={formData.spaceDetails.size}
            onChange={(e) => updateFormData({
              spaceDetails: { ...formData.spaceDetails, size: e.target.value }
            })}
            className="w-full p-3 rounded-lg border border-gray-200 focus:border-secondary outline-none"
          />
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-4">Sunlight Availability</h3>
          <div className="grid grid-cols-3 gap-4">
            {sunlightOptions.map((option) => (
              <button
                key={option.id}
                onClick={() => updateFormData({
                  spaceDetails: { ...formData.spaceDetails, sunlight: option.id }
                })}
                className={`p-4 rounded-lg border-2 transition-all ${
                  formData.spaceDetails.sunlight === option.id
                    ? 'border-secondary bg-secondary/10'
                    : 'border-gray-200 hover:border-secondary/50'
                }`}
              >
                <div className="flex flex-col items-center gap-2">
                  <option.icon className="h-6 w-6" />
                  <span>{option.label}</span>
                </div>
              </button>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-4">Water Source</h3>
          <div className="flex items-center gap-4">
            <Droplets className="h-6 w-6 text-secondary" />
            <select
              value={formData.spaceDetails.waterSource}
              onChange={(e) => updateFormData({
                spaceDetails: { ...formData.spaceDetails, waterSource: e.target.value }
              })}
              className="flex-1 p-3 rounded-lg border border-gray-200 focus:border-secondary outline-none"
            >
              <option value="">Select water source</option>
              <option value="tap">Direct Tap Access</option>
              <option value="carried">Carried Water</option>
              <option value="rainwater">Rainwater Harvesting</option>
            </select>
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

export default SpaceAssessment;