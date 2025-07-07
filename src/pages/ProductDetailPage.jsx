import { useState, useEffect } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { 
  ShoppingCart, 
  ArrowLeft, 
  Package, 
  Truck, 
  Shield, 
  Star,
  Plus,
  Minus,
  Heart
} from 'lucide-react'
import LoadingSpinner from '@/components/LoadingSpinner'
import ErrorMessage from '@/components/ErrorMessage'

const ProductDetailPage = () => {
  const { productId } = useParams()
  const navigate = useNavigate()
  const [product, setProduct] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')
  const [quantity, setQuantity] = useState(1)
  const [isAddingToCart, setIsAddingToCart] = useState(false)
  const [isFavorite, setIsFavorite] = useState(false)

  // Mock product data - will be replaced with API call in phase 5
  const mockProducts = {
    1: {
      id: 1,
      name: "Wireless Bluetooth Headphones",
      description: "Experience premium sound quality with these wireless Bluetooth headphones. Featuring advanced noise cancellation technology, 30-hour battery life, and comfortable over-ear design. Perfect for music lovers, professionals, and anyone who values high-quality audio. The headphones come with a carrying case, charging cable, and user manual.",
      stockQuantity: 25,
      imageUrl: "https://placehold.co/600x600/3b82f6/ffffff?text=Headphones",
      categoryName: "ELECTRONICS"
    },
    2: {
      id: 2,
      name: "Cotton T-Shirt",
      description: "Comfortable 100% cotton t-shirt made from premium organic cotton. Available in multiple colors and sizes. Features a classic fit that's perfect for everyday wear. Machine washable and pre-shrunk for lasting comfort. This versatile piece can be dressed up or down for any occasion.",
      stockQuantity: 50,
      imageUrl: "https://placehold.co/600x600/ef4444/ffffff?text=T-Shirt",
      categoryName: "CLOTHES"
    },
    3: {
      id: 3,
      name: "Modern Office Chair",
      description: "Ergonomic office chair designed for maximum comfort during long work sessions. Features adjustable height, lumbar support, and breathable mesh back. The chair is built with high-quality materials and includes a 5-year warranty. Perfect for home offices or professional workspaces.",
      stockQuantity: 15,
      imageUrl: "https://placehold.co/600x600/10b981/ffffff?text=Chair",
      categoryName: "FURNITURE"
    },
    4: {
      id: 4,
      name: "Smartphone",
      description: "Latest smartphone with advanced camera system and lightning-fast processor. Features a stunning display, all-day battery life, and premium build quality. Includes 5G connectivity, wireless charging, and water resistance. Comes with charger and protective case.",
      stockQuantity: 30,
      imageUrl: "https://placehold.co/600x600/8b5cf6/ffffff?text=Phone",
      categoryName: "ELECTRONICS"
    },
    5: {
      id: 5,
      name: "Denim Jeans",
      description: "Classic denim jeans crafted from premium denim fabric. Features a comfortable fit with just the right amount of stretch. Available in multiple washes and sizes. These jeans are designed to last and improve with age. Perfect for casual or smart-casual occasions.",
      stockQuantity: 40,
      imageUrl: "https://placehold.co/600x600/f59e0b/ffffff?text=Jeans",
      categoryName: "CLOTHES"
    },
    6: {
      id: 6,
      name: "Dining Table",
      description: "Elegant wooden dining table that comfortably seats up to 6 people. Crafted from solid hardwood with a beautiful finish that highlights the natural grain. The table features a sturdy construction and timeless design that will complement any dining room decor.",
      stockQuantity: 8,
      imageUrl: "https://placehold.co/600x600/06b6d4/ffffff?text=Table",
      categoryName: "FURNITURE"
    }
  }

  useEffect(() => {
    loadProduct()
  }, [productId])

  const loadProduct = async () => {
    setIsLoading(true)
    setError('')

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 800))
      
      const productData = mockProducts[productId]
      if (!productData) {
        setError('Product not found')
        return
      }

      setProduct(productData)
    } catch (err) {
      setError('Failed to load product. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  const handleQuantityChange = (change) => {
    const newQuantity = quantity + change
    if (newQuantity >= 1 && newQuantity <= product.stockQuantity) {
      setQuantity(newQuantity)
    }
  }

  const handleAddToCart = async () => {
    setIsAddingToCart(true)
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500))
      
      // Will be implemented in phase 5 with cart state management
      console.log('Add to cart:', { product, quantity })
      
      // Show success message (will implement toast in later phase)
      alert(`Added ${quantity} ${product.name}(s) to cart!`)
      
    } catch (err) {
      alert('Failed to add item to cart. Please try again.')
    } finally {
      setIsAddingToCart(false)
    }
  }

  const handleBuyNow = () => {
    // Add to cart and redirect to checkout
    handleAddToCart()
    setTimeout(() => {
      navigate('/cart')
    }, 1000)
  }

  if (isLoading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-center min-h-96">
          <LoadingSpinner size="xl" />
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <ErrorMessage message={error} onRetry={loadProduct} />
      </div>
    )
  }

  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center py-12">
          <Package className="h-16 w-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Product not found</h3>
          <p className="text-gray-600 mb-4">The product you're looking for doesn't exist.</p>
          <Link to="/products">
            <Button>Browse Products</Button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Breadcrumb */}
      <div className="mb-6">
        <Link to="/products" className="inline-flex items-center text-blue-600 hover:text-blue-800">
          <ArrowLeft className="h-4 w-4 mr-1" />
          Back to Products
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Product Image */}
        <div className="space-y-4">
          <div className="aspect-square overflow-hidden rounded-lg bg-gray-100">
            <img
              src={product.imageUrl}
              alt={product.name}
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Product Info */}
        <div className="space-y-6">
          <div>
            <Badge variant="secondary" className="mb-2">
              {product.categoryName}
            </Badge>
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              {product.name}
            </h1>
            
            {/* Rating (placeholder) */}
            <div className="flex items-center mb-4">
              <div className="flex items-center">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star key={star} className="h-5 w-5 text-yellow-400 fill-current" />
                ))}
              </div>
              <span className="ml-2 text-sm text-gray-600">(4.8 out of 5)</span>
            </div>

            <div className="text-3xl font-bold text-blue-600 mb-6">
              $10.00
            </div>
          </div>

          <Separator />

          {/* Description */}
          <div>
            <h3 className="text-lg font-semibold mb-3">Description</h3>
            <p className="text-gray-600 leading-relaxed">
              {product.description}
            </p>
          </div>

          <Separator />

          {/* Stock and Quantity */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Availability:</span>
              <span className={`text-sm ${product.stockQuantity > 0 ? 'text-green-600' : 'text-red-600'}`}>
                {product.stockQuantity > 0 ? `${product.stockQuantity} in stock` : 'Out of stock'}
              </span>
            </div>

            {product.stockQuantity > 0 && (
              <div className="flex items-center space-x-4">
                <span className="text-sm font-medium">Quantity:</span>
                <div className="flex items-center border rounded-md">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleQuantityChange(-1)}
                    disabled={quantity <= 1}
                    className="h-10 w-10 p-0"
                  >
                    <Minus className="h-4 w-4" />
                  </Button>
                  <span className="px-4 py-2 text-center min-w-16">{quantity}</span>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleQuantityChange(1)}
                    disabled={quantity >= product.stockQuantity}
                    className="h-10 w-10 p-0"
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div className="space-y-3">
            <div className="flex space-x-3">
              <Button
                onClick={handleAddToCart}
                disabled={product.stockQuantity === 0 || isAddingToCart}
                className="flex-1"
              >
                {isAddingToCart ? (
                  <>
                    <LoadingSpinner size="sm" className="mr-2" />
                    Adding...
                  </>
                ) : (
                  <>
                    <ShoppingCart className="h-4 w-4 mr-2" />
                    Add to Cart
                  </>
                )}
              </Button>
              
              <Button
                variant="outline"
                onClick={() => setIsFavorite(!isFavorite)}
                className="px-3"
              >
                <Heart className={`h-4 w-4 ${isFavorite ? 'fill-current text-red-500' : ''}`} />
              </Button>
            </div>

            <Button
              onClick={handleBuyNow}
              disabled={product.stockQuantity === 0 || isAddingToCart}
              variant="outline"
              className="w-full"
            >
              Buy Now
            </Button>
          </div>

          <Separator />

          {/* Features */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Why Choose This Product?</h3>
            <div className="grid grid-cols-1 gap-4">
              <div className="flex items-center space-x-3">
                <Truck className="h-5 w-5 text-blue-600" />
                <span className="text-sm">Free shipping on orders over $50</span>
              </div>
              <div className="flex items-center space-x-3">
                <Shield className="h-5 w-5 text-blue-600" />
                <span className="text-sm">30-day return policy</span>
              </div>
              <div className="flex items-center space-x-3">
                <Package className="h-5 w-5 text-blue-600" />
                <span className="text-sm">Secure packaging</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Related Products Section */}
      <div className="mt-16">
        <h2 className="text-2xl font-bold text-gray-900 mb-8">Related Products</h2>
        <div className="text-center py-8 text-gray-500">
          Related products will be loaded from the API
        </div>
      </div>
    </div>
  )
}

export default ProductDetailPage

