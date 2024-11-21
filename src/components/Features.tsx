import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Leaf, Heart, Globe, Cpu } from 'lucide-react';

const features = [
  {
    icon: Leaf,
    title: "Sustainable Living",
    description: "Create your own eco-friendly urban garden",
    gradient: "gradient-card climate"
  },
  {
    icon: Heart,
    title: "Health Benefits",
    description: "Access to fresh, organic produce year-round",
    gradient: "gradient-card health"
  },
  {
    icon: Globe,
    title: "Climate Action",
    description: "Reduce carbon footprint through urban farming",
    gradient: "gradient-card social"
  },
  {
    icon: Cpu,
    title: "AI Innovation",
    description: "Smart gardening with AI assistance",
    gradient: "gradient-card economic"
  }
];

const Features = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  return (
    <section className="py-20 bg-gradient-to-b from-white to-primary/5">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            className="inline-flex items-center gap-2 bg-secondary/20 text-secondary px-4 py-2 rounded-full mb-4"
          >
            <Leaf className="h-5 w-5" />
            <span className="font-medium">Why Choose Us</span>
          </motion.div>
          <motion.h2
            ref={ref}
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            className="text-4xl font-bold text-primary mb-6"
          >
            Transform Your Space
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2 }}
            className="text-xl text-gray-600 max-w-2xl mx-auto"
          >
            Join our ecosystem and experience the benefits of urban gardening
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: index * 0.1 }}
              className={`bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all ${feature.gradient}`}
            >
              <div className="flex flex-col items-center text-center">
                <div className="p-4 bg-secondary/20 rounded-full mb-4">
                  <feature.icon className="h-8 w-8 text-secondary" />
                </div>
                <h3 className="text-xl font-semibold text-primary mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600">
                  {feature.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;