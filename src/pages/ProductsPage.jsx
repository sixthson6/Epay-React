import React, { useEffect, useState } from 'react';
import { productService } from '../services/productService';

function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await productService.getAllProducts();
        setProducts(data.content); // Assuming the products are in the 'content' property
      } catch (err) {
        setError('Failed to load products. Please check your backend connection.');
        console.error('API call error:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) {
    return (
      <div className="p-8 text-center text-gray-600">
        <p>Loading products...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-8 text-center text-red-600">
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div className="p-8 bg-green-50 text-green-800 min-h-screen">
      <h1 className="text-3xl font-bold mb-4">Our Products</h1>
      <p className="text-lg mb-6">This is where all your fantastic products will be listed.</p>

      {products.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map(product => (
            <div key={product.id} className="bg-white p-4 rounded-lg shadow-md">
              <img
                src={product.imageUrl || 'https://via.placeholder.com/100'}
                alt={product.name || 'Product Image'}
                className="w-full h-48 object-cover rounded-md mb-4"
              />
              <h3 className="text-xl font-semibold">{product.name || 'No Name'}</h3>
              <p className="text-gray-700">${product.price || 'N/A'}</p>
              <p className="text-gray-500 text-sm mt-2">{product.description || 'No description available.'}</p>
              <p className="text-gray-500 text-sm mt-2">Category: {product.category || 'Uncategorized'}</p>
              <p className="text-gray-500 text-sm mt-2">Stock: {product.stockQuantity || 'N/A'}</p>

            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-600">No products found. Please ensure your backend has data.</p>
      )}
    </div>
  );
}

export default ProductsPage;