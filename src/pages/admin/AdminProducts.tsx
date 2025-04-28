import { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Search, Plus, Edit, Trash2, ChevronLeft, ChevronRight, 
  Upload, X, Image as ImageIcon, Check, AlertCircle 
} from 'lucide-react';
import { useProducts } from '../../contexts/ProductContext';
import { toast } from '../../components/ui/Toaster';
import { Product } from '../../types';

const AdminProducts = () => {
  const { products, addProduct, updateProduct, deleteProduct } = useProducts();
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedProducts, setSelectedProducts] = useState<string[]>([]);
  const [sortConfig, setSortConfig] = useState<{
    key: keyof Product | null;
    direction: 'asc' | 'desc';
  }>({ key: null, direction: 'asc' });

  // New product form state
  const [newProduct, setNewProduct] = useState<Partial<Product>>({
    title: '',
    description: '',
    price: 0,
    category: '',
    brand: '',
    images: [],
    stock: 0,
    rating: 5.0,
    discount: 0,
    colors: [],
    sizes: []
  });

  // Pagination
  const productsPerPage = 10;
  const filteredProducts = products.filter(product => 
    product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Sorting
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (!sortConfig.key) return 0;
    
    if (a[sortConfig.key] < b[sortConfig.key]) {
      return sortConfig.direction === 'asc' ? -1 : 1;
    }
    if (a[sortConfig.key] > b[sortConfig.key]) {
      return sortConfig.direction === 'asc' ? 1 : -1;
    }
    return 0;
  });

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = sortedProducts.slice(indexOfFirstProduct, indexOfLastProduct);
  const totalPages = Math.ceil(sortedProducts.length / productsPerPage);

  const handleSort = (key: keyof Product) => {
    const direction = 
      sortConfig.key === key && sortConfig.direction === 'asc' ? 'desc' : 'asc';
    setSortConfig({ key, direction });
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      setSelectedProducts(currentProducts.map(p => p.id));
    } else {
      setSelectedProducts([]);
    }
  };

  const handleSelectProduct = (productId: string) => {
    setSelectedProducts(prev => 
      prev.includes(productId)
        ? prev.filter(id => id !== productId)
        : [...prev, productId]
    );
  };

  const handleDeleteSelected = () => {
    if (window.confirm(`Are you sure you want to delete ${selectedProducts.length} products?`)) {
      selectedProducts.forEach(id => deleteProduct(id));
      setSelectedProducts([]);
      toast.success(`${selectedProducts.length} products deleted`);
    }
  };

  const openAddModal = () => {
    setEditingProduct(null);
    setNewProduct({
      title: '',
      description: '',
      price: 0,
      category: '',
      brand: '',
      images: [],
      stock: 0,
      rating: 5.0,
      discount: 0,
      colors: [],
      sizes: []
    });
    setShowAddModal(true);
  };

  const openEditModal = (product: Product) => {
    setEditingProduct(product);
    setNewProduct({...product});
    setShowAddModal(true);
  };

  const closeModal = () => {
    setShowAddModal(false);
    setNewProduct({
      title: '',
      description: '',
      price: 0,
      category: '',
      brand: '',
      images: [],
      stock: 0,
      rating: 5.0,
      discount: 0,
      colors: [],
      sizes: []
    });
    setEditingProduct(null);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    
    if (name === 'price' || name === 'stock' || name === 'discount') {
      setNewProduct(prev => ({
        ...prev,
        [name]: parseFloat(value)
      }));
    } else {
      setNewProduct(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleColorsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const colors = e.target.value.split(',').map(color => color.trim());
    setNewProduct(prev => ({
      ...prev,
      colors
    }));
  };

  const handleSizesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const sizes = e.target.value.split(',').map(size => size.trim());
    setNewProduct(prev => ({
      ...prev,
      sizes
    }));
  };

  const handleImagesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const images = e.target.value.split(',').map(url => url.trim());
    setNewProduct(prev => ({
      ...prev,
      images
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation
    if (!newProduct.title || !newProduct.description || !newProduct.category || !newProduct.brand) {
      toast.error('Please fill in all required fields');
      return;
    }
    
    if (newProduct.price! <= 0) {
      toast.error('Price must be greater than zero');
      return;
    }
    
    if (newProduct.stock! < 0) {
      toast.error('Stock cannot be negative');
      return;
    }
    
    if (newProduct.images!.length === 0) {
      toast.error('Please add at least one image URL');
      return;
    }
    
    try {
      if (editingProduct) {
        // Update existing product
        updateProduct(editingProduct.id, newProduct as Product);
        toast.success('Product updated successfully');
      } else {
        // Add new product
        addProduct(newProduct as Product);
        toast.success('Product added successfully');
      }
      closeModal();
    } catch (error) {
      toast.error('Error saving product');
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Product Management</h1>
        <button
          onClick={openAddModal}
          className="flex items-center bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md transition-colors"
        >
          <Plus size={18} className="mr-1" />
          Add Product
        </button>
      </div>

      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        {/* Toolbar */}
        <div className="p-4 border-b border-gray-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="relative flex-1">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search size={18} className="text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 py-2 pr-4 block w-full rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          
          {selectedProducts.length > 0 && (
            <div className="flex items-center">
              <span className="text-sm text-gray-600 mr-2">
                {selectedProducts.length} selected
              </span>
              <button
                onClick={handleDeleteSelected}
                className="flex items-center text-red-600 hover:text-red-800"
              >
                <Trash2 size={18} className="mr-1" />
                Delete
              </button>
            </div>
          )}
        </div>

        {/* Products Table */}
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left">
                  <input
                    type="checkbox"
                    checked={
                      currentProducts.length > 0 &&
                      currentProducts.every(p => selectedProducts.includes(p.id))
                    }
                    onChange={handleSelectAll}
                    className="rounded text-blue-600 focus:ring-blue-500 h-4 w-4"
                  />
                </th>
                <th 
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                  onClick={() => handleSort('title')}
                >
                  <div className="flex items-center">
                    Product
                    {sortConfig.key === 'title' && (
                      <span className="ml-1">
                        {sortConfig.direction === 'asc' ? '↑' : '↓'}
                      </span>
                    )}
                  </div>
                </th>
                <th 
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                  onClick={() => handleSort('category')}
                >
                  <div className="flex items-center">
                    Category
                    {sortConfig.key === 'category' && (
                      <span className="ml-1">
                        {sortConfig.direction === 'asc' ? '↑' : '↓'}
                      </span>
                    )}
                  </div>
                </th>
                <th 
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                  onClick={() => handleSort('price')}
                >
                  <div className="flex items-center">
                    Price
                    {sortConfig.key === 'price' && (
                      <span className="ml-1">
                        {sortConfig.direction === 'asc' ? '↑' : '↓'}
                      </span>
                    )}
                  </div>
                </th>
                <th 
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                  onClick={() => handleSort('stock')}
                >
                  <div className="flex items-center">
                    Stock
                    {sortConfig.key === 'stock' && (
                      <span className="ml-1">
                        {sortConfig.direction === 'asc' ? '↑' : '↓'}
                      </span>
                    )}
                  </div>
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {currentProducts.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-4 text-center text-gray-500">
                    No products found
                  </td>
                </tr>
              ) : (
                currentProducts.map((product) => (
                  <tr key={product.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <input
                        type="checkbox"
                        checked={selectedProducts.includes(product.id)}
                        onChange={() => handleSelectProduct(product.id)}
                        className="rounded text-blue-600 focus:ring-blue-500 h-4 w-4"
                      />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="h-10 w-10 flex-shrink-0">
                          <img 
                            src={product.images[0]} 
                            alt={product.title}
                            className="h-10 w-10 rounded-md object-cover" 
                          />
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">
                            {product.title}
                          </div>
                          <div className="text-sm text-gray-500">
                            {product.brand}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {product.category}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      ${product.price.toFixed(2)}
                      {product.discount > 0 && (
                        <span className="ml-1 text-xs text-red-500">-{product.discount}%</span>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <span className={`${product.stock < 10 ? 'text-red-600 font-medium' : ''}`}>
                        {product.stock}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button
                        onClick={() => openEditModal(product)}
                        className="text-blue-600 hover:text-blue-900 mr-3"
                      >
                        <Edit size={18} />
                        <span className="sr-only">Edit</span>
                      </button>
                      <button
                        onClick={() => {
                          if (window.confirm('Are you sure you want to delete this product?')) {
                            deleteProduct(product.id);
                            toast.success('Product deleted');
                          }
                        }}
                        className="text-red-600 hover:text-red-900"
                      >
                        <Trash2 size={18} />
                        <span className="sr-only">Delete</span>
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
            <div className="flex-1 flex justify-between sm:hidden">
              <button
                onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
                disabled={currentPage === 1}
                className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50"
              >
                Previous
              </button>
              <button
                onClick={() => handlePageChange(Math.min(totalPages, currentPage + 1))}
                disabled={currentPage === totalPages}
                className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50"
              >
                Next
              </button>
            </div>
            <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
              <div>
                <p className="text-sm text-gray-700">
                  Showing <span className="font-medium">{indexOfFirstProduct + 1}</span> to{' '}
                  <span className="font-medium">
                    {Math.min(indexOfLastProduct, sortedProducts.length)}
                  </span>{' '}
                  of <span className="font-medium">{sortedProducts.length}</span> products
                </p>
              </div>
              <div>
                <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                  <button
                    onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
                    disabled={currentPage === 1}
                    className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50"
                  >
                    <span className="sr-only">Previous</span>
                    <ChevronLeft size={18} />
                  </button>
                  
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                    <button
                      key={page}
                      onClick={() => handlePageChange(page)}
                      className={`relative inline-flex items-center px-4 py-2 border ${
                        currentPage === page
                          ? 'bg-blue-50 border-blue-500 text-blue-600 z-10'
                          : 'border-gray-300 bg-white text-gray-500 hover:bg-gray-50'
                      } text-sm font-medium`}
                    >
                      {page}
                    </button>
                  ))}
                  
                  <button
                    onClick={() => handlePageChange(Math.min(totalPages, currentPage + 1))}
                    disabled={currentPage === totalPages}
                    className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50"
                  >
                    <span className="sr-only">Next</span>
                    <ChevronRight size={18} />
                  </button>
                </nav>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Add/Edit Product Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg max-w-3xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center p-6 border-b">
              <h2 className="text-xl font-semibold text-gray-800">
                {editingProduct ? 'Edit Product' : 'Add New Product'}
              </h2>
              <button
                onClick={closeModal}
                className="text-gray-400 hover:text-gray-600"
              >
                <X size={24} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="md:col-span-2">
                  <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
                    Product Title*
                  </label>
                  <input
                    type="text"
                    id="title"
                    name="title"
                    value={newProduct.title}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div className="md:col-span-2">
                  <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                    Description*
                  </label>
                  <textarea
                    id="description"
                    name="description"
                    value={newProduct.description}
                    onChange={handleInputChange}
                    required
                    rows={4}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label htmlFor="price" className="block text-sm font-medium text-gray-700 mb-1">
                    Price ($)*
                  </label>
                  <input
                    type="number"
                    id="price"
                    name="price"
                    value={newProduct.price}
                    onChange={handleInputChange}
                    min="0"
                    step="0.01"
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label htmlFor="discount" className="block text-sm font-medium text-gray-700 mb-1">
                    Discount (%)
                  </label>
                  <input
                    type="number"
                    id="discount"
                    name="discount"
                    value={newProduct.discount}
                    onChange={handleInputChange}
                    min="0"
                    max="100"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
                    Category*
                  </label>
                  <select
                    id="category"
                    name="category"
                    value={newProduct.category}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">Select a category</option>
                    <option value="electronics">Electronics</option>
                    <option value="clothing">Clothing</option>
                    <option value="home">Home & Kitchen</option>
                    <option value="books">Books</option>
                    <option value="toys">Toys & Games</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="brand" className="block text-sm font-medium text-gray-700 mb-1">
                    Brand*
                  </label>
                  <input
                    type="text"
                    id="brand"
                    name="brand"
                    value={newProduct.brand}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label htmlFor="stock" className="block text-sm font-medium text-gray-700 mb-1">
                    Stock*
                  </label>
                  <input
                    type="number"
                    id="stock"
                    name="stock"
                    value={newProduct.stock}
                    onChange={handleInputChange}
                    min="0"
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label htmlFor="rating" className="block text-sm font-medium text-gray-700 mb-1">
                    Rating (1-5)
                  </label>
                  <input
                    type="number"
                    id="rating"
                    name="rating"
                    value={newProduct.rating}
                    onChange={handleInputChange}
                    min="1"
                    max="5"
                    step="0.1"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label htmlFor="colors" className="block text-sm font-medium text-gray-700 mb-1">
                    Colors (comma separated)
                  </label>
                  <input
                    type="text"
                    id="colors"
                    name="colors"
                    value={newProduct.colors?.join(', ')}
                    onChange={handleColorsChange}
                    placeholder="Red, Blue, Green"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label htmlFor="sizes" className="block text-sm font-medium text-gray-700 mb-1">
                    Sizes (comma separated)
                  </label>
                  <input
                    type="text"
                    id="sizes"
                    name="sizes"
                    value={newProduct.sizes?.join(', ')}
                    onChange={handleSizesChange}
                    placeholder="S, M, L, XL"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div className="md:col-span-2">
                  <label htmlFor="images" className="block text-sm font-medium text-gray-700 mb-1">
                    Image URLs* (comma separated)
                  </label>
                  <input
                    type="text"
                    id="images"
                    name="images"
                    value={newProduct.images?.join(', ')}
                    onChange={handleImagesChange}
                    required
                    placeholder="https://example.com/image1.jpg, https://example.com/image2.jpg"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  <p className="mt-1 text-sm text-gray-500">Enter URLs for product images</p>
                </div>

                {/* Preview Images */}
                {newProduct.images && newProduct.images.length > 0 && (
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Image Preview
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {newProduct.images.map((image, index) => (
                        <div 
                          key={index}
                          className="relative w-20 h-20 border rounded overflow-hidden"
                        >
                          <img 
                            src={image} 
                            alt={`Preview ${index + 1}`}
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              (e.target as HTMLImageElement).src = 'https://via.placeholder.com/150?text=Error';
                            }}
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <div className="mt-8 flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={closeModal}
                  className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md"
                >
                  {editingProduct ? 'Update Product' : 'Add Product'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminProducts;