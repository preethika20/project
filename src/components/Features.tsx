import React from 'react';
import { Users, Calendar, Share2, TrendingUp } from 'lucide-react';

export default function Features() {
  const features = [
    {
      icon: <Users className="w-8 h-8 text-indigo-600" />,
      title: "Social Networking",
      description: "Connect with friends, share updates, and engage with your community in real-time."
    },
    {
      icon: <Calendar className="w-8 h-8 text-indigo-600" />,
      title: "Event Booking",
      description: "Discover and book events seamlessly. From concerts to workshops, all in one place."
    },
    {
      icon: <Share2 className="w-8 h-8 text-indigo-600" />,
      title: "Share Experiences",
      description: "Share your event experiences, photos, and reviews with your network instantly."
    },
    {
      icon: <TrendingUp className="w-8 h-8 text-indigo-600" />,
      title: "Trending Events",
      description: "Stay updated with trending events and what's popular in your social circle."
    }
  ];

  return (
    <div className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Everything you need in one place
          </h2>
          <p className="mt-4 text-xl text-gray-600">
            Combine your social life with event discovery and booking
          </p>
        </div>

        <div className="mt-20 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          {features.map((feature, index) => (
            <div key={index} className="flex flex-col items-center text-center">
              <div className="flex items-center justify-center h-16 w-16 rounded-md bg-indigo-50">
                {feature.icon}
              </div>
              <h3 className="mt-4 text-lg font-medium text-gray-900">{feature.title}</h3>
              <p className="mt-2 text-base text-gray-500">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}