"use client"

import { useState } from "react"
import { ChevronDown, ChevronUp } from "lucide-react"

const FilterSidebar = ({ selectedFilters, onFilterChange }) => {
  const [expandedSections, setExpandedSections] = useState({
    category: true,
    size: true,
    dressLength: true,
    color: true,
    sleeveLength: true,
  })

  const toggleSection = (section) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }))
  }

  const sizes = ["XS", "S", "M", "L", "XL", "0", "4", "6", "10"]
  const dressLengths = ["Short", "Knee Length", "Midi", "Long", "Not Specified"]
  const colors = [
    { name: "Black", code: "#000000" },
    { name: "Blue", code: "#0000FF" },
    { name: "Green", code: "#00FF00" },
    { name: "Brown", code: "#8B4513" },
    { name: "Orange", code: "#FFA500" },
    { name: "Pink", code: "#FFC0CB" },
    { name: "Purple", code: "#800080" },
    { name: "Red", code: "#FF0000" },
    { name: "White", code: "#FFFFFF" },
    { name: "Yellow", code: "#FFFF00" },
  ]
  const sleeveLengths = ["Sleeveless", "Short Sleeve", "Long Sleeve"]

  return (
    <div className="filter-sidebar">
      <h4 className="mb-3">Category</h4>

      <div className="filter-section mb-4">
        <div
          className="d-flex justify-content-between align-items-center mb-2 cursor-pointer"
          onClick={() => toggleSection("category")}
        >
          <h5 className="m-0">All</h5>
          {expandedSections.category ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
        </div>

        {expandedSections.category && (
          <ul className="list-unstyled ps-2">
            <li className="mb-2">
              <a href="#" className="text-decoration-none">
                Clothing, Shoes & Accessories
              </a>
            </li>
            <li className="mb-2 ps-3">
              <a href="#" className="text-decoration-none">
                Women's Dresses
              </a>
            </li>
            <li className="mb-2 ps-3">
              <a href="#" className="text-decoration-none">
                Women's Tops
              </a>
            </li>
            <li className="mb-2 ps-3">
              <a href="#" className="text-decoration-none">
                More +
              </a>
            </li>
            <li className="mb-2">
              <a href="#" className="text-decoration-none">
                Show More +
              </a>
            </li>
          </ul>
        )}
      </div>

      <div className="filter-section mb-4">
        <div
          className="d-flex justify-content-between align-items-center mb-2 cursor-pointer"
          onClick={() => toggleSection("size")}
        >
          <h5 className="m-0">Size</h5>
          {expandedSections.size ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
        </div>

        {expandedSections.size && (
          <div>
            <div className="mb-2">
              <span className="fw-bold">Regular</span>
            </div>
            <div className="d-flex flex-wrap gap-2 mb-3">
              {sizes.map((size, index) => (
                <div key={index} className="form-check">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    id={`size-${size}`}
                    checked={selectedFilters.size.includes(size)}
                    onChange={() => onFilterChange("size", size)}
                  />
                  <label className="form-check-label" htmlFor={`size-${size}`}>
                    {size}
                  </label>
                </div>
              ))}
            </div>
            <div className="mb-2">
              <span className="fw-bold">+ Petites</span>
            </div>
          </div>
        )}
      </div>

      <div className="filter-section mb-4">
        <div
          className="d-flex justify-content-between align-items-center mb-2 cursor-pointer"
          onClick={() => toggleSection("dressLength")}
        >
          <h5 className="m-0">Dress Length</h5>
          {expandedSections.dressLength ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
        </div>

        {expandedSections.dressLength && (
          <div>
            {dressLengths.map((length, index) => (
              <div key={index} className="form-check mb-2">
                <input
                  className="form-check-input"
                  type="checkbox"
                  id={`length-${length}`}
                  checked={selectedFilters.dressLength.includes(length)}
                  onChange={() => onFilterChange("dressLength", length)}
                />
                <label className="form-check-label" htmlFor={`length-${length}`}>
                  {length}
                </label>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="filter-section mb-4">
        <div
          className="d-flex justify-content-between align-items-center mb-2 cursor-pointer"
          onClick={() => toggleSection("color")}
        >
          <h5 className="m-0">Color</h5>
          {expandedSections.color ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
        </div>

        {expandedSections.color && (
          <div className="d-flex flex-wrap gap-2">
            {colors.map((color, index) => (
              <div key={index} className="color-option">
                <input
                  type="checkbox"
                  id={`color-${color.name}`}
                  className="d-none"
                  checked={selectedFilters.color.includes(color.name)}
                  onChange={() => onFilterChange("color", color.name)}
                />
                <label
                  htmlFor={`color-${color.name}`}
                  className={`d-block rounded-circle ${color.name === "White" ? "border" : ""}`}
                  style={{
                    backgroundColor: color.code,
                    width: "30px",
                    height: "30px",
                    border: selectedFilters.color.includes(color.name) ? "2px solid #0066c0" : "none",
                  }}
                  title={color.name}
                ></label>
              </div>
            ))}
            <div className="mt-2 w-100">
              <a href="#" className="text-decoration-none">
                see all
              </a>
            </div>
          </div>
        )}
      </div>

      <div className="filter-section mb-4">
        <div
          className="d-flex justify-content-between align-items-center mb-2 cursor-pointer"
          onClick={() => toggleSection("sleeveLength")}
        >
          <h5 className="m-0">Sleeve Length</h5>
          {expandedSections.sleeveLength ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
        </div>

        {expandedSections.sleeveLength && (
          <div>
            {sleeveLengths.map((length, index) => (
              <div key={index} className="form-check mb-2">
                <input
                  className="form-check-input"
                  type="checkbox"
                  id={`sleeve-${length}`}
                  checked={selectedFilters.sleeveLength.includes(length)}
                  onChange={() => onFilterChange("sleeveLength", length)}
                />
                <label className="form-check-label" htmlFor={`sleeve-${length}`}>
                  {length}
                </label>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default FilterSidebar

