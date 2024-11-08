import React from 'react';
import { Film, Calendar, Star, X } from 'lucide-react';

export default function NotificationPanel() {
  const notifications = [
    {
      id: 1,
      type: 'release',
      icon: <Film className="w-5 h-5 text-blue-500" />,
      title: 'New Release Alert',
      message: 'The Matrix Resurrection is now playing in theaters near you!',
      time: '2 hours ago'
    },
    {
      id: 2,
      type: 'reminder',
      icon: <Calendar className="w-5 h-5 text-green-500" />,
      title: 'Booking Reminder',
      message: 'Your movie starts in 2 hours. Don\'t forget your tickets!',
      time: '4 hours ago'
    },
    {
      id: 3,
      type: 'rating',
      icon: <Star className="w-5 h-5 text-yellow-500" />,
      title: 'Rate Your Experience',
      message: 'How was your movie experience yesterday?',
      time: '1 day ago'
    }
  ];

  return (
    <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg overflow-hidden z-50">
      <div className="p-4 border-b border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900">Notifications</h3>
      </div>
      <div className="max-h-96 overflow-y-auto">
        {notifications.map((notification) => (
          <div
            key={notification.id}
            className="p-4 border-b border-gray-100 hover:bg-gray-50 transition-colors"
          >
            <div className="flex items-start">
              <div className="flex-shrink-0">{notification.icon}</div>
              <div className="ml-3 flex-1">
                <p className="text-sm font-medium text-gray-900">{notification.title}</p>
                <p className="text-sm text-gray-500 mt-1">{notification.message}</p>
                <p className="text-xs text-gray-400 mt-1">{notification.time}</p>
              </div>
              <button className="ml-2 text-gray-400 hover:text-gray-600">
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
      <div className="p-4 border-t border-gray-200 bg-gray-50">
        <button className="text-sm text-indigo-600 hover:text-indigo-500 font-medium">
          View all notifications
        </button>
      </div>
    </div>
  );
}