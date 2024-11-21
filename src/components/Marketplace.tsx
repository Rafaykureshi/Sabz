import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { ShoppingBag, Users, Building2, Truck } from 'lucide-react';

const features = [
  {
    icon: Users,
    title: "Connect with Local Farmers",
    description: "Buy directly from urban farmers in your area"
  },
  {
    icon: ShoppingBag,
    title: "Fresh Produce",
    description: "Access to freshly harvested organic vegetables"
  },
  {
    icon: Building2,
    title: "B2B Solutions",
    description: "Bulk ordering for businesses and restaurants"
  },
  {
    icon: Truck,
    title: "Local Delivery",
    description: "Same-day delivery to your doorstep"
  }
];

const Marketplace = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  return (
    <section className="py-20 bg-primary/5" id="marketplace">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            ref={ref}
            initial={{ opacity: 0, x: -50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl font-bold text-primary mb-6">
              Urban Farming Marketplace
            </h2>
            <p className="text-xl text-gray-600 mb-8">
              Connect with local urban farmers and access fresh, organic produce. 
              Perfect for both individual buyers and businesses.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="flex items-start space-x-4"
                >
                  <feature.icon className="h-6 w-6 text-secondary flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold text-primary">{feature.title}</h3>
                    <p className="text-gray-600 text-sm">{feature.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            ref={ref}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <div className="relative rounded-2xl overflow-hidden">
              <img 
                src="https://images.unsplash.com/photo-1488459716781-31db52582fe9?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80"
                alt="Urban Farming Marketplace"
                className="w-full h-[500px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/40 to-transparent"></div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Marketplace;