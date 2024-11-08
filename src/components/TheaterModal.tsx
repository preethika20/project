import React, { useState } from 'react';
import { X, MapPin } from 'lucide-react';
import SeatSelection from './SeatSelection';
import PaymentSection from './PaymentSection';

interface Theater {
  name: string;
  shows: string[];
  price: number;
  location: string;
}

interface TheaterModalProps {
  movie: {
    title: string;
    theaters: Theater[];
  };
  selectedDate: Date;
  currentLocation: string;
  onClose: () => void;
}

export default function TheaterModal({ movie, selectedDate, currentLocation, onClose }: TheaterModalProps) {
  const [selectedTheater, setSelectedTheater] = useState('');
  const [selectedShow, setSelectedShow] = useState('');
  const [numberOfSeats, setNumberOfSeats] = useState(1);
  const [step, setStep] = useState<'theater' | 'seats' | 'payment'>('theater');
  const [selectedSeats, setSelectedSeats] = useState<string[]>([]);

  // Filter theaters based on current location
  const localTheaters = movie.theaters.filter(theater => theater.location === currentLocation);

  const handleContinueToSeats = () => {
    if (selectedTheater && selectedShow) {
      setStep('seats');
    }
  };

  const handleSeatSelection = (seats: string[]) => {
    setSelectedSeats(seats);
    setStep('payment');
  };

  const handlePaymentComplete = () => {
    // Handle successful payment
    console.log('Payment completed for:', {
      movie: movie.title,
      theater: selectedTheater,
      show: selectedShow,
      seats: selectedSeats,
      date: selectedDate
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg max-w-2xl w-full p-6 relative max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-gray-400 hover:text-gray-600"
        >
          <X className="w-5 h-5" />
        </button>

        <h2 className="text-2xl font-bold text-center mb-6">
          {movie.title} - {selectedDate.toLocaleDateString()}
        </h2>

        {step === 'theater' && (
          <>
            <div className="space-y-6">
              {localTheaters.map((theater) => (
                <div 
                  key={theater.name}
                  className={`p-4 rounded-lg border-2 transition-colors ${
                    selectedTheater === theater.name 
                      ? 'border-indigo-600 bg-indigo-50' 
                      : 'border-gray-200 hover:border-indigo-300'
                  }`}
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center">
                      <MapPin className="w-5 h-5 text-indigo-600 mr-2" />
                      <h3 className="text-lg font-semibold">{theater.name}</h3>
                    </div>
                    <span className="text-green-600 font-semibold">
                      ${theater.price}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {theater.shows.map((show) => (
                      <button
                        key={`${theater.name}-${show}`}
                        onClick={() => {
                          setSelectedTheater(theater.name);
                          setSelectedShow(show);
                        }}
                        className={`py-2 px-4 rounded-md text-sm font-medium transition-colors ${
                          selectedTheater === theater.name && selectedShow === show
                            ? 'bg-indigo-600 text-white'
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                      >
                        {show}
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {selectedTheater && selectedShow && (
              <div className="mt-6 space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Number of Seats
                  </label>
                  <select
                    value={numberOfSeats}
                    onChange={(e) => setNumberOfSeats(Number(e.target.value))}
                    className="w-full border border-gray-300 rounded-md p-2"
                  >
                    {[1, 2, 3, 4, 5, 6, 7, 8].map((num) => (
                      <option key={num} value={num}>
                        {num} {num === 1 ? 'seat' : 'seats'}
                      </option>
                    ))}
                  </select>
                </div>

                <button
                  onClick={handleContinueToSeats}
                  className="w-full bg-indigo-600 text-white py-3 px-4 rounded-md hover:bg-indigo-700 transition-colors"
                >
                  Continue to Seat Selection
                </button>
              </div>
            )}
          </>
        )}

        {step === 'seats' && (
          <SeatSelection
            numberOfSeats={numberOfSeats}
            onSelectSeats={handleSeatSelection}
            onBack={() => setStep('theater')}
          />
        )}

        {step === 'payment' && (
          <PaymentSection
            amount={localTheaters.find(t => t.name === selectedTheater)?.price || 0}
            numberOfSeats={selectedSeats.length}
            onComplete={handlePaymentComplete}
            onBack={() => setStep('seats')}
          />
        )}
      </div>
    </div>
  );
}