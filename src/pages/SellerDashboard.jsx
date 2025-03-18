"use client"

import { useState, useContext } from "react"
import { Link } from "react-router-dom"
import { Package, DollarSign, Users, ShoppingBag, Plus } from "lucide-react"
import { AuthContext } from "../contexts/AuthContext"

const SellerDashboard = () => {
  const { currentUser } = useContext(AuthContext)
  const [activeTab, setActiveTab] = useState("overview")

  // Mock data for seller dashboard
  const sellerStats = {
    totalSales: 5000000,
    totalOrders: 12,
    totalProducts: 8,
    pendingOrders: 2,
    views: 450,
    revenue: [
      { month: "Jan", amount: 0 },
      { month: "Feb", amount: 0 },
      { month: "Mar", amount: 1200000 },
      { month: "Apr", amount: 1500000 },
      { month: "May", amount: 2300000 },
      { month: "Jun", amount: 0 },
    ],
  }

  const listings = [
    {
      id: 101,
      title: "Áo dài truyền thống màu đỏ",
      price: 1500000,
      status: "active",
      views: 120,
      watchers: 5,
      image: "/placeholder.svg?height=100&width=100&text=Áo+Dài+Đỏ",
    },
    {
      id: 102,
      title: "Áo dài cách tân màu xanh",
      price: 1200000,
      status: "active",
      views: 85,
      watchers: 3,
      image: "/placeholder.svg?height=100&width=100&text=Áo+Dài+Xanh",
    },
    {
      id: 103,
      title: "Áo dài gấm họa tiết hoa sen",
      price: 2500000,
      status: "sold",
      views: 245,
      watchers: 12,
      image: "/placeholder.svg?height=100&width=100&text=Áo+Dài+Gấm",
    },
  ]

  const orders = [
    {
      id: "ORD-123456",
      date: new Date().toISOString(),
      customer: "John Doe",
      total: 1500000,
      status: "Pending",
      items: [
        {
          id: 101,
          title: "Áo dài truyền thống màu đỏ",
          quantity: 1,
          price: 1500000,
        },
      ],
    },
    {
      id: "ORD-789012",
      date: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
      customer: "Jane Smith",
      total: 2500000,
      status: "Shipped",
      items: [
        {
          id: 103,
          title: "Áo dài gấm họa tiết hoa sen",
          quantity: 1,
          price: 2500000,
        },
      ],
    },
  ]

  return (
    <div className="container py-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1>Seller Dashboard</h1>
        <Link to="/create-listing" className="btn btn-primary d-flex align-items-center">
          <Plus size={18} className="me-2" /> Create Listing
        </Link>
      </div>

      <div className="row mb-4">
        <div className="col-md-3 mb-3">
          <div className="card h-100">
            <div className="card-body d-flex align-items-center">
              <div className="rounded-circle bg-primary bg-opacity-10 p-3 me-3">
                <DollarSign size={24} className="text-primary" />
              </div>
              <div>
                <h6 className="mb-0">Total Sales</h6>
                <h3 className="mb-0">{sellerStats.totalSales.toLocaleString()} VND</h3>
              </div>
            </div>
          </div>
        </div>

        <div className="col-md-3 mb-3">
          <div className="card h-100">
            <div className="card-body d-flex align-items-center">
              <div className="rounded-circle bg-success bg-opacity-10 p-3 me-3">
                <Package size={24} className="text-success" />
              </div>
              <div>
                <h6 className="mb-0">Total Orders</h6>
                <h3 className="mb-0">{sellerStats.totalOrders}</h3>
              </div>
            </div>
          </div>
        </div>

        <div className="col-md-3 mb-3">
          <div className="card h-100">
            <div className="card-body d-flex align-items-center">
              <div className="rounded-circle bg-info bg-opacity-10 p-3 me-3">
                <ShoppingBag size={24} className="text-info" />
              </div>
              <div>
                <h6 className="mb-0">Active Listings</h6>
                <h3 className="mb-0">{sellerStats.totalProducts}</h3>
              </div>
            </div>
          </div>
        </div>

        <div className="col-md-3 mb-3">
          <div className="card h-100">
            <div className="card-body d-flex align-items-center">
              <div className="rounded-circle bg-warning bg-opacity-10 p-3 me-3">
                <Users size={24} className="text-warning" />
              </div>
              <div>
                <h6 className="mb-0">Total Views</h6>
                <h3 className="mb-0">{sellerStats.views}</h3>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="card mb-4">
        <div className="card-header bg-white">
          <ul className="nav nav-tabs card-header-tabs">
            <li className="nav-item">
              <button
                className={`nav-link ${activeTab === "overview" ? "active" : ""}`}
                onClick={() => setActiveTab("overview")}
              >
                Overview
              </button>
            </li>
            <li className="nav-item">
              <button
                className={`nav-link ${activeTab === "listings" ? "active" : ""}`}
                onClick={() => setActiveTab("listings")}
              >
                Listings
              </button>
            </li>
            <li className="nav-item">
              <button
                className={`nav-link ${activeTab === "orders" ? "active" : ""}`}
                onClick={() => setActiveTab("orders")}
              >
                Orders
              </button>
            </li>
            <li className="nav-item">
              <button
                className={`nav-link ${activeTab === "analytics" ? "active" : ""}`}
                onClick={() => setActiveTab("analytics")}
              >
                Analytics
              </button>
            </li>
          </ul>
        </div>
        <div className="card-body">
          {activeTab === "overview" && (
            <div>
              <h5 className="mb-4">Sales Overview</h5>

              <div className="row mb-4">
                <div className="col-md-8">
                  <div className="card">
                    <div className="card-header bg-white">
                      <h6 className="mb-0">Revenue (Last 6 Months)</h6>
                    </div>
                    <div className="card-body">
                      <div className="chart-container" style={{ height: "300px" }}>
                        <div className="d-flex justify-content-between h-100">
                          {sellerStats.revenue.map((month, index) => (
                            <div
                              key={index}
                              className="d-flex flex-column justify-content-end align-items-center"
                              style={{ width: `${100 / sellerStats.revenue.length}%` }}
                            >
                              <div
                                className="bg-primary rounded-top"
                                style={{
                                  width: "30px",
                                  height: `${(month.amount / 2500000) * 100}%`,
                                  minHeight: month.amount > 0 ? "20px" : "0",
                                }}
                              ></div>
                              <div className="mt-2 text-muted small">{month.month}</div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="col-md-4">
                  <div className="card h-100">
                    <div className="card-header bg-white">
                      <h6 className="mb-0">Quick Actions</h6>
                    </div>
                    <div className="card-body">
                      <div className="d-grid gap-2">
                        <Link to="/create-listing" className="btn btn-primary">
                          Create New Listing
                        </Link>
                        <button className="btn btn-outline-secondary">View Sales Report</button>
                        <button className="btn btn-outline-secondary">Manage Inventory</button>
                        <button className="btn btn-outline-secondary">Update Store Settings</button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="row">
                <div className="col-md-6">
                  <div className="card">
                    <div className="card-header bg-white d-flex justify-content-between align-items-center">
                      <h6 className="mb-0">Recent Orders</h6>
                      <button className="btn btn-sm btn-link" onClick={() => setActiveTab("orders")}>
                        View All
                      </button>
                    </div>
                    <div className="list-group list-group-flush">
                      {orders.slice(0, 2).map((order) => (
                        <div key={order.id} className="list-group-item">
                          <div className="d-flex justify-content-between align-items-center">
                            <div>
                              <h6 className="mb-0">{order.id}</h6>
                              <small className="text-muted">
                                {new Date(order.date).toLocaleDateString()} · {order.customer}
                              </small>
                            </div>
                            <div className="text-end">
                              <div>{order.total.toLocaleString()} VND</div>
                              <span className={`badge ${order.status === "Pending" ? "bg-warning" : "bg-success"}`}>
                                {order.status}
                              </span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="col-md-6">
                  <div className="card">
                    <div className="card-header bg-white d-flex justify-content-between align-items-center">
                      <h6 className="mb-0">Top Listings</h6>
                      <button className="btn btn-sm btn-link" onClick={() => setActiveTab("listings")}>
                        View All
                      </button>
                    </div>
                    <div className="list-group list-group-flush">
                      {listings.slice(0, 2).map((listing) => (
                        <div key={listing.id} className="list-group-item">
                          <div className="d-flex">
                            <img
                              src={listing.image || "/placeholder.svg"}
                              alt={listing.title}
                              className="img-fluid rounded me-3"
                              style={{ width: "50px", height: "50px", objectFit: "cover" }}
                            />
                            <div className="flex-grow-1">
                              <div className="d-flex justify-content-between">
                                <h6 className="mb-0">{listing.title}</h6>
                                <span>{listing.price.toLocaleString()} VND</span>
                              </div>
                              <div className="d-flex justify-content-between">
                                <small className="text-muted">
                                  Views: {listing.views} · Watchers: {listing.watchers}
                                </small>
                                <span
                                  className={`badge ${listing.status === "active" ? "bg-success" : "bg-secondary"}`}
                                >
                                  {listing.status === "active" ? "Active" : "Sold"}
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === "listings" && (
            <div>
              <div className="d-flex justify-content-between align-items-center mb-4">
                <h5 className="mb-0">Your Listings</h5>
                <Link to="/create-listing" className="btn btn-primary">
                  Create New Listing
                </Link>
              </div>

              <div className="table-responsive">
                <table className="table table-hover">
                  <thead>
                    <tr>
                      <th>Product</th>
                      <th>Price</th>
                      <th>Status</th>
                      <th>Views</th>
                      <th>Watchers</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {listings.map((listing) => (
                      <tr key={listing.id}>
                        <td>
                          <div className="d-flex align-items-center">
                            <img
                              src={listing.image || "/placeholder.svg"}
                              alt={listing.title}
                              className="img-fluid rounded me-3"
                              style={{ width: "50px", height: "50px", objectFit: "cover" }}
                            />
                            <div>{listing.title}</div>
                          </div>
                        </td>
                        <td>{listing.price.toLocaleString()} VND</td>
                        <td>
                          <span className={`badge ${listing.status === "active" ? "bg-success" : "bg-secondary"}`}>
                            {listing.status === "active" ? "Active" : "Sold"}
                          </span>
                        </td>
                        <td>{listing.views}</td>
                        <td>{listing.watchers}</td>
                        <td>
                          <div className="btn-group">
                            <button className="btn btn-sm btn-outline-primary">Edit</button>
                            <button className="btn btn-sm btn-outline-danger">Delete</button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === "orders" && (
            <div>
              <h5 className="mb-4">Order Management</h5>

              <div className="table-responsive">
                <table className="table table-hover">
                  <thead>
                    <tr>
                      <th>Order ID</th>
                      <th>Date</th>
                      <th>Customer</th>
                      <th>Total</th>
                      <th>Status</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {orders.map((order) => (
                      <tr key={order.id}>
                        <td>{order.id}</td>
                        <td>{new Date(order.date).toLocaleDateString()}</td>
                        <td>{order.customer}</td>
                        <td>{order.total.toLocaleString()} VND</td>
                        <td>
                          <span className={`badge ${order.status === "Pending" ? "bg-warning" : "bg-success"}`}>
                            {order.status}
                          </span>
                        </td>
                        <td>
                          <div className="btn-group">
                            <button className="btn btn-sm btn-outline-primary">View</button>
                            <button className="btn btn-sm btn-outline-success">Update</button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === "analytics" && (
            <div>
              <h5 className="mb-4">Performance Analytics</h5>

              <div className="row mb-4">
                <div className="col-md-6">
                  <div className="card">
                    <div className="card-header bg-white">
                      <h6 className="mb-0">Revenue by Month</h6>
                    </div>
                    <div className="card-body">
                      <div className="chart-container" style={{ height: "300px" }}>
                        <div className="d-flex justify-content-between h-100">
                          {sellerStats.revenue.map((month, index) => (
                            <div
                              key={index}
                              className="d-flex flex-column justify-content-end align-items-center"
                              style={{ width: `${100 / sellerStats.revenue.length}%` }}
                            >
                              <div
                                className="bg-primary rounded-top"
                                style={{
                                  width: "30px",
                                  height: `${(month.amount / 2500000) * 100}%`,
                                  minHeight: month.amount > 0 ? "20px" : "0",
                                }}
                              ></div>
                              <div className="mt-2 text-muted small">{month.month}</div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="col-md-6">
                  <div className="card">
                    <div className="card-header bg-white">
                      <h6 className="mb-0">Traffic Sources</h6>
                    </div>
                    <div className="card-body">
                      <div className="mb-3">
                        <div className="d-flex justify-content-between mb-1">
                          <span>Search</span>
                          <span>65%</span>
                        </div>
                        <div className="progress" style={{ height: "10px" }}>
                          <div
                            className="progress-bar"
                            role="progressbar"
                            style={{ width: "65%" }}
                            aria-valuenow="65"
                            aria-valuemin="0"
                            aria-valuemax="100"
                          ></div>
                        </div>
                      </div>

                      <div className="mb-3">
                        <div className="d-flex justify-content-between mb-1">
                          <span>Direct</span>
                          <span>20%</span>
                        </div>
                        <div className="progress" style={{ height: "10px" }}>
                          <div
                            className="progress-bar bg-success"
                            role="progressbar"
                            style={{ width: "20%" }}
                            aria-valuenow="20"
                            aria-valuemin="0"
                            aria-valuemax="100"
                          ></div>
                        </div>
                      </div>

                      <div className="mb-3">
                        <div className="d-flex justify-content-between mb-1">
                          <span>Social</span>
                          <span>10%</span>
                        </div>
                        <div className="progress" style={{ height: "10px" }}>
                          <div
                            className="progress-bar bg-info"
                            role="progressbar"
                            style={{ width: "10%" }}
                            aria-valuenow="10"
                            aria-valuemin="0"
                            aria-valuemax="100"
                          ></div>
                        </div>
                      </div>

                      <div>
                        <div className="d-flex justify-content-between mb-1">
                          <span>Other</span>
                          <span>5%</span>
                        </div>
                        <div className="progress" style={{ height: "10px" }}>
                          <div
                            className="progress-bar bg-warning"
                            role="progressbar"
                            style={{ width: "5%" }}
                            aria-valuenow="5"
                            aria-valuemin="0"
                            aria-valuemax="100"
                          ></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="row">
                <div className="col-md-12">
                  <div className="card">
                    <div className="card-header bg-white">
                      <h6 className="mb-0">Product Performance</h6>
                    </div>
                    <div className="card-body">
                      <div className="table-responsive">
                        <table className="table">
                          <thead>
                            <tr>
                              <th>Product</th>
                              <th>Views</th>
                              <th>Conversion Rate</th>
                              <th>Revenue</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td>Áo dài truyền thống màu đỏ</td>
                              <td>120</td>
                              <td>2.5%</td>
                              <td>1,500,000 VND</td>
                            </tr>
                            <tr>
                              <td>Áo dài cách tân màu xanh</td>
                              <td>85</td>
                              <td>0%</td>
                              <td>0 VND</td>
                            </tr>
                            <tr>
                              <td>Áo dài gấm họa tiết hoa sen</td>
                              <td>245</td>
                              <td>4.1%</td>
                              <td>2,500,000 VND</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default SellerDashboard

