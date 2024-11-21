import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { Suspense, lazy } from 'react';
import { AuthProvider } from './contexts/AuthContext';
import { CartProvider } from './components/store/CartContext';
import { MarketplaceProvider } from './contexts/MarketplaceContext';
import { useMediaQuery } from './hooks/useMediaQuery';
import ErrorBoundary from './components/ErrorBoundary';
import LoadingSpinner from './components/LoadingSpinner';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import MobileNav from './components/MobileNav';
import OfflineNotice from './components/OfflineNotice';
import InstallPrompt from './components/InstallPrompt';
import AIFloatingButton from './components/AIFloatingButton';

// Lazy load pages
const Home = lazy(() => import('./pages/Home'));
const StorePage = lazy(() => import('./pages/StorePage'));
const MarketplacePage = lazy(() => import('./pages/MarketplacePage'));
const ProfilePage = lazy(() => import('./pages/ProfilePage'));
const OrdersPage = lazy(() => import('./pages/OrdersPage'));
const AIPage = lazy(() => import('./pages/AIPage'));

const App = () => {
  const isMobile = useMediaQuery('(max-width: 768px)');

  return (
    <HelmetProvider>
      <ErrorBoundary>
        <AuthProvider>
          <CartProvider>
            <MarketplaceProvider>
              <Router>
                <div className="min-h-screen bg-white flex flex-col">
                  <OfflineNotice />
                  <Navbar />
                  <main className="flex-grow">
                    <Suspense fallback={<LoadingSpinner className="fixed inset-0" />}>
                      <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/store/*" element={<StorePage />} />
                        <Route path="/marketplace/*" element={<MarketplacePage />} />
                        <Route path="/profile/*" element={<ProfilePage />} />
                        <Route path="/orders" element={<OrdersPage />} />
                        <Route path="/ai/*" element={<AIPage />} />
                      </Routes>
                    </Suspense>
                  </main>
                  <AIFloatingButton />
                  {isMobile && <MobileNav />}
                  <Footer />
                  <InstallPrompt />
                </div>
              </Router>
            </MarketplaceProvider>
          </CartProvider>
        </AuthProvider>
      </ErrorBoundary>
    </HelmetProvider>
  );
};

export default App;