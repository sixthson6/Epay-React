import { useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { 
  CheckCircle, 
  Package, 
  Mail, 
  Calendar,
  ArrowRight,
  Home,
  ShoppingBag
} from 'lucide-react'

const OrderSuccessPage = () => {
  const location = useLocation()
  const navigate = useNavigate()
  
  // Get order details from navigation state
  const orderDetails = location.state || {}
  const { orderId, total } = orderDetails

  useEffect(() => {
    // Redirect to home if no order details
    if (!orderId) {
      navigate('/', { replace: true })
    }
  }, [orderId, navigate])

  if (!orderId) {
    return null
  }

  const estimatedDelivery = new Date()
  estimatedDelivery.setDate(estimatedDelivery.getDate() + 5)

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Success Header */}
        <div className="text-center mb-8">
          <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-green-100 mb-4">
            <CheckCircle className="h-8 w-8 text-green-600" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Order Confirmed!
          </h1>
          <p className="text-lg text-gray-600">
            Thank you for your purchase. Your order has been successfully placed.
          </p>
        </div>

        {/* Order Details Card */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Package className="mr-2 h-5 w-5" />
              Order Details
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Order Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Order Number</h3>
                <p className="text-lg font-mono text-blue-600">{orderId}</p>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Total Amount</h3>
                <p className="text-lg font-semibold text-gray-900">${total?.toFixed(2) || '0.00'}</p>
              </div>
            </div>

            <Separator />

            {/* Delivery Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold text-gray-900 mb-2 flex items-center">
                  <Calendar className="mr-2 h-4 w-4" />
                  Estimated Delivery
                </h3>
                <p className="text-gray-600">
                  {estimatedDelivery.toLocaleDateString('en-US', {
                    weekday: 'long',
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </p>
                <p className="text-sm text-gray-500 mt-1">
                  5-7 business days
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-2 flex items-center">
                  <Mail className="mr-2 h-4 w-4" />
                  Order Confirmation
                </h3>
                <p className="text-gray-600">
                  A confirmation email has been sent to your registered email address.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* What's Next */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>What's Next?</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <div className="flex-shrink-0 w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center">
                  <span className="text-sm font-semibold text-blue-600">1</span>
                </div>
                <div>
                  <h4 className="font-medium text-gray-900">Order Processing</h4>
                  <p className="text-sm text-gray-600">
                    We're preparing your items for shipment. You'll receive an email when your order ships.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <div className="flex-shrink-0 w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center">
                  <span className="text-sm font-semibold text-blue-600">2</span>
                </div>
                <div>
                  <h4 className="font-medium text-gray-900">Shipping Notification</h4>
                  <p className="text-sm text-gray-600">
                    Once shipped, you'll receive tracking information to monitor your package.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <div className="flex-shrink-0 w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center">
                  <span className="text-sm font-semibold text-blue-600">3</span>
                </div>
                <div>
                  <h4 className="font-medium text-gray-900">Delivery</h4>
                  <p className="text-sm text-gray-600">
                    Your order will be delivered to your specified address within 5-7 business days.
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link to="/profile">
            <Button variant="outline" className="w-full sm:w-auto">
              <Package className="mr-2 h-4 w-4" />
              View Order History
            </Button>
          </Link>
          
          <Link to="/products">
            <Button className="w-full sm:w-auto">
              <ShoppingBag className="mr-2 h-4 w-4" />
              Continue Shopping
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>

        {/* Support Information */}
        <div className="mt-12 text-center">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Need Help?</h3>
          <p className="text-gray-600 mb-4">
            If you have any questions about your order, please don't hesitate to contact us.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href="mailto:support@shophub.com" 
              className="text-blue-600 hover:text-blue-800 font-medium"
            >
              support@shophub.com
            </a>
            <span className="hidden sm:inline text-gray-400">|</span>
            <a 
              href="tel:+1-555-123-4567" 
              className="text-blue-600 hover:text-blue-800 font-medium"
            >
              +1 (555) 123-4567
            </a>
          </div>
        </div>

        {/* Return to Home */}
        <div className="mt-8 text-center">
          <Link to="/">
            <Button variant="ghost" className="text-gray-600 hover:text-gray-800">
              <Home className="mr-2 h-4 w-4" />
              Return to Home
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default OrderSuccessPage

