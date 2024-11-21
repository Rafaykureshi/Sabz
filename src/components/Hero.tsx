import React from 'react';
import { motion } from 'framer-motion';
import { Leaf, Cloud, Droplets } from 'lucide-react';

const floatingElements = [
  { 
    icon: Cloud,
    className: "top-20 left-10 text-nature-cloud animate-cloud-float",
    size: 40
  },
  { 
    icon: Cloud,
    className: "top-32 right-20 text-nature-cloud animate-cloud-float",
    size: 30
  },
  { 
    icon: Droplets,
    className: "top-40 left-1/4 text-nature-rain animate-rain",
    size: 20
  },
  { 
    icon: Leaf,
    className: "bottom-32 right-1/4 text-nature-leaf animate-sway",
    size: 24
  },
  { 
    icon: Leaf,
    className: "top-1/2 left-20 text-secondary animate-float",
    size: 28
  }
];

const Hero = () => {
  return (
    <section className="relative min-h-screen pt-20 overflow-hidden bg-gradient-to-b from-white to-primary/5">
      {floatingElements.map((item, index) => (
        <motion.div
          key={index}
          className={`absolute ${item.className}`}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ 
            opacity: [0.4, 0.8, 0.4],
            scale: 1,
          }}
          transition={{
            duration: 2,
            delay: index * 0.2,
            repeat: Infinity,
            repeatType: "reverse"
          }}
        >
          <item.icon size={item.size} />
        </motion.div>
      ))}

      <div className="max-w-7xl mx-auto px-6 pt-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl lg:text-6xl font-bold text-primary mb-6">
              Grow Your Own
              <span className="text-secondary block mt-2">
                Urban Garden
              </span>
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              Transform your space into a sustainable garden. Join our ecosystem for urban gardening, health improvement, and climate action.
            </p>
            <div className="flex gap-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="btn bg-primary hover:bg-primary-dark text-white"
              >
                Get Started
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="btn btn-secondary"
              >
                Learn More
              </motion.button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              <img 
                src="https://images.unsplash.com/photo-1530836369250-ef72a3f5cda8?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80"
                alt="Urban Garden"
                className="w-full h-[600px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/40 to-transparent"></div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="absolute -bottom-6 -left-6 bg-white p-6 rounded-lg shadow-xl max-w-xs"
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="p-3 bg-secondary/20 rounded-full">
                  <Leaf className="h-6 w-6 text-secondary" />
                </div>
                <div>
                  <h3 className="font-semibold text-primary">Eco-friendly</h3>
                  <p className="text-sm text-gray-600">Reduce carbon footprint</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;