import React from 'react';
import { Calendar, Clock, Star, Bell } from 'lucide-react';

export default function UpcomingMovies() {
  const movies = [
    {
      id: 1,
      title: "The Matrix Resurrection",
      image: "https://images.unsplash.com/photo-1626814026160-2237a95fc5a0?auto=format&fit=crop&q=80&w=1000",
      releaseDate: "Dec 15, 2024",
      genre: "Sci-Fi",
      duration: "2h 30m",
      rating: 4.9
    },
    {
      id: 2,
      title: "Desert Storm",
      image: "https://images.unsplash.com/photo-1547891654-e66ed7ebb968?auto=format&fit=crop&q=80&w=1000",
      releaseDate: "Jan 5, 2025",
      genre: "Action",
      duration: "2h 15m",
      rating: 4.7
    },
    {
      id: 3,
      title: "The Last Symphony",
      image: "https://images.unsplash.com/photo-1514533212735-5df27d970db9?auto=format&fit=crop&q=80&w=1000",
      releaseDate: "Feb 1, 2025",
      genre: "Drama",
      duration: "2h 20m",
      rating: 4.8
    }
  ];

  return (
    <div className="bg-white py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Coming Soon
          </h2>
          <p className="mt-4 text-xl text-gray-600">
            Get notified when these movies hit the theaters
          </p>
        </div>

        <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {movies.map((movie) => (
            <div key={movie.id} className="bg-white rounded-lg shadow-lg overflow-hidden transition-transform hover:scale-105">
              <div className="relative">
                <img src={movie.image} alt={movie.title} className="w-full h-48 object-cover" />
                <div className="absolute top-2 right-2 bg-black bg-opacity-50 text-white px-3 py-1 rounded-full text-sm">
                  Coming Soon
                </div>
              </div>
              <div className="p-6">
                <div className="flex justify-between items-start">
                  <h3 className="text-xl font-semibold text-gray-900">{movie.title}</h3>
                  <div className="flex items-center bg-yellow-100 px-2 py-1 rounded">
                    <Star className="w-4 h-4 text-yellow-500 mr-1" />
                    <span className="text-sm font-medium text-yellow-700">{movie.rating}</span>
                  </div>
                </div>
                <div className="mt-4 space-y-2">
                  <div className="flex items-center text-gray-600">
                    <Calendar className="w-5 h-5 mr-2" />
                    {movie.releaseDate}
                  </div>
                  <div className="flex items-center text-gray-600">
                    <Clock className="w-5 h-5 mr-2" />
                    {movie.duration}
                  </div>
                </div>
                <button className="mt-6 w-full bg-gray-100 text-indigo-600 py-2 px-4 rounded-md hover:bg-gray-200 transition-colors flex items-center justify-center">
                  <Bell className="w-5 h-5 mr-2" />
                  Notify Me
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}