
import { useState } from "react"
import { Link, useNavigate, useLocation } from "react-router-dom"
import { Eye, EyeOff, ShoppingBag, Lock, Mail, ArrowLeft } from "lucide-react"
import { useUser } from "../context/UserContext"

const Login = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const { login } = useUser()

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  })
  const [showPassword, setShowPassword] = useState(false)
  const [errors, setErrors] = useState({})
  const [isLoading, setIsLoading] = useState(false)

  // After login, redirect to products page
  const from = location.state?.from?.pathname || "/products"

  // Mock credentials for demo
  const mockCredentials = [
    { email: "admin@shopease.com", password: "admin123", role: "admin" },
    { email: "user@shopease.com", password: "user123", role: "user" },
    { email: "demo@shopease.com", password: "demo123", role: "user" },
  ]

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }))
    }
  }

  const validateForm = () => {
    const newErrors = {}

    if (!formData.email.trim()) {
      newErrors.email = "Email is required"
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please enter a valid email"
    }

    if (!formData.password.trim()) {
      newErrors.password = "Password is required"
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!validateForm()) return

    setIsLoading(true)

    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // Check mock credentials
    const user = mockCredentials.find((cred) => cred.email === formData.email && cred.password === formData.password)

    if (user) {
      // Successful login
      login({
        id: Date.now(),
        email: user.email,
        name: user.email.split("@")[0].charAt(0).toUpperCase() + user.email.split("@")[0].slice(1),
        role: user.role,
      })
      navigate(from, { replace: true })
    } else {
      // Failed login
      setErrors({ general: "Invalid email or password" })
    }

    setIsLoading(false)
  }

  const fillDemoCredentials = (email, password) => {
    setFormData({ email, password })
    setErrors({})
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      {/* Back to Landing Page */}
      <div className="sm:mx-auto sm:w-full sm:max-w-md mb-4">
        <Link to="/" className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors">
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Home</span>
        </Link>
      </div>

      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="flex justify-center">
          <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
            <ShoppingBag className="w-6 h-6 text-white" />
          </div>
        </div>
        <h2 className="mt-6 text-center text-3xl font-bold text-gray-900">Welcome back to ShopEase</h2>
        <p className="mt-2 text-center text-sm text-gray-600">Sign in to access your account and continue shopping</p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow-lg sm:rounded-lg sm:px-10">
          {/* Demo Credentials */}
          <div className="mb-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
            <h3 className="text-sm font-medium text-blue-900 mb-3">🎯 Demo Credentials - Click to Use:</h3>
            <div className="space-y-2 text-xs">
              <div className="flex justify-between items-center bg-white p-2 rounded border">
                <span className="text-blue-700">Admin: admin@shopease.com / admin123</span>
                <button
                  type="button"
                  onClick={() => fillDemoCredentials("admin@shopease.com", "admin123")}
                  className="text-blue-600 hover:text-blue-800 underline font-medium"
                >
                  Use
                </button>
              </div>
              <div className="flex justify-between items-center bg-white p-2 rounded border">
                <span className="text-blue-700">User: user@shopease.com / user123</span>
                <button
                  type="button"
                  onClick={() => fillDemoCredentials("user@shopease.com", "user123")}
                  className="text-blue-600 hover:text-blue-800 underline font-medium"
                >
                  Use
                </button>
              </div>
              <div className="flex justify-between items-center bg-white p-2 rounded border">
                <span className="text-blue-700">Demo: demo@shopease.com / demo123</span>
                <button
                  type="button"
                  onClick={() => fillDemoCredentials("demo@shopease.com", "demo123")}
                  className="text-blue-600 hover:text-blue-800 underline font-medium"
                >
                  Use
                </button>
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {errors.general && (
              <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-md text-sm">
                {errors.general}
              </div>
            )}

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email address
              </label>
              <div className="mt-1 relative">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`appearance-none block w-full px-3 py-2 pl-10 border rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 ${
                    errors.email ? "border-red-300" : "border-gray-300"
                  }`}
                  placeholder="Enter your email"
                />
                <Mail className="w-5 h-5 text-gray-400 absolute left-3 top-2.5" />
              </div>
              {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <div className="mt-1 relative">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="current-password"
                  value={formData.password}
                  onChange={handleChange}
                  className={`appearance-none block w-full px-3 py-2 pl-10 pr-10 border rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 ${
                    errors.password ? "border-red-300" : "border-gray-300"
                  }`}
                  placeholder="Enter your password"
                />
                <Lock className="w-5 h-5 text-gray-400 absolute left-3 top-2.5" />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                >
                  {showPassword ? (
                    <EyeOff className="w-5 h-5 text-gray-400 hover:text-gray-600" />
                  ) : (
                    <Eye className="w-5 h-5 text-gray-400 hover:text-gray-600" />
                  )}
                </button>
              </div>
              {errors.password && <p className="mt-1 text-sm text-red-600">{errors.password}</p>}
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                  Remember me
                </label>
              </div>

              <div className="text-sm">
                <a href="#" className="font-medium text-blue-600 hover:text-blue-500">
                  Forgot your password?
                </a>
              </div>
            </div>

            <div>
              <button
                type="submit"
                disabled={isLoading}
                className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                {isLoading ? (
                  <div className="flex items-center">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Signing in...
                  </div>
                ) : (
                  "Sign in to ShopEase"
                )}
              </button>
            </div>
          </form>

          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">New to ShopEase?</span>
              </div>
            </div>

            <div className="mt-6">
              <Link
                to="/register"
                className="w-full flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
              >
                Create new account
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login
