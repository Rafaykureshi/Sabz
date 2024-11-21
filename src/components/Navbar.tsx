import { Sprout, User, ShoppingCart } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useCart } from './store/CartContext';
import AuthModal from './auth/AuthModal';

const Navbar = () => {
  const location = useLocation();
  const { user, signOut } = useAuth();
  const { itemCount } = useCart();
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);

  return (
    <>
      <motion.nav 
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className="fixed w-full bg-white/80 backdrop-blur-md z-50 py-4 px-6"
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex-1">
            <ul className="flex gap-8">
              <li>
                <Link 
                  to="/store" 
                  className={`text-primary hover:text-secondary transition-colors ${
                    location.pathname === '/store' ? 'text-secondary font-semibold' : ''
                  }`}
                >
                  Store
                </Link>
              </li>
              <li>
                <Link 
                  to="/marketplace" 
                  className={`text-primary hover:text-secondary transition-colors ${
                    location.pathname === '/marketplace' ? 'text-secondary font-semibold' : ''
                  }`}
                >
                  Marketplace
                </Link>
              </li>
            </ul>
          </div>
          
          <Link to="/" className="flex items-center gap-2 cursor-pointer">
            <Sprout className="h-8 w-8 text-secondary" />
            <span className="text-2xl font-bold text-primary">Sabz Khushali</span>
          </Link>
          
          <div className="flex-1 flex justify-end items-center gap-8">
            <ul className="flex gap-8">
              <li>
                <Link 
                  to="/#services" 
                  className="text-primary hover:text-secondary transition-colors"
                >
                  Services
                </Link>
              </li>
              <li>
                <Link 
                  to="/#learn" 
                  className="text-primary hover:text-secondary transition-colors"
                >
                  Learn
                </Link>
              </li>
            </ul>

            <Link 
              to="/store" 
              className="relative p-2 hover:bg-gray-100 rounded-full"
            >
              <ShoppingCart className="h-5 w-5 text-primary" />
              {itemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-secondary text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                  {itemCount}
                </span>
              )}
            </Link>

            <div className="relative">
              {user ? (
                <div className="relative">
                  <button
                    onClick={() => setShowUserMenu(!showUserMenu)}
                    className="flex items-center gap-2 p-2 rounded-full hover:bg-gray-100"
                  >
                    {user.photoURL ? (
                      <img
                        src={user.photoURL}
                        alt={user.displayName || ''}
                        className="w-8 h-8 rounded-full"
                      />
                    ) : (
                      <User className="h-5 w-5 text-primary" />
                    )}
                  </button>

                  {showUserMenu && (
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg py-2">
                      <Link
                        to="/profile"
                        className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                      >
                        Profile
                      </Link>
                      <Link
                        to="/orders"
                        className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                      >
                        Orders
                      </Link>
                      <button
                        onClick={() => signOut()}
                        className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
                      >
                        Sign Out
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <button
                  onClick={() => setShowAuthModal(true)}
                  className="btn btn-secondary"
                >
                  Sign In
                </button>
              )}
            </div>
          </div>
        </div>
      </motion.nav>

      <AuthModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
      />
    </>
  );
};

export default Navbar;