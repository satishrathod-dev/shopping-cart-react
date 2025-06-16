
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { Check, CreditCard, Smartphone, Building, Truck, MapPin, Plus, Edit } from "lucide-react"
import { useCart } from "../context/CartContext"
import { useUser } from "../context/UserContext"
import AddressForm from "../components/AddressForm"

const Checkout = () => {
  const navigate = useNavigate()
  const { items, getCartTotal, clearCart, coupon } = useCart()
  const {  addresses, selectedAddress, setSelectedAddress, paymentMethod, setPaymentMethod, addOrder } = useUser()

  const [currentStep, setCurrentStep] = useState(1)
  const [showAddressForm, setShowAddressForm] = useState(false)
  const [isPlacingOrder, setIsPlacingOrder] = useState(false)

  const { subtotal, discount, platformFee, total } = getCartTotal()

  const steps = [
    { id: 1, name: "Address", icon: MapPin },
    { id: 2, name: "Payment", icon: CreditCard },
    { id: 3, name: "Review", icon: Check },
  ]

  const paymentMethods = [
    { id: "card", name: "Credit/Debit Card", icon: CreditCard },
    { id: "upi", name: "UPI", icon: Smartphone },
    { id: "netbanking", name: "Net Banking", icon: Building },
    { id: "cod", name: "Cash on Delivery", icon: Truck },
  ]

  const handlePlaceOrder = async () => {
    setIsPlacingOrder(true)

    // Simulate order processing
    await new Promise((resolve) => setTimeout(resolve, 2000))

    // Create order data
    const orderData = {
      items: items.map((item) => ({
        id: item.id,
        name: item.name,
        price: item.price,
        quantity: item.quantity,
        image: item.image,
      })),
      address: selectedAddress,
      paymentMethod: paymentMethod,
      subtotal,
      discount,
      platformFee,
      total,
      coupon: coupon,
    }

    // Add order to user's order history
    const newOrder = addOrder(orderData)

    // Clear cart
    clearCart()

    // Navigate to success page with order ID
    navigate("/order-success", { state: { orderId: newOrder.id } })
  }

  const canProceedToNextStep = () => {
    switch (currentStep) {
      case 1:
        return selectedAddress !== null
      case 2:
        return paymentMethod !== null
      case 3:
        return true
      default:
        return false
    }
  }

  if (items.length === 0) {
    navigate("/cart")
    return null
  }

  return (
    <div className="max-w-6xl mx-auto">
      {/* Progress Steps */}
      <div className="mb-8">
        <div className="flex items-center justify-center space-x-8">
          {steps.map((step, index) => (
            <div key={step.id} className="flex items-center">
              <div
                className={`flex items-center justify-center w-10 h-10 rounded-full border-2 ${
                  currentStep >= step.id ? "bg-blue-600 border-blue-600 text-white" : "border-gray-300 text-gray-400"
                }`}
              >
                <step.icon className="w-5 h-5" />
              </div>
              <span className={`ml-2 font-medium ${currentStep >= step.id ? "text-blue-600" : "text-gray-400"}`}>
                {step.name}
              </span>
              {index < steps.length - 1 && (
                <div className={`w-16 h-0.5 ml-4 ${currentStep > step.id ? "bg-blue-600" : "bg-gray-300"}`} />
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2">
          {/* Step 1: Address */}
          {currentStep === 1 && (
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-gray-900">Delivery Address</h2>
                <button
                  onClick={() => setShowAddressForm(true)}
                  className="flex items-center space-x-2 text-blue-600 hover:text-blue-700"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add New Address</span>
                </button>
              </div>

              {showAddressForm && (
                <div className="mb-6">
                  <AddressForm onClose={() => setShowAddressForm(false)} />
                </div>
              )}

              <div className="space-y-4">
                {addresses.map((address) => (
                  <div
                    key={address.id}
                    className={`border rounded-lg p-4 cursor-pointer transition-colors ${
                      selectedAddress?.id === address.id
                        ? "border-blue-500 bg-blue-50"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                    onClick={() => setSelectedAddress(address)}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-2">
                          <span className="font-medium text-gray-900">{address.name}</span>
                          <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">{address.type}</span>
                          {address.isDefault && (
                            <span className="text-xs bg-green-100 text-green-600 px-2 py-1 rounded">Default</span>
                          )}
                        </div>
                        <p className="text-gray-600 text-sm">
                          {address.street}, {address.city}, {address.state} {address.zipCode}
                        </p>
                        <p className="text-gray-600 text-sm">{address.phone}</p>
                      </div>
                      <button className="text-blue-600 hover:text-blue-700">
                        <Edit className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Step 2: Payment */}
          {currentStep === 2 && (
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Payment Method</h2>

              <div className="space-y-4">
                {paymentMethods.map((method) => (
                  <div
                    key={method.id}
                    className={`border rounded-lg p-4 cursor-pointer transition-colors ${
                      paymentMethod?.id === method.id
                        ? "border-blue-500 bg-blue-50"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                    onClick={() => setPaymentMethod(method)}
                  >
                    <div className="flex items-center space-x-3">
                      <method.icon className="w-5 h-5 text-gray-600" />
                      <span className="font-medium text-gray-900">{method.name}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Step 3: Review */}
          {currentStep === 3 && (
            <div className="space-y-6">
              {/* Order Items */}
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Order Items</h2>
                <div className="space-y-4">
                  {items.map((item) => (
                    <div key={item.id} className="flex items-center space-x-4">
                      <img
                        src={item.image || "/placeholder.svg"}
                        alt={item.name}
                        className="w-16 h-16 object-cover rounded-lg"
                      />
                      <div className="flex-1">
                        <h3 className="font-medium text-gray-900">{item.name}</h3>
                        <p className="text-sm text-gray-600">Qty: {item.quantity}</p>
                      </div>
                      <span className="font-semibold text-gray-900">${(item.price * item.quantity).toFixed(2)}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Delivery Address */}
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Delivery Address</h2>
                {selectedAddress && (
                  <div>
                    <p className="font-medium text-gray-900">{selectedAddress.name}</p>
                    <p className="text-gray-600">
                      {selectedAddress.street}, {selectedAddress.city}, {selectedAddress.state}{" "}
                      {selectedAddress.zipCode}
                    </p>
                    <p className="text-gray-600">{selectedAddress.phone}</p>
                  </div>
                )}
              </div>

              {/* Payment Method */}
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Payment Method</h2>
                {paymentMethod && (
                  <div className="flex items-center space-x-3">
                    <paymentMethod.icon className="w-5 h-5 text-gray-600" />
                    <span className="text-gray-900">{paymentMethod.name}</span>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Order Summary Sidebar */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-sm p-6 sticky top-4">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Order Summary</h2>

            <div className="space-y-3 mb-6">
              <div className="flex justify-between text-gray-600">
                <span>Subtotal ({items.length} items)</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>

              {discount > 0 && (
                <div className="flex justify-between text-green-600">
                  <span>Discount</span>
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

            {currentStep < 3 ? (
              <button
                onClick={() => setCurrentStep(currentStep + 1)}
                disabled={!canProceedToNextStep()}
                className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white py-3 px-4 rounded-lg font-medium transition-colors"
              >
                Continue
              </button>
            ) : (
              <button
                onClick={handlePlaceOrder}
                disabled={isPlacingOrder}
                className="w-full bg-green-600 hover:bg-green-700 disabled:bg-gray-300 text-white py-3 px-4 rounded-lg font-medium transition-colors"
              >
                {isPlacingOrder ? "Placing Order..." : "Place Order"}
              </button>
            )}

            {currentStep > 1 && (
              <button
                onClick={() => setCurrentStep(currentStep - 1)}
                className="w-full text-center text-blue-600 hover:text-blue-700 py-2 block mt-3 transition-colors"
              >
                Back
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Checkout
