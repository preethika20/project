import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Calendar, Clock, Star, Play, X } from 'lucide-react';

export default function MovieDetails() {
  const { id } = useParams();
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showTrailer, setShowTrailer] = useState(false);

  // Mock movie data - replace with actual API call
  const movie = {
    id: 1,
    title: "Venom: Let There Be Carnage",
    image: "https://images.unsplash.com/photo-1536440136628-849c177e76a1?auto=format&fit=crop&q=80&w=1000",
    rating: 8.5,
    duration: "2h 15m",
    genre: "Action, Sci-Fi",
    releaseDate: "2024",
    director: "Andy Serkis",
    cast: ["Tom Hardy", "Michelle Williams", "Woody Harrelson"],
    synopsis: "Eddie Brock attempts to reignite his career by interviewing serial killer Cletus Kasady, who becomes the host of the symbiote Carnage and escapes prison after a failed execution.",
    trailerUrl: "https://www.youtube.com/embed/u9Mv98Gr5pY",
    theaters: [
      {
        name: "IMAX Cinema",
        shows: ["10:30 AM", "2:15 PM", "6:00 PM", "9:30 PM"]
      },
      // Add more theaters
    ]
  };

  const dates = Array.from({ length: 7 }, (_, i) => {
    const date = new Date();
    date.setDate(date.getDate() + i);
    return date;
  });

  return (
    <div className="pt-16 min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-black text-white">
      {/* Hero Section */}
      <div className="relative h-[60vh]">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${movie.image})` }}
        >
          <div className="absolute inset-0 bg-black bg-opacity-60" />
        </div>
        <div className="relative h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
            <img 
              src={movie.image} 
              alt={movie.title}
              className="rounded-lg shadow-2xl w-full md:w-80"
            />
            <div className="md:col-span-2 space-y-4">
              <h1 className="text-4xl md:text-5xl font-bold">{movie.title}</h1>
              <div className="flex items-center space-x-4 text-sm">
                <span className="flex items-center">
                  <Star className="w-5 h-5 text-yellow-400 mr-1" />
                  {movie.rating}/10
                </span>
                <span className="flex items-center">
                  <Clock className="w-5 h-5 mr-1" />
                  {movie.duration}
                </span>
                <span>{movie.genre}</span>
              </div>
              <button 
                onClick={() => setShowTrailer(true)}
                className="bg-red-600 text-white px-6 py-3 rounded-full flex items-center space-x-2 hover:bg-red-700 transition-colors"
              >
                <Play className="w-5 h-5" />
                <span>Watch Trailer</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Movie Details */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Left Column - Movie Info */}
          <div className="lg:col-span-2 space-y-8">
            <div>
              <h2 className="text-2xl font-bold mb-4">Synopsis</h2>
              <p className="text-gray-300 leading-relaxed">{movie.synopsis}</p>
            </div>
            
            <div>
              <h2 className="text-2xl font-bold mb-4">Cast & Crew</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {movie.cast.map((actor, index) => (
                  <div key={index} className="text-center">
                    <div className="w-24 h-24 mx-auto rounded-full bg-gray-700" />
                    <p className="mt-2 font-medium">{actor}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column - Booking */}
          <div className="bg-gray-800 rounded-lg p-6">
            <h2 className="text-2xl font-bold mb-6">Book Tickets</h2>
            
            {/* Date Selection */}
            <div className="mb-6">
              <div className="flex overflow-x-auto space-x-4 pb-4">
                {dates.map((date, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedDate(date)}
                    className={`flex-shrink-0 p-4 rounded-lg ${
                      date.toDateString() === selectedDate.toDateString()
                        ? 'bg-indigo-600'
                        : 'bg-gray-700 hover:bg-gray-600'
                    }`}
                  >
                    <p className="text-sm">{date.toLocaleDateString('en-US', { weekday: 'short' })}</p>
                    <p className="text-xl font-bold">{date.getDate()}</p>
                  </button>
                ))}
              </div>
            </div>

            {/* Theater Selection */}
            {movie.theaters.map((theater, index) => (
              <div key={index} className="mb-6 p-4 bg-gray-700 rounded-lg">
                <h3 className="font-bold mb-4">{theater.name}</h3>
                <div className="grid grid-cols-2 gap-2">
                  {theater.shows.map((time, timeIndex) => (
                    <button
                      key={timeIndex}
                      className="bg-gray-600 hover:bg-indigo-600 rounded py-2 transition-colors"
                    >
                      {time}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Trailer Modal */}
      {showTrailer && (
        <div className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4">
          <div className="relative w-full max-w-4xl">
            <button 
              onClick={() => setShowTrailer(false)}
              className="absolute -top-10 right-0 text-white hover:text-gray-300"
            >
              <X className="w-6 h-6" />
            </button>
            <div className="relative pt-[56.25%]">
              <iframe
                className="absolute inset-0 w-full h-full"
                src={movie.trailerUrl}
                title="Movie Trailer"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}