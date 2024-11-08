import React from 'react';
import { useLocation } from '../context/LocationContext';

export default function Hero() {
  const { currentLocation } = useLocation();

  const getLocationImage = (location: string) => {
    const locationImages = {
      'New York': 'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?auto=format&fit=crop&q=80&w=2070',
      'Los Angeles': 'https://images.unsplash.com/photo-1515896769750-31548aa180ed?auto=format&fit=crop&q=80&w=2034',
      'Chicago': 'https://images.unsplash.com/photo-1494522855154-9297ac14b55f?auto=format&fit=crop&q=80&w=2070',
      'Houston': 'https://images.unsplash.com/photo-1530089711124-9ca31fb9e863?auto=format&fit=crop&q=80&w=2069',
      'San Francisco': 'https://images.unsplash.com/photo-1501594907352-04cda38ebc29?auto=format&fit=crop&q=80&w=2069',
      'Miami': 'https://images.unsplash.com/photo-1506966953602-c20cc11f75e3?auto=format&fit=crop&q=80&w=2071'
    };
    return locationImages[location as keyof typeof locationImages] || locationImages['New York'];
  };

  return (
    <div className="relative h-[60vh] bg-cover bg-center" style={{ backgroundImage: `url(${getLocationImage(currentLocation)})` }}>
      <div className="absolute inset-0 bg-black bg-opacity-50">
        <div className="h-full flex items-center justify-center">
          <div className="text-center text-white px-4">
            <h1 className="text-4xl md:text-6xl font-bold mb-4">
              Movies in {currentLocation}
            </h1>
            <p className="text-xl md:text-2xl">
              Book your favorite movies in theaters near you
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}