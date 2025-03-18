"use client"

import { createContext, useState, useEffect } from "react"

export const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Check if user is logged in from localStorage
    const storedUser = localStorage.getItem("ebayUser")
    if (storedUser) {
      setCurrentUser(JSON.parse(storedUser))
    }
    setLoading(false)
  }, [])

  const login = async (email, password) => {
    try {
      // In a real app, this would be an API call
      const response = await fetch("/database.json")
      const data = await response.json()

      const user = data.users.find((user) => user.email === email && user.password === password)

      if (user) {
        // Remove password before storing
        const { password, ...userWithoutPassword } = user
        setCurrentUser(userWithoutPassword)
        localStorage.setItem("ebayUser", JSON.stringify(userWithoutPassword))
        return { success: true, user: userWithoutPassword }
      } else {
        return { success: false, error: "Invalid email or password" }
      }
    } catch (error) {
      console.error("Login error:", error)
      return { success: false, error: "An error occurred during login" }
    }
  }

  const register = async (userData) => {
    try {
      // In a real app, this would be an API call
      // For this demo, we'll simulate a successful registration
      const newUser = {
        id: Date.now(), // Generate a unique ID
        ...userData,
        createdAt: new Date().toISOString(),
      }

      // Remove password before storing in state
      const { password, ...userWithoutPassword } = newUser
      setCurrentUser(userWithoutPassword)
      localStorage.setItem("ebayUser", JSON.stringify(userWithoutPassword))

      // In a real app, we would save this to the database
      return { success: true, user: userWithoutPassword }
    } catch (error) {
      console.error("Registration error:", error)
      return { success: false, error: "An error occurred during registration" }
    }
  }

  const logout = () => {
    setCurrentUser(null)
    localStorage.removeItem("ebayUser")
  }

  const updateProfile = (updatedData) => {
    const updatedUser = { ...currentUser, ...updatedData }
    setCurrentUser(updatedUser)
    localStorage.setItem("ebayUser", JSON.stringify(updatedUser))
    return { success: true, user: updatedUser }
  }

  const value = {
    currentUser,
    login,
    register,
    logout,
    updateProfile,
    loading,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

