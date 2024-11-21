import { Home, ShoppingBag, User, Heart } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

const MobileNav = () => {
  const location = useLocation();

  const navItems = [
    { path: '/', icon: Home, label: 'Home' },
    { path: '/store', icon: ShoppingBag, label: 'Store' },
    { path: '/profile', icon: User, label: 'Profile' },
    { path: '/wishlist', icon: Heart, label: 'Wishlist' }
  ];

  return (
    <nav className="mobile-nav">
      {navItems.map((item) => (
        <Link
          key={item.path}
          to={item.path}
          className={`mobile-nav-item ${
            location.pathname === item.path ? 'active' : ''
          }`}
        >
          <item.icon className="h-6 w-6" />
          <span className="text-xs">{item.label}</span>
        </Link>
      ))}
    </nav>
  );
};

export default MobileNav;