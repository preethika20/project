import React, { useState } from 'react';
import { Link, useLocation as useRouterLocation } from 'react-router-dom';
import { Menu, Bell, User, Ticket, MessageSquare } from 'lucide-react';
import SearchBar from './SearchBar';
import AuthModal from './AuthModal';
import LocationSelector from './LocationSelector';
import NotificationPanel from './NotificationPanel';

export default function Navbar() {
  const location = useRouterLocation();
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  
  return (
    <>
      <nav className="fixed top-0 w-full bg-white shadow-sm z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <Link to="/" className="text-2xl font-bold text-indigo-600">CineSpace</Link>
              <LocationSelector />
            </div>
            
            <div className="hidden md:flex items-center space-x-8">
              <Link 
                to="/movies" 
                className={`flex items-center ${location.pathname === '/movies' ? 'text-indigo-600' : 'text-gray-700 hover:text-indigo-600'}`}
              >
                <Ticket className="w-4 h-4 mr-1" />
                Book Tickets
              </Link>
              <Link 
                to="/discussions" 
                className={`flex items-center ${location.pathname === '/discussions' ? 'text-indigo-600' : 'text-gray-700 hover:text-indigo-600'}`}
              >
                <MessageSquare className="w-4 h-4 mr-1" />
                Discussions
              </Link>
            </div>

            <div className="flex items-center space-x-4">
              <SearchBar />
              <div className="relative">
                <button 
                  className="text-gray-500 hover:text-indigo-600"
                  onClick={() => setIsNotificationOpen(!isNotificationOpen)}
                >
                  <Bell className="w-5 h-5" />
                </button>
                {isNotificationOpen && <NotificationPanel />}
              </div>
              <button 
                onClick={() => setIsAuthOpen(true)}
                className="text-gray-500 hover:text-indigo-600"
              >
                <User className="w-5 h-5" />
              </button>
              <button className="md:hidden text-gray-500 hover:text-indigo-600">
                <Menu className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </nav>
      
      <AuthModal isOpen={isAuthOpen} onClose={() => setIsAuthOpen(false)} />
    </>
  );
}