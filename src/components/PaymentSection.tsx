import React, { useState } from 'react';
import { ChevronLeft, CreditCard, Wallet, Gift, AlertCircle } from 'lucide-react';

interface PaymentSectionProps {
  amount: number;
  numberOfSeats: number;
  onComplete: () => void;
  onBack: () => void;
}

export default function PaymentSection({ amount, numberOfSeats, onComplete, onBack }: PaymentSectionProps) {
  const [paymentMethod, setPaymentMethod] = useState<string>('');
  const [cardNumber, setCardNumber] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');
  const [errors, setErrors] = useState({
    cardNumber: '',
    expiryDate: '',
    cvv: ''
  });

  const totalAmount = amount * numberOfSeats;
  const convenienceFee = 1.50 * numberOfSeats;
  const finalAmount = totalAmount + convenienceFee;

  const validateCardNumber = (value: string) => {
    const cleaned = value.replace(/\D/g, '');
    const formatted = cleaned.match(/.{1,4}/g)?.join(' ') || cleaned;
    if (cleaned.length > 16) return;
    setCardNumber(formatted);
    if (cleaned.length < 16) {
      setErrors(prev => ({ ...prev, cardNumber: 'Card number must be 16 digits' }));
    } else {
      setErrors(prev => ({ ...prev, cardNumber: '' }));
    }
  };

  const validateExpiryDate = (value: string) => {
    const cleaned = value.replace(/\D/g, '');
    let formatted = cleaned;
    if (cleaned.length >= 2) {
      formatted = cleaned.slice(0, 2) + '/' + cleaned.slice(2, 4);
    }
    if (cleaned.length > 4) return;
    setExpiryDate(formatted);

    if (cleaned.length === 4) {
      const month = parseInt(cleaned.slice(0, 2));
      const year = parseInt(cleaned.slice(2, 4));
      const currentYear = new Date().getFullYear() % 100;
      const currentMonth = new Date().getMonth() + 1;

      if (month < 1 || month > 12) {
        setErrors(prev => ({ ...prev, expiryDate: 'Invalid month' }));
      } else if (year < currentYear || (year === currentYear && month < currentMonth)) {
        setErrors(prev => ({ ...prev, expiryDate: 'Card has expired' }));
      } else {
        setErrors(prev => ({ ...prev, expiryDate: '' }));
      }
    }
  };

  const validateCVV = (value: string) => {
    const cleaned = value.replace(/\D/g, '');
    if (cleaned.length > 3) return;
    setCvv(cleaned);
    if (cleaned.length < 3) {
      setErrors(prev => ({ ...prev, cvv: 'CVV must be 3 digits' }));
    } else {
      setErrors(prev => ({ ...prev, cvv: '' }));
    }
  };

  const isFormValid = () => {
    return !errors.cardNumber && !errors.expiryDate && !errors.cvv &&
           cardNumber && expiryDate && cvv;
  };

  const paymentMethods = [
    {
      id: 'credit-card',
      name: 'Credit/Debit Card',
      icon: <CreditCard className="w-6 h-6" />
    },
    {
      id: 'digital-wallet',
      name: 'Digital Wallet',
      icon: <Wallet className="w-6 h-6" />
    },
    {
      id: 'gift-card',
      name: 'Gift Card',
      icon: <Gift className="w-6 h-6" />
    }
  ];

  return (
    <div className="space-y-6">
      <button
        onClick={onBack}
        className="flex items-center text-gray-600 hover:text-gray-800"
      >
        <ChevronLeft className="w-5 h-5 mr-1" />
        Back to Seat Selection
      </button>

      <div className="bg-gradient-to-r from-indigo-50 to-purple-50 p-6 rounded-xl shadow-sm">
        <h3 className="text-xl font-semibold mb-4 text-gray-800">Order Summary</h3>
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-gray-600">Tickets ({numberOfSeats})</span>
            <span className="font-medium">${totalAmount.toFixed(2)}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-600">Convenience Fee</span>
            <span className="font-medium">${convenienceFee.toFixed(2)}</span>
          </div>
          <div className="border-t border-gray-200 pt-3 mt-3">
            <div className="flex justify-between items-center">
              <span className="text-lg font-semibold text-gray-800">Total Amount</span>
              <span className="text-lg font-bold text-indigo-600">${finalAmount.toFixed(2)}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-xl font-semibold text-gray-800">Select Payment Method</h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {paymentMethods.map((method) => (
            <button
              key={method.id}
              onClick={() => setPaymentMethod(method.id)}
              className={`p-4 rounded-xl border-2 flex items-center space-x-3 transition-all transform hover:scale-105 ${
                paymentMethod === method.id
                  ? 'border-indigo-600 bg-indigo-50 shadow-md'
                  : 'border-gray-200 hover:border-indigo-300'
              }`}
            >
              <div className={`${paymentMethod === method.id ? 'text-indigo-600' : 'text-gray-500'}`}>
                {method.icon}
              </div>
              <span className={`${paymentMethod === method.id ? 'text-indigo-600 font-medium' : 'text-gray-700'}`}>
                {method.name}
              </span>
            </button>
          ))}
        </div>
      </div>

      {paymentMethod === 'credit-card' && (
        <form className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Card Number
            </label>
            <div className="relative">
              <input
                type="text"
                value={cardNumber}
                onChange={(e) => validateCardNumber(e.target.value)}
                placeholder="1234 5678 9012 3456"
                className={`w-full border ${errors.cardNumber ? 'border-red-500' : 'border-gray-300'} rounded-lg p-3 focus:ring-2 focus:ring-indigo-500 focus:border-transparent`}
              />
              {errors.cardNumber && (
                <div className="absolute right-3 top-1/2 -translate-y-1/2 text-red-500 flex items-center">
                  <AlertCircle className="w-5 h-5" />
                </div>
              )}
            </div>
            {errors.cardNumber && (
              <p className="mt-1 text-sm text-red-500">{errors.cardNumber}</p>
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Expiry Date
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={expiryDate}
                  onChange={(e) => validateExpiryDate(e.target.value)}
                  placeholder="MM/YY"
                  className={`w-full border ${errors.expiryDate ? 'border-red-500' : 'border-gray-300'} rounded-lg p-3 focus:ring-2 focus:ring-indigo-500 focus:border-transparent`}
                />
                {errors.expiryDate && (
                  <div className="absolute right-3 top-1/2 -translate-y-1/2 text-red-500 flex items-center">
                    <AlertCircle className="w-5 h-5" />
                  </div>
                )}
              </div>
              {errors.expiryDate && (
                <p className="mt-1 text-sm text-red-500">{errors.expiryDate}</p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                CVV
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={cvv}
                  onChange={(e) => validateCVV(e.target.value)}
                  placeholder="123"
                  className={`w-full border ${errors.cvv ? 'border-red-500' : 'border-gray-300'} rounded-lg p-3 focus:ring-2 focus:ring-indigo-500 focus:border-transparent`}
                />
                {errors.cvv && (
                  <div className="absolute right-3 top-1/2 -translate-y-1/2 text-red-500 flex items-center">
                    <AlertCircle className="w-5 h-5" />
                  </div>
                )}
              </div>
              {errors.cvv && (
                <p className="mt-1 text-sm text-red-500">{errors.cvv}</p>
              )}
            </div>
          </div>

          <button
            onClick={onComplete}
            disabled={!isFormValid()}
            className={`w-full py-4 px-6 rounded-xl text-white font-medium text-lg transition-all transform hover:scale-105 ${
              isFormValid()
                ? 'bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 shadow-lg'
                : 'bg-gray-400 cursor-not-allowed'
            }`}
          >
            Pay ${finalAmount.toFixed(2)}
          </button>
        </form>
      )}

      {paymentMethod === 'digital-wallet' && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <button className="p-6 border border-gray-200 rounded-xl hover:bg-gray-50 transition-all transform hover:scale-105 flex items-center justify-center space-x-2">
              <img src="/google-pay.svg" alt="Google Pay" className="h-8" />
              <span className="font-medium">Google Pay</span>
            </button>
            <button className="p-6 border border-gray-200 rounded-xl hover:bg-gray-50 transition-all transform hover:scale-105 flex items-center justify-center space-x-2">
              <img src="/apple-pay.svg" alt="Apple Pay" className="h-8" />
              <span className="font-medium">Apple Pay</span>
            </button>
          </div>
          <button
            onClick={onComplete}
            className="w-full py-4 px-6 rounded-xl text-white font-medium text-lg bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 transition-all transform hover:scale-105 shadow-lg"
          >
            Pay ${finalAmount.toFixed(2)}
          </button>
        </div>
      )}

      {paymentMethod === 'gift-card' && (
        <div className="space-y-4">
          <div className="relative">
            <input
              type="text"
              placeholder="Enter Gift Card Number"
              className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              pattern="[0-9]*"
              maxLength={16}
            />
          </div>
          <button
            onClick={onComplete}
            className="w-full py-4 px-6 rounded-xl text-white font-medium text-lg bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 transition-all transform hover:scale-105 shadow-lg"
          >
            Redeem and Pay
          </button>
        </div>
      )}
    </div>
  );
}