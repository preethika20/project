import React from 'react';
import { Heart, MessageCircle, Share2, User } from 'lucide-react';

export default function DiscussionSection() {
  const discussions = [
    {
      user: "MovieBuff",
      avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=100",
      content: "Just watched the new sci-fi thriller - mind-blowing visual effects! The plot twist at the end was unexpected. What did you all think? #MovieDiscussion",
      likes: 234,
      comments: 45,
      shares: 12,
      time: "2h ago"
    },
    {
      user: "CinematicArt",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=100",
      content: "The cinematography in 'The Last Chapter' deserves an Oscar nomination. Every frame is like a painting. The director's vision really shines through. #Filmmaking",
      likes: 567,
      comments: 89,
      shares: 34,
      time: "4h ago"
    },
    {
      user: "FilmCritic",
      avatar: "https://images.unsplash.com/photo-1527980965255-d3b416303d12?auto=format&fit=crop&q=80&w=100",
      content: "Unpopular opinion: Classic movies had better storytelling than most modern blockbusters. They relied on plot and character development instead of special effects. Thoughts?",
      likes: 789,
      comments: 156,
      shares: 67,
      time: "6h ago"
    }
  ];

  return (
    <div id="discussions" className="bg-white py-24">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Movie Discussions
          </h2>
          <p className="mt-4 text-xl text-gray-600">
            Join the conversation about your favorite films
          </p>
        </div>

        <div className="space-y-6">
          {discussions.map((post, index) => (
            <div key={index} className="bg-white rounded-lg border border-gray-200 p-6">
              <div className="flex items-center mb-4">
                <img src={post.avatar} alt={post.user} className="w-10 h-10 rounded-full" />
                <div className="ml-3">
                  <p className="text-sm font-medium text-gray-900">{post.user}</p>
                  <p className="text-sm text-gray-500">{post.time}</p>
                </div>
              </div>
              <p className="text-gray-800 mb-4">{post.content}</p>
              <div className="flex items-center space-x-6 text-gray-500">
                <button className="flex items-center space-x-2 hover:text-red-500">
                  <Heart className="w-5 h-5" />
                  <span>{post.likes}</span>
                </button>
                <button className="flex items-center space-x-2 hover:text-indigo-500">
                  <MessageCircle className="w-5 h-5" />
                  <span>{post.comments}</span>
                </button>
                <button className="flex items-center space-x-2 hover:text-green-500">
                  <Share2 className="w-5 h-5" />
                  <span>{post.shares}</span>
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 bg-white rounded-lg border border-gray-200 p-4">
          <div className="flex items-start space-x-4">
            <User className="w-10 h-10 text-gray-400 bg-gray-100 rounded-full p-2" />
            <div className="flex-1">
              <textarea
                className="w-full border border-gray-200 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="Share your thoughts about a movie..."
                rows={3}
              ></textarea>
              <button className="mt-2 bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition-colors">
                Post
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}