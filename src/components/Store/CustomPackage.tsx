import { useState } from 'react';
import { motion } from 'framer-motion';
import PackageSteps from './package/PackageSteps';
import BasicInfoForm from './package/BasicInfoForm';
import PreferencesForm from './package/PreferencesForm';
import SpaceAssessment from './package/SpaceAssessment';
import PackageComparison from './package/PackageComparison';
import ExpertConsultation from './package/ExpertConsultation';
import PackageRecommendation from './package/PackageRecommendation';

export interface FormData {
  familySize: string;
  monthlySpend: string;
  spaceAvailable: string;
  preferences: string[];
  spaceDetails: {
    type: string;
    size: string;
    sunlight: string;
    waterSource: string;
  };
  maintenanceLevel: 'low' | 'medium' | 'high';
}

const steps = [
  { id: 1, title: 'Basic Info' },
  { id: 2, title: 'Space Assessment' },
  { id: 3, title: 'Preferences' },
  { id: 4, title: 'Package Options' },
  { id: 5, title: 'Expert Review' }
];

const CustomPackage = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<FormData>({
    familySize: '',
    monthlySpend: '',
    spaceAvailable: '',
    preferences: [],
    spaceDetails: {
      type: '',
      size: '',
      sunlight: '',
      waterSource: ''
    },
    maintenanceLevel: 'medium'
  });

  const updateFormData = (updates: Partial<FormData>) => {
    setFormData(prev => ({ ...prev, ...updates }));
  };

  return (
    <div className="max-w-4xl mx-auto">
      <PackageSteps currentStep={step} steps={steps} />

      <motion.div
        key={step}
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -20 }}
        className="mt-8"
      >
        {step === 1 && (
          <BasicInfoForm
            formData={formData}
            updateFormData={updateFormData}
            onNext={() => setStep(2)}
          />
        )}

        {step === 2 && (
          <SpaceAssessment
            formData={formData}
            updateFormData={updateFormData}
            onBack={() => setStep(1)}
            onNext={() => setStep(3)}
          />
        )}

        {step === 3 && (
          <PreferencesForm
            formData={formData}
            updateFormData={updateFormData}
            onBack={() => setStep(2)}
            onNext={() => setStep(4)}
          />
        )}

        {step === 4 && (
          <PackageComparison
            formData={formData}
            onBack={() => setStep(3)}
            onNext={() => setStep(5)}
          />
        )}

        {step === 5 && (
          <ExpertConsultation
            formData={formData}
            onBack={() => setStep(4)}
            onComplete={() => {
              // Handle completion
            }}
          />
        )}
      </motion.div>
    </div>
  );
};

export default CustomPackage;