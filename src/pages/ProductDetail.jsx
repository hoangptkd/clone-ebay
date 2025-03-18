"use client"

import { useState, useEffect } from "react"
import { useParams, Link } from "react-router-dom"
import { Heart, ChevronLeft, ChevronRight } from "lucide-react"

const ProductDetail = () => {
  const { id } = useParams()
  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)
  const [currentImage, setCurrentImage] = useState(0)
  const [quantity, setQuantity] = useState(1)

  useEffect(() => {
    // Fetch product details from database.json
    fetch("/database.json")
      .then((response) => response.json())
      .then((data) => {
        const foundProduct = data.products.find((p) => p.id.toString() === id)
        setProduct(foundProduct || null)
        setLoading(false)
      })
      .catch((error) => {
        console.error("Error fetching product:", error)
        setLoading(false)
      })
  }, [id])

  const handlePrevImage = () => {
    if (!product || !product.images) return
    setCurrentImage((prev) => (prev - 1 + product.images.length) % product.images.length)
  }

  const handleNextImage = () => {
    if (!product || !product.images) return
    setCurrentImage((prev) => (prev + 1) % product.images.length)
  }

  const handleAddToCart = () => {
    alert(`Added ${quantity} item(s) to cart!`)
  }

  const handleAddToWatchlist = () => {
    alert("Added to watchlist!")
  }

  if (loading) {
    return (
      <div className="container py-5 text-center">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    )
  }

  if (!product) {
    return (
      <div className="container py-5 text-center">
        <h2>Product not found</h2>
        <p>The product you're looking for doesn't exist or has been removed.</p>
        <Link to="/" className="btn btn-primary">
          Back to Home
        </Link>
      </div>
    )
  }

  // Use placeholder images if product doesn't have images
  const images = product.images || [
    "/placeholder.svg?height=600&width=600",
    "/placeholder.svg?height=600&width=600&text=Image+2",
    "/placeholder.svg?height=600&width=600&text=Image+3",
    "/placeholder.svg?height=600&width=600&text=Image+4",
  ]

  return (
    <div className="product-detail container py-4">
      <div className="row">
        {/* Product Images */}
        <div className="col-md-6 mb-4">
          <div className="position-relative">
            <div className="main-image-container border rounded overflow-hidden" style={{ height: "400px" }}>
              <img
                src={images[currentImage] || "/placeholder.svg"}
                alt={product.title}
                className="w-100 h-100 object-fit-contain"
              />
            </div>

            {images.length > 1 && (
              <>
                <button
                  className="position-absolute top-50 start-0 translate-middle-y bg-white rounded-circle p-2 border-0 shadow-sm ms-2"
                  onClick={handlePrevImage}
                >
                  <ChevronLeft size={20} />
                </button>
                <button
                  className="position-absolute top-50 end-0 translate-middle-y bg-white rounded-circle p-2 border-0 shadow-sm me-2"
                  onClick={handleNextImage}
                >
                  <ChevronRight size={20} />
                </button>
              </>
            )}
          </div>

          {/* Thumbnails */}
          <div className="d-flex mt-3 overflow-auto thumbnail-container">
            {images.map((img, index) => (
              <div
                key={index}
                className={`thumbnail-item me-2 border ${currentImage === index ? "border-primary" : ""}`}
                style={{ width: "80px", height: "80px", cursor: "pointer" }}
                onClick={() => setCurrentImage(index)}
              >
                <img
                  src={img || "/placeholder.svg"}
                  alt={`Thumbnail ${index + 1}`}
                  className="w-100 h-100 object-fit-cover"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Product Info */}
        <div className="col-md-6">
          <h1 className="h3 mb-3">{product.title}</h1>

          <div className="d-flex align-items-center mb-3">
            <span className="text-muted me-3">Condition: {product.condition || "New"}</span>
            {product.seller && <span className="text-muted">Seller: {product.seller}</span>}
          </div>

          <div className="price-container mb-4">
            <h2 className="h3 fw-bold">
              {product.price.toLocaleString()} {product.currency || "VND"}
            </h2>
            {product.originalPrice && (
              <div className="text-muted text-decoration-line-through">
                {product.originalPrice.toLocaleString()} {product.currency || "VND"}
              </div>
            )}
            {product.discount && <div className="text-success">{product.discount}% off</div>}
          </div>

          <div className="shipping-info mb-4">
            <div className="mb-2">
              <span className="fw-bold">Shipping: </span>
              <span>
                {(product.shippingCost || 0).toLocaleString()} {product.currency || "VND"}
              </span>
            </div>
            {product.location && (
              <div className="mb-2">
                <span className="fw-bold">From: </span>
                <span>{product.location}</span>
              </div>
            )}
            {product.deliveryDate && (
              <div>
                <span className="fw-bold">Delivery: </span>
                <span>{product.deliveryDate}</span>
              </div>
            )}
          </div>

          <div className="purchase-options mb-4">
            <div className="mb-3">
              <label htmlFor="quantity" className="form-label fw-bold">
                Quantity
              </label>
              <select
                id="quantity"
                className="form-select"
                style={{ width: "100px" }}
                value={quantity}
                onChange={(e) => setQuantity(Number.parseInt(e.target.value))}
              >
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                  <option key={num} value={num}>
                    {num}
                  </option>
                ))}
              </select>
            </div>

            <div className="d-grid gap-2">
              <button className="btn btn-primary btn-lg" onClick={handleAddToCart}>
                Add to cart
              </button>
              <button
                className="btn btn-outline-secondary btn-lg d-flex align-items-center justify-content-center"
                onClick={handleAddToWatchlist}
              >
                <Heart size={20} className="me-2" />
                Add to watchlist
              </button>
            </div>
          </div>

          <div className="product-description mt-4">
            <h4>Description</h4>
            <p>{product.description || "No description available for this product."}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductDetail

