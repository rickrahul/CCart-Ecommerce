import { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { ShoppingCart, Search, Menu, X, User, LogIn, LogOut, Package } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useCart } from '../contexts/CartContext';
import SearchBar from './SearchBar';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { user, logout } = useAuth();
  const { cartItems } = useCart();
  const navigate = useNavigate();
  const location = useLocation();

  const categories = [
    { id: 'electronics', name: 'Electronics' },
    { id: 'clothing', name: 'Traditional Wear' },
    { id: 'home', name: 'Home & Kitchen' },
    { id: 'grocery', name: 'Grocery & Staples' },
    { id: 'beauty', name: 'Beauty & Personal Care' }
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <header className={`sticky top-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-white shadow-md' : 'bg-orange-600 text-white'}`}>
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="font-bold text-2xl flex items-center gap-2">
            <Package size={28} />
            <span>CCart</span>
          </Link>

          {/* Search Bar - Hidden on mobile */}
          <div className="hidden md:block flex-grow mx-4 max-w-xl">
            <SearchBar />
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-4">
            <Link to="/cart" className="relative p-2 rounded-full hover:bg-gray-100 hover:bg-opacity-20 transition-colors">
              <ShoppingCart size={24} />
              {cartItems.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-green-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                  {cartItems.length}
                </span>
              )}
            </Link>
            
            {user ? (
              <div className="relative group">
                <button className="flex items-center space-x-1 p-2 rounded-full hover:bg-gray-100 hover:bg-opacity-20 transition-colors">
                  <User size={24} />
                  <span>{user.name.split(' ')[0]}</span>
                </button>
                <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-md overflow-hidden z-10 hidden group-hover:block">
                  {user.isAdmin && (
                    <Link to="/admin" className="block px-4 py-2 text-gray-800 hover:bg-orange-50">
                      Admin Dashboard
                    </Link>
                  )}
                  <button 
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2 text-gray-800 hover:bg-orange-50 flex items-center"
                  >
                    <LogOut size={16} className="mr-2" /> Logout
                  </button>
                </div>
              </div>
            ) : (
              <Link to="/login" className="flex items-center space-x-1 p-2 rounded-full hover:bg-gray-100 hover:bg-opacity-20 transition-colors">
                <LogIn size={24} />
                <span>Login</span>
              </Link>
            )}
          </nav>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden p-2 rounded-full hover:bg-gray-100 hover:bg-opacity-20"
            onClick={toggleMenu}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Category Navigation */}
        <div className="hidden md:flex items-center space-x-6 text-sm py-2">
          {categories.map(category => (
            <Link 
              key={category.id}
              to={`/category/${category.id}`}
              className="hover:underline transition-colors"
            >
              {category.name}
            </Link>
          ))}
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white text-gray-800 shadow-lg">
          <div className="p-4 border-b">
            <SearchBar />
          </div>
          <nav className="flex flex-col">
            {categories.map(category => (
              <Link 
                key={category.id}
                to={`/category/${category.id}`}
                className="px-4 py-3 hover:bg-gray-100"
              >
                {category.name}
              </Link>
            ))}
            <Link to="/cart" className="px-4 py-3 hover:bg-gray-100 flex items-center">
              <ShoppingCart size={20} className="mr-2" />
              Cart {cartItems.length > 0 && `(${cartItems.length})`}
            </Link>
            {user ? (
              <>
                {user.isAdmin && (
                  <Link to="/admin" className="px-4 py-3 hover:bg-gray-100 flex items-center">
                    <Package size={20} className="mr-2" />
                    Admin Dashboard
                  </Link>
                )}
                <button 
                  onClick={handleLogout}
                  className="w-full text-left px-4 py-3 hover:bg-gray-100 flex items-center"
                >
                  <LogOut size={20} className="mr-2" />
                  Logout
                </button>
              </>
            ) : (
              <Link to="/login" className="px-4 py-3 hover:bg-gray-100 flex items-center">
                <LogIn size={20} className="mr-2" />
                Login / Register
              </Link>
            )}
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;