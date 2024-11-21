import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Brain, X, MessageSquare, Camera, Sprout, Layout } from 'lucide-react';
import { Link } from 'react-router-dom';

const AIFloatingButton = () => {
  const [isOpen, setIsOpen] = useState(false);

  const menuItems = [
    {
      icon: MessageSquare,
      label: 'Chat with AI',
      description: 'Get gardening advice',
      path: '/ai/chat'
    },
    {
      icon: Camera,
      label: 'Plant Analysis',
      description: 'Identify issues & diseases',
      path: '/ai/analysis'
    },
    {
      icon: Layout,
      label: 'Garden Planner',
      description: 'Design your garden',
      path: '/ai/planner'
    },
    {
      icon: Brain,
      label: 'AI Hub',
      description: 'All AI features',
      path: '/ai'
    }
  ];

  return (
    <div className="fixed bottom-20 right-6 z-50 md:bottom-8">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            className="absolute bottom-20 right-0 mb-4 bg-white rounded-xl shadow-lg overflow-hidden w-72"
          >
            <div className="p-4 bg-primary text-white">
              <h3 className="font-semibold">AI Assistant</h3>
              <p className="text-sm text-white/80">How can I help you today?</p>
            </div>
            <div className="p-2">
              {menuItems.map((item, index) => (
                <Link
                  key={index}
                  to={item.path}
                  onClick={() => setIsOpen(false)}
                  className="flex items-start gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <div className="p-2 rounded-full bg-primary/10">
                    <item.icon className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-medium text-primary">{item.label}</h4>
                    <p className="text-sm text-gray-600">{item.description}</p>
                  </div>
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className={`p-4 rounded-full shadow-lg ${
          isOpen ? 'bg-primary text-white' : 'bg-white text-primary'
        }`}
      >
        {isOpen ? (
          <X className="h-6 w-6" />
        ) : (
          <Brain className="h-6 w-6 animate-pulse" />
        )}
      </motion.button>
    </div>
  );
};

export default AIFloatingButton;