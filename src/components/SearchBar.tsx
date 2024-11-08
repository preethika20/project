import React, { useState, useEffect, useRef } from 'react';
import { Search, X } from 'lucide-react';

export default function SearchBar() {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const searchRef = useRef<HTMLDivElement>(null);

  // Mock suggestions - replace with actual API call in production
  const getSuggestions = (searchQuery: string) => {
    const allSuggestions = [
      'Venom: Let There Be Carnage',
      'The Wild Robot',
      'Smile 2',
      'Conclave',
      'Here',
      'Wicked',
      'Red One',
      'Heretic'
    ];
    
    return allSuggestions.filter(suggestion => 
      suggestion.toLowerCase().includes(searchQuery.toLowerCase())
    );
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    if (query) {
      setSuggestions(getSuggestions(query));
    } else {
      setSuggestions([]);
    }
  }, [query]);

  return (
    <div className="relative" ref={searchRef}>
      {!isOpen ? (
        <button
          onClick={() => setIsOpen(true)}
          className="p-2 text-gray-500 hover:text-indigo-600 transition-colors"
        >
          <Search className="w-5 h-5" />
        </button>
      ) : (
        <div className="absolute right-0 top-0 w-screen max-w-xs">
          <div className="flex items-center bg-white border border-gray-200 rounded-lg shadow-lg">
            <Search className="w-5 h-5 text-gray-400 ml-3" />
            <input
              type="text"
              placeholder="Search movies, discussions..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full p-2 pl-3 pr-8 focus:outline-none"
              autoFocus
            />
            <button
              onClick={() => {
                setIsOpen(false);
                setQuery('');
              }}
              className="p-2 text-gray-400 hover:text-gray-600"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
          
          {suggestions.length > 0 && (
            <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-lg max-h-60 overflow-auto">
              {suggestions.map((suggestion, index) => (
                <button
                  key={index}
                  className="w-full text-left px-4 py-2 hover:bg-gray-50 text-sm"
                  onClick={() => {
                    setQuery(suggestion);
                    setIsOpen(false);
                  }}
                >
                  {suggestion}
                </button>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}