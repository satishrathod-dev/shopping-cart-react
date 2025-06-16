"use client"

import { useEffect } from "react"
import { Link, useLocation } from "react-router-dom"
import { CheckCircle, Package, Truck, Home, Eye } from "lucide-react"

const OrderSuccess = () => {
  const location = useLocation()
  const orderId = location.state?.orderId || `ORD${Date.now().toString().slice(-6)}`
  const estimatedDelivery = new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toLocaleDateString()

  useEffect(() => {
    // Scroll to top when component mounts
    window.scrollTo(0, 0)
  }, [])

  return (
    <div className="max-w-2xl mx-auto text-center py-16">
      <div className="mb-8">
        <CheckCircle className="w-20 h-20 text-green-500 mx-auto mb-4" />
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Order Placed Successfully!</h1>
        <p className="text-gray-600">Thank you for your purchase. Your order has been confirmed and saved.</p>
      </div>

      <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
          <div>
            <h3 className="font-semibold text-gray-900 mb-2">Order Details</h3>
            <p className="text-gray-600">
              Order ID: <span className="font-medium">{orderId}</span>
            </p>
            <p className="text-gray-600">
              Order Date: <span className="font-medium">{new Date().toLocaleDateString()}</span>
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 mb-2">Delivery Information</h3>
            <p className="text-gray-600">
              Estimated Delivery: <span className="font-medium">{estimatedDelivery}</span>
            </p>
            <p className="text-gray-600">Tracking will be available soon</p>
          </div>
        </div>
      </div>

      <div className="bg-blue-50 rounded-lg p-6 mb-8">
        <h3 className="font-semibold text-gray-900 mb-4">What's Next?</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
          <div className="flex flex-col items-center">
            <Package className="w-8 h-8 text-blue-600 mb-2" />
            <span className="font-medium">Order Processing</span>
            <span className="text-gray-600">We're preparing your items</span>
          </div>
          <div className="flex flex-col items-center">
            <Truck className="w-8 h-8 text-blue-600 mb-2" />
            <span className="font-medium">Shipped</span>
            <span className="text-gray-600">Your order is on the way</span>
          </div>
          <div className="flex flex-col items-center">
            <Home className="w-8 h-8 text-blue-600 mb-2" />
            <span className="font-medium">Delivered</span>
            <span className="text-gray-600">Enjoy your purchase!</span>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            to="/orders"
            className="inline-flex items-center justify-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
          >
            <Eye className="w-4 h-4" />
            <span>View Order Details</span>
          </Link>
          <Link
            to="/products"
            className="inline-block border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white px-6 py-3 rounded-lg font-medium transition-all"
          >
            Continue Shopping
          </Link>
        </div>
        <div>
          <p className="text-gray-600 text-sm">
            Need help? Contact our{" "}
            <a href="#" className="text-blue-600 hover:text-blue-700">
              customer support
            </a>
          </p>
        </div>
      </div>
    </div>
  )
}

export default OrderSuccess
