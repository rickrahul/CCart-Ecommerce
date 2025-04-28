import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Mail, Phone, MapPin, Package } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-800 text-gray-200">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <Link to="/" className="flex items-center gap-2 font-bold text-xl mb-4">
              <Package size={24} />
              <span>CCart</span>
            </Link>
            <p className="text-gray-400 mb-4">
              Your one-stop destination for all your shopping needs with the best prices and quality products.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="hover:text-orange-400 transition-colors" aria-label="Facebook">
                <Facebook size={20} />
              </a>
              <a href="#" className="hover:text-orange-400 transition-colors" aria-label="Twitter">
                <Twitter size={20} />
              </a>
              <a href="#" className="hover:text-orange-400 transition-colors" aria-label="Instagram">
                <Instagram size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="hover:text-orange-400 transition-colors">Home</Link>
              </li>
              <li>
                <Link to="/category/electronics" className="hover:text-orange-400 transition-colors">Electronics</Link>
              </li>
              <li>
                <Link to="/category/clothing" className="hover:text-orange-400 transition-colors">Traditional Wear</Link>
              </li>
              <li>
                <Link to="/cart" className="hover:text-orange-400 transition-colors">Cart</Link>
              </li>
              <li>
                <Link to="/login" className="hover:text-orange-400 transition-colors">Login</Link>
              </li>
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Customer Service</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="hover:text-orange-400 transition-colors">FAQ</a>
              </li>
              <li>
                <a href="#" className="hover:text-orange-400 transition-colors">Shipping Policy</a>
              </li>
              <li>
                <a href="#" className="hover:text-orange-400 transition-colors">Return Policy</a>
              </li>
              <li>
                <a href="#" className="hover:text-orange-400 transition-colors">Privacy Policy</a>
              </li>
              <li>
                <a href="#" className="hover:text-orange-400 transition-colors">Terms of Service</a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <MapPin size={20} className="mr-2 mt-1 flex-shrink-0" />
                <span>123 Shopping Avenue, Mumbai, India</span>
              </li>
              <li className="flex items-center">
                <Phone size={20} className="mr-2 flex-shrink-0" />
                <span>+91 98765 43210</span>
              </li>
              <li className="flex items-center">
                <Mail size={20} className="mr-2 flex-shrink-0" />
                <span>contact@ccart.in</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-6 text-center text-gray-400">
          <p>&copy; {currentYear} CCart. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;