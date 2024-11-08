import React from 'react';
import { Star, Clock } from 'lucide-react';

interface MovieGridProps {
  currentLocation: string;
  onMovieSelect: (movieId: number) => void;
}

export default function MovieGrid({ currentLocation, onMovieSelect }: MovieGridProps) {
  const movies = [
    {
      id: 1,
      title: "Venom: Let There Be Carnage",
      image: "https://images.unsplash.com/photo-1536440136628-849c177e76a1?auto=format&fit=crop&q=80&w=1000",
      rating: 8.5,
      duration: "2h 15m",
      genre: "Action, Sci-Fi"
    },
    {
      id: 2,
      title: "The Wild Robot",
      image: "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?auto=format&fit=crop&q=80&w=1000",
      rating: 7.9,
      duration: "1h 55m",
      genre: "Animation, Adventure"
    },
    // Add more movies as needed
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {movies.map((movie) => (
          <div
            key={movie.id}
            onClick={() => onMovieSelect(movie.id)}
            className="group relative rounded-xl overflow-hidden shadow-lg transform transition-all duration-300 hover:scale-105 cursor-pointer"
          >
            <div className="relative aspect-[2/3]">
              <img
                src={movie.image}
                alt={movie.title}
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                  <h3 className="text-xl font-bold mb-2">{movie.title}</h3>
                  <div className="flex items-center space-x-4 text-sm">
                    <span className="flex items-center">
                      <Star className="w-4 h-4 text-yellow-400 mr-1" />
                      {movie.rating}
                    </span>
                    <span className="flex items-center">
                      <Clock className="w-4 h-4 mr-1" />
                      {movie.duration}
                    </span>
                  </div>
                  <p className="mt-2 text-sm text-gray-300">{movie.genre}</p>
                </div>
              </div>
            </div>
            <div className="absolute top-2 right-2 bg-black/50 px-2 py-1 rounded text-white text-sm">
              Now Showing
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}