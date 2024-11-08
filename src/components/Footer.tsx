import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Youtube } from 'lucide-react';

export default function Footer() {
  const footerLinks = {
    events: [
      { name: 'Groups And Events', href: '#' },
      { name: 'Birthday Parties', href: '#' },
      { name: 'Private Watch Party', href: '#' },
      { name: 'Private Screenings', href: '#' },
      { name: 'Theatre Church', href: '#' },
      { name: 'Film Festivals', href: '#' }
    ],
    about: [
      { name: 'About Us', href: '#' },
      { name: 'Partners', href: '#' },
      { name: 'Help Center', href: '#' },
      { name: 'Career Opportunities', href: '#' },
      { name: 'Privacy Policy', href: '#' },
      { name: 'Terms of Service', href: '#' }
    ],
    contact: [
      { name: 'Contact Us', href: '#' },
      { name: 'Community Affairs', href: '#' },
      { name: 'Advertise With Us', href: '#' },
      { name: 'Download The App', href: '#' }
    ],
    gifting: [
      { name: 'Gift Card Balance', href: '#' },
      { name: 'Digital Gift Cards', href: '#' },
      { name: 'Physical Gift Cards', href: '#' },
      { name: 'Movie Packs', href: '#' },
      { name: 'Discount Tickets', href: '#' }
    ]
  };

  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-white text-lg font-semibold mb-4">Events</h3>
            <ul className="space-y-2">
              {footerLinks.events.map((link) => (
                <li key={link.name}>
                  <Link to={link.href} className="hover:text-white transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-white text-lg font-semibold mb-4">About</h3>
            <ul className="space-y-2">
              {footerLinks.about.map((link) => (
                <li key={link.name}>
                  <Link to={link.href} className="hover:text-white transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-white text-lg font-semibold mb-4">Contact</h3>
            <ul className="space-y-2">
              {footerLinks.contact.map((link) => (
                <li key={link.name}>
                  <Link to={link.href} className="hover:text-white transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-white text-lg font-semibold mb-4">Gifting</h3>
            <ul className="space-y-2">
              {footerLinks.gifting.map((link) => (
                <li key={link.name}>
                  <Link to={link.href} className="hover:text-white transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-gray-800">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex space-x-6 mb-4 md:mb-0">
              <a href="#" className="text-gray-400 hover:text-white">
                <Facebook className="w-6 h-6" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white">
                <Twitter className="w-6 h-6" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white">
                <Instagram className="w-6 h-6" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white">
                <Youtube className="w-6 h-6" />
              </a>
            </div>
            <p className="text-gray-400 text-sm">
              © 2024 CineSpace. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}