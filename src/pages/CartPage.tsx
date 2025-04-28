import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Trash2, ShoppingBag, ArrowRight, Plus, Minus } from 'lucide-react';
import { useCart } from '../contexts/CartContext';
import { toast } from '../components/ui/Toaster';
import { Product } from '../types';

const CartPage = () => {
  const { cartItems, updateCartItemQuantity, removeFromCart, clearCart } = useCart();
  const [couponCode, setCouponCode] = useState('');
  const [isApplyingCoupon, setIsApplyingCoupon] = useState(false);

  // Calculate order summary
  const subtotal = cartItems.reduce(
    (sum, item) => sum + calculateItemPrice(item) * item.quantity, 0
  );
  const shipping = subtotal > 1000 ? 0 : 49;
  const gst = subtotal * 0.18; // 18% GST
  const total = subtotal + shipping + gst;

  function calculateItemPrice(item: Product) {
    return item.discount 
      ? item.price - (item.price * item.discount / 100)
      : item.price;
  }

  const formatPrice = (price: number) => {
    return `₹${price.toLocaleString('en-IN')}`;
  };

  const handleApplyCoupon = () => {
    setIsApplyingCoupon(true);
    
    setTimeout(() => {
      setIsApplyingCoupon(false);
      
      if (couponCode.toLowerCase() === 'first50') {
        toast.success('Coupon applied successfully!');
      } else {
        toast.error('Invalid coupon code');
      }
    }, 1000);
  };

  const handleCheckout = () => {
    toast.success('Order placed successfully!');
    clearCart();
  };

  if (cartItems.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16 flex flex-col items-center justify-center">
        <ShoppingBag size={64} className="text-gray-300 mb-4" />
        <h1 className="text-2xl font-bold text-gray-800 mb-2">Your cart is empty</h1>
        <p className="text-gray-600 mb-8">Looks like you haven't added anything to your cart yet.</p>
        <Link 
          to="/" 
          className="px-6 py-3 bg-orange-600 hover:bg-orange-700 text-white rounded-md font-medium transition-colors"
        >
          Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-gray-800 mb-8">Shopping Cart</h1>
      
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Cart Items */}
        <div className="lg:w-2/3">
          <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            <div className="hidden sm:grid grid-cols-12 gap-4 p-4 bg-gray-50 text-sm font-semibold text-gray-600">
              <div className="col-span-6">Product</div>
              <div className="col-span-2 text-center">Price</div>
              <div className="col-span-2 text-center">Quantity</div>
              <div className="col-span-2 text-right">Total</div>
            </div>
            
            {cartItems.map((item) => {
              const itemPrice = calculateItemPrice(item);
              const itemTotal = itemPrice * item.quantity;
              
              return (
                <div 
                  key={`${item.id}-${item.selectedSize || ''}-${item.selectedColor || ''}`}
                  className="grid grid-cols-1 sm:grid-cols-12 gap-4 p-4 border-b border-gray-200 items-center"
                >
                  {/* Product Info */}
                  <div className="col-span-1 sm:col-span-6 flex gap-4">
                    <Link to={`/product/${item.id}`} className="w-20 h-20 flex-shrink-0">
                      <img 
                        src={item.images[0]} 
                        alt={item.title}
                        className="w-full h-full object-cover rounded" 
                      />
                    </Link>
                    <div className="flex flex-col">
                      <Link 
                        to={`/product/${item.id}`}
                        className="font-medium text-gray-800 hover:text-orange-600"
                      >
                        {item.title}
                      </Link>
                      {item.selectedSize && (
                        <span className="text-sm text-gray-500">Size: {item.selectedSize}</span>
                      )}
                      {item.selectedColor && (
                        <div className="flex items-center mt-1">
                          <span className="text-sm text-gray-500 mr-2">Color:</span>
                          <div 
                            className="w-4 h-4 rounded-full border border-gray-300"
                            style={{ backgroundColor: item.selectedColor.toLowerCase() }}
                          ></div>
                        </div>
                      )}
                      <button
                        onClick={() => removeFromCart(item.id, item.selectedSize, item.selectedColor)}
                        className="flex items-center text-sm text-red-500 hover:text-red-700 mt-2"
                      >
                        <Trash2 size={14} className="mr-1" />
                        Remove
                      </button>
                    </div>
                  </div>
                  
                  {/* Price */}
                  <div className="col-span-1 sm:col-span-2 text-center">
                    <div className="sm:hidden text-sm text-gray-500 mb-1">Price:</div>
                    <div className="font-medium">
                      {formatPrice(itemPrice)}
                      {item.discount > 0 && (
                        <div className="text-xs text-gray-500 line-through">
                          {formatPrice(item.price)}
                        </div>
                      )}
                    </div>
                  </div>
                  
                  {/* Quantity */}
                  <div className="col-span-1 sm:col-span-2 flex justify-center">
                    <div className="sm:hidden text-sm text-gray-500 mb-1">Quantity:</div>
                    <div className="flex items-center">
                      <button
                        onClick={() => updateCartItemQuantity(
                          item.id, 
                          Math.max(1, item.quantity - 1),
                          item.selectedSize,
                          item.selectedColor
                        )}
                        className="p-1 border border-gray-300 rounded-l-md text-gray-600 hover:bg-gray-100"
                        disabled={item.quantity <= 1}
                      >
                        <Minus size={14} />
                      </button>
                      <div className="px-2 py-1 border-t border-b border-gray-300 min-w-[40px] text-center">
                        {item.quantity}
                      </div>
                      <button
                        onClick={() => updateCartItemQuantity(
                          item.id, 
                          Math.min(item.stock, item.quantity + 1),
                          item.selectedSize,
                          item.selectedColor
                        )}
                        className="p-1 border border-gray-300 rounded-r-md text-gray-600 hover:bg-gray-100"
                        disabled={item.quantity >= item.stock}
                      >
                        <Plus size={14} />
                      </button>
                    </div>
                  </div>
                  
                  {/* Total */}
                  <div className="col-span-1 sm:col-span-2 text-right">
                    <div className="sm:hidden text-sm text-gray-500 mb-1">Total:</div>
                    <div className="font-semibold text-gray-900">
                      {formatPrice(itemTotal)}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          
          <div className="flex justify-between mt-4">
            <Link to="/" className="text-orange-600 hover:text-orange-800 flex items-center">
              Continue Shopping
            </Link>
            <button
              onClick={clearCart}
              className="text-red-600 hover:text-red-800"
            >
              Clear Cart
            </button>
          </div>
        </div>
        
        {/* Order Summary */}
        <div className="lg:w-1/3">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">Order Summary</h2>
            
            <div className="space-y-3 mb-4">
              <div className="flex justify-between">
                <span className="text-gray-600">Subtotal</span>
                <span className="font-medium">{formatPrice(subtotal)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Shipping</span>
                <span className="font-medium">
                  {shipping === 0 ? 'Free' : formatPrice(shipping)}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">GST (18%)</span>
                <span className="font-medium">{formatPrice(gst)}</span>
              </div>
            </div>
            
            {/* Coupon Code */}
            <div className="border-t border-gray-200 pt-4 mb-4">
              <label htmlFor="coupon" className="block text-sm font-medium text-gray-700 mb-2">
                Coupon Code
              </label>
              <div className="flex">
                <input
                  type="text"
                  id="coupon"
                  value={couponCode}
                  onChange={(e) => setCouponCode(e.target.value)}
                  placeholder="Enter coupon code"
                  className="flex-1 p-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                />
                <button
                  onClick={handleApplyCoupon}
                  disabled={isApplyingCoupon || !couponCode}
                  className="px-4 py-2 bg-gray-800 hover:bg-gray-700 text-white rounded-r-md disabled:bg-gray-400"
                >
                  {isApplyingCoupon ? 'Applying...' : 'Apply'}
                </button>
              </div>
            </div>
            
            <div className="border-t border-gray-200 pt-4 mb-6">
              <div className="flex justify-between text-lg font-semibold">
                <span>Total</span>
                <span>{formatPrice(total)}</span>
              </div>
              <p className="text-sm text-gray-500 mt-1">
                Including 18% GST
              </p>
            </div>
            
            <button
              onClick={handleCheckout}
              className="w-full bg-orange-600 hover:bg-orange-700 text-white py-3 px-4 rounded-md font-medium flex items-center justify-center"
            >
              Proceed to Checkout <ArrowRight size={16} className="ml-2" />
            </button>

            <div className="mt-4 text-center">
              <p className="text-sm text-gray-500">Secure Payment Options</p>
              <div className="flex justify-center space-x-4 mt-2">
                <span className="text-gray-600">UPI</span>
                <span className="text-gray-600">Net Banking</span>
                <span className="text-gray-600">Cards</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;