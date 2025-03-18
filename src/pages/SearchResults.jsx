"use client"

import { useState, useEffect } from "react"
import { useSearchParams, Link } from "react-router-dom"
import { Heart } from "lucide-react"
import ProductCard from "../components/ProductCard"
import FilterSidebar from "../components/FilterSidebar"

const SearchResults = () => {
  const [searchParams] = useSearchParams()
  const query = searchParams.get("q") || ""
  const [products, setProducts] = useState([])
  const [filteredProducts, setFilteredProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [selectedFilters, setSelectedFilters] = useState({
    category: "All",
    size: [],
    dressLength: [],
    color: [],
    sleeveLength: [],
  })
  const [sortOption, setSortOption] = useState("Best Match")

  useEffect(() => {
    // Fetch products from database.json
    setLoading(true)
    fetch("/database.json")
      .then((response) => response.json())
      .then((data) => {
        const allProducts = data.products || []
        setProducts(allProducts)

        // Filter products based on search query
        const filtered = query
          ? allProducts.filter(
              (product) =>
                product.title.toLowerCase().includes(query.toLowerCase()) ||
                product.description.toLowerCase().includes(query.toLowerCase()) ||
                (product.category && product.category.toLowerCase().includes(query.toLowerCase())),
            )
          : allProducts

        setFilteredProducts(filtered)
        setLoading(false)
      })
      .catch((error) => {
        console.error("Error fetching data:", error)
        setLoading(false)
      })
  }, [query])

  useEffect(() => {
    // Apply filters
    let results = [...products]

    if (selectedFilters.category !== "All") {
      results = results.filter((product) => product.category === selectedFilters.category)
    }

    if (selectedFilters.size.length > 0) {
      results = results.filter((product) => selectedFilters.size.includes(product.size))
    }

    if (selectedFilters.dressLength.length > 0) {
      results = results.filter((product) => selectedFilters.dressLength.includes(product.dressLength))
    }

    if (selectedFilters.color.length > 0) {
      results = results.filter((product) => selectedFilters.color.includes(product.color))
    }

    if (selectedFilters.sleeveLength.length > 0) {
      results = results.filter((product) => selectedFilters.sleeveLength.includes(product.sleeveLength))
    }

    // Apply search query filter
    if (query) {
      results = results.filter(
        (product) =>
          product.title.toLowerCase().includes(query.toLowerCase()) ||
          product.description.toLowerCase().includes(query.toLowerCase()),
      )
    }

    // Apply sorting
    if (sortOption === "Price: Low to High") {
      results.sort((a, b) => a.price - b.price)
    } else if (sortOption === "Price: High to Low") {
      results.sort((a, b) => b.price - a.price)
    } else if (sortOption === "Newest") {
      results.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    }

    setFilteredProducts(results)
  }, [products, selectedFilters, sortOption, query])

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

  const saveSearch = () => {
    // Logic to save search
    alert("Search saved!")
  }

  return (
    <div className="search-results-page container-fluid py-4">
      <div className="row">
        {/* Filter Sidebar */}
        <div className="col-md-3">
          <FilterSidebar selectedFilters={selectedFilters} onFilterChange={handleFilterChange} />
        </div>

        {/* Search Results */}
        <div className="col-md-9">
          <div className="d-flex justify-content-between align-items-center mb-3">
            <div>
              <h4>{loading ? "Searching..." : `${filteredProducts.length} results for "${query}"`}</h4>
              <div className="d-flex align-items-center mt-2">
                <span className="me-2">Related:</span>
                {["american optical", "ap", "tlk", "dotm"].map((term, index) => (
                  <Link key={index} to={`/search?q=${term}`} className="me-2 text-primary text-decoration-none">
                    {term}
                  </Link>
                ))}
              </div>
            </div>
            <button className="btn btn-outline-primary d-flex align-items-center" onClick={saveSearch}>
              <Heart size={16} className="me-1" />
              Save this search
            </button>
          </div>

          <div className="d-flex justify-content-between align-items-center mb-3 p-2 bg-light rounded">
            <div className="d-flex">
              <button
                className={`btn ${selectedFilters.category === "All" ? "btn-primary" : "btn-outline-secondary"} me-2`}
                onClick={() => handleFilterChange("category", "All")}
              >
                All
              </button>
              <button
                className={`btn ${selectedFilters.category === "Auction" ? "btn-primary" : "btn-outline-secondary"} me-2`}
                onClick={() => handleFilterChange("category", "Auction")}
              >
                Auction
              </button>
              <button
                className={`btn ${selectedFilters.category === "Buy It Now" ? "btn-primary" : "btn-outline-secondary"} me-2`}
                onClick={() => handleFilterChange("category", "Buy It Now")}
              >
                Buy It Now
              </button>
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
          ) : filteredProducts.length === 0 ? (
            <div className="text-center py-5">
              <h5>No products found matching "{query}"</h5>
              <p>Try checking your spelling or using more general terms</p>
            </div>
          ) : (
            <div className="row g-4">
              {filteredProducts.map((product) => (
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

export default SearchResults

