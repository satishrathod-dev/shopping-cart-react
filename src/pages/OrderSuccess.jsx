"use client"

import { useEffect, useState } from "react"
import { Link, useLocation, useNavigate } from "react-router-dom"
import { CheckCircle, Package, Truck, Home, Eye, ArrowRight } from "lucide-react"

const OrderSuccess = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const [showConfetti, setShowConfetti] = useState(false)

  const orderId = location.state?.orderId || `ORD${Date.now().toString().slice(-6)}`
  const estimatedDelivery = new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toLocaleDateString()

  useEffect(() => {
    // Scroll to top when component mounts
    window.scrollTo(0, 0)

    // Show confetti animation
    setShowConfetti(true)
    setTimeout(() => setShowConfetti(false), 3000)

    // If no order state, redirect to products (shouldn't happen normally)
    if (!location.state?.orderId) {
      console.warn("No order ID found, user may have accessed page directly")
    }
  }, [location.state, navigate])

  return (
    <div className="max-w-2xl mx-auto text-center py-16 relative">
      {/* Confetti Animation */}
      {showConfetti && (
        <div className="fixed inset-0 pointer-events-none z-10">
          <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-blue-500 animate-bounce"></div>
          <div className="absolute top-1/3 right-1/4 w-2 h-2 bg-green-500 animate-bounce delay-100"></div>
          <div className="absolute top-1/2 left-1/3 w-2 h-2 bg-yellow-500 animate-bounce delay-200"></div>
          <div className="absolute top-1/4 right-1/3 w-2 h-2 bg-purple-500 animate-bounce delay-300"></div>
        </div>
      )}

      <div className="mb-8">
        <div className="relative">
          <CheckCircle className="w-24 h-24 text-green-500 mx-auto mb-4 animate-pulse" />
          <div className="absolute inset-0 w-24 h-24 mx-auto rounded-full bg-green-100 dark:bg-green-900/20 animate-ping opacity-20"></div>
        </div>
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">Order Placed Successfully! 🎉</h1>
        <p className="text-xl text-gray-600 dark:text-gray-300">
          Thank you for your purchase. Your order has been confirmed and is being processed.
        </p>
      </div>

      <div className="bg-gradient-to-r from-blue-50 to-green-50 dark:from-blue-900/20 dark:to-green-900/20 rounded-lg shadow-sm p-8 mb-8 border border-blue-200 dark:border-blue-700">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
          <div className="space-y-3">
            <h3 className="font-semibold text-gray-900 dark:text-white text-lg flex items-center">
              <Package className="w-5 h-5 mr-2 text-blue-600 dark:text-blue-400" />
              Order Details
            </h3>
            <div className="space-y-2">
              <p className="text-gray-600 dark:text-gray-300">
                Order ID:{" "}
                <span className="font-mono font-medium text-blue-600 dark:text-blue-400 bg-blue-100 dark:bg-blue-900/30 px-2 py-1 rounded">
                  {orderId}
                </span>
              </p>
              <p className="text-gray-600 dark:text-gray-300">
                Order Date:{" "}
                <span className="font-medium">
                  {new Date().toLocaleDateString("en-US", {
                    weekday: "long",
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </span>
              </p>
            </div>
          </div>
          <div className="space-y-3">
            <h3 className="font-semibold text-gray-900 dark:text-white text-lg flex items-center">
              <Truck className="w-5 h-5 mr-2 text-green-600 dark:text-green-400" />
              Delivery Information
            </h3>
            <div className="space-y-2">
              <p className="text-gray-600 dark:text-gray-300">
                Estimated Delivery:{" "}
                <span className="font-medium text-green-600 dark:text-green-400">{estimatedDelivery}</span>
              </p>
              <p className="text-gray-600 dark:text-gray-300">Tracking information will be sent to your email</p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-6 mb-8 border dark:border-blue-700">
        <h3 className="font-semibold text-gray-900 dark:text-white mb-4 text-lg">What happens next?</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
          <div className="flex flex-col items-center p-4 bg-white dark:bg-gray-800 rounded-lg border dark:border-gray-700">
            <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mb-3">
              <Package className="w-6 h-6 text-blue-600 dark:text-blue-400" />
            </div>
            <span className="font-medium text-gray-900 dark:text-white">Order Processing</span>
            <span className="text-gray-600 dark:text-gray-300 text-center mt-1">
              We're preparing your items for shipment
            </span>
          </div>
          <div className="flex flex-col items-center p-4 bg-white dark:bg-gray-800 rounded-lg border dark:border-gray-700">
            <div className="w-12 h-12 bg-yellow-100 dark:bg-yellow-900/30 rounded-full flex items-center justify-center mb-3">
              <Truck className="w-6 h-6 text-yellow-600 dark:text-yellow-400" />
            </div>
            <span className="font-medium text-gray-900 dark:text-white">Shipped</span>
            <span className="text-gray-600 dark:text-gray-300 text-center mt-1">Your order is on the way to you</span>
          </div>
          <div className="flex flex-col items-center p-4 bg-white dark:bg-gray-800 rounded-lg border dark:border-gray-700">
            <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mb-3">
              <Home className="w-6 h-6 text-green-600 dark:text-green-400" />
            </div>
            <span className="font-medium text-gray-900 dark:text-white">Delivered</span>
            <span className="text-gray-600 dark:text-gray-300 text-center mt-1">Enjoy your purchase!</span>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            to="/orders"
            className="inline-flex items-center justify-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-medium transition-all transform hover:scale-105"
          >
            <Eye className="w-4 h-4" />
            <span>Track Your Order</span>
          </Link>
          <Link
            to="/products"
            className="inline-flex items-center justify-center space-x-2 border-2 border-blue-600 dark:border-blue-400 text-blue-600 dark:text-blue-400 hover:bg-blue-600 hover:text-white dark:hover:bg-blue-600 dark:hover:text-white px-8 py-3 rounded-lg font-medium transition-all"
          >
            <span>Continue Shopping</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
        <div>
          <p className="text-gray-600 dark:text-gray-300 text-sm">
            Need help? Contact our{" "}
            <a
              href="#"
              className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium"
            >
              customer support team
            </a>
          </p>
        </div>
      </div>
    </div>
  )
}

export default OrderSuccess
