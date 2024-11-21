import { motion } from 'framer-motion';
import { MessageSquare, Calendar, Video } from 'lucide-react';
import { FormData } from '../CustomPackage';

interface Props {
  formData: FormData;
  onBack: () => void;
  onComplete: () => void;
}

const ExpertConsultation = ({ formData, onBack, onComplete }: Props) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="bg-white p-8 rounded-xl shadow-lg"
    >
      <h2 className="text-2xl font-bold text-primary mb-6">Expert Consultation</h2>
      
      <div className="space-y-8">
        <p className="text-gray-600">
          Schedule a consultation with our gardening experts to review your package and get personalized advice.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <button className="p-6 border-2 border-gray-200 rounded-xl hover:border-secondary transition-all">
            <MessageSquare className="h-8 w-8 text-secondary mb-4" />
            <h3 className="font-semibold text-primary mb-2">Chat Consultation</h3>
            <p className="text-sm text-gray-600">Quick text-based advice</p>
          </button>

          <button className="p-6 border-2 border-gray-200 rounded-xl hover:border-secondary transition-all">
            <Video className="h-8 w-8 text-secondary mb-4" />
            <h3 className="font-semibold text-primary mb-2">Video Call</h3>
            <p className="text-sm text-gray-600">Face-to-face guidance</p>
          </button>

          <button className="p-6 border-2 border-gray-200 rounded-xl hover:border-secondary transition-all">
            <Calendar className="h-8 w-8 text-secondary mb-4" />
            <h3 className="font-semibold text-primary mb-2">Site Visit</h3>
            <p className="text-sm text-gray-600">In-person consultation</p>
          </button>
        </div>

        <div className="flex gap-4">
          <button
            onClick={onBack}
            className="flex-1 btn border border-primary text-primary hover:bg-primary/5"
          >
            Back
          </button>
          <button
            onClick={onComplete}
            className="flex-1 btn bg-primary hover:bg-primary-dark text-white"
          >
            Complete Package
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default ExpertConsultation;