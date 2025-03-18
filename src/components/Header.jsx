"use client"

import { useState, useContext } from "react"
import { Link, useNavigate } from "react-router-dom"
import { Search, Bell, ShoppingCart, ChevronDown, User, Heart, Package, MessageSquare, LogOut } from "lucide-react"
import { AuthContext } from "../contexts/AuthContext"
import { CartContext } from "../contexts/CartContext"
import { WatchlistContext } from "../contexts/WatchlistContext"

const Header = () => {
  const [searchQuery, setSearchQuery] = useState("")
  const [showUserDropdown, setShowUserDropdown] = useState(false)
  const [showCategoryDropdown, setShowCategoryDropdown] = useState(false)
  const navigate = useNavigate()

  const { currentUser, logout } = useContext(AuthContext)
  const { getCartCount } = useContext(CartContext)
  const { watchlistItems } = useContext(WatchlistContext)

  const handleSearch = (e) => {
    e.preventDefault()
    navigate(`/search?q=${searchQuery}`)
  }

  const handleLogout = () => {
    logout()
    navigate("/")
  }

  const toggleUserDropdown = () => {
    setShowUserDropdown(!showUserDropdown)
  }

  const toggleCategoryDropdown = () => {
    setShowCategoryDropdown(!showCategoryDropdown)
  }

  return (
    <header>
      <div className="top-header py-2 px-3 d-flex justify-content-between align-items-center border-bottom">
        <div className="d-flex gap-3">
          {currentUser ? (
            <span>Hi, {currentUser.firstName}!</span>
          ) : (
            <span>
              Hi!{" "}
              <Link to="/login" className="text-decoration-none">
                Sign in
              </Link>{" "}
              or{" "}
              <Link to="/register" className="text-decoration-none">
                register
              </Link>
            </span>
          )}
          <Link to="/deals" className="text-decoration-none">
            Daily Deals
          </Link>
          <Link to="/brand-outlet" className="text-decoration-none">
            Brand Outlet
          </Link>
          <Link to="/gift-cards" className="text-decoration-none">
            Gift Cards
          </Link>
          <Link to="/help" className="text-decoration-none">
            Help & Contact
          </Link>
        </div>
        <div className="d-flex gap-3 align-items-center">
          <Link to="/ship" className="text-decoration-none">
            Ship to
          </Link>
          <Link to="/seller-dashboard" className="text-decoration-none">
            Sell
          </Link>
          <div className="dropdown">
            <span className="d-flex align-items-center" role="button" onClick={() => navigate("/watchlist")}>
              Watchlist
              {watchlistItems.length > 0 && (
                <span className="badge bg-primary rounded-pill ms-1">{watchlistItems.length}</span>
              )}
              <ChevronDown size={16} />
            </span>
          </div>
          <div className="dropdown position-relative">
            <span className="d-flex align-items-center" role="button" onClick={toggleUserDropdown}>
              My eBay <ChevronDown size={16} />
            </span>

            {showUserDropdown && (
              <div
                className="position-absolute bg-white border rounded shadow-sm py-2 mt-1"
                style={{ right: 0, zIndex: 1000, minWidth: "200px" }}
              >
                {currentUser ? (
                  <>
                    <Link to="/profile" className="dropdown-item d-flex align-items-center">
                      <User size={16} className="me-2" /> My Profile
                    </Link>
                    <Link to="/watchlist" className="dropdown-item d-flex align-items-center">
                      <Heart size={16} className="me-2" /> Watchlist
                    </Link>
                    <Link to="/purchase-history" className="dropdown-item d-flex align-items-center">
                      <Package size={16} className="me-2" /> Purchase History
                    </Link>
                    <Link to="/messages" className="dropdown-item d-flex align-items-center">
                      <MessageSquare size={16} className="me-2" /> Messages
                    </Link>
                    <div className="dropdown-divider"></div>
                    <button className="dropdown-item d-flex align-items-center text-danger" onClick={handleLogout}>
                      <LogOut size={16} className="me-2" /> Sign Out
                    </button>
                  </>
                ) : (
                  <>
                    <Link to="/login" className="dropdown-item">
                      Sign In
                    </Link>
                    <Link to="/register" className="dropdown-item">
                      Register
                    </Link>
                  </>
                )}
              </div>
            )}
          </div>
          <Link to="/notifications" className="text-decoration-none position-relative">
            <Bell size={20} />
            <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">2</span>
          </Link>
          <Link to="/cart" className="text-decoration-none position-relative">
            <ShoppingCart size={20} />
            {getCartCount() > 0 && (
              <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                {getCartCount()}
              </span>
            )}
          </Link>
        </div>
      </div>

      <div className="main-header py-2 px-3 d-flex align-items-center">
        <Link to="/" className="me-4">
          <img src="/ebay-logo.png" alt="eBay Logo" className="logo" style={{ width: "120px" }} />
        </Link>

        <div className="dropdown me-2 position-relative">
          <button className="btn btn-light dropdown-toggle" type="button" onClick={toggleCategoryDropdown}>
            Shop by category
          </button>

          {showCategoryDropdown && (
            <div
              className="position-absolute bg-white border rounded shadow-sm py-2 mt-1"
              style={{ left: 0, zIndex: 1000, minWidth: "200px" }}
            >
              <Link to="/category/1" className="dropdown-item">
                Clothing & Accessories
              </Link>
              <Link to="/category/2" className="dropdown-item">
                Electronics
              </Link>
              <Link to="/category/3" className="dropdown-item">
                Home & Garden
              </Link>
              <Link to="/category/4" className="dropdown-item">
                Collectibles & Art
              </Link>
              <Link to="/category/5" className="dropdown-item">
                Sports
              </Link>
              <Link to="/category/6" className="dropdown-item">
                Toys
              </Link>
              <Link to="/category/7" className="dropdown-item">
                Motors
              </Link>
              <div className="dropdown-divider"></div>
              <Link to="/categories" className="dropdown-item">
                All Categories
              </Link>
            </div>
          )}
        </div>

        <form onSubmit={handleSearch} className="search-form d-flex flex-grow-1">
          <div className="input-group">
            <div className="input-group-prepend">
              <span className="input-group-text bg-white border-end-0">
                <Search size={18} />
              </span>
            </div>
            <input
              type="text"
              className="form-control border-start-0"
              placeholder="Search for anything"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <select className="form-select" style={{ maxWidth: "200px" }}>
              <option>All Categories</option>
              <option>Fashion</option>
              <option>Electronics</option>
              <option>Home & Garden</option>
              <option>Sports</option>
              <option>Toys</option>
              <option>Motors</option>
            </select>
            <button className="btn btn-primary" type="submit">
              Search
            </button>
          </div>
        </form>
        <Link to="/advanced" className="ms-2 text-decoration-none">
          Advanced
        </Link>
      </div>

      <nav className="category-nav border-top border-bottom py-2 px-3">
        <ul className="list-unstyled d-flex gap-4 m-0 overflow-auto">
          <li>
            <Link to="/explore" className="text-decoration-none">
              Explore (New!)
            </Link>
          </li>
          <li>
            <Link to="/saved" className="text-decoration-none">
              Saved
            </Link>
          </li>
          <li>
            <Link to="/category/2" className="text-decoration-none">
              Electronics
            </Link>
          </li>
          <li>
            <Link to="/category/7" className="text-decoration-none">
              Motors
            </Link>
          </li>
          <li>
            <Link to="/category/1" className="text-decoration-none">
              Fashion
            </Link>
          </li>
          <li>
            <Link to="/category/4" className="text-decoration-none">
              Collectibles and Art
            </Link>
          </li>
          <li>
            <Link to="/category/5" className="text-decoration-none">
              Sports
            </Link>
          </li>
          <li>
            <Link to="/category/8" className="text-decoration-none">
              Health & Beauty
            </Link>
          </li>
          <li>
            <Link to="/category/9" className="text-decoration-none">
              Industrial equipment
            </Link>
          </li>
          <li>
            <Link to="/category/3" className="text-decoration-none">
              Home & Garden
            </Link>
          </li>
          <li>
            <Link to="/deals" className="text-decoration-none">
              Deals
            </Link>
          </li>
          <li>
            <Link to="/seller-dashboard" className="text-decoration-none">
              Sell
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  )
}

export default Header

