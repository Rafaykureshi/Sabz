import { Sprout, Facebook, Twitter, Instagram, Youtube, Mail, Phone, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { label: 'Store', path: '/store' },
    { label: 'Marketplace', path: '/marketplace' },
    { label: 'Services', path: '/#services' },
    { label: 'Learning Hub', path: '/#learn' },
    { label: 'AI Features', path: '/ai' }
  ];

  const supportLinks = [
    { label: 'Help Center', path: '/help' },
    { label: 'Contact Us', path: '/contact' },
    { label: 'Privacy Policy', path: '/privacy' },
    { label: 'Terms of Service', path: '/terms' },
    { label: 'FAQs', path: '/faqs' }
  ];

  const socialLinks = [
    { icon: Facebook, href: '#', label: 'Facebook' },
    { icon: Twitter, href: '#', label: 'Twitter' },
    { icon: Instagram, href: '#', label: 'Instagram' },
    { icon: Youtube, href: '#', label: 'Youtube' }
  ];

  const contactInfo = [
    { icon: Phone, info: '+91 123 456 7890' },
    { icon: Mail, info: 'contact@sabzkhushali.com' },
    { icon: MapPin, info: 'Mumbai, Maharashtra, India' }
  ];

  return (
    <footer className="bg-primary text-white">
      {/* Wave Divider */}
      <div className="wave-divider bg-transparent" />

      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <Link to="/" className="flex items-center gap-2 mb-6">
              <Sprout className="h-8 w-8 text-secondary" />
              <span className="text-2xl font-bold">Sabz Khushali</span>
            </Link>
            <p className="text-gray-300 mb-6">
              Transforming urban spaces into sustainable gardens for a greener future.
            </p>
            <div className="flex gap-4">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 hover:bg-white/10 rounded-full transition-colors"
                  aria-label={social.label}
                >
                  <social.icon className="h-5 w-5" />
                </a>
              ))}
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <h3 className="text-lg font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="hover:text-secondary transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Support */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <h3 className="text-lg font-bold mb-4">Support</h3>
            <ul className="space-y-2">
              {supportLinks.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="hover:text-secondary transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Contact & Newsletter */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <h3 className="text-lg font-bold mb-4">Contact Us</h3>
            <ul className="space-y-4 mb-6">
              {contactInfo.map((item, index) => (
                <li key={index} className="flex items-center gap-2">
                  <item.icon className="h-5 w-5 text-secondary" />
                  <span>{item.info}</span>
                </li>
              ))}
            </ul>

            <h3 className="text-lg font-bold mb-4">Newsletter</h3>
            <form onSubmit={(e) => e.preventDefault()} className="space-y-4">
              <div className="flex gap-2">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-grow px-4 py-2 rounded-lg bg-white/10 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-secondary"
                />
                <button className="btn btn-secondary whitespace-nowrap">
                  Subscribe
                </button>
              </div>
              <p className="text-sm text-gray-400">
                Subscribe to get gardening tips and updates
              </p>
            </form>
          </motion.div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10 mt-12 pt-8 text-center">
          <p className="text-gray-300">
            &copy; {currentYear} Sabz Khushali. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;