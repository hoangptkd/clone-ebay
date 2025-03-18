"use client"
import { Link } from "react-router-dom"
import { Heart } from "lucide-react"

const ProductCard = ({ product }) => {
  return (
    <div className="card h-100 position-relative">
      <button
        className="btn position-absolute end-0 top-0 m-2 p-1 bg-white rounded-circle"
        style={{ zIndex: 1 }}
        onClick={(e) => {
          e.preventDefault()
          alert("Added to watchlist!")
        }}
      >
        <Heart size={20} />
      </button>

      <Link to={`/product/${product.id}`} className="text-decoration-none text-dark">
        <img
          src={product.image || "/placeholder.svg?height=300&width=300"}
          className="card-img-top"
          alt={product.title}
          style={{ height: "200px", objectFit: "cover" }}
        />

        <div className="card-body">
          <h5 className="card-title text-truncate">{product.title}</h5>
          <p className="card-text text-muted small mb-1">
            {product.condition} {product.seller && `· ${product.seller}`}
          </p>

          <div className="fw-bold fs-5 mb-2">
            {product.price.toLocaleString()} {product.currency || "VND"}
          </div>

          {product.buyItNow && <div className="small mb-1">Buy It Now</div>}

          <div className="small text-muted">
            +{(product.shippingCost || 0).toLocaleString()} {product.currency || "VND"} delivery
          </div>

          {product.location && <div className="small text-muted mt-1">from {product.location}</div>}
        </div>
      </Link>
    </div>
  )
}

export default ProductCard

