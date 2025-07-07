import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { Badge } from '@/components/ui/badge'
import { 
  ShoppingCart, 
  Plus, 
  Minus, 
  Trash2, 
  ArrowRight, 
  Package,
  CreditCard,
  Truck
} from 'lucide-react'
import LoadingSpinner from '@/components/LoadingSpinner'
import ErrorMessage from '@/components/ErrorMessage'

const CartPage = () => {
  const [cartItems, setCartItems] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')
  const [updatingItems, setUpdatingItems] = useState(new Set())
  const navigate = useNavigate()

  // Mock cart data - will be replaced with API call in phase 5
  const mockCartData = {
    id: 1,
    userId: 1,
    items: [
      {
        id: 1,
        product: {
          id: 1,
          name: "Wireless Bluetooth Headphones",
          description: "High-quality wireless headphones with noise cancellation and 30-hour battery life.",
          stockQuantity: 25,
          imageUrl: "https://placehold.co/200x200/3b82f6/ffffff?text=Headphones",
          categoryName: "ELECTRONICS"
        },
        quantity: 2,
        subtotal: 20.0
      },
      {
        id: 2,
        product: {
          id: 2,
          name: "Cotton T-Shirt",
          description: "Comfortable 100% cotton t-shirt available in multiple colors and sizes.",
          stockQuantity: 50,
          imageUrl: "https://placehold.co/200x200/ef4444/ffffff?text=T-Shirt",
          categoryName: "CLOTHES"
        },
        quantity: 1,
        subtotal: 10.0
      },
      {
        id: 3,
        product: {
          id: 3,
          name: "Modern Office Chair",
          description: "Ergonomic office chair with lumbar support and adjustable height.",
          stockQuantity: 15,
          imageUrl: "https://placehold.co/200x200/10b981/ffffff?text=Chair",
          categoryName: "FURNITURE"
        },
        quantity: 1,
        subtotal: 10.0
      }
    ],
    total: 40.0
  }

  useEffect(() => {
    loadCart()
  }, [])

  const loadCart = async () => {
    setIsLoading(true)
    setError('')

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 800))
      
      // For demo purposes, use mock data
      // In phase 5, this will be replaced with actual API call
      setCartItems(mockCartData.items)
    } catch (err) {
      setError('Failed to load cart. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  const updateQuantity = async (itemId, newQuantity) => {
    if (newQuantity < 0) return

    setUpdatingItems(prev => new Set(prev).add(itemId))

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500))

      if (newQuantity === 0) {
        // Remove item
        setCartItems(prev => prev.filter(item => item.id !== itemId))
      } else {
        // Update quantity
        setCartItems(prev => prev.map(item => 
          item.id === itemId 
            ? { ...item, quantity: newQuantity, subtotal: newQuantity * 10.0 }
            : item
        ))
      }
    } catch (err) {
      alert('Failed to update item quantity. Please try again.')
    } finally {
      setUpdatingItems(prev => {
        const newSet = new Set(prev)
        newSet.delete(itemId)
        return newSet
      })
    }
  }

  const removeItem = async (itemId) => {
    setUpdatingItems(prev => new Set(prev).add(itemId))

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500))
      
      setCartItems(prev => prev.filter(item => item.id !== itemId))
    } catch (err) {
      alert('Failed to remove item. Please try again.')
    } finally {
      setUpdatingItems(prev => {
        const newSet = new Set(prev)
        newSet.delete(itemId)
        return newSet
      })
    }
  }

  const clearCart = async () => {
    if (!window.confirm('Are you sure you want to clear your cart?')) return

    setIsLoading(true)

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500))
      
      setCartItems([])
    } catch (err) {
      alert('Failed to clear cart. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => total + item.subtotal, 0)
  }

  const handleCheckout = () => {
    if (cartItems.length === 0) return
    navigate('/checkout')
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
        <ErrorMessage message={error} onRetry={loadCart} />
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Shopping Cart</h1>
        <p className="text-gray-600">
          {cartItems.length === 0 
            ? 'Your cart is empty' 
            : `${cartItems.length} item${cartItems.length !== 1 ? 's' : ''} in your cart`
          }
        </p>
      </div>

      {cartItems.length === 0 ? (
        <div className="text-center py-12">
          <ShoppingCart className="h-16 w-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Your cart is empty</h3>
          <p className="text-gray-600 mb-6">
            Looks like you haven't added any items to your cart yet.
          </p>
          <Link to="/products">
            <Button size="lg">
              <Package className="mr-2 h-5 w-5" />
              Start Shopping
            </Button>
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold">Items in Cart</h2>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={clearCart}
                className="text-red-600 hover:text-red-700"
              >
                <Trash2 className="h-4 w-4 mr-1" />
                Clear Cart
              </Button>
            </div>

            {cartItems.map((item) => (
              <Card key={item.id} className="overflow-hidden">
                <CardContent className="p-6">
                  <div className="flex items-start space-x-4">
                    {/* Product Image */}
                    <div className="w-20 h-20 flex-shrink-0">
                      <img
                        src={item.product.imageUrl}
                        alt={item.product.name}
                        className="w-full h-full object-cover rounded-md"
                      />
                    </div>

                    {/* Product Details */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <Badge variant="secondary" className="text-xs mb-1">
                            {item.product.categoryName}
                          </Badge>
                          <h3 className="font-semibold text-lg mb-1">
                            <Link 
                              to={`/products/${item.product.id}`}
                              className="hover:text-blue-600 transition-colors"
                            >
                              {item.product.name}
                            </Link>
                          </h3>
                          <p className="text-gray-600 text-sm line-clamp-2">
                            {item.product.description}
                          </p>
                          <div className="mt-2">
                            <span className="text-lg font-bold text-blue-600">
                              ${item.subtotal.toFixed(2)}
                            </span>
                            <span className="text-sm text-gray-500 ml-2">
                              ($10.00 each)
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Quantity Controls */}
                      <div className="flex items-center justify-between mt-4">
                        <div className="flex items-center space-x-2">
                          <span className="text-sm font-medium">Quantity:</span>
                          <div className="flex items-center border rounded-md">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              disabled={updatingItems.has(item.id) || item.quantity <= 1}
                              className="h-8 w-8 p-0"
                            >
                              <Minus className="h-3 w-3" />
                            </Button>
                            <span className="px-3 py-1 text-center min-w-12">
                              {updatingItems.has(item.id) ? (
                                <LoadingSpinner size="sm" />
                              ) : (
                                item.quantity
                              )}
                            </span>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              disabled={updatingItems.has(item.id) || item.quantity >= item.product.stockQuantity}
                              className="h-8 w-8 p-0"
                            >
                              <Plus className="h-3 w-3" />
                            </Button>
                          </div>
                        </div>

                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => removeItem(item.id)}
                          disabled={updatingItems.has(item.id)}
                          className="text-red-600 hover:text-red-700"
                        >
                          <Trash2 className="h-4 w-4 mr-1" />
                          Remove
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <Card className="sticky top-8">
              <CardHeader>
                <CardTitle>Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Subtotal ({cartItems.length} items)</span>
                    <span>${calculateTotal().toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Shipping</span>
                    <span className="text-green-600">Free</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Tax</span>
                    <span>${(calculateTotal() * 0.08).toFixed(2)}</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between text-lg font-semibold">
                    <span>Total</span>
                    <span>${(calculateTotal() * 1.08).toFixed(2)}</span>
                  </div>
                </div>

                <Button 
                  onClick={handleCheckout}
                  className="w-full"
                  size="lg"
                >
                  <CreditCard className="mr-2 h-5 w-5" />
                  Proceed to Checkout
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>

                <div className="text-center">
                  <Link to="/products">
                    <Button variant="outline" className="w-full">
                      Continue Shopping
                    </Button>
                  </Link>
                </div>

                {/* Benefits */}
                <div className="pt-4 border-t space-y-3">
                  <div className="flex items-center text-sm text-gray-600">
                    <Truck className="h-4 w-4 mr-2 text-green-600" />
                    Free shipping on orders over $50
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <Package className="h-4 w-4 mr-2 text-blue-600" />
                    30-day return policy
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      )}
    </div>
  )
}

export default CartPage

