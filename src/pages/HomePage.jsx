"use client"

import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { ChevronLeft, ChevronRight, Pause } from "lucide-react"
import CategoryCard from "../components/CategoryCard"

const HomePage = () => {
  const [products, setProducts] = useState([])
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isPlaying, setIsPlaying] = useState(true)

  useEffect(() => {
    // Fetch data from database.json
    fetch("/database.json")
      .then((response) => response.json())
      .then((data) => {
        setProducts(data.products || [])
      })
      .catch((error) => console.error("Error fetching data:", error))

    // Auto-advance carousel
    let interval
    if (isPlaying) {
      interval = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % 3) // Assuming 3 slides
      }, 5000)
    }

    return () => clearInterval(interval)
  }, [isPlaying])

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % 3)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + 3) % 3)
  }

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying)
  }

  const categories = [
    { id: 1, name: "Luxury", image: "/placeholder.svg?height=150&width=150" },
    { id: 2, name: "Sneakers", image: "/placeholder.svg?height=150&width=150" },
    { id: 3, name: "P&A", image: "/placeholder.svg?height=150&width=150" },
    { id: 4, name: "Refurbished", image: "/placeholder.svg?height=150&width=150" },
    { id: 5, name: "Trading cards", image: "/placeholder.svg?height=150&width=150" },
    { id: 6, name: "Pre-loved Luxury", image: "/placeholder.svg?height=150&width=150" },
    { id: 7, name: "Toys", image: "/placeholder.svg?height=150&width=150" },
  ]

  const carouselSlides = [
    {
      id: 1,
      title: "There's a deal for you, too",
      subtitle: "Don't miss a chance to save on items you've been looking for.",
      buttonText: "Explore now",
      buttonLink: "/deals",
      bgColor: "#ff5722",
      image: "/placeholder.svg?height=400&width=600",
    },
    {
      id: 2,
      title: "Top brands, bottom prices",
      subtitle: "Find amazing deals on your favorite brands.",
      buttonText: "Shop now",
      buttonLink: "/brands",
      bgColor: "#2196f3",
      image: "/placeholder.svg?height=400&width=600",
    },
    {
      id: 3,
      title: "New season, new style",
      subtitle: "Discover the latest fashion trends at great prices.",
      buttonText: "See more",
      buttonLink: "/fashion",
      bgColor: "#4caf50",
      image: "/placeholder.svg?height=400&width=600",
    },
  ]

  return (
    <div className="home-page">
      {/* Hero Carousel */}
      <div className="position-relative my-3 mx-4">
        <div className="carousel-container overflow-hidden rounded-3" style={{ height: "300px" }}>
          {carouselSlides.map((slide, index) => (
            <div
              key={slide.id}
              className="carousel-slide position-absolute w-100 h-100 d-flex align-items-center"
              style={{
                left: `${(index - currentSlide) * 100}%`,
                transition: "left 0.5s ease-in-out",
                backgroundColor: slide.bgColor,
              }}
            >
              <div className="container d-flex">
                <div className="text-white p-4" style={{ maxWidth: "50%" }}>
                  <h2 className="display-5 fw-bold">{slide.title}</h2>
                  <p className="lead">{slide.subtitle}</p>
                  <Link to={slide.buttonLink} className="btn btn-light rounded-pill px-4 py-2">
                    {slide.buttonText}
                  </Link>
                </div>
                <div className="carousel-image" style={{ flex: 1 }}>
                  <img src={slide.image || "/placeholder.svg"} alt={slide.title} className="img-fluid" />
                </div>
              </div>
            </div>
          ))}
        </div>

        <button
          className="carousel-control position-absolute top-50 start-0 translate-middle-y bg-white rounded-circle p-2 border-0 shadow-sm"
          onClick={prevSlide}
          style={{ zIndex: 10, marginLeft: "10px" }}
        >
          <ChevronLeft size={24} />
        </button>

        <button
          className="carousel-control position-absolute top-50 end-0 translate-middle-y bg-white rounded-circle p-2 border-0 shadow-sm"
          onClick={nextSlide}
          style={{ zIndex: 10, marginRight: "10px" }}
        >
          <ChevronRight size={24} />
        </button>

        <button
          className="carousel-control position-absolute bottom-0 end-0 bg-white rounded-circle p-2 border-0 shadow-sm"
          onClick={togglePlayPause}
          style={{ zIndex: 10, marginRight: "10px", marginBottom: "10px" }}
        >
          <Pause size={24} />
        </button>

        <div className="carousel-indicators position-absolute bottom-0 start-50 translate-middle-x mb-3">
          {carouselSlides.map((_, index) => (
            <button
              key={index}
              className={`rounded-circle mx-1 border-0 ${currentSlide === index ? "bg-white" : "bg-white opacity-50"}`}
              style={{ width: "10px", height: "10px" }}
              onClick={() => setCurrentSlide(index)}
            ></button>
          ))}
        </div>
      </div>

      {/* Popular Categories */}
      <div className="container my-5">
        <h2 className="mb-4 fw-bold">Explore Popular Categories</h2>
        <div className="row g-4">
          {categories.map((category) => (
            <div key={category.id} className="col-md-3 col-lg-auto">
              <CategoryCard category={category} />
            </div>
          ))}
        </div>
      </div>

      {/* Shopping Made Easy Section */}
      <div className="container-fluid bg-light py-4 my-5">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-md-8">
              <h2 className="fw-bold">Shopping made easy</h2>
              <p>Enjoy reliability, secure deliveries and hassle-free returns.</p>
            </div>
            <div className="col-md-4 text-end">
              <Link to="/start-shopping" className="btn btn-dark rounded-pill px-4">
                Start now
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default HomePage

