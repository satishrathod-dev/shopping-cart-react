"use client"

import { Package, Truck, CheckCircle, Clock, Eye } from "lucide-react"
import { useUser } from "../context/UserContext"
import { useState } from "react"

const OrderHistory = () => {
  const { orders } = useUser()
  const [selectedOrder, setSelectedOrder] = useState(null)

  const getStatusIcon = (status) => {
    switch (status) {
      case "confirmed":
        return <CheckCircle className="w-5 h-5 text-green-500" />
      case "processing":
        return <Package className="w-5 h-5 text-blue-500" />
      case "shipped":
        return <Truck className="w-5 h-5 text-purple-500" />
      case "delivered":
        return <CheckCircle className="w-5 h-5 text-green-600" />
      default:
        return <Clock className="w-5 h-5 text-gray-500" />
    }
  }

  const getStatusColor = (status) => {
    switch (status) {
      case "confirmed":
        return "bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300"
      case "processing":
        return "bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300"
      case "shipped":
        return "bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-300"
      case "delivered":
        return "bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300"
      default:
        return "bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-300"
    }
  }

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  if (orders.length === 0) {
    return (
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">Order History</h1>
        <div className="text-center py-16">
          <Package className="w-16 h-16 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-2">No orders yet</h2>
          <p className="text-gray-600 dark:text-gray-300 mb-6">When you place orders, they'll appear here</p>
          <a
            href="/products"
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
          >
            Start Shopping
          </a>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Order History</h1>
        <p className="text-gray-600 dark:text-gray-300">Track and manage your orders</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Orders List */}
        <div className="space-y-4">
          {orders.map((order) => (
            <div
              key={order.id}
              className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border dark:border-gray-700 p-6 hover:shadow-md dark:hover:shadow-gray-900/20 transition-shadow cursor-pointer"
              onClick={() => setSelectedOrder(order)}
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                  {getStatusIcon(order.status)}
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-white">Order #{order.id}</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-300">{formatDate(order.orderDate)}</p>
                  </div>
                </div>
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                  {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                </span>
              </div>

              <div className="mb-4">
                <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">
                  {order.items.length} item{order.items.length !== 1 ? "s" : ""}
                </p>
                <div className="flex -space-x-2">
                  {order.items.slice(0, 3).map((item, index) => (
                    <img
                      key={index}
                      src={item.image || "/placeholder.svg"}
                      alt={item.name}
                      className="w-10 h-10 rounded-full border-2 border-white dark:border-gray-800 object-cover"
                    />
                  ))}
                  {order.items.length > 3 && (
                    <div className="w-10 h-10 rounded-full border-2 border-white dark:border-gray-800 bg-gray-100 dark:bg-gray-700 flex items-center justify-center text-xs font-medium text-gray-600 dark:text-gray-300">
                      +{order.items.length - 3}
                    </div>
                  )}
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <p className="text-lg font-semibold text-gray-900 dark:text-white">${order.total.toFixed(2)}</p>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    Estimated delivery: {formatDate(order.estimatedDelivery)}
                  </p>
                </div>
                <button className="flex items-center space-x-1 text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 text-sm font-medium">
                  <Eye className="w-4 h-4" />
                  <span>View Details</span>
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Order Details */}
        <div className="lg:sticky lg:top-4">
          {selectedOrder ? (
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border dark:border-gray-700 p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Order Details</h2>
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(selectedOrder.status)}`}>
                  {selectedOrder.status.charAt(0).toUpperCase() + selectedOrder.status.slice(1)}
                </span>
              </div>

              <div className="space-y-6">
                {/* Order Info */}
                <div>
                  <h3 className="font-medium text-gray-900 dark:text-white mb-2">Order Information</h3>
                  <div className="text-sm text-gray-600 dark:text-gray-300 space-y-1">
                    <p>Order ID: {selectedOrder.id}</p>
                    <p>Order Date: {formatDate(selectedOrder.orderDate)}</p>
                    <p>Estimated Delivery: {formatDate(selectedOrder.estimatedDelivery)}</p>
                  </div>
                </div>

                {/* Items */}
                <div>
                  <h3 className="font-medium text-gray-900 dark:text-white mb-3">Items Ordered</h3>
                  <div className="space-y-3">
                    {selectedOrder.items.map((item) => (
                      <div key={item.id} className="flex items-center space-x-3">
                        <img
                          src={item.image || "/placeholder.svg"}
                          alt={item.name}
                          className="w-12 h-12 object-cover rounded-lg"
                        />
                        <div className="flex-1">
                          <h4 className="font-medium text-gray-900 dark:text-white text-sm">{item.name}</h4>
                          <p className="text-xs text-gray-600 dark:text-gray-300">Qty: {item.quantity}</p>
                        </div>
                        <span className="font-medium text-gray-900 dark:text-white text-sm">
                          ${(item.price * item.quantity).toFixed(2)}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Delivery Address */}
                <div>
                  <h3 className="font-medium text-gray-900 dark:text-white mb-2">Delivery Address</h3>
                  <div className="text-sm text-gray-600 dark:text-gray-300">
                    <p className="font-medium text-gray-900 dark:text-white">{selectedOrder.address.name}</p>
                    <p>{selectedOrder.address.street}</p>
                    <p>
                      {selectedOrder.address.city}, {selectedOrder.address.state} {selectedOrder.address.zipCode}
                    </p>
                    <p>{selectedOrder.address.phone}</p>
                  </div>
                </div>

                {/* Payment Method */}
                <div>
                  <h3 className="font-medium text-gray-900 dark:text-white mb-2">Payment Method</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300">{selectedOrder.paymentMethod.name}</p>
                </div>

                {/* Order Summary */}
                <div className="border-t dark:border-gray-700 pt-4">
                  <h3 className="font-medium text-gray-900 dark:text-white mb-3">Order Summary</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-300">Subtotal</span>
                      <span className="text-gray-900 dark:text-white">${selectedOrder.subtotal.toFixed(2)}</span>
                    </div>
                    {selectedOrder.discount > 0 && (
                      <div className="flex justify-between text-green-600 dark:text-green-400">
                        <span>Discount</span>
                        <span>-${selectedOrder.discount.toFixed(2)}</span>
                      </div>
                    )}
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-300">Platform Fee</span>
                      <span className="text-gray-900 dark:text-white">${selectedOrder.platformFee.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between font-semibold text-lg border-t dark:border-gray-700 pt-2">
                      <span className="text-gray-900 dark:text-white">Total</span>
                      <span className="text-gray-900 dark:text-white">${selectedOrder.total.toFixed(2)}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-8 text-center">
              <Package className="w-12 h-12 text-gray-400 dark:text-gray-500 mx-auto mb-4" />
              <p className="text-gray-600 dark:text-gray-300">Select an order to view details</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default OrderHistory
