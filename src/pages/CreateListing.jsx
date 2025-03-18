"use client"

import { useState, useContext } from "react"
import { useNavigate } from "react-router-dom"
import { Upload, X, Plus } from "lucide-react"
import { AuthContext } from "../contexts/AuthContext"

const CreateListing = () => {
  const { currentUser } = useContext(AuthContext)
  const navigate = useNavigate()

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    condition: "new",
    price: "",
    quantity: 1,
    shippingCost: "",
    listingType: "fixed",
    duration: "7",
    images: [],
    color: "",
    size: "",
    material: "",
    brand: "",
    location: currentUser?.city ? `${currentUser.city}, ${currentUser.country}` : "",
  })

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [imageFiles, setImageFiles] = useState([])
  const [imagePreviewUrls, setImagePreviewUrls] = useState([])

  const handleChange = (e) => {
    const { name, value, type } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: type === "number" ? Number.parseFloat(value) : value,
    }))
  }

  const handleImageChange = (e) => {
    e.preventDefault()

    const files = Array.from(e.target.files)

    if (files.length + imageFiles.length > 10) {
      setError("You can upload a maximum of 10 images")
      return
    }

    const newImageFiles = [...imageFiles, ...files]
    setImageFiles(newImageFiles)

    // Create preview URLs
    const newImagePreviewUrls = files.map((file) => URL.createObjectURL(file))
    setImagePreviewUrls((prev) => [...prev, ...newImagePreviewUrls])
  }

  const removeImage = (index) => {
    const newImageFiles = [...imageFiles]
    newImageFiles.splice(index, 1)
    setImageFiles(newImageFiles)

    const newImagePreviewUrls = [...imagePreviewUrls]
    URL.revokeObjectURL(newImagePreviewUrls[index]) // Clean up the URL
    newImagePreviewUrls.splice(index, 1)
    setImagePreviewUrls(newImagePreviewUrls)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (imageFiles.length === 0) {
      setError("Please upload at least one image")
      return
    }

    try {
      setError("")
      setLoading(true)

      // In a real app, this would upload images and create a listing via API
      // For this demo, we'll simulate a successful listing creation
      await new Promise((resolve) => setTimeout(resolve, 2000))

      // Navigate to seller dashboard
      navigate("/seller-dashboard", {
        state: {
          listingSuccess: true,
          listingTitle: formData.title,
        },
      })
    } catch (error) {
      setError("Failed to create listing. Please try again.")
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="container py-5">
      <h1 className="mb-4">Create New Listing</h1>

      {error && (
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      )}

      <div className="card">
        <div className="card-body">
          <form onSubmit={handleSubmit}>
            <div className="row">
              <div className="col-lg-8">
                <h5 className="mb-3">Basic Information</h5>

                <div className="mb-3">
                  <label htmlFor="title" className="form-label">
                    Title
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="title"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    required
                    maxLength="80"
                  />
                  <small className="text-muted">{formData.title.length}/80 characters</small>
                </div>

                <div className="mb-3">
                  <label htmlFor="category" className="form-label">
                    Category
                  </label>
                  <select
                    className="form-select"
                    id="category"
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Select a category</option>
                    <option value="clothing">Clothing & Accessories</option>
                    <option value="electronics">Electronics</option>
                    <option value="home">Home & Garden</option>
                    <option value="collectibles">Collectibles & Art</option>
                    <option value="sports">Sports</option>
                    <option value="toys">Toys</option>
                    <option value="motors">Motors</option>
                  </select>
                </div>

                <div className="mb-3">
                  <label htmlFor="description" className="form-label">
                    Description
                  </label>
                  <textarea
                    className="form-control"
                    id="description"
                    name="description"
                    rows="5"
                    value={formData.description}
                    onChange={handleChange}
                    required
                  ></textarea>
                </div>

                <div className="row">
                  <div className="col-md-6 mb-3">
                    <label htmlFor="condition" className="form-label">
                      Condition
                    </label>
                    <select
                      className="form-select"
                      id="condition"
                      name="condition"
                      value={formData.condition}
                      onChange={handleChange}
                      required
                    >
                      <option value="new">New</option>
                      <option value="like-new">Like New</option>
                      <option value="used">Used</option>
                      <option value="for-parts">For Parts or Not Working</option>
                    </select>
                  </div>

                  <div className="col-md-6 mb-3">
                    <label htmlFor="brand" className="form-label">
                      Brand
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="brand"
                      name="brand"
                      value={formData.brand}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <div className="row">
                  <div className="col-md-4 mb-3">
                    <label htmlFor="color" className="form-label">
                      Color
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="color"
                      name="color"
                      value={formData.color}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="col-md-4 mb-3">
                    <label htmlFor="size" className="form-label">
                      Size
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="size"
                      name="size"
                      value={formData.size}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="col-md-4 mb-3">
                    <label htmlFor="material" className="form-label">
                      Material
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="material"
                      name="material"
                      value={formData.material}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <h5 className="mb-3 mt-4">Pricing & Shipping</h5>

                <div className="row">
                  <div className="col-md-6 mb-3">
                    <label htmlFor="listingType" className="form-label">
                      Listing Type
                    </label>
                    <select
                      className="form-select"
                      id="listingType"
                      name="listingType"
                      value={formData.listingType}
                      onChange={handleChange}
                      required
                    >
                      <option value="fixed">Fixed Price</option>
                      <option value="auction">Auction</option>
                    </select>
                  </div>

                  <div className="col-md-6 mb-3">
                    <label htmlFor="duration" className="form-label">
                      Duration
                    </label>
                    <select
                      className="form-select"
                      id="duration"
                      name="duration"
                      value={formData.duration}
                      onChange={handleChange}
                      required
                    >
                      <option value="3">3 days</option>
                      <option value="5">5 days</option>
                      <option value="7">7 days</option>
                      <option value="10">10 days</option>
                      <option value="30">30 days</option>
                    </select>
                  </div>
                </div>

                <div className="row">
                  <div className="col-md-4 mb-3">
                    <label htmlFor="price" className="form-label">
                      Price (VND)
                    </label>
                    <input
                      type="number"
                      className="form-control"
                      id="price"
                      name="price"
                      value={formData.price}
                      onChange={handleChange}
                      required
                      min="0"
                      step="1000"
                    />
                  </div>

                  <div className="col-md-4 mb-3">
                    <label htmlFor="quantity" className="form-label">
                      Quantity
                    </label>
                    <input
                      type="number"
                      className="form-control"
                      id="quantity"
                      name="quantity"
                      value={formData.quantity}
                      onChange={handleChange}
                      required
                      min="1"
                    />
                  </div>

                  <div className="col-md-4 mb-3">
                    <label htmlFor="shippingCost" className="form-label">
                      Shipping Cost (VND)
                    </label>
                    <input
                      type="number"
                      className="form-control"
                      id="shippingCost"
                      name="shippingCost"
                      value={formData.shippingCost}
                      onChange={handleChange}
                      required
                      min="0"
                      step="1000"
                    />
                  </div>
                </div>

                <div className="mb-3">
                  <label htmlFor="location" className="form-label">
                    Item Location
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="location"
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className="col-lg-4">
                <h5 className="mb-3">Images</h5>

                <div className="mb-3">
                  <div className="card">
                    <div className="card-body">
                      <div className="mb-3">
                        <label htmlFor="images" className="form-label">
                          Upload Images (Max 10)
                        </label>
                        <input
                          type="file"
                          className="form-control"
                          id="images"
                          accept="image/*"
                          multiple
                          onChange={handleImageChange}
                        />
                      </div>

                      {imagePreviewUrls.length > 0 ? (
                        <div className="row g-2">
                          {imagePreviewUrls.map((url, index) => (
                            <div key={index} className="col-6 position-relative">
                              <img
                                src={url || "/placeholder.svg"}
                                alt={`Preview ${index + 1}`}
                                className="img-thumbnail"
                                style={{ width: "100%", height: "120px", objectFit: "cover" }}
                              />
                              <button
                                type="button"
                                className="btn btn-sm btn-danger position-absolute top-0 end-0 m-1"
                                onClick={() => removeImage(index)}
                              >
                                <X size={14} />
                              </button>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="text-center py-5 border rounded">
                          <Upload size={40} className="text-muted mb-2" />
                          <p className="mb-0">Drag & drop or click to upload</p>
                          <small className="text-muted">PNG, JPG, GIF up to 5MB</small>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                <div className="card mb-3">
                  <div className="card-header bg-white">
                    <h6 className="mb-0">Listing Preview</h6>
                  </div>
                  <div className="card-body">
                    <div className="text-center mb-3">
                      {imagePreviewUrls.length > 0 ? (
                        <img
                          src={imagePreviewUrls[0] || "/placeholder.svg"}
                          alt="Main Preview"
                          className="img-fluid rounded"
                          style={{ maxHeight: "200px" }}
                        />
                      ) : (
                        <div className="bg-light rounded py-5">
                          <Plus size={40} className="text-muted" />
                        </div>
                      )}
                    </div>

                    <h6>{formData.title || "Product Title"}</h6>
                    <div className="fw-bold mb-2">
                      {formData.price ? `${Number.parseInt(formData.price).toLocaleString()} VND` : "Price"}
                    </div>
                    <div className="small text-muted mb-2">
                      {formData.listingType === "fixed" ? "Buy It Now" : "Auction"}
                    </div>
                    <div className="small text-muted">{formData.location || "Location"}</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="d-flex justify-content-end mt-4">
              <button
                type="button"
                className="btn btn-outline-secondary me-2"
                onClick={() => navigate("/seller-dashboard")}
              >
                Cancel
              </button>
              <button type="submit" className="btn btn-primary" disabled={loading}>
                {loading ? (
                  <>
                    <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                    Creating Listing...
                  </>
                ) : (
                  "Create Listing"
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default CreateListing

