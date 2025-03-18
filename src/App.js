"use client"

import { useState, useEffect } from "react"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"

import "./App.css"
import Header from "./components/Header"
import Footer from "./components/Footer"
import HomePage from "./pages/HomePage"
import SearchResults from "./pages/SearchResults"
import ProductDetail from "./pages/ProductDetail"
import Login from "./pages/Login"
import Register from "./pages/Register"
import Cart from "./pages/Cart"
import Checkout from "./pages/Checkout"
import UserProfile from "./pages/UserProfile"
import Watchlist from "./pages/Watchlist"
import PurchaseHistory from "./pages/PurchaseHistory"
import SellerDashboard from "./pages/SellerDashboard"
import CreateListing from "./pages/CreateListing"
import Messages from "./pages/Messages"
import CategoryPage from "./pages/CategoryPage"
import { AuthProvider } from "./contexts/AuthContext"
import { CartProvider } from "./contexts/CartContext"
import { WatchlistProvider } from "./contexts/WatchlistContext"
import ProtectedRoute from "./components/ProtectedRoute"

function App() {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Simulate loading app resources
    setTimeout(() => {
      setIsLoading(false)
    }, 1000)
  }, [])

  if (isLoading) {
    return (
      <div className="loading-screen d-flex justify-content-center align-items-center vh-100">
        <div className="text-center">
          <div className="spinner-border text-primary mb-3" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <h3>Loading eBay Clone...</h3>
        </div>
      </div>
    )
  }

  return (
    <AuthProvider>
      <CartProvider>
        <WatchlistProvider>
          <Router>
            <div className="App d-flex flex-column min-vh-100">
              <Header />
              <main className="flex-grow-1">
                <Routes>
                  <Route path="/" element={<HomePage />} />
                  <Route path="/search" element={<SearchResults />} />
                  <Route path="/category/:categoryId" element={<CategoryPage />} />
                  <Route path="/product/:id" element={<ProductDetail />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/register" element={<Register />} />
                  <Route path="/cart" element={<Cart />} />
                  <Route
                    path="/checkout"
                    element={
                      <ProtectedRoute>
                        <Checkout />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/profile"
                    element={
                      <ProtectedRoute>
                        <UserProfile />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/watchlist"
                    element={
                      <ProtectedRoute>
                        <Watchlist />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/purchase-history"
                    element={
                      <ProtectedRoute>
                        <PurchaseHistory />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/seller-dashboard"
                    element={
                      <ProtectedRoute>
                        <SellerDashboard />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/create-listing"
                    element={
                      <ProtectedRoute>
                        <CreateListing />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/messages"
                    element={
                      <ProtectedRoute>
                        <Messages />
                      </ProtectedRoute>
                    }
                  />
                </Routes>
              </main>
              <Footer />
            </div>
          </Router>
        </WatchlistProvider>
      </CartProvider>
    </AuthProvider>
  )
}

export default App

