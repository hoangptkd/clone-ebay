"use client"

import { useContext } from "react"
import { Link } from "react-router-dom"
import { Trash2, Clock } from "lucide-react"
import { WatchlistContext } from "../contexts/WatchlistContext"
import { CartContext } from "../contexts/CartContext"

const Watchlist = () => {
  const { watchlistItems, removeFromWatchlist, clearWatchlist } = useContext(WatchlistContext)
  const { addToCart } = useContext(CartContext)

  const handleAddToCart = (product) => {
    addToCart(product)
    // Optionally remove from watchlist after adding to cart
    // removeFromWatchlist(product.id);
  }

  if (watchlistItems.length === 0) {
    return (
      <div className="container py-5">
        <div className="text-center py-5">
          <h2 className="mb-4">Your Watchlist is Empty</h2>
          <p className="mb-4">Save items you're interested in by clicking the heart icon on product pages.</p>
          <Link to="/" className="btn btn-primary">
            Browse Products
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="container py-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1>Watchlist</h1>
        <button
          className="btn btn-outline-danger"
          onClick={() => {
            if (window.confirm("Are you sure you want to clear your watchlist?")) {
              clearWatchlist()
            }
          }}
        >
          Clear Watchlist
        </button>
      </div>

      <div className="row">
        {watchlistItems.map((item) => (
          <div key={item.id} className="col-md-6 col-lg-4 mb-4">
            <div className="card h-100">
              <div className="position-relative">
                <Link to={`/product/${item.id}`}>
                  <img
                    src={item.image || "/placeholder.svg?height=200&width=200"}
                    alt={item.title}
                    className="card-img-top"
                    style={{ height: "200px", objectFit: "cover" }}
                  />
                </Link>
                <button
                  className="btn btn-sm btn-danger position-absolute top-0 end-0 m-2"
                  onClick={() => removeFromWatchlist(item.id)}
                >
                  <Trash2 size={16} />
                </button>
              </div>

              <div className="card-body d-flex flex-column">
                <h5 className="card-title">
                  <Link to={`/product/${item.id}`} className="text-decoration-none text-dark">
                    {item.title}
                  </Link>
                </h5>

                <p className="card-text text-muted small mb-1">
                  {item.condition} {item.seller && `· ${item.seller}`}
                </p>

                <div className="fw-bold fs-5 mb-2">
                  {item.price.toLocaleString()} {item.currency || "VND"}
                </div>

                {item.buyItNow ? (
                  <div className="small mb-1">Buy It Now</div>
                ) : (
                  <div className="small mb-1">Auction</div>
                )}

                <div className="small text-muted mb-3">
                  +{(item.shippingCost || 0).toLocaleString()} {item.currency || "VND"} delivery
                </div>

                <div className="d-flex align-items-center text-muted small mb-3 mt-auto">
                  <Clock size={14} className="me-1" />
                  Added {new Date(item.addedAt).toLocaleDateString()}
                </div>

                <div className="d-grid gap-2">
                  <button className="btn btn-primary" onClick={() => handleAddToCart(item)}>
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Watchlist

