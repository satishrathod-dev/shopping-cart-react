"use client"

import { useEffect } from "react"
import { useLocation } from "react-router-dom"

const RouteHandler = ({ children }) => {
  const location = useLocation()

  useEffect(() => {
    // Scroll to top on route change
    window.scrollTo(0, 0)

    // Update document title based on route
    const routeTitles = {
      "/": "ShopEase - Premium Shopping Experience",
      "/login": "Sign In - ShopEase",
      "/register": "Create Account - ShopEase",
      "/products": "Products - ShopEase",
      "/cart": "Shopping Cart - ShopEase",
      "/checkout": "Checkout - ShopEase",
      "/orders": "Order History - ShopEase",
      "/order-success": "Order Confirmed - ShopEase",
    }

    document.title = routeTitles[location.pathname] || "ShopEase"
  }, [location])

  return children
}

export default RouteHandler
