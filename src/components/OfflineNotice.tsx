import { motion, AnimatePresence } from 'framer-motion';
import { WifiOff } from 'lucide-react';
import { useOnline } from '../hooks/useOnline';

const OfflineNotice = () => {
  const isOnline = useOnline();

  return (
    <AnimatePresence>
      {!isOnline && (
        <motion.div
          initial={{ opacity: 0, y: -100 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -100 }}
          className="fixed top-0 left-0 right-0 z-50 bg-red-500 text-white p-4"
        >
          <div className="max-w-7xl mx-auto px-6 flex items-center justify-center gap-2">
            <WifiOff className="h-5 w-5" />
            <p>You're offline. Some features may be unavailable.</p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default OfflineNotice;