import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, X } from 'lucide-react';
import { useProducts } from '../contexts/ProductContext';

const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const [suggestions, setSuggestions] = useState<Array<{ id: string, title: string }>>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const suggestionsRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const { products } = useProducts();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        suggestionsRef.current && 
        inputRef.current && 
        !suggestionsRef.current.contains(event.target as Node) && 
        !inputRef.current.contains(event.target as Node)
      ) {
        setIsFocused(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  useEffect(() => {
    if (searchTerm.trim() === '') {
      setSuggestions([]);
      return;
    }

    const filteredProducts = products
      .filter(product => 
        product.title.toLowerCase().includes(searchTerm.toLowerCase())
      )
      .slice(0, 5)
      .map(product => ({
        id: product.id,
        title: product.title
      }));

    setSuggestions(filteredProducts);
  }, [searchTerm, products]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchTerm)}`);
      setIsFocused(false);
      setSearchTerm('');
    }
  };

  const handleSuggestionClick = (productId: string) => {
    navigate(`/product/${productId}`);
    setIsFocused(false);
    setSearchTerm('');
  };

  const clearSearch = () => {
    setSearchTerm('');
    inputRef.current?.focus();
  };

  return (
    <div className="relative w-full">
      <form onSubmit={handleSearch} className="w-full">
        <div className="relative">
          <input
            ref={inputRef}
            type="text"
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onFocus={() => setIsFocused(true)}
            className="w-full pl-10 pr-10 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-gray-800"
          />
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search size={18} className="text-gray-400" />
          </div>
          {searchTerm && (
            <button
              type="button"
              onClick={clearSearch}
              className="absolute inset-y-0 right-10 flex items-center pr-3 text-gray-400 hover:text-gray-600"
            >
              <X size={16} />
            </button>
          )}
          <button
            type="submit"
            className="absolute inset-y-0 right-0 flex items-center pr-3 text-blue-500 hover:text-blue-600"
          >
            Search
          </button>
        </div>
      </form>

      {/* Search Suggestions */}
      {isFocused && suggestions.length > 0 && (
        <div 
          ref={suggestionsRef}
          className="absolute z-10 w-full mt-1 bg-white rounded-md shadow-lg max-h-60 overflow-auto"
        >
          {suggestions.map(suggestion => (
            <div 
              key={suggestion.id}
              onClick={() => handleSuggestionClick(suggestion.id)}
              className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-gray-800"
            >
              {suggestion.title}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchBar;