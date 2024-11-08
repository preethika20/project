import React from 'react';
import { Calendar, Clock, Star, Ticket } from 'lucide-react';

interface MovieCardProps {
  movie: {
    title: string;
    image: string;
    rating: number;
    genre: string;
    duration: string;
    userRating?: number;
  };
  onBookNow: () => void;
  onRate: () => void;
}

export default function MovieCard({ movie, onBookNow, onRate }: MovieCardProps) {
  return (
    <div className="bg-white rounded-2xl shadow-xl overflow-hidden transition-all transform hover:scale-105 hover:shadow-2xl">
      <div className="relative">
        <img src={movie.image} alt={movie.title} className="w-full h-64 object-cover" />
        <div className="absolute top-4 right-4 bg-yellow-400 px-3 py-1 rounded-full flex items-center space-x-1">
          <Star className="w-4 h-4 text-yellow-900" />
          <span className="font-bold text-yellow-900">{movie.rating}</span>
        </div>
      </div>
      
      <div className="p-6">
        <h3 className="text-2xl font-bold text-gray-900 mb-4">{movie.title}</h3>
        
        <div className="space-y-3 mb-6">
          <div className="flex items-center text-gray-600">
            <Calendar className="w-5 h-5 mr-2 text-indigo-600" />
            {movie.genre}
          </div>
          <div className="flex items-center text-gray-600">
            <Clock className="w-5 h-5 mr-2 text-indigo-600" />
            {movie.duration}
          </div>
          {movie.userRating && (
            <div className="flex items-center text-indigo-600">
              <Star className="w-5 h-5 mr-2 fill-current" />
              <span>Your rating: {movie.userRating}/5</span>
            </div>
          )}
        </div>

        <div className="grid grid-cols-2 gap-4">
          <button 
            onClick={onBookNow}
            className="flex items-center justify-center space-x-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-3 px-6 rounded-xl font-medium transition-all hover:from-indigo-700 hover:to-purple-700 transform hover:scale-105 shadow-lg"
          >
            <Ticket className="w-5 h-5" />
            <span>Book Now</span>
          </button>
          <button 
            onClick={onRate}
            className="flex items-center justify-center space-x-2 bg-white text-indigo-600 border-2 border-indigo-600 py-3 px-6 rounded-xl font-medium hover:bg-indigo-50 transition-all transform hover:scale-105"
          >
            <Star className="w-5 h-5" />
            <span>Rate</span>
          </button>
        </div>
      </div>
    </div>
  );
}