"use client"

import { useContext } from "react"
import { Link, useNavigate } from "react-router-dom"
import { Trash2, Plus, Minus } from "lucide-react"
import { CartContext } from "../contexts/CartContext"
import { AuthContext } from "../contexts/AuthContext"

const Cart = () => {
  const { cartItems, updateQuantity, removeFromCart, getCartTotal, clearCart } = useContext(CartContext)
  const { currentUser } = useContext(AuthContext)
  const navigate = useNavigate()

  const handleCheckout = () => {
    if (!currentUser) {
      navigate("/login", { state: { from: { pathname: "/checkout" } } })
    } else {
      navigate("/checkout")
    }
  }

  if (cartItems.length === 0) {
    return (
      <div className="container py-5">
        <div className="text-center py-5">
          <h2 className="mb-4">Your Shopping Cart is Empty</h2>
          <p className="mb-4">Looks like you haven't added anything to your cart yet.</p>
          <Link to="/" className="btn btn-primary">
            Continue Shopping
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="container py-5">
      <h1 className="mb-4">Shopping Cart</h1>

      <div className="row">
        <div className="col-lg-8">
          <div className="card mb-4">
            <div className="card-header bg-white">
              <div className="row">
                <div className="col-md-6">
                  <h5 className="mb-0">Cart Items ({cartItems.length})</h5>
                </div>
                <div className="col-md-6 text-end">
                  <button
                    className="btn btn-outline-danger btn-sm"
                    onClick={() => {
                      if (window.confirm("Are you sure you want to empty your cart?")) {
                        clearCart()
                      }
                    }}
                  >
                    Empty Cart
                  </button>
                </div>
              </div>
            </div>
            <div className="card-body">
              {cartItems.map((item) => (
                <div key={item.id} className="row mb-4 border-bottom pb-4">
                  <div className="col-md-2 col-4">
                    <img
                      src={item.image || "/placeholder.svg?height=100&width=100"}
                      alt={item.title}
                      className="img-fluid rounded"
                    />
                  </div>
                  <div className="col-md-5 col-8">
                    <h5 className="product-title">
                      <Link to={`/product/${item.id}`} className="text-decoration-none text-dark">
                        {item.title}
                      </Link>
                    </h5>
                    <p className="text-muted small mb-0">
                      {item.condition} {item.seller && `· ${item.seller}`}
                    </p>
                    {item.location && <p className="text-muted small mb-0">From: {item.location}</p>}
                  </div>
                  <div className="col-md-2 col-4 mt-3 mt-md-0">
                    <div className="d-flex align-items-center">
                      <button
                        className="btn btn-outline-secondary btn-sm"
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        disabled={item.quantity <= 1}
                      >
                        <Minus size={16} />
                      </button>
                      <input
                        type="number"
                        className="form-control form-control-sm mx-2 text-center"
                        value={item.quantity}
                        onChange={(e) => {
                          const value = Number.parseInt(e.target.value)
                          if (!isNaN(value) && value > 0) {
                            updateQuantity(item.id, value)
                          }
                        }}
                        min="1"
                        style={{ width: "60px" }}
                      />
                      <button
                        className="btn btn-outline-secondary btn-sm"
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      >
                        <Plus size={16} />
                      </button>
                    </div>
                  </div>
                  <div className="col-md-2 col-4 mt-3 mt-md-0 text-end">
                    <div className="fw-bold">
                      {(item.price * item.quantity).toLocaleString()} {item.currency || "VND"}
                    </div>
                    <div className="text-muted small">
                      {item.price.toLocaleString()} {item.currency || "VND"} each
                    </div>
                  </div>
                  <div className="col-md-1 col-4 mt-3 mt-md-0 text-end">
                    <button className="btn btn-outline-danger btn-sm" onClick={() => removeFromCart(item.id)}>
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="col-lg-4">
          <div className="card">
            <div className="card-header bg-white">
              <h5 className="mb-0">Order Summary</h5>
            </div>
            <div className="card-body">
              <div className="d-flex justify-content-between mb-2">
                <span>Subtotal</span>
                <span>{getCartTotal().toLocaleString()} VND</span>
              </div>
              <div className="d-flex justify-content-between mb-2">
                <span>Shipping</span>
                <span>Calculated at checkout</span>
              </div>
              <div className="d-flex justify-content-between mb-2">
                <span>Tax</span>
                <span>Calculated at checkout</span>
              </div>
              <hr />
              <div className="d-flex justify-content-between mb-4">
                <span className="fw-bold">Estimated Total</span>
                <span className="fw-bold">{getCartTotal().toLocaleString()} VND</span>
              </div>

              <button className="btn btn-primary w-100 mb-3" onClick={handleCheckout}>
                Proceed to Checkout
              </button>

              <Link to="/" className="btn btn-outline-secondary w-100">
                Continue Shopping
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Cart

