import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import MovieBooking from './pages/MovieBooking';
import MovieDetails from './pages/MovieDetails';
import Discussions from './pages/Discussions';
import Home from './pages/Home';
import { LocationProvider } from './context/LocationContext';

export default function App() {
  return (
    <LocationProvider>
      <BrowserRouter>
        <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black">
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/movies" element={<MovieBooking />} />
            <Route path="/movies/:id" element={<MovieDetails />} />
            <Route path="/discussions" element={<Discussions />} />
          </Routes>
        </div>
      </BrowserRouter>
    </LocationProvider>
  );
}