import React from 'react';
import { useNavigate } from 'react-router-dom';
import Hero from '../components/Hero';
import MovieGrid from '../components/MovieGrid';
import { useLocation } from '../context/LocationContext';

export default function MovieBooking() {
  const { currentLocation } = useLocation();
  const navigate = useNavigate();

  const handleMovieSelect = (movieId: number) => {
    navigate(`/movies/${movieId}`);
  };

  return (
    <main className="pt-16 min-h-screen bg-gradient-to-b from-gray-900 via-purple-900 to-gray-900">
      <Hero />
      <MovieGrid currentLocation={currentLocation} onMovieSelect={handleMovieSelect} />
    </main>
  );
}