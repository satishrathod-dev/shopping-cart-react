"use client"
import { Star, ShoppingCart } from "lucide-react"
import { useCart } from "../context/CartContext"
import { useState, useEffect } from "react"
import CartDrawer from "../components/CartDrawer"
import { useLocation } from "react-router-dom"

const ProductList = () => {
  const { addToCart } = useCart()
  const [showCartDrawer, setShowCartDrawer] = useState(false)

  const products = [
    {
      id: 1,
      name: "Premium Wireless Headphones",
      price: 299,
      originalPrice: 399,
      image: "/placeholder.svg?height=300&width=300",
      rating: 4.5,
      reviews: 128,
      category: "Electronics",
      description: "High-quality wireless headphones with noise cancellation",
    },
    {
      id: 2,
      name: "Smart Fitness Watch",
      price: 199,
      originalPrice: 249,
      image: "/placeholder.svg?height=300&width=300",
      rating: 4.3,
      reviews: 89,
      category: "Wearables",
      description: "Track your fitness goals with this advanced smartwatch",
    },
    {
      id: 3,
      name: "Leather Messenger Bag",
      price: 149,
      originalPrice: 199,
      image: "/placeholder.svg?height=300&width=300",
      rating: 4.7,
      reviews: 156,
      category: "Fashion",
      description: "Stylish and durable leather bag for professionals",
    },
    {
      id: 4,
      name: "Bluetooth Speaker",
      price: 79,
      originalPrice: 99,
      image: "/placeholder.svg?height=300&width=300",
      rating: 4.2,
      reviews: 203,
      category: "Electronics",
      description: "Portable speaker with excellent sound quality",
    },
    {
      id: 5,
      name: "Organic Cotton T-Shirt",
      price: 29,
      originalPrice: 39,
      image: "/placeholder.svg?height=300&width=300",
      rating: 4.4,
      reviews: 67,
      category: "Fashion",
      description: "Comfortable and sustainable organic cotton tee",
    },
    {
      id: 6,
      name: "Stainless Steel Water Bottle",
      price: 24,
      originalPrice: 34,
      image: "/placeholder.svg?height=300&width=300",
      rating: 4.6,
      reviews: 94,
      category: "Lifestyle",
      description: "Keep your drinks at the perfect temperature",
    },
  ]

  const [filteredProducts, setFilteredProducts] = useState(products)
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All")
  const location = useLocation()

  // Get search query from URL params
  useEffect(() => {
    const urlParams = new URLSearchParams(location.search)
    const searchParam = urlParams.get("search")
    if (searchParam) {
      setSearchQuery(searchParam)
    }
  }, [location.search])

  // Filter products based on search query and category
  useEffect(() => {
    let filtered = products

    // Filter by search query
    if (searchQuery.trim()) {
      filtered = filtered.filter(
        (product) =>
          product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          product.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
          product.category.toLowerCase().includes(searchQuery.toLowerCase()),
      )
    }

    // Filter by category
    if (selectedCategory !== "All") {
      filtered = filtered.filter((product) => product.category === selectedCategory)
    }

    setFilteredProducts(filtered)
  }, [searchQuery, selectedCategory])

  // Get unique categories
  const categories = ["All", ...new Set(products.map((product) => product.category))]

  const handleAddToCart = (product) => {
    addToCart(product)
    // Show cart drawer after adding item
    setTimeout(() => {
      setShowCartDrawer(true)
    }, 500) // Small delay to let notification show first
  }

  return (
    <div>
      <div className="mb-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              {searchQuery ? `Search Results for "${searchQuery}"` : "Featured Products"}
            </h1>
            <p className="text-gray-600 dark:text-gray-300">
              {searchQuery
                ? `Found ${filteredProducts.length} product${filteredProducts.length !== 1 ? "s" : ""}`
                : "Discover our curated selection of premium products"}
            </p>
          </div>

          {/* Category Filter */}
          <div className="flex items-center space-x-2">
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Category:</span>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
            >
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Clear Search */}
        {searchQuery && (
          <div className="mb-4">
            <button
              onClick={() => {
                setSearchQuery("")
                window.history.pushState({}, "", "/products")
              }}
              className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 text-sm font-medium"
            >
              ← Clear search and show all products
            </button>
          </div>
        )}
      </div>

      {filteredProducts.length === 0 ? (
        <div className="text-center py-16">
          <div className="w-16 h-16 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-2xl">🔍</span>
          </div>
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">No products found</h3>
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            {searchQuery
              ? `No products match "${searchQuery}". Try a different search term.`
              : "No products available in this category."}
          </p>
          <button
            onClick={() => {
              setSearchQuery("")
              setSelectedCategory("All")
              window.history.pushState({}, "", "/products")
            }}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition-colors"
          >
            Show All Products
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
            >
              <div className="aspect-square overflow-hidden">
                <img
                  src={product.image || "/placeholder.svg"}
                  alt={product.name}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                />
              </div>

              <div className="p-4">
                <div className="mb-2">
                  <span className="text-xs font-medium text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900 px-2 py-1 rounded">
                    {product.category}
                  </span>
                </div>

                <h3 className="font-semibold text-gray-900 dark:text-white mb-2 line-clamp-2">{product.name}</h3>

                <p className="text-sm text-gray-600 dark:text-gray-300 mb-3 line-clamp-2">{product.description}</p>

                <div className="flex items-center mb-3">
                  <div className="flex items-center">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300 ml-1">{product.rating}</span>
                  </div>
                  <span className="text-sm text-gray-500 dark:text-gray-400 ml-2">({product.reviews} reviews)</span>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <span className="text-lg font-bold text-gray-900 dark:text-white">${product.price}</span>
                    <span className="text-sm text-gray-500 dark:text-gray-400 line-through">
                      ${product.originalPrice}
                    </span>
                  </div>

                  <button
                    onClick={() => handleAddToCart(product)}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors"
                  >
                    <ShoppingCart className="w-4 h-4" />
                    <span className="text-sm font-medium">Add to Cart</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <CartDrawer isOpen={showCartDrawer} onClose={() => setShowCartDrawer(false)} />
    </div>
  )
}

export default ProductList
