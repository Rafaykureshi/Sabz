import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { BookOpen, Video, Users, Award } from 'lucide-react';

const resources = [
  {
    icon: BookOpen,
    title: "Gardening Guides",
    description: "Comprehensive guides for all skill levels",
    color: "bg-nature-leaf/20",
    iconColor: "text-nature-leaf"
  },
  {
    icon: Video,
    title: "Video Tutorials",
    description: "Step-by-step video instructions for urban gardening",
    color: "bg-impact-climate/20",
    iconColor: "text-impact-climate"
  },
  {
    icon: Users,
    title: "Community Forum",
    description: "Connect and learn from experienced gardeners",
    color: "bg-sdg-purple/20",
    iconColor: "text-sdg-purple"
  },
  {
    icon: Award,
    title: "Certifications",
    description: "Earn certificates as you learn and grow",
    color: "bg-impact-economic/20",
    iconColor: "text-impact-economic"
  }
];

const Learning = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  return (
    <section className="py-20 bg-gradient-to-b from-primary/5 to-white" id="learn">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            className="inline-flex items-center gap-2 bg-secondary/20 text-secondary px-4 py-2 rounded-full mb-4"
          >
            <BookOpen className="h-5 w-5" />
            <span className="font-medium">Learning Hub</span>
          </motion.div>
          <motion.h2
            ref={ref}
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            className="text-4xl font-bold text-primary mb-6"
          >
            Learn Urban Gardening
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2 }}
            className="text-xl text-gray-600 max-w-2xl mx-auto"
          >
            Access our comprehensive learning resources and grow your gardening skills
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {resources.map((resource, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: index * 0.1 }}
              className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all"
            >
              <div className="flex flex-col items-center text-center">
                <div className={`p-4 ${resource.color} rounded-full mb-4`}>
                  <resource.icon className={`h-8 w-8 ${resource.iconColor}`} />
                </div>
                <h3 className="text-xl font-semibold text-primary mb-2">
                  {resource.title}
                </h3>
                <p className="text-gray-600 mb-4">
                  {resource.description}
                </p>
                <button className="btn btn-secondary w-full">
                  Start Learning
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.4 }}
          className="mt-16"
        >
          <div className="bg-white p-8 rounded-xl shadow-lg">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div>
                <h3 className="text-2xl font-bold text-primary mb-4">
                  Featured Course
                </h3>
                <p className="text-gray-600 mb-6">
                  "Urban Gardening Essentials" - A comprehensive course covering everything 
                  you need to know about starting and maintaining your urban garden.
                </p>
                <ul className="space-y-2 mb-6">
                  <li className="flex items-center gap-2 text-gray-600">
                    <Video className="h-5 w-5 text-secondary" />
                    <span>20+ Video Lessons</span>
                  </li>
                  <li className="flex items-center gap-2 text-gray-600">
                    <BookOpen className="h-5 w-5 text-secondary" />
                    <span>Detailed Guides</span>
                  </li>
                  <li className="flex items-center gap-2 text-gray-600">
                    <Award className="h-5 w-5 text-secondary" />
                    <span>Certificate on Completion</span>
                  </li>
                </ul>
                <button className="btn bg-primary hover:bg-primary-dark text-white">
                  Enroll Now
                </button>
              </div>
              <div className="relative">
                <img
                  src="https://images.unsplash.com/photo-1524492412937-b28074a5d7da?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80"
                  alt="Urban Gardening Course"
                  className="rounded-lg shadow-lg"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/40 to-transparent rounded-lg"></div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Learning;