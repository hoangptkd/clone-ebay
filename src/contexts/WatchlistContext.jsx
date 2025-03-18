"use client"

import { createContext, useState, useEffect, useContext } from "react"
import { AuthContext } from "./AuthContext"

export const WatchlistContext = createContext()

export const WatchlistProvider = ({ children }) => {
  const { currentUser } = useContext(AuthContext)
  const [watchlistItems, setWatchlistItems] = useState([])
  const [loading, setLoading] = useState(true)

  // Load watchlist from localStorage when component mounts or user changes
  useEffect(() => {
    const loadWatchlist = () => {
      if (currentUser) {
        const storedWatchlist = localStorage.getItem(`ebayWatchlist_${currentUser.id}`)
        if (storedWatchlist) {
          setWatchlistItems(JSON.parse(storedWatchlist))
        } else {
          setWatchlistItems([])
        }
      } else {
        // For non-logged in users, use a generic watchlist
        const storedWatchlist = localStorage.getItem("ebayWatchlist_guest")
        if (storedWatchlist) {
          setWatchlistItems(JSON.parse(storedWatchlist))
        } else {
          setWatchlistItems([])
        }
      }
      setLoading(false)
    }

    loadWatchlist()
  }, [currentUser])

  // Save watchlist to localStorage whenever it changes
  useEffect(() => {
    if (!loading) {
      if (currentUser) {
        localStorage.setItem(`ebayWatchlist_${currentUser.id}`, JSON.stringify(watchlistItems))
      } else {
        localStorage.setItem("ebayWatchlist_guest", JSON.stringify(watchlistItems))
      }
    }
  }, [watchlistItems, currentUser, loading])

  const addToWatchlist = (product) => {
    setWatchlistItems((prevItems) => {
      // Check if item already exists in watchlist
      const existingItem = prevItems.find((item) => item.id === product.id)

      if (existingItem) {
        // Item already in watchlist, don't add it again
        return prevItems
      } else {
        // Add new item to watchlist
        return [...prevItems, { ...product, addedAt: new Date().toISOString() }]
      }
    })
  }

  const removeFromWatchlist = (productId) => {
    setWatchlistItems((prevItems) => prevItems.filter((item) => item.id !== productId))
  }

  const clearWatchlist = () => {
    setWatchlistItems([])
  }

  const isInWatchlist = (productId) => {
    return watchlistItems.some((item) => item.id === productId)
  }

  const value = {
    watchlistItems,
    addToWatchlist,
    removeFromWatchlist,
    clearWatchlist,
    isInWatchlist,
    loading,
  }

  return <WatchlistContext.Provider value={value}>{children}</WatchlistContext.Provider>
}

