import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Filter, ChevronDown, ChevronUp, SlidersHorizontal } from 'lucide-react';
import { useProducts } from '../contexts/ProductContext';
import ProductGrid from '../components/ProductGrid';
import { Product } from '../types';

const CategoryPage = () => {
  const { categoryId } = useParams<{ categoryId: string }>();
  const { getProductsByCategory, loading } = useProducts();
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [showFilters, setShowFilters] = useState(false);
  const [sortBy, setSortBy] = useState('featured');
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 100000]);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [categoryName, setCategoryName] = useState('');

  const categoryMap: Record<string, string> = {
    'electronics': 'Electronics',
    'clothing': 'Traditional Wear',
    'home': 'Home & Kitchen',
    'grocery': 'Grocery & Staples',
    'beauty': 'Beauty & Personal Care',
    'featured': 'Featured Products',
    'new': 'New Arrivals',
    'best-sellers': 'Best Sellers'
  };

  useEffect(() => {
    if (categoryId) {
      const categoryProducts = getProductsByCategory(categoryId);
      setProducts(categoryProducts);
      setFilteredProducts(categoryProducts);
      setCategoryName(categoryMap[categoryId] || categoryId);
    }
  }, [categoryId, getProductsByCategory]);

  useEffect(() => {
    let result = [...products];
    
    // Apply brand filter
    if (selectedBrands.length > 0) {
      result = result.filter(product => selectedBrands.includes(product.brand));
    }
    
    // Apply price filter
    result = result.filter(
      product => product.price >= priceRange[0] && product.price <= priceRange[1]
    );
    
    // Apply sorting
    switch (sortBy) {
      case 'price-asc':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'newest':
        result.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
        break;
      case 'rating':
        result.sort((a, b) => b.rating - a.rating);
        break;
      default:
        // featured - keep default order
        break;
    }
    
    setFilteredProducts(result);
  }, [products, selectedBrands, priceRange, sortBy]);

  // Extract unique brands
  const brands = [...new Set(products.map(p => p.brand))];

  // Get min and max price
  const minPrice = Math.min(...products.map(p => p.price), 0);
  const maxPrice = Math.max(...products.map(p => p.price), 100000);

  const toggleBrand = (brand: string) => {
    setSelectedBrands(prev => 
      prev.includes(brand) 
        ? prev.filter(b => b !== brand)
        : [...prev, brand]
    );
  };

  const handlePriceRangeChange = (min: number, max: number) => {
    setPriceRange([min, max]);
  };

  const formatPrice = (price: number) => {
    return `₹${price.toLocaleString('en-IN')}`;
  };

  const clearFilters = () => {
    setSelectedBrands([]);
    setPriceRange([minPrice, maxPrice]);
    setSortBy('featured');
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-16 flex justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-orange-500"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Breadcrumbs */}
      <div className="mb-4 text-sm text-gray-500">
        <Link to="/" className="hover:text-orange-600">Home</Link>
        <span className="mx-2">/</span>
        <span className="text-gray-700">{categoryName}</span>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Mobile Filter Toggle */}
        <div className="lg:hidden mb-4">
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="w-full py-2 px-4 bg-gray-100 rounded flex items-center justify-between"
          >
            <span className="flex items-center">
              <SlidersHorizontal size={18} className="mr-2" />
              Filters & Sorting
            </span>
            {showFilters ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
          </button>
        </div>

        {/* Sidebar Filters - Desktop always visible, mobile conditional */}
        <div 
          className={`lg:w-1/4 ${showFilters ? 'block' : 'hidden'} lg:block bg-white p-4 rounded-lg shadow-sm`}
        >
          <div className="sticky top-24">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-gray-800">Filters</h2>
              <button 
                onClick={clearFilters}
                className="text-sm text-orange-600 hover:text-orange-800"
              >
                Clear all
              </button>
            </div>

            {/* Sort By */}
            <div className="mb-6">
              <h3 className="text-md font-medium text-gray-700 mb-2">Sort By</h3>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
              >
                <option value="featured">Featured</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="newest">Newest Arrivals</option>
                <option value="rating">Highest Rated</option>
              </select>
            </div>

            {/* Price Range */}
            <div className="mb-6">
              <h3 className="text-md font-medium text-gray-700 mb-2">Price Range</h3>
              <div className="flex items-center justify-between mb-2">
                <span className="text-gray-600">{formatPrice(priceRange[0])}</span>
                <span className="text-gray-600">{formatPrice(priceRange[1])}</span>
              </div>
              <input
                type="range"
                min={minPrice}
                max={maxPrice}
                value={priceRange[0]}
                onChange={(e) => handlePriceRangeChange(Number(e.target.value), priceRange[1])}
                className="w-full mb-2"
              />
              <input
                type="range"
                min={minPrice}
                max={maxPrice}
                value={priceRange[1]}
                onChange={(e) => handlePriceRangeChange(priceRange[0], Number(e.target.value))}
                className="w-full"
              />
            </div>

            {/* Brands */}
            <div className="mb-6">
              <h3 className="text-md font-medium text-gray-700 mb-2">Brands</h3>
              <div className="space-y-2 max-h-60 overflow-y-auto">
                {brands.map((brand) => (
                  <label key={brand} className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={selectedBrands.includes(brand)}
                      onChange={() => toggleBrand(brand)}
                      className="rounded text-orange-600 focus:ring-orange-500 h-4 w-4"
                    />
                    <span className="text-gray-700">{brand}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Product Grid */}
        <div className="lg:w-3/4">
          <div className="mb-4 flex justify-between items-center">
            <h1 className="text-2xl font-bold text-gray-800">{categoryName}</h1>
            <p className="text-gray-600">{filteredProducts.length} products</p>
          </div>

          {filteredProducts.length === 0 ? (
            <div className="text-center py-16 bg-white rounded-lg shadow-sm">
              <h2 className="text-xl font-semibold text-gray-600 mb-2">No products found</h2>
              <p className="text-gray-500">Try adjusting your filters</p>
              <button
                onClick={clearFilters}
                className="mt-4 px-4 py-2 bg-orange-600 text-white rounded-md hover:bg-orange-700"
              >
                Clear Filters
              </button>
            </div>
          ) : (
            <ProductGrid products={filteredProducts} />
          )}
        </div>
      </div>
    </div>
  );
};

export default CategoryPage;