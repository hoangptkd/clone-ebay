"use client"

import { createContext, useState, useEffect, useContext } from "react"
import { AuthContext } from "./AuthContext"

export const CartContext = createContext()

export const CartProvider = ({ children }) => {
  const { currentUser } = useContext(AuthContext)
  const [cartItems, setCartItems] = useState([])
  const [loading, setLoading] = useState(true)

  // Load cart from localStorage when component mounts or user changes
  useEffect(() => {
    const loadCart = () => {
      if (currentUser) {
        const storedCart = localStorage.getItem(`ebayCart_${currentUser.id}`)
        if (storedCart) {
          setCartItems(JSON.parse(storedCart))
        } else {
          setCartItems([])
        }
      } else {
        // For non-logged in users, use a generic cart
        const storedCart = localStorage.getItem("ebayCart_guest")
        if (storedCart) {
          setCartItems(JSON.parse(storedCart))
        } else {
          setCartItems([])
        }
      }
      setLoading(false)
    }

    loadCart()
  }, [currentUser])

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    if (!loading) {
      if (currentUser) {
        localStorage.setItem(`ebayCart_${currentUser.id}`, JSON.stringify(cartItems))
      } else {
        localStorage.setItem("ebayCart_guest", JSON.stringify(cartItems))
      }
    }
  }, [cartItems, currentUser, loading])

  const addToCart = (product, quantity = 1) => {
    setCartItems((prevItems) => {
      // Check if item already exists in cart
      const existingItemIndex = prevItems.findIndex((item) => item.id === product.id)

      if (existingItemIndex >= 0) {
        // Update quantity of existing item
        const updatedItems = [...prevItems]
        updatedItems[existingItemIndex] = {
          ...updatedItems[existingItemIndex],
          quantity: updatedItems[existingItemIndex].quantity + quantity,
        }
        return updatedItems
      } else {
        // Add new item to cart
        return [...prevItems, { ...product, quantity }]
      }
    })
  }

  const updateQuantity = (productId, quantity) => {
    if (quantity <= 0) {
      removeFromCart(productId)
      return
    }

    setCartItems((prevItems) => prevItems.map((item) => (item.id === productId ? { ...item, quantity } : item)))
  }

  const removeFromCart = (productId) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== productId))
  }

  const clearCart = () => {
    setCartItems([])
  }

  const getCartTotal = () => {
    return cartItems.reduce((total, item) => {
      return total + item.price * item.quantity
    }, 0)
  }

  const getCartCount = () => {
    return cartItems.reduce((count, item) => count + item.quantity, 0)
  }

  const value = {
    cartItems,
    addToCart,
    updateQuantity,
    removeFromCart,
    clearCart,
    getCartTotal,
    getCartCount,
    loading,
  }

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

