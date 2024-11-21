import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Leaf, Shovel, Calendar, Settings } from 'lucide-react';

const services = [
  {
    icon: Leaf,
    title: "Garden Design",
    description: "Custom garden designs tailored to your space and preferences"
  },
  {
    icon: Shovel,
    title: "Installation",
    description: "Professional installation of gardens, irrigation systems, and more"
  },
  {
    icon: Calendar,
    title: "Maintenance",
    description: "Regular maintenance services to keep your garden thriving"
  },
  {
    icon: Settings,
    title: "Consulting",
    description: "Expert advice on plant selection and garden optimization"
  }
];

const Services = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  return (
    <>
      <div className="wave-divider" />
      <section className="py-20 bg-white" id="services">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <motion.h2
              ref={ref}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              className="text-4xl font-bold text-primary mb-6"
            >
              Professional Gardening Services
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.2 }}
              className="text-xl text-gray-600 max-w-2xl mx-auto"
            >
              From design to maintenance, we provide comprehensive services to help your garden flourish
            </motion.p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: index * 0.1 }}
                className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all gradient-card social"
              >
                <div className="flex flex-col items-center text-center">
                  <div className="p-4 bg-secondary/20 rounded-full mb-4">
                    <service.icon className="h-8 w-8 text-secondary" />
                  </div>
                  <h3 className="text-xl font-semibold text-primary mb-2">
                    {service.title}
                  </h3>
                  <p className="text-gray-600">
                    {service.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.4 }}
            className="text-center mt-12"
          >
            <button className="btn bg-primary hover:bg-primary-dark text-white">
              Book a Service
            </button>
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default Services;