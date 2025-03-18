"use client"

import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import ProductCard from "../components/ProductCard"
import FilterSidebar from "../components/FilterSidebar"

const CategoryPage = () => {
  const { categoryId } = useParams()
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [category, setCategory] = useState(null)
  const [selectedFilters, setSelectedFilters] = useState({
    category: "All",
    size: [],
    dressLength: [],
    color: [],
    sleeveLength: [],
  })
  const [sortOption, setSortOption] = useState("Best Match")

  useEffect(() => {
    const fetchCategoryAndProducts = async () => {
      try {
        setLoading(true)

        // Fetch data from database.json
        const response = await fetch("/database.json")
        const data = await response.json()

        // Find the category
        const foundCategory = data.categories.find((cat) => cat.id.toString() === categoryId)
        setCategory(foundCategory || null)

        // Filter products by category
        let categoryProducts = []
        if (foundCategory) {
          // In a real app, you would filter by category ID
          // For this demo, we'll just use all products
          categoryProducts = data.products || []
        }

        setProducts(categoryProducts)
        setLoading(false)
      } catch (error) {
        console.error("Error fetching category data:", error)
        setLoading(false)
      }
    }

    fetchCategoryAndProducts()
  }, [categoryId])

  const handleFilterChange = (filterType, value) => {
    setSelectedFilters((prev) => {
      if (filterType === "category") {
        return { ...prev, category: value }
      } else {
        // For array-based filters (checkboxes)
        const currentValues = [...prev[filterType]]
        if (currentValues.includes(value)) {
          return {
            ...prev,
            [filterType]: currentValues.filter((item) => item !== value),
          }
        } else {
          return { ...prev, [filterType]: [...currentValues, value] }
        }
      }
    })
  }

  const handleSortChange = (option) => {
    setSortOption(option)
  }

  // Apply filters and sorting
  const filteredProducts = products.filter((product) => {
    if (selectedFilters.category !== "All") {
      if (product.category !== selectedFilters.category) return false
    }

    if (selectedFilters.size.length > 0) {
      if (!selectedFilters.size.includes(product.size)) return false
    }

    if (selectedFilters.dressLength.length > 0) {
      if (!selectedFilters.dressLength.includes(product.dressLength)) return false
    }

    if (selectedFilters.color.length > 0) {
      if (!selectedFilters.color.includes(product.color)) return false
    }

    if (selectedFilters.sleeveLength.length > 0) {
      if (!selectedFilters.sleeveLength.includes(product.sleeveLength)) return false
    }

    return true
  })

  // Apply sorting
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortOption === "Price: Low to High") {
      return a.price - b.price
    } else if (sortOption === "Price: High to Low") {
      return b.price - a.price
    } else if (sortOption === "Newest") {
      return new Date(b.createdAt) - new Date(a.createdAt)
    }
    return 0 // Default: Best Match
  })

  return (
    <div className="container py-5">
      <h1 className="mb-4">{category ? category.name : "Category"}</h1>

      <div className="row">
        {/* Filter Sidebar */}
        <div className="col-md-3">
          <FilterSidebar selectedFilters={selectedFilters} onFilterChange={handleFilterChange} />
        </div>

        {/* Products */}
        <div className="col-md-9">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <div>
              <span>{sortedProducts.length} results</span>
            </div>

            <div className="d-flex align-items-center">
              <span className="me-2">Sort: </span>
              <select className="form-select" value={sortOption} onChange={(e) => handleSortChange(e.target.value)}>
                <option>Best Match</option>
                <option>Price: Low to High</option>
                <option>Price: High to Low</option>
                <option>Newest</option>
              </select>
            </div>
          </div>

          {loading ? (
            <div className="text-center py-5">
              <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            </div>
          ) : sortedProducts.length === 0 ? (
            <div className="text-center py-5">
              <h5>No products found</h5>
              <p>Try adjusting your filters or browse other categories</p>
            </div>
          ) : (
            <div className="row g-4">
              {sortedProducts.map((product) => (
                <div key={product.id} className="col-md-6 col-lg-4">
                  <ProductCard product={product} />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default CategoryPage

