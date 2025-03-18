import { Link } from "react-router-dom"

const CategoryCard = ({ category }) => {
  return (
    <Link to={`/category/${category.id}`} className="text-decoration-none text-dark">
      <div className="category-card text-center">
        <div className="rounded-circle overflow-hidden mx-auto mb-2" style={{ width: "120px", height: "120px" }}>
          <img src={category.image || "/placeholder.svg"} alt={category.name} className="img-fluid" />
        </div>
        <h6 className="mt-2">{category.name}</h6>
      </div>
    </Link>
  )
}

export default CategoryCard

