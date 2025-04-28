import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ShoppingCart, Heart, Share2, Star, Truck, RotateCcw, Clock, Plus, Minus, Check } from 'lucide-react';
import { useProducts } from '../contexts/ProductContext';
import { useCart } from '../contexts/CartContext';
import ProductGrid from '../components/ProductGrid';
import { toast } from '../components/ui/Toaster';
import { Product } from '../types';

const ProductDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const { getProductById, getRelatedProducts, loading } = useProducts();
  const { addToCart } = useCart();
  const [product, setProduct] = useState<Product | null>(null);
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  const [quantity, setQuantity] = useState(1);
  const [activeImage, setActiveImage] = useState(0);
  const [isFavorite, setIsFavorite] = useState(false);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [selectedColor, setSelectedColor] = useState<string | null>(null);

  useEffect(() => {
    if (id) {
      const fetchedProduct = getProductById(id);
      if (fetchedProduct) {
        setProduct(fetchedProduct);
        setActiveImage(0);
        
        // Reset selected options
        setSelectedSize(fetchedProduct.sizes ? fetchedProduct.sizes[0] : null);
        setSelectedColor(fetchedProduct.colors ? fetchedProduct.colors[0] : null);
        
        // Get related products
        const related = getRelatedProducts(id);
        setRelatedProducts(related);
      }
    }
  }, [id, getProductById, getRelatedProducts]);

  if (loading || !product) {
    return (
      <div className="container mx-auto px-4 py-16 flex justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-orange-500"></div>
      </div>
    );
  }

  const { title, price, description, category, brand, images, rating, stock, discount, sizes, colors } = product;

  const discountedPrice = discount 
    ? (price - (price * discount / 100)).toFixed(2) 
    : price.toFixed(2);

  const formatPrice = (price: string) => {
    return `₹${parseInt(price).toLocaleString('en-IN')}`;
  };

  const incrementQuantity = () => {
    if (quantity < stock) {
      setQuantity(quantity + 1);
    }
  };

  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const handleAddToCart = () => {
    // Validate required options
    if (sizes && !selectedSize) {
      toast.error('Please select a size');
      return;
    }
    
    if (colors && !selectedColor) {
      toast.error('Please select a color');
      return;
    }
    
    addToCart({
      ...product,
      quantity,
      selectedSize,
      selectedColor
    });
    
    toast.success('Added to cart');
  };

  const toggleFavorite = () => {
    setIsFavorite(!isFavorite);
    toast.success(isFavorite ? 'Removed from wishlist' : 'Added to wishlist');
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Breadcrumbs */}
      <div className="mb-4 text-sm text-gray-500">
        <Link to="/" className="hover:text-orange-600">Home</Link>
        <span className="mx-2">/</span>
        <Link to={`/category/${category}`} className="hover:text-orange-600">
          {category.charAt(0).toUpperCase() + category.slice(1)}
        </Link>
        <span className="mx-2">/</span>
        <span className="text-gray-700">{title}</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
        {/* Product Images */}
        <div>
          <div className="mb-4 aspect-square rounded-lg overflow-hidden bg-gray-100">
            <img
              src={images[activeImage]}
              alt={title}
              className="w-full h-full object-contain"
            />
          </div>
          
          {/* Thumbnail Images */}
          <div className="grid grid-cols-5 gap-2">
            {images.map((image, index) => (
              <button
                key={index}
                onClick={() => setActiveImage(index)}
                className={`aspect-square border rounded p-1 ${
                  activeImage === index ? 'border-orange-500' : 'border-gray-200'
                }`}
              >
                <img 
                  src={image} 
                  alt={`${title} thumbnail ${index + 1}`}
                  className="w-full h-full object-contain"
                />
              </button>
            ))}
          </div>
        </div>
        
        {/* Product Information */}
        <div className="flex flex-col">
          {/* Product Title and Rating */}
          <div className="mb-4">
            <div className="flex items-center mb-2">
              <span className="text-sm text-gray-500">{brand}</span>
              <span className="mx-2 text-gray-300">|</span>
              <div className="flex items-center">
                <div className="flex text-yellow-400">
                  {[...Array(5)].map((_, i) => (
                    <Star 
                      key={i} 
                      size={16} 
                      className={i < Math.floor(rating) ? 'fill-current' : ''} 
                    />
                  ))}
                </div>
                <span className="ml-2 text-sm text-gray-600">{rating} out of 5</span>
              </div>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">{title}</h1>
          </div>
          
          {/* Price */}
          <div className="mb-6">
            {discount > 0 && (
              <div className="flex items-center mb-1">
                <span className="text-lg text-gray-500 line-through mr-2">{formatPrice(price.toFixed(2))}</span>
                <span className="bg-orange-500 text-white text-sm font-bold px-2 py-0.5 rounded">
                  {discount}% OFF
                </span>
              </div>
            )}
            <div className="text-3xl font-bold text-gray-900">{formatPrice(discountedPrice)}</div>
          </div>
          
          {/* Description */}
          <div className="mb-6">
            <p className="text-gray-600">{description}</p>
          </div>
          
          {/* Color Selection (if available) */}
          {colors && colors.length > 0 && (
            <div className="mb-6">
              <h3 className="text-sm font-semibold text-gray-700 mb-2">Color</h3>
              <div className="flex space-x-2">
                {colors.map((color) => (
                  <button
                    key={color}
                    onClick={() => setSelectedColor(color)}
                    className={`w-9 h-9 rounded-full flex items-center justify-center border ${
                      selectedColor === color ? 'border-orange-500' : 'border-gray-200'
                    }`}
                    style={{ backgroundColor: color.toLowerCase() }}
                    aria-label={`Select ${color} color`}
                  >
                    {selectedColor === color && (
                      <Check size={16} className="text-white drop-shadow-sm" />
                    )}
                  </button>
                ))}
              </div>
            </div>
          )}
          
          {/* Size Selection (if available) */}
          {sizes && sizes.length > 0 && (
            <div className="mb-6">
              <h3 className="text-sm font-semibold text-gray-700 mb-2">Size</h3>
              <div className="flex flex-wrap gap-2">
                {sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`px-3 py-1 rounded border ${
                      selectedSize === size
                        ? 'border-orange-500 bg-orange-50 text-orange-700'
                        : 'border-gray-200 text-gray-700 hover:border-gray-300'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
          )}
          
          {/* Quantity */}
          <div className="mb-6">
            <h3 className="text-sm font-semibold text-gray-700 mb-2">Quantity</h3>
            <div className="flex items-center">
              <button
                onClick={decrementQuantity}
                className="p-2 border border-gray-300 rounded-l-md"
                disabled={quantity <= 1}
              >
                <Minus size={16} className={quantity <= 1 ? 'text-gray-300' : 'text-gray-600'} />
              </button>
              <div className="px-4 py-1 border-t border-b border-gray-300 text-center min-w-[40px]">
                {quantity}
              </div>
              <button
                onClick={incrementQuantity}
                className="p-2 border border-gray-300 rounded-r-md"
                disabled={quantity >= stock}
              >
                <Plus size={16} className={quantity >= stock ? 'text-gray-300' : 'text-gray-600'} />
              </button>
              <span className="ml-3 text-sm text-gray-500">
                {stock} items available
              </span>
            </div>
          </div>
          
          {/* Add to Cart & Wishlist */}
          <div className="flex items-center space-x-4 mb-6">
            <button
              onClick={handleAddToCart}
              className="flex-1 bg-orange-600 hover:bg-orange-700 text-white py-3 px-6 rounded-md font-medium flex items-center justify-center"
              disabled={stock <= 0}
            >
              <ShoppingCart size={20} className="mr-2" />
              {stock <= 0 ? 'Out of Stock' : 'Add to Cart'}
            </button>
            <button
              onClick={toggleFavorite}
              className="p-3 border border-gray-300 rounded-md hover:bg-gray-100"
              aria-label="Add to wishlist"
            >
              <Heart 
                size={20} 
                className={isFavorite ? 'fill-red-500 text-red-500' : 'text-gray-600'} 
              />
            </button>
            <button
              className="p-3 border border-gray-300 rounded-md hover:bg-gray-100"
              aria-label="Share product"
            >
              <Share2 size={20} className="text-gray-600" />
            </button>
          </div>
          
          {/* Delivery Information */}
          <div className="border-t border-gray-200 pt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center">
                <Truck size={20} className="text-gray-500 mr-3" />
                <div>
                  <h4 className="text-sm font-semibold">Free Delivery</h4>
                  <p className="text-xs text-gray-500">For orders over ₹1,000</p>
                </div>
              </div>
              <div className="flex items-center">
                <RotateCcw size={20} className="text-gray-500 mr-3" />
                <div>
                  <h4 className="text-sm font-semibold">7 Days Return</h4>
                  <p className="text-xs text-gray-500">No questions asked</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <div className="mt-12">
          <ProductGrid 
            products={relatedProducts} 
            title="You may also like"
          />
        </div>
      )}
    </div>
  );
};

export default ProductDetailPage;