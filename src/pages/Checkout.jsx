"use client"

import { useState, useContext } from "react"
import { useNavigate } from "react-router-dom"
import { CartContext } from "../contexts/CartContext"
import { AuthContext } from "../contexts/AuthContext"

const Checkout = () => {
  const { cartItems, getCartTotal, clearCart } = useContext(CartContext)
  const { currentUser } = useContext(AuthContext)
  const navigate = useNavigate()

  const [formData, setFormData] = useState({
    shippingAddress: currentUser?.address || "",
    shippingCity: currentUser?.city || "",
    shippingState: currentUser?.state || "",
    shippingZip: currentUser?.zipCode || "",
    shippingCountry: currentUser?.country || "US",
    sameAsBilling: true,
    billingAddress: currentUser?.address || "",
    billingCity: currentUser?.city || "",
    billingState: currentUser?.state || "",
    billingZip: currentUser?.zipCode || "",
    billingCountry: currentUser?.country || "US",
    cardName: "",
    cardNumber: "",
    cardExpiry: "",
    cardCvv: "",
    paymentMethod: "credit-card",
  })

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target

    if (name === "sameAsBilling" && checked) {
      setFormData((prev) => ({
        ...prev,
        [name]: checked,
        billingAddress: prev.shippingAddress,
        billingCity: prev.shippingCity,
        billingState: prev.shippingState,
        billingZip: prev.shippingZip,
        billingCountry: prev.shippingCountry,
      }))
    } else if (name === "sameAsBilling" && !checked) {
      setFormData((prev) => ({
        ...prev,
        [name]: checked,
      }))
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: type === "checkbox" ? checked : value,
      }))

      // Update billing info if "same as shipping" is checked
      if (name.startsWith("shipping") && formData.sameAsBilling) {
        const billingField = name.replace("shipping", "billing")
        setFormData((prev) => ({
          ...prev,
          [billingField]: value,
        }))
      }
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (cartItems.length === 0) {
      setError("Your cart is empty")
      return
    }

    try {
      setError("")
      setLoading(true)

      // Simulate payment processing
      await new Promise((resolve) => setTimeout(resolve, 2000))

      // Create order in database (simulated)
      const order = {
        id: `ORD-${Date.now()}`,
        userId: currentUser.id,
        items: cartItems,
        total: getCartTotal(),
        shippingAddress: {
          address: formData.shippingAddress,
          city: formData.shippingCity,
          state: formData.shippingState,
          zip: formData.shippingZip,
          country: formData.shippingCountry,
        },
        billingAddress: {
          address: formData.billingAddress,
          city: formData.billingCity,
          state: formData.billingState,
          zip: formData.billingZip,
          country: formData.billingCountry,
        },
        paymentMethod: formData.paymentMethod,
        status: "paid",
        createdAt: new Date().toISOString(),
      }

      // Clear cart after successful order
      clearCart()

      // Navigate to order confirmation page
      navigate("/purchase-history", {
        state: {
          orderSuccess: true,
          orderId: order.id,
        },
      })
    } catch (error) {
      setError("Payment processing failed. Please try again.")
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  // Calculate shipping cost (simplified)
  const shippingCost = 150000 // Fixed shipping cost
  const taxRate = 0.1 // 10% tax
  const subtotal = getCartTotal()
  const tax = subtotal * taxRate
  const total = subtotal + shippingCost + tax

  return (
    <div className="container py-5">
      <h1 className="mb-4">Checkout</h1>

      {error && (
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      )}

      <div className="row">
        <div className="col-lg-8">
          <form onSubmit={handleSubmit}>
            <div className="card mb-4">
              <div className="card-header bg-white">
                <h5 className="mb-0">Shipping Information</h5>
              </div>
              <div className="card-body">
                <div className="mb-3">
                  <label htmlFor="shippingAddress" className="form-label">
                    Address
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="shippingAddress"
                    name="shippingAddress"
                    value={formData.shippingAddress}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="row">
                  <div className="col-md-4 mb-3">
                    <label htmlFor="shippingCity" className="form-label">
                      City
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="shippingCity"
                      name="shippingCity"
                      value={formData.shippingCity}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="col-md-4 mb-3">
                    <label htmlFor="shippingState" className="form-label">
                      State/Province
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="shippingState"
                      name="shippingState"
                      value={formData.shippingState}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="col-md-4 mb-3">
                    <label htmlFor="shippingZip" className="form-label">
                      Zip/Postal Code
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="shippingZip"
                      name="shippingZip"
                      value={formData.shippingZip}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>

                <div className="mb-3">
                  <label htmlFor="shippingCountry" className="form-label">
                    Country
                  </label>
                  <select
                    className="form-select"
                    id="shippingCountry"
                    name="shippingCountry"
                    value={formData.shippingCountry}
                    onChange={handleChange}
                    required
                  >
                    <option value="US">United States</option>
                    <option value="CA">Canada</option>
                    <option value="UK">United Kingdom</option>
                    <option value="AU">Australia</option>
                    <option value="VN">Vietnam</option>
                    <option value="OTHER">Other</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="card mb-4">
              <div className="card-header bg-white d-flex justify-content-between align-items-center">
                <h5 className="mb-0">Billing Information</h5>
                <div className="form-check">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    id="sameAsBilling"
                    name="sameAsBilling"
                    checked={formData.sameAsBilling}
                    onChange={handleChange}
                  />
                  <label className="form-check-label" htmlFor="sameAsBilling">
                    Same as shipping address
                  </label>
                </div>
              </div>

              {!formData.sameAsBilling && (
                <div className="card-body">
                  <div className="mb-3">
                    <label htmlFor="billingAddress" className="form-label">
                      Address
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="billingAddress"
                      name="billingAddress"
                      value={formData.billingAddress}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="row">
                    <div className="col-md-4 mb-3">
                      <label htmlFor="billingCity" className="form-label">
                        City
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="billingCity"
                        name="billingCity"
                        value={formData.billingCity}
                        onChange={handleChange}
                        required
                      />
                    </div>

                    <div className="col-md-4 mb-3">
                      <label htmlFor="billingState" className="form-label">
                        State/Province
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="billingState"
                        name="billingState"
                        value={formData.billingState}
                        onChange={handleChange}
                        required
                      />
                    </div>

                    <div className="col-md-4 mb-3">
                      <label htmlFor="billingZip" className="form-label">
                        Zip/Postal Code
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="billingZip"
                        name="billingZip"
                        value={formData.billingZip}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>

                  <div className="mb-3">
                    <label htmlFor="billingCountry" className="form-label">
                      Country
                    </label>
                    <select
                      className="form-select"
                      id="billingCountry"
                      name="billingCountry"
                      value={formData.billingCountry}
                      onChange={handleChange}
                      required
                    >
                      <option value="US">United States</option>
                      <option value="CA">Canada</option>
                      <option value="UK">United Kingdom</option>
                      <option value="AU">Australia</option>
                      <option value="VN">Vietnam</option>
                      <option value="OTHER">Other</option>
                    </select>
                  </div>
                </div>
              )}
            </div>

            <div className="card mb-4">
              <div className="card-header bg-white">
                <h5 className="mb-0">Payment Method</h5>
              </div>
              <div className="card-body">
                <div className="mb-3">
                  <div className="form-check mb-2">
                    <input
                      type="radio"
                      className="form-check-input"
                      id="credit-card"
                      name="paymentMethod"
                      value="credit-card"
                      checked={formData.paymentMethod === "credit-card"}
                      onChange={handleChange}
                      required
                    />
                    <label className="form-check-label" htmlFor="credit-card">
                      Credit Card
                    </label>
                  </div>

                  <div className="form-check mb-2">
                    <input
                      type="radio"
                      className="form-check-input"
                      id="paypal"
                      name="paymentMethod"
                      value="paypal"
                      checked={formData.paymentMethod === "paypal"}
                      onChange={handleChange}
                    />
                    <label className="form-check-label" htmlFor="paypal">
                      PayPal
                    </label>
                  </div>

                  <div className="form-check">
                    <input
                      type="radio"
                      className="form-check-input"
                      id="bank-transfer"
                      name="paymentMethod"
                      value="bank-transfer"
                      checked={formData.paymentMethod === "bank-transfer"}
                      onChange={handleChange}
                    />
                    <label className="form-check-label" htmlFor="bank-transfer">
                      Bank Transfer
                    </label>
                  </div>
                </div>

                {formData.paymentMethod === "credit-card" && (
                  <div className="mt-3">
                    <div className="mb-3">
                      <label htmlFor="cardName" className="form-label">
                        Name on Card
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="cardName"
                        name="cardName"
                        value={formData.cardName}
                        onChange={handleChange}
                        required
                      />
                    </div>

                    <div className="mb-3">
                      <label htmlFor="cardNumber" className="form-label">
                        Card Number
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="cardNumber"
                        name="cardNumber"
                        value={formData.cardNumber}
                        onChange={handleChange}
                        required
                        placeholder="XXXX XXXX XXXX XXXX"
                      />
                    </div>

                    <div className="row">
                      <div className="col-md-6 mb-3">
                        <label htmlFor="cardExpiry" className="form-label">
                          Expiration Date
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="cardExpiry"
                          name="cardExpiry"
                          value={formData.cardExpiry}
                          onChange={handleChange}
                          required
                          placeholder="MM/YY"
                        />
                      </div>

                      <div className="col-md-6 mb-3">
                        <label htmlFor="cardCvv" className="form-label">
                          CVV
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="cardCvv"
                          name="cardCvv"
                          value={formData.cardCvv}
                          onChange={handleChange}
                          required
                          placeholder="XXX"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {formData.paymentMethod === "paypal" && (
                  <div className="mt-3">
                    <p>You will be redirected to PayPal to complete your payment.</p>
                  </div>
                )}

                {formData.paymentMethod === "bank-transfer" && (
                  <div className="mt-3">
                    <p>Please use the following bank details to make your payment:</p>
                    <p>
                      Bank: Example Bank
                      <br />
                      Account Name: eBay Clone
                      <br />
                      Account Number: 1234567890
                      <br />
                      Sort Code: 12-34-56
                    </p>
                  </div>
                )}
              </div>
            </div>

            <button type="submit" className="btn btn-primary btn-lg w-100" disabled={loading}>
              {loading ? (
                <>
                  <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                  Processing Payment...
                </>
              ) : (
                `Complete Purchase - ${total.toLocaleString()} VND`
              )}
            </button>
          </form>
        </div>

        <div className="col-lg-4">
          <div className="card mb-4">
            <div className="card-header bg-white">
              <h5 className="mb-0">Order Summary</h5>
            </div>
            <div className="card-body">
              <div className="d-flex justify-content-between mb-2">
                <span>Subtotal</span>
                <span>{subtotal.toLocaleString()} VND</span>
              </div>
              <div className="d-flex justify-content-between mb-2">
                <span>Shipping</span>
                <span>{shippingCost.toLocaleString()} VND</span>
              </div>
              <div className="d-flex justify-content-between mb-2">
                <span>Tax (10%)</span>
                <span>{tax.toLocaleString()} VND</span>
              </div>
              <hr />
              <div className="d-flex justify-content-between mb-4">
                <span className="fw-bold">Total</span>
                <span className="fw-bold">{total.toLocaleString()} VND</span>
              </div>
            </div>
          </div>

          <div className="card">
            <div className="card-header bg-white">
              <h5 className="mb-0">Order Items ({cartItems.length})</h5>
            </div>
            <div className="card-body">
              {cartItems.map((item) => (
                <div key={item.id} className="d-flex mb-3">
                  <img
                    src={item.image || "/placeholder.svg?height=60&width=60"}
                    alt={item.title}
                    className="img-fluid rounded me-3"
                    style={{ width: "60px", height: "60px", objectFit: "cover" }}
                  />
                  <div className="flex-grow-1">
                    <h6 className="mb-0">{item.title}</h6>
                    <div className="d-flex justify-content-between">
                      <small className="text-muted">Qty: {item.quantity}</small>
                      <span>{(item.price * item.quantity).toLocaleString()} VND</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Checkout

