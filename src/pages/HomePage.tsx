import { useState, useEffect } from 'react';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useProducts } from '../contexts/ProductContext';
import ProductGrid from '../components/ProductGrid';
import HeroSlider from '../components/HeroSlider';
import CategoryCards from '../components/CategoryCards';

const HomePage = () => {
  const { products, featuredProducts, newArrivals, bestSellers, loading } = useProducts();
  const [categories, setCategories] = useState([
    { id: 'electronics', name: 'Electronics', image: 'https://images.pexels.com/photos/1029757/pexels-photo-1029757.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1' },
    { id: 'clothing', name: 'Clothing', image: 'https://images.pexels.com/photos/934070/pexels-photo-934070.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1' },
    { id: 'home', name: 'Home & Kitchen', image: 'https://images.pexels.com/photos/1457842/pexels-photo-1457842.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1' },
    { id: 'books', name: 'Books', image: 'https://images.pexels.com/photos/1370295/pexels-photo-1370295.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1' },
    { id: 'toys', name: 'Toys & Games', image: 'https://images.pexels.com/photos/163036/mario-luigi-yoschi-figures-163036.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1' }
  ]);

  const heroSlides = [
    {
      id: '1',
      image: 'https://images.pexels.com/photos/1546191/pexels-photo-1546191.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      title: 'New Season Arrivals',
      subtitle: 'Check out the latest trends for this season',
      buttonText: 'Shop Now',
      buttonLink: '/category/clothing'
    },
    {
      id: '2',
      image: 'https://images.pexels.com/photos/1779487/pexels-photo-1779487.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      title: 'Electronics Sale',
      subtitle: 'Up to 40% off on selected electronics',
      buttonText: 'View Offers',
      buttonLink: '/category/electronics'
    }
  ];

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <HeroSlider slides={heroSlides} />
      
      <div className="container mx-auto px-4 py-8">
        {/* Categories */}
        <div className="mb-12">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-800">Shop by Category</h2>
          </div>
          <CategoryCards categories={categories} />
        </div>

        {/* Featured Products */}
        <section className="mb-12">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-800">Featured Products</h2>
            <Link to="/category/featured" className="text-blue-600 hover:text-blue-800 flex items-center">
              View All <ArrowRight size={16} className="ml-1" />
            </Link>
          </div>
          <ProductGrid products={featuredProducts} />
        </section>

        {/* New Arrivals */}
        <section className="mb-12">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-800">New Arrivals</h2>
            <Link to="/category/new" className="text-blue-600 hover:text-blue-800 flex items-center">
              View All <ArrowRight size={16} className="ml-1" />
            </Link>
          </div>
          <ProductGrid products={newArrivals} />
        </section>

        {/* Best Sellers */}
        <section className="mb-12">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-800">Best Sellers</h2>
            <Link to="/category/best-sellers" className="text-blue-600 hover:text-blue-800 flex items-center">
              View All <ArrowRight size={16} className="ml-1" />
            </Link>
          </div>
          <ProductGrid products={bestSellers} />
        </section>
      </div>
    </div>
  );
};

export default HomePage;