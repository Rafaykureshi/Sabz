import { AlertCircle, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface Props {
  message: string;
  onClose?: () => void;
}

const ErrorAlert = ({ message, onClose }: Props) => {
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        className="bg-red-50 text-red-500 p-4 rounded-lg flex items-start gap-3"
      >
        <AlertCircle className="h-5 w-5 flex-shrink-0 mt-0.5" />
        <p className="flex-1">{message}</p>
        {onClose && (
          <button
            onClick={onClose}
            className="p-1 hover:bg-red-100 rounded-full"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </motion.div>
    </AnimatePresence>
  );
};

export default ErrorAlert;