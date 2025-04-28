import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, Heart, Star } from 'lucide-react';
import { useCart } from '../contexts/CartContext';
import { Product } from '../types';

interface ProductCardProps {
  product: Product;
  horizontal?: boolean;
}

const ProductCard = ({ product, horizontal = false }: ProductCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  const { addToCart } = useCart();

  const { id, title, price, images, rating, discount } = product;

  const discountedPrice = discount 
    ? (price - (price * discount / 100)).toFixed(2) 
    : price.toFixed(2);

  const formatPrice = (price: string) => {
    return `₹${parseInt(price).toLocaleString('en-IN')}`;
  };

  return (
    <div 
      className={`group bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 ${
        horizontal ? 'flex' : 'flex flex-col'
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Product Image */}
      <Link 
        to={`/product/${id}`} 
        className={`relative block overflow-hidden ${
          horizontal ? 'w-1/3' : 'aspect-square'
        }`}
      >
        <img 
          src={images[0]} 
          alt={title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        
        {discount > 0 && (
          <div className="absolute top-2 left-2 bg-orange-500 text-white text-xs font-bold px-2 py-1 rounded">
            {discount}% OFF
          </div>
        )}
        
        <button 
          onClick={(e) => {
            e.preventDefault();
            setIsFavorite(!isFavorite);
          }}
          className="absolute top-2 right-2 p-1.5 bg-white rounded-full shadow-sm opacity-70 hover:opacity-100 transition-opacity"
        >
          <Heart 
            size={18} 
            className={isFavorite ? 'fill-red-500 text-red-500' : 'text-gray-600'} 
          />
        </button>
      </Link>
      
      {/* Product Details */}
      <div className={`flex flex-col p-4 ${horizontal ? 'flex-1' : ''}`}>
        <div className="flex items-center mb-1">
          <div className="flex items-center text-yellow-400">
            <Star size={16} className="fill-current" />
            <span className="ml-1 text-sm text-gray-700">{rating}</span>
          </div>
        </div>
        
        <Link to={`/product/${id}`} className="mb-1">
          <h3 className="font-medium text-gray-800 line-clamp-2 group-hover:text-orange-600 transition-colors">
            {title}
          </h3>
        </Link>
        
        <div className="mt-auto pt-2 flex items-end justify-between">
          <div className="flex flex-col">
            {discount > 0 && (
              <span className="text-sm text-gray-500 line-through">
                {formatPrice(price.toFixed(2))}
              </span>
            )}
            <span className="text-lg font-semibold text-gray-900">
              {formatPrice(discountedPrice)}
            </span>
          </div>
          
          <button 
            onClick={(e) => {
              e.stopPropagation();
              addToCart(product);
            }}
            className="flex items-center space-x-1 bg-orange-600 hover:bg-orange-700 text-white py-1.5 px-3 rounded-md transition-colors"
          >
            <ShoppingCart size={16} />
            <span className="hidden sm:inline">Add</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;