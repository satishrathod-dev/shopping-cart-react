
import { useState } from "react"
import { Link } from "react-router-dom"
import { Minus, Plus, Trash2, Tag, ShoppingBag } from "lucide-react"
import { useCart } from "../context/CartContext"

const Cart = () => {
  const { items, coupon, updateQuantity, removeFromCart, applyCoupon, removeCoupon, getCartTotal } = useCart()

  const [couponCode, setCouponCode] = useState("")
  const [couponError, setCouponError] = useState("")

  const { subtotal, discount, platformFee, total } = getCartTotal()

  const availableCoupons = [
    { code: "SAVE10", discount: 10, minAmount: 100 },
    { code: "WELCOME20", discount: 20, minAmount: 200 },
    { code: "MEGA30", discount: 30, minAmount: 500 },
  ]

  const handleApplyCoupon = () => {
    const foundCoupon = availableCoupons.find((c) => c.code === couponCode.toUpperCase())

    if (!foundCoupon) {
      setCouponError("Invalid coupon code")
      return
    }

    if (subtotal < foundCoupon.minAmount) {
      setCouponError(`Minimum order amount of $${foundCoupon.minAmount} required`)
      return
    }

    applyCoupon(foundCoupon)
    setCouponCode("")
    setCouponError("")
  }

  if (items.length === 0) {
    return (
      <div className="text-center py-16">
        <ShoppingBag className="w-16 h-16 text-gray-300 mx-auto mb-4" />
        <h2 className="text-2xl font-semibold text-gray-900 mb-2">Your cart is empty</h2>
        <p className="text-gray-600 mb-6">Add some products to get started</p>
        <Link
          to="/"
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
        >
          Continue Shopping
        </Link>
      </div>
    )
  }

  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Shopping Cart</h1>
        <p className="text-gray-600">
          {items.length} item{items.length !== 1 ? "s" : ""} in your cart
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow-sm">
            {items.map((item, index) => (
              <div key={item.id} className={`p-6 ${index !== items.length - 1 ? "border-b" : ""}`}>
                <div className="flex items-start space-x-4">
                  <img
                    src={item.image || "/placeholder.svg"}
                    alt={item.name}
                    className="w-20 h-20 object-cover rounded-lg"
                  />

                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900 mb-1">{item.name}</h3>
                    <p className="text-sm text-gray-600 mb-2">{item.description}</p>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="p-1 rounded-full hover:bg-gray-100 transition-colors"
                        >
                          <Minus className="w-4 h-4" />
                        </button>

                        <span className="font-medium text-gray-900 min-w-[2rem] text-center">{item.quantity}</span>

                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="p-1 rounded-full hover:bg-gray-100 transition-colors"
                        >
                          <Plus className="w-4 h-4" />
                        </button>
                      </div>

                      <div className="flex items-center space-x-4">
                        <span className="font-semibold text-gray-900">${(item.price * item.quantity).toFixed(2)}</span>

                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="p-1 text-red-500 hover:text-red-700 transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-sm p-6 sticky top-4">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Order Summary</h2>

            {/* Coupon Section */}
            <div className="mb-6">
              <div className="flex space-x-2 mb-2">
                <input
                  type="text"
                  placeholder="Enter coupon code"
                  value={couponCode}
                  onChange={(e) => setCouponCode(e.target.value)}
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                  onClick={handleApplyCoupon}
                  className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-lg font-medium transition-colors"
                >
                  Apply
                </button>
              </div>

              {couponError && <p className="text-sm text-red-600">{couponError}</p>}

              {coupon && (
                <div className="flex items-center justify-between bg-green-50 p-3 rounded-lg">
                  <div className="flex items-center space-x-2">
                    <Tag className="w-4 h-4 text-green-600" />
                    <span className="text-sm font-medium text-green-800">{coupon.code} Applied</span>
                  </div>
                  <button onClick={removeCoupon} className="text-sm text-green-600 hover:text-green-800">
                    Remove
                  </button>
                </div>
              )}
            </div>

            {/* Price Breakdown */}
            <div className="space-y-3 mb-6">
              <div className="flex justify-between text-gray-600">
                <span>Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>

              {discount > 0 && (
                <div className="flex justify-between text-green-600">
                  <span>Discount ({coupon.discount}%)</span>
                  <span>-${discount.toFixed(2)}</span>
                </div>
              )}

              <div className="flex justify-between text-gray-600">
                <span>Platform Fee</span>
                <span>${platformFee.toFixed(2)}</span>
              </div>

              <div className="border-t pt-3">
                <div className="flex justify-between text-lg font-semibold text-gray-900">
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </div>
            </div>

            <Link
              to="/checkout"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-4 rounded-lg font-medium text-center block transition-colors"
            >
              Proceed to Checkout
            </Link>

            <Link
              to="/"
              className="w-full text-center text-blue-600 hover:text-blue-700 py-2 block mt-3 transition-colors"
            >
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Cart
