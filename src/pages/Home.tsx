import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Ticket, MessageSquare, Gift, CreditCard } from 'lucide-react';
import MovieShowcase from '../components/MovieShowcase';
import Footer from '../components/Footer';
import PromoCarousel from '../components/PromoCarousel';

export default function Home() {
  const navigate = useNavigate();

  return (
    <main className="bg-white">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-indigo-600 to-purple-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="min-h-[60vh] flex items-center justify-center py-20">
            <div className="text-center max-w-4xl mx-auto">
              <h1 className="text-4xl tracking-tight font-extrabold text-white sm:text-5xl md:text-6xl lg:text-7xl">
                <span className="block mb-2">Watch Movies.</span>
                <span className="block text-indigo-200">Share Thoughts.</span>
              </h1>
              <p className="mt-6 text-xl text-indigo-100 sm:text-2xl max-w-3xl mx-auto leading-relaxed">
                Your one-stop destination for booking movie tickets and joining exciting movie discussions.
              </p>
              <div className="mt-10 flex flex-col sm:flex-row justify-center gap-4 px-4">
                <button 
                  onClick={() => navigate('/movies')}
                  className="inline-flex items-center px-8 py-4 border border-transparent text-lg font-medium rounded-md text-indigo-700 bg-white hover:bg-indigo-50 transition-colors"
                >
                  <Ticket className="w-6 h-6 mr-2" />
                  Book Tickets
                </button>
                <button 
                  onClick={() => navigate('/discussions')}
                  className="inline-flex items-center px-8 py-4 border border-transparent text-lg font-medium rounded-md text-white bg-indigo-800 hover:bg-indigo-700 transition-colors"
                >
                  <MessageSquare className="w-6 h-6 mr-2" />
                  Join Discussions
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Promo Carousel */}
      <PromoCarousel />

      {/* Movie Showcase */}
      <MovieShowcase />

      {/* Footer */}
      <Footer />
    </main>
  );
}