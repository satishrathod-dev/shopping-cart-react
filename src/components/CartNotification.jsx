"use client"

import { useState, useEffect } from "react"
import { X, ShoppingCart, Check } from "lucide-react"
import { Link } from "react-router-dom"
import { useCart } from "../context/CartContext"

const CartNotification = () => {
  const { showNotification, hideNotification, getCartItemsCount } = useCart()
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    if (showNotification) {
      setIsVisible(true)
    }
  }, [showNotification])

  const handleClose = () => {
    setIsVisible(false)
    setTimeout(() => {
      hideNotification()
    }, 300)
  }

  if (!showNotification) return null

  return (
    <div className="fixed top-4 right-4 z-50">
      <div
        className={`bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg p-4 max-w-sm transform transition-all duration-300 ${
          isVisible ? "translate-x-0 opacity-100" : "translate-x-full opacity-0"
        }`}
      >
        <div className="flex items-start space-x-3">
          <div className="flex-shrink-0">
            <div className="w-8 h-8 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center">
              <Check className="w-4 h-4 text-green-600 dark:text-green-400" />
            </div>
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-center space-x-2 mb-2">
              <img
                src={showNotification.product?.image || "/placeholder.svg"}
                alt={showNotification.product?.name}
                className="w-10 h-10 object-cover rounded"
              />
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                  {showNotification.product?.name}
                </p>
                <p className="text-xs text-green-600 dark:text-green-400">{showNotification.message}</p>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <Link
                to="/cart"
                onClick={handleClose}
                className="flex items-center space-x-1 bg-blue-600 hover:bg-blue-700 text-white text-xs px-3 py-1.5 rounded-md transition-colors"
              >
                <ShoppingCart className="w-3 h-3" />
                <span>View Cart ({getCartItemsCount()})</span>
              </Link>
              <button
                onClick={handleClose}
                className="text-xs text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 px-2 py-1.5"
              >
                Continue Shopping
              </button>
            </div>
          </div>

          <button
            onClick={handleClose}
            className="flex-shrink-0 text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-400"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  )
}

export default CartNotification
