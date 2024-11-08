import React, { useState } from 'react';
import { ChevronLeft } from 'lucide-react';

interface SeatSelectionProps {
  numberOfSeats: number;
  onSelectSeats: (seats: string[]) => void;
  onBack: () => void;
}

export default function SeatSelection({ numberOfSeats, onSelectSeats, onBack }: SeatSelectionProps) {
  const [selectedSeats, setSelectedSeats] = useState<string[]>([]);

  // Generate a 10x8 seating layout
  const rows = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
  const seatsPerRow = 10;

  // Simulate some random booked seats
  const bookedSeats = [
    'A3', 'A4', 'B5', 'C2', 'C3', 'D7', 'E4', 'E5', 'F1', 'G8', 'H6'
  ];

  // Handicapped seats
  const handicappedSeats = ['H1', 'H2', 'H3', 'H4'];

  const handleSeatClick = (seatId: string) => {
    if (bookedSeats.includes(seatId)) return;

    setSelectedSeats(prev => {
      if (prev.includes(seatId)) {
        return prev.filter(s => s !== seatId);
      }
      if (prev.length < numberOfSeats) {
        return [...prev, seatId];
      }
      return prev;
    });
  };

  const getSeatStatus = (seatId: string) => {
    if (bookedSeats.includes(seatId)) return 'booked';
    if (handicappedSeats.includes(seatId)) return 'handicapped';
    if (selectedSeats.includes(seatId)) return 'selected';
    return 'available';
  };

  const getSeatClasses = (status: string) => {
    const baseClasses = 'w-8 h-8 m-1 rounded-t-lg transition-colors';
    switch (status) {
      case 'booked':
        return `${baseClasses} bg-gray-400 cursor-not-allowed`;
      case 'handicapped':
        return `${baseClasses} bg-blue-200 hover:bg-blue-300 cursor-pointer`;
      case 'selected':
        return `${baseClasses} bg-indigo-600 text-white`;
      default:
        return `${baseClasses} bg-gray-200 hover:bg-gray-300 cursor-pointer`;
    }
  };

  return (
    <div className="space-y-6">
      <button
        onClick={onBack}
        className="flex items-center text-gray-600 hover:text-gray-800"
      >
        <ChevronLeft className="w-5 h-5 mr-1" />
        Back to Theater Selection
      </button>

      <div className="text-center space-y-4">
        <div className="w-full h-8 bg-gray-800 text-white text-center">
          Screen
        </div>

        <div className="flex justify-center">
          <div className="space-y-2">
            {rows.map(row => (
              <div key={row} className="flex items-center">
                <span className="w-6 text-center">{row}</span>
                <div className="flex">
                  {Array.from({ length: seatsPerRow }, (_, i) => {
                    const seatId = `${row}${i + 1}`;
                    const status = getSeatStatus(seatId);
                    return (
                      <button
                        key={seatId}
                        onClick={() => handleSeatClick(seatId)}
                        disabled={status === 'booked'}
                        className={getSeatClasses(status)}
                      />
                    );
                  })}
                </div>
                <span className="w-6 text-center">{row}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="flex justify-center space-x-8">
          <div className="flex items-center">
            <div className="w-4 h-4 bg-gray-200 rounded mr-2" />
            <span className="text-sm">Available</span>
          </div>
          <div className="flex items-center">
            <div className="w-4 h-4 bg-indigo-600 rounded mr-2" />
            <span className="text-sm">Selected</span>
          </div>
          <div className="flex items-center">
            <div className="w-4 h-4 bg-gray-400 rounded mr-2" />
            <span className="text-sm">Booked</span>
          </div>
          <div className="flex items-center">
            <div className="w-4 h-4 bg-blue-200 rounded mr-2" />
            <span className="text-sm">Handicapped</span>
          </div>
        </div>
      </div>

      <button
        onClick={() => onSelectSeats(selectedSeats)}
        disabled={selectedSeats.length !== numberOfSeats}
        className={`w-full py-3 px-4 rounded-md text-white font-medium ${
          selectedSeats.length === numberOfSeats
            ? 'bg-indigo-600 hover:bg-indigo-700'
            : 'bg-gray-400 cursor-not-allowed'
        }`}
      >
        Continue to Payment
      </button>

      <p className="text-sm text-gray-500 text-center">
        Please select {numberOfSeats} seat{numberOfSeats > 1 ? 's' : ''}
      </p>
    </div>
  );
}