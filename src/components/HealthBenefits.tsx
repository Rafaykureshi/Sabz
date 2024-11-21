import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Heart, Apple, Brain, Sun } from 'lucide-react';
import { Link } from 'react-router-dom';

const benefits = [
  {
    icon: Apple,
    title: "Fresh Nutrition",
    description: "Access to fresh, nutrient-rich organic produce right from your garden",
    gradient: "gradient-card health"
  },
  {
    icon: Brain,
    title: "Mental Wellbeing",
    description: "Reduce stress and anxiety through therapeutic gardening activities",
    gradient: "gradient-card social"
  },
  {
    icon: Heart,
    title: "Physical Activity",
    description: "Engage in light exercise while maintaining your garden",
    gradient: "gradient-card climate"
  },
  {
    icon: Sun,
    title: "Vitamin D",
    description: "Natural sunlight exposure for better immune system",
    gradient: "gradient-card economic"
  }
];

const HealthBenefits = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  return (
    <section className="py-20 bg-gradient-to-b from-primary/5 to-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            className="inline-flex items-center gap-2 bg-impact-health/20 text-impact-health px-4 py-2 rounded-full mb-4"
          >
            <Heart className="h-5 w-5" />
            <span className="font-medium">Health & Wellness</span>
          </motion.div>
          <motion.h2
            ref={ref}
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            className="text-4xl font-bold text-primary mb-6"
          >
            Grow Your Health
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2 }}
            className="text-xl text-gray-600 max-w-2xl mx-auto"
          >
            Discover the numerous health benefits of urban gardening
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {benefits.map((benefit, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: index * 0.1 }}
              className={`bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all ${benefit.gradient}`}
            >
              <div className="flex flex-col items-center text-center">
                <div className="p-4 bg-secondary/20 rounded-full mb-4">
                  <benefit.icon className="h-8 w-8 text-secondary" />
                </div>
                <h3 className="text-xl font-semibold text-primary mb-2">
                  {benefit.title}
                </h3>
                <p className="text-gray-600">
                  {benefit.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.4 }}
          className="mt-16 text-center"
        >
          <Link 
            to="/store?section=healthy-growing"
            className="btn bg-impact-health hover:bg-impact-health/90 text-white"
          >
            Get Started Today
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default HealthBenefits;