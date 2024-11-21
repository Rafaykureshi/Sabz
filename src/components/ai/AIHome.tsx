import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Brain, MessageSquare, Camera, Layout, Calendar, LineChart, Lightbulb } from 'lucide-react';

const features = [
  {
    icon: MessageSquare,
    title: 'AI Chat Assistant',
    description: 'Get instant answers to your gardening questions',
    path: '/ai/chat',
    color: 'bg-blue-500'
  },
  {
    icon: Camera,
    title: 'Plant Analysis',
    description: 'Identify plant issues and get treatment recommendations',
    path: '/ai/analysis',
    color: 'bg-green-500'
  },
  {
    icon: Layout,
    title: 'Garden Planner',
    description: 'Design your perfect garden layout',
    path: '/ai/planner',
    color: 'bg-purple-500'
  },
  {
    icon: Calendar,
    title: 'Smart Scheduling',
    description: 'Automated care schedules for your plants',
    path: '/ai/scheduling',
    color: 'bg-orange-500'
  },
  {
    icon: LineChart,
    title: 'Growth Predictions',
    description: 'Track and predict your plants growth',
    path: '/ai/growth',
    color: 'bg-pink-500'
  },
  {
    icon: Lightbulb,
    title: 'AI Tips',
    description: 'Get personalized gardening advice',
    path: '/ai/tips',
    color: 'bg-yellow-500'
  }
];

const AIHome = () => {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-2 bg-primary/20 text-primary px-4 py-2 rounded-full mb-4"
        >
          <Brain className="h-5 w-5" />
          <span className="font-medium">AI-Powered Features</span>
        </motion.div>
        <h1 className="text-4xl font-bold text-primary mb-4">
          Smart Gardening Assistant
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Leverage artificial intelligence to make your gardening journey easier and more successful
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {features.map((feature, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Link
              to={feature.path}
              className="block bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all"
            >
              <div className={`w-12 h-12 ${feature.color} rounded-lg flex items-center justify-center mb-4`}>
                <feature.icon className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-primary mb-2">
                {feature.title}
              </h3>
              <p className="text-gray-600">
                {feature.description}
              </p>
            </Link>
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="mt-12 bg-primary/5 p-8 rounded-xl"
      >
        <div className="flex items-start gap-6">
          <div className="p-4 bg-primary rounded-lg">
            <Brain className="h-8 w-8 text-white" />
          </div>
          <div>
            <h3 className="text-xl font-semibold text-primary mb-2">
              How Our AI Helps You
            </h3>
            <ul className="space-y-2 text-gray-600">
              <li className="flex items-center gap-2">
                <span className="text-primary">•</span>
                Real-time plant health monitoring
              </li>
              <li className="flex items-center gap-2">
                <span className="text-primary">•</span>
                Personalized care recommendations
              </li>
              <li className="flex items-center gap-2">
                <span className="text-primary">•</span>
                Smart watering and fertilization schedules
              </li>
              <li className="flex items-center gap-2">
                <span className="text-primary">•</span>
                Disease detection and prevention
              </li>
            </ul>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default AIHome;