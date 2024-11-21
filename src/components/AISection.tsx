import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Brain, Sprout, Droplets, Wind, Heart, Globe, Cpu } from 'lucide-react';

const impactMetrics = [
  {
    icon: Heart,
    value: 75,
    label: "Health Impact",
    description: "Improved well-being through organic produce",
    color: "text-impact-health"
  },
  {
    icon: Globe,
    value: 60,
    label: "Climate Impact",
    description: "Reduced carbon footprint",
    color: "text-impact-climate"
  },
  {
    icon: Cpu,
    value: 90,
    label: "AI Innovation",
    description: "Smart gardening solutions",
    color: "text-sdg-purple"
  },
  {
    icon: Sprout,
    value: 85,
    label: "Plant Success Rate",
    description: "Through AI-guided care",
    color: "text-nature-leaf"
  },
  {
    icon: Droplets,
    value: 40,
    label: "Water Savings",
    description: "Optimized water usage",
    color: "text-nature-ocean"
  },
  {
    icon: Wind,
    value: 55,
    label: "Carbon Reduction",
    description: "Per urban garden",
    color: "text-impact-climate"
  }
];

const Counter = ({ value, label, description, icon: Icon, color }: { 
  value: number; 
  label: string;
  description: string;
  icon: any;
  color: string;
}) => {
  const [count, setCount] = useState(0);
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  useEffect(() => {
    if (inView) {
      const duration = 2000;
      const steps = 60;
      const stepValue = value / steps;
      let current = 0;

      const timer = setInterval(() => {
        current += stepValue;
        if (current >= value) {
          setCount(value);
          clearInterval(timer);
        } else {
          setCount(Math.floor(current));
        }
      }, duration / steps);

      return () => clearInterval(timer);
    }
  }, [inView, value]);

  const rounded = Math.round(count);

  return (
    <motion.div 
      ref={ref} 
      className="text-center p-6 bg-white rounded-xl shadow-lg hover:shadow-xl transition-all"
      whileHover={{ scale: 1.05 }}
    >
      <div className={`inline-block p-4 rounded-full mb-4 ${color} bg-white/90 shadow-lg`}>
        <Icon className="h-8 w-8" />
      </div>
      <motion.div
        className="text-4xl font-bold text-primary mb-2"
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
      >
        <motion.span>{rounded}</motion.span>%
      </motion.div>
      <h3 className="text-lg font-semibold text-primary mb-1">{label}</h3>
      <p className="text-sm text-gray-600">{description}</p>
    </motion.div>
  );
};

const AISection = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  return (
    <section className="py-20 bg-gradient-to-b from-white to-primary/5" id="ai">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 bg-secondary/20 text-secondary px-4 py-2 rounded-full mb-4"
          >
            <Brain className="h-5 w-5" />
            <span className="font-medium">AI-Powered Impact</span>
          </motion.div>
          <h2 className="text-4xl font-bold text-primary mb-6">
            Transforming Urban Gardening with AI
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Our AI assistant helps you make data-driven decisions for your garden,
            optimizing health benefits and environmental impact.
          </p>
        </div>

        <div ref={ref} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {impactMetrics.map((metric, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <Counter {...metric} />
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-16 text-center"
        >
          <button className="btn bg-primary hover:bg-primary-dark text-white">
            Experience AI Gardening
          </button>
        </motion.div>
      </div>
    </section>
  );
};

export default AISection;