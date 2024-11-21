import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Sprout, Leaf, Shovel, Recycle } from 'lucide-react';

const products = [
  {
    icon: Sprout,
    title: "Organic Seeds",
    description: "High-quality seeds for vegetables and herbs"
  },
  {
    icon: Leaf,
    title: "Organic Compost",
    description: "Nutrient-rich compost for healthy plant growth"
  },
  {
    icon: Shovel,
    title: "Gardening Tools",
    description: "Essential tools for urban gardening"
  },
  {
    icon: Recycle,
    title: "Eco Planters",
    description: "Sustainable planters and containers"
  }
];

const Store = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  return (
    <section className="py-20 bg-white" id="store">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            className="inline-flex items-center gap-2 bg-secondary/20 text-secondary px-4 py-2 rounded-full mb-4"
          >
            <Leaf className="h-5 w-5" />
            <span className="font-medium">Gardening Essentials</span>
          </motion.div>
          <motion.h2
            ref={ref}
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            className="text-4xl font-bold text-primary mb-6"
          >
            Everything You Need to Start Growing
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2 }}
            className="text-xl text-gray-600 max-w-2xl mx-auto"
          >
            Shop our curated selection of high-quality gardening supplies
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {products.map((product, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: index * 0.1 }}
              className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all gradient-card economic"
            >
              <div className="flex flex-col items-center text-center">
                <div className="p-4 bg-impact-economic/20 rounded-full mb-4">
                  <product.icon className="h-8 w-8 text-impact-economic" />
                </div>
                <h3 className="text-xl font-semibold text-primary mb-2">
                  {product.title}
                </h3>
                <p className="text-gray-600 mb-4">
                  {product.description}
                </p>
                <button className="btn btn-secondary w-full">
                  Shop Now
                </button>
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
            View All Products
          </button>
        </motion.div>
      </div>
    </section>
  );
};

export default Store;