import { createContext, useContext, useReducer, useEffect, useState } from "react"
import { useUser } from "./UserContext"

const CartContext = createContext()

const cartReducer = (state, action) => {
  switch (action.type) {
    case "ADD_TO_CART":
      const existingItem = state.items.find((item) => item.id === action.payload.id)
      if (existingItem) {
        return {
          ...state,
          items: state.items.map((item) =>
            item.id === action.payload.id ? { ...item, quantity: item.quantity + 1 } : item,
          ),
        }
      }
      return {
        ...state,
        items: [...state.items, { ...action.payload, quantity: 1 }],
      }

    case "REMOVE_FROM_CART":
      return {
        ...state,
        items: state.items.filter((item) => item.id !== action.payload),
      }

    case "UPDATE_QUANTITY":
      return {
        ...state,
        items: state.items.map((item) =>
          item.id === action.payload.id ? { ...item, quantity: action.payload.quantity } : item,
        ),
      }

    case "APPLY_COUPON":
      return {
        ...state,
        coupon: action.payload,
      }

    case "REMOVE_COUPON":
      return {
        ...state,
        coupon: null,
      }

    case "CLEAR_CART":
      return {
        ...state,
        items: [],
        coupon: null,
      }

    case "LOAD_CART":
      return action.payload

    default:
      return state
  }
}

const initialState = {
  items: [],
  coupon: null,
}

export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState)
  const [showNotification, setShowNotification] = useState(null)
  const { user } = useUser()

  // Load cart data when user changes or component mounts
  useEffect(() => {
    if (user) {
      const savedCart = localStorage.getItem(`cart_${user.id}`)
      if (savedCart) {
        try {
          const cartData = JSON.parse(savedCart)
          dispatch({ type: "LOAD_CART", payload: cartData })
        } catch (error) {
          console.error("Error loading cart from localStorage:", error)
        }
      }
    } else {
      // Clear cart when user logs out
      dispatch({ type: "CLEAR_CART" })
    }
  }, [user])

  // Save cart data whenever state changes and user is logged in
  useEffect(() => {
    if (user) {
      try {
        localStorage.setItem(`cart_${user.id}`, JSON.stringify(state))
      } catch (error) {
        console.error("Error saving cart to localStorage:", error)
      }
    }
  }, [state, user])

  const addToCart = (product) => {
    dispatch({ type: "ADD_TO_CART", payload: product })

    // Show notification
    setShowNotification({
      type: "success",
      message: `${product.name} added to cart!`,
      product: product,
    })

    // Auto hide notification after 3 seconds
    setTimeout(() => {
      setShowNotification(null)
    }, 3000)
  }

  const removeFromCart = (productId) => {
    dispatch({ type: "REMOVE_FROM_CART", payload: productId })
  }

  const updateQuantity = (productId, quantity) => {
    if (quantity <= 0) {
      removeFromCart(productId)
    } else {
      dispatch({ type: "UPDATE_QUANTITY", payload: { id: productId, quantity } })
    }
  }

  const applyCoupon = (coupon) => {
    dispatch({ type: "APPLY_COUPON", payload: coupon })
  }

  const removeCoupon = () => {
    dispatch({ type: "REMOVE_COUPON" })
  }

  const clearCart = () => {
    dispatch({ type: "CLEAR_CART" })
    // Also clear from localStorage
    if (user) {
      localStorage.removeItem(`cart_${user.id}`)
    }
  }

  const getCartTotal = () => {
    const subtotal = state.items.reduce((total, item) => total + item.price * item.quantity, 0)
    const discount = state.coupon ? (subtotal * state.coupon.discount) / 100 : 0
    const platformFee = 20
    return {
      subtotal,
      discount,
      platformFee,
      total: subtotal - discount + platformFee,
    }
  }

  const getCartItemsCount = () => {
    return state.items.reduce((total, item) => total + item.quantity, 0)
  }

  const hideNotification = () => {
    setShowNotification(null)
  }

  return (
    <CartContext.Provider
      value={{
        ...state,
        showNotification,
        addToCart,
        removeFromCart,
        updateQuantity,
        applyCoupon,
        removeCoupon,
        clearCart,
        getCartTotal,
        getCartItemsCount,
        hideNotification,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export const useCart = () => {
  const context = useContext(CartContext)
  if (!context) {
    throw new Error("useCart must be used within a CartProvider")
  }
  return context
}
