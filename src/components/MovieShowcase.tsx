import React, { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, ChevronRight, Play } from 'lucide-react';

export default function MovieShowcase() {
  const navigate = useNavigate();
  const nowPlayingRef = useRef<HTMLDivElement>(null);
  const comingSoonRef = useRef<HTMLDivElement>(null);
  const [hoveredMovie, setHoveredMovie] = useState<number | null>(null);
  
  const nowPlaying = [
    {
      id: 1,
      title: "Venom: Let There Be Carnage",
      image: "https://images.unsplash.com/photo-1536440136628-849c177e76a1?auto=format&fit=crop&q=80&w=1000",
      rating: "8.5",
      duration: "2h 15m",
      genre: "Action, Sci-Fi"
    },
    // ... other movies remain the same
  ];

  const scroll = (ref: React.RefObject<HTMLDivElement>, direction: 'left' | 'right') => {
    if (ref.current) {
      const scrollAmount = 400;
      ref.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  const handleMovieClick = (movieId: number) => {
    navigate(`/movies/${movieId}`);
  };

  return (
    <div className="py-16 bg-gradient-to-b from-gray-900 to-gray-800">
      <div className="max-w-[1800px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Now Playing Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-white mb-8">Now Playing</h2>
          <div className="relative">
            <button 
              onClick={() => scroll(nowPlayingRef, 'left')}
              className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-black/50 p-2 rounded-full text-white hover:bg-black/70"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <div 
              ref={nowPlayingRef}
              className="flex overflow-x-auto gap-4 pb-4 scrollbar-hide scroll-smooth"
              style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
              {nowPlaying.map((movie) => (
                <div 
                  key={movie.id}
                  onClick={() => handleMovieClick(movie.id)}
                  onMouseEnter={() => setHoveredMovie(movie.id)}
                  onMouseLeave={() => setHoveredMovie(null)}
                  className="relative flex-none w-[250px] cursor-pointer transform transition-all duration-300 hover:scale-105"
                >
                  <img 
                    src={movie.image} 
                    alt={movie.title} 
                    className="w-full h-[375px] object-cover rounded-lg shadow-lg"
                  />
                  {hoveredMovie === movie.id && (
                    <div className="absolute inset-0 bg-black bg-opacity-75 rounded-lg flex flex-col justify-between p-4 transition-opacity duration-300">
                      <div>
                        <h3 className="text-white text-xl font-bold mb-2">{movie.title}</h3>
                        <p className="text-gray-300 text-sm">{movie.genre}</p>
                        <p className="text-gray-300 text-sm">{movie.duration}</p>
                      </div>
                      <button className="bg-red-600 text-white py-2 px-4 rounded-full flex items-center justify-center gap-2 hover:bg-red-700 transition-colors">
                        <Play className="w-4 h-4" />
                        Watch Trailer
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </div>
            <button 
              onClick={() => scroll(nowPlayingRef, 'right')}
              className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-black/50 p-2 rounded-full text-white hover:bg-black/70"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Coming Soon Section remains the same */}
      </div>
    </div>
  );
}