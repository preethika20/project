import React, { useState, useEffect, useRef } from 'react';
import { MapPin } from 'lucide-react';
import { useLocation } from '../context/LocationContext';

export default function LocationSelector() {
  const [isOpen, setIsOpen] = useState(false);
  const { currentLocation, setCurrentLocation } = useLocation();
  const dropdownRef = useRef<HTMLDivElement>(null);

  const locations = [
    'New York',
    'Los Angeles',
    'Chicago',
    'Houston',
    'San Francisco',
    'Miami'
  ];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLocationSelect = (location: string) => {
    setCurrentLocation(location);
    setIsOpen(false);
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 px-4 py-2 text-gray-700 hover:text-indigo-600 transition-colors"
      >
        <MapPin className="w-5 h-5" />
        <span>{currentLocation}</span>
      </button>

      {isOpen && (
        <div className="absolute top-full left-0 mt-2 w-48 bg-white rounded-md shadow-lg z-50">
          <div className="py-1">
            {locations.map((location) => (
              <button
                key={location}
                onClick={() => handleLocationSelect(location)}
                className={`block w-full text-left px-4 py-2 text-sm ${
                  currentLocation === location
                    ? 'bg-indigo-50 text-indigo-600'
                    : 'text-gray-700 hover:bg-gray-50'
                }`}
              >
                {location}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}