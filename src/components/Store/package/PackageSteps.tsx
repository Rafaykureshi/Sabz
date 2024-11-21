import { Check } from 'lucide-react';

interface Step {
  id: number;
  title: string;
}

interface Props {
  steps: Step[];
  currentStep: number;
}

const PackageSteps = ({ steps, currentStep }: Props) => {
  return (
    <div className="relative">
      <div className="absolute top-1/2 left-0 w-full h-0.5 bg-gray-200 -translate-y-1/2" />
      
      <div className="relative flex justify-between">
        {steps.map((step) => (
          <div
            key={step.id}
            className={`flex flex-col items-center ${
              step.id < currentStep
                ? 'text-secondary'
                : step.id === currentStep
                ? 'text-primary'
                : 'text-gray-400'
            }`}
          >
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center ${
                step.id < currentStep
                  ? 'bg-secondary text-white'
                  : step.id === currentStep
                  ? 'bg-primary text-white'
                  : 'bg-gray-200'
              }`}
            >
              {step.id < currentStep ? (
                <Check className="h-5 w-5" />
              ) : (
                step.id
              )}
            </div>
            <span className="mt-2 text-sm font-medium">{step.title}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PackageSteps;