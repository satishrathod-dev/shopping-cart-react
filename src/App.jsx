"use client"

import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom"
import { CartProvider } from "./context/CartContext"
import { UserProvider } from "./context/UserContext"
import { ThemeProvider } from "./context/ThemeContext"
import { useUser } from "./context/UserContext"
import Header from "./components/Header"
import LandingPage from "./pages/LandingPage"
import ProductList from "./pages/ProductList"
import Cart from "./pages/Cart"
import Checkout from "./pages/Checkout"
import OrderSuccess from "./pages/OrderSuccess"
import OrderHistory from "./pages/OrderHistory"
import Login from "./pages/Login"
import Register from "./pages/Register"
import ProtectedRoute from "./components/ProtectedRoute"
import "./App.css"
import CartNotification from "./components/CartNotification"

// Component to handle conditional routing based on auth state
const AppRoutes = () => {
  const { isAuthenticated } = useUser()

  return (
    <Routes>
      {/* Landing page - only show if not authenticated */}
      <Route path="/" element={isAuthenticated ? <Navigate to="/products" replace /> : <LandingPage />} />

      {/* Authentication routes - redirect to products if already logged in */}
      <Route path="/login" element={isAuthenticated ? <Navigate to="/products" replace /> : <Login />} />
      <Route path="/register" element={isAuthenticated ? <Navigate to="/products" replace /> : <Register />} />

      {/* Protected product routes - require authentication */}
      <Route
        path="/products"
        element={
          <ProtectedRoute>
            <ProductList />
          </ProtectedRoute>
        }
      />
      <Route
        path="/cart"
        element={
          <ProtectedRoute>
            <Cart />
          </ProtectedRoute>
        }
      />
      <Route
        path="/checkout"
        element={
          <ProtectedRoute>
            <Checkout />
          </ProtectedRoute>
        }
      />
      <Route
        path="/order-success"
        element={
          <ProtectedRoute>
            <OrderSuccess />
          </ProtectedRoute>
        }
      />
      <Route
        path="/orders"
        element={
          <ProtectedRoute>
            <OrderHistory />
          </ProtectedRoute>
        }
      />

      {/* Catch all route - this is important for handling refreshes */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}

function App() {
  return (
    <ThemeProvider>
      <UserProvider>
        <CartProvider>
          <Router basename="/">
            <AppContent />
          </Router>
        </CartProvider>
      </UserProvider>
    </ThemeProvider>
  )
}

// Separate component to access user context
const AppContent = () => {
  const { isAuthenticated } = useUser()

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
      {isAuthenticated && (
        <>
          <Header />
          <CartNotification />
        </>
      )}

      <main className={isAuthenticated ? "container mx-auto px-4 py-8" : ""}>
        <AppRoutes />
      </main>
    </div>
  )
}

export default App
