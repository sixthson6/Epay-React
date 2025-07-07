import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Filter, Grid, List, ShoppingCart, Package, ArrowLeft } from 'lucide-react'
import { ProductGridSkeleton } from '@/components/ProductCardSkeleton'
import ErrorMessage from '@/components/ErrorMessage'

const CategoryPage = () => {
  const { categoryName } = useParams()
  const [products, setProducts] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')
  const [sortBy, setSortBy] = useState('id')
  const [sortDir, setSortDir] = useState('asc')
  const [viewMode, setViewMode] = useState('grid')

  // Mock products data - will be replaced with API call in phase 5
  const mockProducts = [
    {
      id: 1,
      name: "Wireless Bluetooth Headphones",
      description: "High-quality wireless headphones with noise cancellation and 30-hour battery life.",
      stockQuantity: 25,
      imageUrl: "https://placehold.co/400x400/3b82f6/ffffff?text=Headphones",
      categoryName: "ELECTRONICS"
    },
    {
      id: 4,
      name: "Smartphone",
      description: "Latest smartphone with advanced camera and fast processor.",
      stockQuantity: 30,
      imageUrl: "https://placehold.co/400x400/8b5cf6/ffffff?text=Phone",
      categoryName: "ELECTRONICS"
    },
    {
      id: 7,
      name: "Laptop Computer",
      description: "High-performance laptop for work and gaming.",
      stockQuantity: 12,
      imageUrl: "https://placehold.co/400x400/6366f1/ffffff?text=Laptop",
      categoryName: "ELECTRONICS"
    },
    {
      id: 2,
      name: "Cotton T-Shirt",
      description: "Comfortable 100% cotton t-shirt available in multiple colors and sizes.",
      stockQuantity: 50,
      imageUrl: "https://placehold.co/400x400/ef4444/ffffff?text=T-Shirt",
      categoryName: "CLOTHES"
    },
    {
      id: 5,
      name: "Denim Jeans",
      description: "Classic denim jeans with comfortable fit and durable material.",
      stockQuantity: 40,
      imageUrl: "https://placehold.co/400x400/f59e0b/ffffff?text=Jeans",
      categoryName: "CLOTHES"
    },
    {
      id: 8,
      name: "Winter Jacket",
      description: "Warm and stylish winter jacket for cold weather.",
      stockQuantity: 20,
      imageUrl: "https://placehold.co/400x400/dc2626/ffffff?text=Jacket",
      categoryName: "CLOTHES"
    },
    {
      id: 3,
      name: "Modern Office Chair",
      description: "Ergonomic office chair with lumbar support and adjustable height.",
      stockQuantity: 15,
      imageUrl: "https://placehold.co/400x400/10b981/ffffff?text=Chair",
      categoryName: "FURNITURE"
    },
    {
      id: 6,
      name: "Dining Table",
      description: "Elegant wooden dining table that seats up to 6 people.",
      stockQuantity: 8,
      imageUrl: "https://placehold.co/400x400/06b6d4/ffffff?text=Table",
      categoryName: "FURNITURE"
    },
    {
      id: 9,
      name: "Bookshelf",
      description: "Spacious wooden bookshelf with multiple compartments.",
      stockQuantity: 18,
      imageUrl: "https://placehold.co/400x400/059669/ffffff?text=Bookshelf",
      categoryName: "FURNITURE"
    }
  ]

  const categoryDisplayNames = {
    ELECTRONICS: 'Electronics',
    CLOTHES: 'Clothes',
    FURNITURE: 'Furniture'
  }

  const categoryDescriptions = {
    ELECTRONICS: 'Discover the latest in technology and electronics',
    CLOTHES: 'Fashion and apparel for every style and occasion',
    FURNITURE: 'Beautiful furniture to transform your living space'
  }

  useEffect(() => {
    loadProducts()
  }, [categoryName, sortBy, sortDir])

  const loadProducts = async () => {
    setIsLoading(true)
    setError('')

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 800))
      
      // Filter products by category
      const filteredProducts = mockProducts.filter(product => 
        product.categoryName === categoryName.toUpperCase()
      )

      // Sort products
      filteredProducts.sort((a, b) => {
        let aValue = a[sortBy]
        let bValue = b[sortBy]
        
        if (typeof aValue === 'string') {
          aValue = aValue.toLowerCase()
          bValue = bValue.toLowerCase()
        }
        
        if (sortDir === 'asc') {
          return aValue > bValue ? 1 : -1
        } else {
          return aValue < bValue ? 1 : -1
        }
      })

      setProducts(filteredProducts)
    } catch (err) {
      setError('Failed to load products. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  const handleSortChange = (value) => {
    const [newSortBy, newSortDir] = value.split('-')
    setSortBy(newSortBy)
    setSortDir(newSortDir)
  }

  const addToCart = (product) => {
    // Will be implemented in phase 5 with cart state management
    console.log('Add to cart:', product)
  }

  const ProductCard = ({ product }) => (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow group">
      <div className="aspect-square overflow-hidden">
        <img
          src={product.imageUrl}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
      </div>
      <CardContent className="p-4">
        <div className="flex items-start justify-between mb-2">
          <Badge variant="secondary" className="text-xs">
            {product.categoryName}
          </Badge>
          <span className="text-sm text-gray-500">
            Stock: {product.stockQuantity}
          </span>
        </div>
        <h3 className="font-semibold text-lg mb-2 line-clamp-2">
          <Link 
            to={`/products/${product.id}`}
            className="hover:text-blue-600 transition-colors"
          >
            {product.name}
          </Link>
        </h3>
        <p className="text-gray-600 text-sm line-clamp-2 mb-3">
          {product.description}
        </p>
        <div className="text-lg font-bold text-blue-600 mb-3">
          $10.00
        </div>
      </CardContent>
      <CardFooter className="p-4 pt-0 flex gap-2">
        <Link to={`/products/${product.id}`} className="flex-1">
          <Button variant="outline" className="w-full">
            View Details
          </Button>
        </Link>
        <Button 
          onClick={() => addToCart(product)}
          disabled={product.stockQuantity === 0}
          className="flex-1"
        >
          <ShoppingCart className="h-4 w-4 mr-1" />
          Add to Cart
        </Button>
      </CardFooter>
    </Card>
  )

  const ProductListItem = ({ product }) => (
    <Card className="overflow-hidden hover:shadow-md transition-shadow">
      <div className="flex">
        <div className="w-32 h-32 flex-shrink-0">
          <img
            src={product.imageUrl}
            alt={product.name}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="flex-1 p-4">
          <div className="flex items-start justify-between mb-2">
            <div>
              <Badge variant="secondary" className="text-xs mb-2">
                {product.categoryName}
              </Badge>
              <h3 className="font-semibold text-lg mb-1">
                <Link 
                  to={`/products/${product.id}`}
                  className="hover:text-blue-600 transition-colors"
                >
                  {product.name}
                </Link>
              </h3>
              <p className="text-gray-600 text-sm mb-2">
                {product.description}
              </p>
            </div>
            <div className="text-right">
              <div className="text-lg font-bold text-blue-600 mb-1">$10.00</div>
              <div className="text-sm text-gray-500">Stock: {product.stockQuantity}</div>
            </div>
          </div>
          <div className="flex gap-2">
            <Link to={`/products/${product.id}`}>
              <Button variant="outline" size="sm">
                View Details
              </Button>
            </Link>
            <Button 
              onClick={() => addToCart(product)}
              disabled={product.stockQuantity === 0}
              size="sm"
            >
              <ShoppingCart className="h-4 w-4 mr-1" />
              Add to Cart
            </Button>
          </div>
        </div>
      </div>
    </Card>
  )

  const displayName = categoryDisplayNames[categoryName?.toUpperCase()] || categoryName
  const description = categoryDescriptions[categoryName?.toUpperCase()] || ''

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Breadcrumb */}
      <div className="mb-6">
        <Link to="/products" className="inline-flex items-center text-blue-600 hover:text-blue-800">
          <ArrowLeft className="h-4 w-4 mr-1" />
          All Products
        </Link>
      </div>

      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">{displayName}</h1>
        {description && (
          <p className="text-lg text-gray-600 mb-6">{description}</p>
        )}
        
        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
          <div className="text-sm text-gray-600">
            {!isLoading && `${products.length} products in ${displayName}`}
          </div>

          <div className="flex items-center gap-4">
            {/* Sort */}
            <Select value={`${sortBy}-${sortDir}`} onValueChange={handleSortChange}>
              <SelectTrigger className="w-48">
                <Filter className="h-4 w-4 mr-2" />
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="name-asc">Name (A-Z)</SelectItem>
                <SelectItem value="name-desc">Name (Z-A)</SelectItem>
                <SelectItem value="id-asc">Newest First</SelectItem>
                <SelectItem value="id-desc">Oldest First</SelectItem>
                <SelectItem value="stockQuantity-desc">Stock (High-Low)</SelectItem>
                <SelectItem value="stockQuantity-asc">Stock (Low-High)</SelectItem>
              </SelectContent>
            </Select>

            {/* View Mode */}
            <div className="flex border rounded-md">
              <Button
                variant={viewMode === 'grid' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setViewMode('grid')}
                className="rounded-r-none"
              >
                <Grid className="h-4 w-4" />
              </Button>
              <Button
                variant={viewMode === 'list' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setViewMode('list')}
                className="rounded-l-none"
              >
                <List className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      {error ? (
        <ErrorMessage message={error} onRetry={loadProducts} />
      ) : isLoading ? (
        <ProductGridSkeleton count={6} />
      ) : products.length === 0 ? (
        <div className="text-center py-12">
          <Package className="h-16 w-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">No products found</h3>
          <p className="text-gray-600 mb-4">
            No products are available in the {displayName} category at the moment.
          </p>
          <Link to="/products">
            <Button>Browse All Products</Button>
          </Link>
        </div>
      ) : (
        <div className={
          viewMode === 'grid' 
            ? 'grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6'
            : 'space-y-4'
        }>
          {products.map((product) => 
            viewMode === 'grid' ? (
              <ProductCard key={product.id} product={product} />
            ) : (
              <ProductListItem key={product.id} product={product} />
            )
          )}
        </div>
      )}

      {/* Category Navigation */}
      <div className="mt-16 border-t pt-8">
        <h2 className="text-xl font-semibold mb-6">Browse Other Categories</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {Object.entries(categoryDisplayNames)
            .filter(([key]) => key !== categoryName?.toUpperCase())
            .map(([key, name]) => (
              <Link key={key} to={`/categories/${key}`}>
                <Card className="hover:shadow-md transition-shadow cursor-pointer">
                  <CardContent className="p-6 text-center">
                    <h3 className="font-semibold text-lg mb-2">{name}</h3>
                    <p className="text-gray-600 text-sm">
                      {categoryDescriptions[key]}
                    </p>
                  </CardContent>
                </Card>
              </Link>
            ))}
        </div>
      </div>
    </div>
  )
}

export default CategoryPage

