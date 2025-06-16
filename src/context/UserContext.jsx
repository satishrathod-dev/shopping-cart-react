"use client"

import { createContext, useContext, useState, useEffect } from "react"

const UserContext = createContext()

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [addresses, setAddresses] = useState([])
  const [selectedAddress, setSelectedAddress] = useState(null)
  const [paymentMethod, setPaymentMethod] = useState(null)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [orders, setOrders] = useState([])

  useEffect(() => {
    // Check for saved user in localStorage
    const savedUser = localStorage.getItem("currentUser")
    if (savedUser) {
      try {
        const userData = JSON.parse(savedUser)
        setUser(userData)
        setIsAuthenticated(true)
        loadUserData(userData.id)
      } catch (error) {
        console.error("Error loading user from localStorage:", error)
        localStorage.removeItem("currentUser")
      }
    }
  }, [])

  const loadUserData = (userId) => {
    try {
      // Load user addresses
      const savedAddresses = localStorage.getItem(`addresses_${userId}`)
      if (savedAddresses) {
        const addressData = JSON.parse(savedAddresses)
        setAddresses(addressData)
        setSelectedAddress(addressData.find((addr) => addr.isDefault) || addressData[0] || null)
      } else {
        // Create default addresses for new users
        const defaultAddresses = [
          {
            id: 1,
            type: "Home",
            name: user?.name || "User",
            street: "123 Main Street",
            city: "Pune",
            state: "MH",
            zipCode: "10001",
            phone: "+91 234 567 8900",
            isDefault: true,
          },
          {
            id: 2,
            type: "Work",
            name: user?.name || "User",
            street: "456 Business Ave",
            city: "Pune",
            state: "MH",
            zipCode: "10002",
            phone: "+91 234 567 8900",
            isDefault: false,
          },
        ]
        setAddresses(defaultAddresses)
        setSelectedAddress(defaultAddresses[0])
        localStorage.setItem(`addresses_${userId}`, JSON.stringify(defaultAddresses))
      }

      // Load user orders
      const savedOrders = localStorage.getItem(`orders_${userId}`)
      if (savedOrders) {
        const orderData = JSON.parse(savedOrders)
        setOrders(orderData)
      }

      // Load selected payment method
      const savedPaymentMethod = localStorage.getItem(`paymentMethod_${userId}`)
      if (savedPaymentMethod) {
        const paymentData = JSON.parse(savedPaymentMethod)
        setPaymentMethod(paymentData)
      }
    } catch (error) {
      console.error("Error loading user data:", error)
    }
  }

  const saveUserData = (userId) => {
    try {
      if (addresses.length > 0) {
        localStorage.setItem(`addresses_${userId}`, JSON.stringify(addresses))
      }
      if (orders.length > 0) {
        localStorage.setItem(`orders_${userId}`, JSON.stringify(orders))
      }
      if (paymentMethod) {
        localStorage.setItem(`paymentMethod_${userId}`, JSON.stringify(paymentMethod))
      }
    } catch (error) {
      console.error("Error saving user data:", error)
    }
  }

  const login = (userData) => {
    setUser(userData)
    setIsAuthenticated(true)
    localStorage.setItem("currentUser", JSON.stringify(userData))
    loadUserData(userData.id)
  }

  const logout = () => {
    // Save current user data before logout
    if (user) {
      saveUserData(user.id)
    }

    setUser(null)
    setIsAuthenticated(false)
    setAddresses([])
    setSelectedAddress(null)
    setPaymentMethod(null)
    setOrders([])
    localStorage.removeItem("currentUser")
  }

  const addAddress = (address) => {
    const newAddress = {
      ...address,
      id: Date.now(),
      isDefault: addresses.length === 0,
    }
    const updatedAddresses = [...addresses, newAddress]
    setAddresses(updatedAddresses)

    if (user) {
      localStorage.setItem(`addresses_${user.id}`, JSON.stringify(updatedAddresses))
    }
    return newAddress
  }

  const updateAddress = (addressId, updatedAddress) => {
    const updatedAddresses = addresses.map((addr) => (addr.id === addressId ? { ...addr, ...updatedAddress } : addr))
    setAddresses(updatedAddresses)

    if (user) {
      localStorage.setItem(`addresses_${user.id}`, JSON.stringify(updatedAddresses))
    }
  }

  const deleteAddress = (addressId) => {
    const updatedAddresses = addresses.filter((addr) => addr.id !== addressId)
    setAddresses(updatedAddresses)

    if (selectedAddress?.id === addressId) {
      setSelectedAddress(updatedAddresses[0] || null)
    }

    if (user) {
      localStorage.setItem(`addresses_${user.id}`, JSON.stringify(updatedAddresses))
    }
  }

  const addOrder = (orderData) => {
    const newOrder = {
      id: `ORD${Date.now().toString().slice(-6)}`,
      ...orderData,
      orderDate: new Date().toISOString(),
      status: "confirmed",
      estimatedDelivery: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString(),
    }

    const updatedOrders = [newOrder, ...orders]
    setOrders(updatedOrders)

    if (user) {
      localStorage.setItem(`orders_${user.id}`, JSON.stringify(updatedOrders))
    }

    return newOrder
  }

  const updatePaymentMethod = (method) => {
    setPaymentMethod(method)
    if (user) {
      localStorage.setItem(`paymentMethod_${user.id}`, JSON.stringify(method))
    }
  }

  return (
    <UserContext.Provider
      value={{
        user,
        isAuthenticated,
        addresses,
        selectedAddress,
        setSelectedAddress,
        paymentMethod,
        setPaymentMethod: updatePaymentMethod,
        orders,
        login,
        logout,
        addAddress,
        updateAddress,
        deleteAddress,
        addOrder,
        saveUserData,
      }}
    >
      {children}
    </UserContext.Provider>
  )
}

export const useUser = () => {
  const context = useContext(UserContext)
  if (!context) {
    throw new Error("useUser must be used within a UserProvider")
  }
  return context
}
