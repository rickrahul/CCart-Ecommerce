import ProductCard from './ProductCard';
import { Product } from '../types';

interface ProductGridProps {
  products: Product[];
  title?: string;
}

const ProductGrid = ({ products, title }: ProductGridProps) => {
  if (products.length === 0) {
    return (
      <div className="text-center py-16">
        <h2 className="text-2xl font-semibold text-gray-600">No products found</h2>
        <p className="text-gray-500 mt-2">Try adjusting your search or filter criteria</p>
      </div>
    );
  }

  return (
    <div className="mb-8">
      {title && (
        <h2 className="text-2xl font-semibold mb-4 text-gray-800">{title}</h2>
      )}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {products.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default ProductGrid;