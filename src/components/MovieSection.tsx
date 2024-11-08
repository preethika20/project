import React, { useState, useEffect } from 'react';
import MovieCard from './MovieCard';
import TheaterModal from './TheaterModal';
import RatingModal from './RatingModal';

interface Theater {
  name: string;
  shows: string[];
  price: number;
  location: string;
}

interface Movie {
  id: number;
  title: string;
  image: string;
  rating: number;
  genre: string;
  duration: string;
  theaters: Theater[];
  userRating?: number;
}

interface MovieSectionProps {
  currentLocation: string;
  selectedMovieId?: number | null;
}

export default function MovieSection({ currentLocation, selectedMovieId }: MovieSectionProps) {
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
  const [ratingMovie, setRatingMovie] = useState<Movie | null>(null);
  const [movies, setMovies] = useState<Movie[]>([
    {
      id: 1,
      title: "Inception Returns",
      image: "https://images.unsplash.com/photo-1536440136628-849c177e76a1?auto=format&fit=crop&q=80&w=1000",
      rating: 4.8,
      genre: "Sci-Fi",
      duration: "2h 45m",
      theaters: [
        {
          name: "IMAX Cinema",
          location: "New York",
          shows: ["10:30 AM", "2:15 PM", "6:00 PM", "9:30 PM"],
          price: 15
        },
        {
          name: "Cineplex Downtown",
          location: "New York",
          shows: ["11:00 AM", "3:00 PM", "7:00 PM", "10:00 PM"],
          price: 12
        }
      ]
    },
    // ... (rest of the movies array)
  ]);

  useEffect(() => {
    if (selectedMovieId) {
      const movie = movies.find(m => m.id === selectedMovieId);
      if (movie) {
        setSelectedMovie(movie);
      }
    }
  }, [selectedMovieId, movies]);

  // Filter movies based on whether they have theaters in the current location
  const filteredMovies = movies.filter(movie => 
    movie.theaters.some(theater => theater.location === currentLocation)
  );

  const handleRatingSubmit = (movieId: number, rating: number, review: string) => {
    setMovies(prevMovies => 
      prevMovies.map(movie => 
        movie.id === movieId 
          ? { ...movie, userRating: rating }
          : movie
      )
    );
  };

  return (
    <div id="movies" className="bg-gradient-to-b from-gray-50 to-white py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-extrabold text-gray-900 sm:text-5xl">
            Now Showing in {currentLocation}
          </h2>
          <p className="mt-4 text-xl text-gray-600">
            Book your tickets for the latest blockbusters
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {filteredMovies.map((movie) => (
            <MovieCard 
              key={movie.id} 
              movie={movie} 
              onBookNow={() => setSelectedMovie(movie)}
              onRate={() => setRatingMovie(movie)}
            />
          ))}
        </div>

        {filteredMovies.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">
              No movies currently showing in {currentLocation}
            </p>
          </div>
        )}
      </div>

      {selectedMovie && (
        <TheaterModal
          movie={selectedMovie}
          currentLocation={currentLocation}
          onClose={() => setSelectedMovie(null)}
        />
      )}

      {ratingMovie && (
        <RatingModal
          movieTitle={ratingMovie.title}
          onClose={() => setRatingMovie(null)}
          onSubmit={(rating, review) => handleRatingSubmit(ratingMovie.id, rating, review)}
        />
      )}
    </div>
  );
}