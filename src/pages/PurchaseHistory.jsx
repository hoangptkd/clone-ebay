"use client"

import { useState, useEffect, useContext } from "react"
import { Link, useLocation } from "react-router-dom"
import { Package, ChevronDown, ChevronUp } from "lucide-react"
import { AuthContext } from "../contexts/AuthContext"

const PurchaseHistory = () => {
  const { currentUser } = useContext(AuthContext)
  const location = useLocation()
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)
  const [expandedOrders, setExpandedOrders] = useState({})

  // Check if we have a successful order from checkout
  const orderSuccess = location.state?.orderSuccess
  const newOrderId = location.state?.orderId

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        // In a real app, this would be an API call
        // For this demo, we'll create some mock orders
        const mockOrders = [
          {
            id: newOrderId || "ORD-123456789",
            date: new Date().toISOString(),
            total: 2500000,
            status: "Processing",
            items: [
              {
                id: 1,
                title: "Áo Dài Gấm Ngũ Sắc Thái Tuấn Màu Cánh Sen, Hoa Mai",
                price: 1404205,
                quantity: 1,
                image: "/placeholder.svg?height=100&width=100&text=Áo+Dài+Gấm",
              },
              {
                id: 3,
                title: "Áo dài cách tân màu hồng",
                price: 1072302,
                quantity: 1,
                image: "/placeholder.svg?height=100&width=100&text=Áo+Dài+Hồng",
              },
            ],
          },
          {
            id: "ORD-987654321",
            date: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(), // 7 days ago
            total: 1276294.69,
            status: "Delivered",
            items: [
              {
                id: 4,
                title: "Yên Boutique Suit Women Size Medium Vietnamese áo dài Tailor Made Satin Classic",
                price: 1276294.69,
                quantity: 1,
                image: "/placeholder.svg?height=100&width=100&text=Yên+Boutique",
              },
            ],
          },
        ]

        setOrders(mockOrders)
        setLoading(false)

        // If we have a new order, expand it
        if (newOrderId) {
          setExpandedOrders({ [newOrderId]: true })
        }
      } catch (error) {
        console.error("Error fetching orders:", error)
        setLoading(false)
      }
    }

    fetchOrders()
  }, [newOrderId])

  const toggleOrderExpand = (orderId) => {
    setExpandedOrders((prev) => ({
      ...prev,
      [orderId]: !prev[orderId],
    }))
  }

  return (
    <div className="container py-5">
      <h1 className="mb-4">Purchase History</h1>

      {orderSuccess && (
        <div className="alert alert-success mb-4" role="alert">
          <h4 className="alert-heading">Thank you for your purchase!</h4>
          <p>Your order has been successfully placed. You can track your order status below.</p>
          <p className="mb-0">Order ID: {newOrderId}</p>
        </div>
      )}

      {loading ? (
        <div className="text-center py-5">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      ) : orders.length === 0 ? (
        <div className="text-center py-5">
          <div className="mb-4">
            <Package size={60} className="text-muted" />
          </div>
          <h3>No Purchase History</h3>
          <p className="text-muted mb-4">You haven't made any purchases yet.</p>
          <Link to="/" className="btn btn-primary">
            Start Shopping
          </Link>
        </div>
      ) : (
        <div className="card">
          <div className="card-header bg-white">
            <div className="row fw-bold">
              <div className="col-md-3">Order ID</div>
              <div className="col-md-2">Date</div>
              <div className="col-md-2">Total</div>
              <div className="col-md-2">Status</div>
              <div className="col-md-3">Actions</div>
            </div>
          </div>
          <div className="list-group list-group-flush">
            {orders.map((order) => (
              <div key={order.id} className="list-group-item">
                <div className="row align-items-center">
                  <div className="col-md-3">{order.id}</div>
                  <div className="col-md-2">{new Date(order.date).toLocaleDateString()}</div>
                  <div className="col-md-2">{order.total.toLocaleString()} VND</div>
                  <div className="col-md-2">
                    <span className={`badge ${order.status === "Delivered" ? "bg-success" : "bg-primary"}`}>
                      {order.status}
                    </span>
                  </div>
                  <div className="col-md-3">
                    <button className="btn btn-sm btn-outline-primary me-2" onClick={() => toggleOrderExpand(order.id)}>
                      {expandedOrders[order.id] ? (
                        <>
                          <ChevronUp size={16} className="me-1" />
                          Hide Details
                        </>
                      ) : (
                        <>
                          <ChevronDown size={16} className="me-1" />
                          View Details
                        </>
                      )}
                    </button>
                  </div>
                </div>

                {expandedOrders[order.id] && (
                  <div className="mt-3 border-top pt-3">
                    <h6>Order Items</h6>
                    {order.items.map((item) => (
                      <div key={item.id} className="d-flex mb-3">
                        <img
                          src={item.image || "/placeholder.svg?height=60&width=60"}
                          alt={item.title}
                          className="img-fluid rounded me-3"
                          style={{ width: "60px", height: "60px", objectFit: "cover" }}
                        />
                        <div className="flex-grow-1">
                          <h6 className="mb-0">
                            <Link to={`/product/${item.id}`} className="text-decoration-none text-dark">
                              {item.title}
                            </Link>
                          </h6>
                          <div className="d-flex justify-content-between">
                            <small className="text-muted">Qty: {item.quantity}</small>
                            <span>{(item.price * item.quantity).toLocaleString()} VND</span>
                          </div>
                        </div>
                      </div>
                    ))}

                    <div className="row mt-3">
                      <div className="col-md-6">
                        <h6>Shipping Address</h6>
                        <p className="mb-0">
                          {currentUser?.firstName} {currentUser?.lastName}
                        </p>
                        <p className="mb-0">{currentUser?.address}</p>
                        <p className="mb-0">
                          {currentUser?.city}, {currentUser?.state} {currentUser?.zipCode}
                        </p>
                        <p className="mb-0">{currentUser?.country}</p>
                      </div>
                      <div className="col-md-6">
                        <h6>Payment Information</h6>
                        <p className="mb-0">Payment Method: Credit Card</p>
                        <p className="mb-0">Card: **** **** **** 1234</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default PurchaseHistory

