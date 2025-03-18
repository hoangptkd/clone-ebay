"use client"

import { useState, useContext } from "react"
import { Link } from "react-router-dom"
import { User, Package, Heart, MessageSquare, Settings, CreditCard } from "lucide-react"
import { AuthContext } from "../contexts/AuthContext"

const UserProfile = () => {
  const { currentUser, updateProfile } = useContext(AuthContext)
  const [activeTab, setActiveTab] = useState("profile")
  const [formData, setFormData] = useState({
    firstName: currentUser?.firstName || "",
    lastName: currentUser?.lastName || "",
    email: currentUser?.email || "",
    address: currentUser?.address || "",
    city: currentUser?.city || "",
    state: currentUser?.state || "",
    zipCode: currentUser?.zipCode || "",
    country: currentUser?.country || "US",
    phone: currentUser?.phone || "",
  })

  const [isEditing, setIsEditing] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      setError("")
      setSuccess("")
      setLoading(true)

      const result = await updateProfile(formData)

      if (result.success) {
        setSuccess("Profile updated successfully")
        setIsEditing(false)
      } else {
        setError(result.error || "Failed to update profile")
      }
    } catch (error) {
      setError("An error occurred while updating your profile")
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="container py-5">
      <div className="row">
        <div className="col-lg-3 mb-4">
          <div className="card">
            <div className="card-body text-center">
              <div className="mb-3">
                <div
                  className="rounded-circle bg-light d-inline-flex align-items-center justify-content-center"
                  style={{ width: "100px", height: "100px" }}
                >
                  <User size={40} />
                </div>
              </div>
              <h5>
                {currentUser?.firstName} {currentUser?.lastName}
              </h5>
              <p className="text-muted">{currentUser?.email}</p>
              <p className="text-muted">
                Member since {new Date(currentUser?.createdAt || Date.now()).toLocaleDateString()}
              </p>
            </div>
            <div className="list-group list-group-flush">
              <button
                className={`list-group-item list-group-item-action d-flex align-items-center ${activeTab === "profile" ? "active" : ""}`}
                onClick={() => setActiveTab("profile")}
              >
                <User size={18} className="me-2" /> Profile
              </button>
              <button
                className={`list-group-item list-group-item-action d-flex align-items-center ${activeTab === "purchases" ? "active" : ""}`}
                onClick={() => setActiveTab("purchases")}
              >
                <Package size={18} className="me-2" /> Purchase History
              </button>
              <button
                className={`list-group-item list-group-item-action d-flex align-items-center ${activeTab === "watchlist" ? "active" : ""}`}
                onClick={() => setActiveTab("watchlist")}
              >
                <Heart size={18} className="me-2" /> Watchlist
              </button>
              <button
                className={`list-group-item list-group-item-action d-flex align-items-center ${activeTab === "messages" ? "active" : ""}`}
                onClick={() => setActiveTab("messages")}
              >
                <MessageSquare size={18} className="me-2" /> Messages
              </button>
              <button
                className={`list-group-item list-group-item-action d-flex align-items-center ${activeTab === "payment" ? "active" : ""}`}
                onClick={() => setActiveTab("payment")}
              >
                <CreditCard size={18} className="me-2" /> Payment Methods
              </button>
              <button
                className={`list-group-item list-group-item-action d-flex align-items-center ${activeTab === "settings" ? "active" : ""}`}
                onClick={() => setActiveTab("settings")}
              >
                <Settings size={18} className="me-2" /> Account Settings
              </button>
            </div>
          </div>
        </div>

        <div className="col-lg-9">
          {activeTab === "profile" && (
            <div className="card">
              <div className="card-header bg-white d-flex justify-content-between align-items-center">
                <h5 className="mb-0">Profile Information</h5>
                <button className="btn btn-sm btn-outline-primary" onClick={() => setIsEditing(!isEditing)}>
                  {isEditing ? "Cancel" : "Edit Profile"}
                </button>
              </div>
              <div className="card-body">
                {error && (
                  <div className="alert alert-danger" role="alert">
                    {error}
                  </div>
                )}

                {success && (
                  <div className="alert alert-success" role="alert">
                    {success}
                  </div>
                )}

                {isEditing ? (
                  <form onSubmit={handleSubmit}>
                    <div className="row">
                      <div className="col-md-6 mb-3">
                        <label htmlFor="firstName" className="form-label">
                          First Name
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="firstName"
                          name="firstName"
                          value={formData.firstName}
                          onChange={handleChange}
                          required
                        />
                      </div>

                      <div className="col-md-6 mb-3">
                        <label htmlFor="lastName" className="form-label">
                          Last Name
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="lastName"
                          name="lastName"
                          value={formData.lastName}
                          onChange={handleChange}
                          required
                        />
                      </div>
                    </div>

                    <div className="mb-3">
                      <label htmlFor="email" className="form-label">
                        Email
                      </label>
                      <input
                        type="email"
                        className="form-control"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        disabled
                      />
                      <small className="text-muted">Email cannot be changed</small>
                    </div>

                    <div className="mb-3">
                      <label htmlFor="phone" className="form-label">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        className="form-control"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                      />
                    </div>

                    <div className="mb-3">
                      <label htmlFor="address" className="form-label">
                        Address
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="address"
                        name="address"
                        value={formData.address}
                        onChange={handleChange}
                        required
                      />
                    </div>

                    <div className="row">
                      <div className="col-md-4 mb-3">
                        <label htmlFor="city" className="form-label">
                          City
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="city"
                          name="city"
                          value={formData.city}
                          onChange={handleChange}
                          required
                        />
                      </div>

                      <div className="col-md-4 mb-3">
                        <label htmlFor="state" className="form-label">
                          State/Province
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="state"
                          name="state"
                          value={formData.state}
                          onChange={handleChange}
                          required
                        />
                      </div>

                      <div className="col-md-4 mb-3">
                        <label htmlFor="zipCode" className="form-label">
                          Zip/Postal Code
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="zipCode"
                          name="zipCode"
                          value={formData.zipCode}
                          onChange={handleChange}
                          required
                        />
                      </div>
                    </div>

                    <div className="mb-3">
                      <label htmlFor="country" className="form-label">
                        Country
                      </label>
                      <select
                        className="form-select"
                        id="country"
                        name="country"
                        value={formData.country}
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

                    <button type="submit" className="btn btn-primary" disabled={loading}>
                      {loading ? (
                        <>
                          <span
                            className="spinner-border spinner-border-sm me-2"
                            role="status"
                            aria-hidden="true"
                          ></span>
                          Saving...
                        </>
                      ) : (
                        "Save Changes"
                      )}
                    </button>
                  </form>
                ) : (
                  <div className="row">
                    <div className="col-md-6">
                      <p>
                        <strong>Name:</strong> {currentUser?.firstName} {currentUser?.lastName}
                      </p>
                      <p>
                        <strong>Email:</strong> {currentUser?.email}
                      </p>
                      <p>
                        <strong>Phone:</strong> {currentUser?.phone || "Not provided"}
                      </p>
                    </div>
                    <div className="col-md-6">
                      <p>
                        <strong>Address:</strong> {currentUser?.address}
                      </p>
                      <p>
                        <strong>City:</strong> {currentUser?.city}
                      </p>
                      <p>
                        <strong>State/Province:</strong> {currentUser?.state}
                      </p>
                      <p>
                        <strong>Zip/Postal Code:</strong> {currentUser?.zipCode}
                      </p>
                      <p>
                        <strong>Country:</strong> {currentUser?.country}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {activeTab === "purchases" && (
            <div className="card">
              <div className="card-header bg-white">
                <h5 className="mb-0">Purchase History</h5>
              </div>
              <div className="card-body">
                <p className="text-center py-4">
                  <Link to="/purchase-history" className="btn btn-primary">
                    View Purchase History
                  </Link>
                </p>
              </div>
            </div>
          )}

          {activeTab === "watchlist" && (
            <div className="card">
              <div className="card-header bg-white">
                <h5 className="mb-0">Watchlist</h5>
              </div>
              <div className="card-body">
                <p className="text-center py-4">
                  <Link to="/watchlist" className="btn btn-primary">
                    View Watchlist
                  </Link>
                </p>
              </div>
            </div>
          )}

          {activeTab === "messages" && (
            <div className="card">
              <div className="card-header bg-white">
                <h5 className="mb-0">Messages</h5>
              </div>
              <div className="card-body">
                <p className="text-center py-4">
                  <Link to="/messages" className="btn btn-primary">
                    View Messages
                  </Link>
                </p>
              </div>
            </div>
          )}

          {activeTab === "payment" && (
            <div className="card">
              <div className="card-header bg-white">
                <h5 className="mb-0">Payment Methods</h5>
              </div>
              <div className="card-body">
                <p className="text-muted mb-4">You don't have any saved payment methods.</p>
                <button className="btn btn-primary">Add Payment Method</button>
              </div>
            </div>
          )}

          {activeTab === "settings" && (
            <div className="card">
              <div className="card-header bg-white">
                <h5 className="mb-0">Account Settings</h5>
              </div>
              <div className="card-body">
                <div className="mb-4">
                  <h6>Password</h6>
                  <p className="text-muted">Change your password to keep your account secure.</p>
                  <button className="btn btn-outline-primary">Change Password</button>
                </div>

                <div className="mb-4">
                  <h6>Notifications</h6>
                  <p className="text-muted">Manage your email and push notification preferences.</p>
                  <button className="btn btn-outline-primary">Notification Settings</button>
                </div>

                <div className="mb-4">
                  <h6>Privacy</h6>
                  <p className="text-muted">Control your privacy settings and data sharing preferences.</p>
                  <button className="btn btn-outline-primary">Privacy Settings</button>
                </div>

                <div>
                  <h6 className="text-danger">Delete Account</h6>
                  <p className="text-muted">Permanently delete your account and all associated data.</p>
                  <button className="btn btn-outline-danger">Delete Account</button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default UserProfile

