import { useEffect, useState } from 'react';
import { MapPin } from 'lucide-react';

const MarketMap = () => {
  const [location, setLocation] = useState<{ lat: number; lng: number } | null>(null);

  useEffect(() => {
    // Get user's location
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude
          });
        },
        (error) => {
          console.error('Error getting location:', error);
        }
      );
    }
  }, []);

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 min-h-[600px] flex items-center justify-center">
      <div className="text-center">
        <MapPin className="h-12 w-12 text-primary mx-auto mb-4" />
        <h3 className="text-xl font-semibold text-primary mb-2">Map View Coming Soon</h3>
        <p className="text-gray-600">
          We're working on integrating an interactive map to help you find local farmers near you.
        </p>
      </div>
    </div>
  );
};

export default MarketMap;