import { Link } from "react-router-dom"
import { Facebook, Twitter, Instagram, Youtube, Linkedin } from "lucide-react"

const Footer = () => {
  return (
    <footer className="bg-light mt-5 pt-4">
      <div className="container">
        <div className="row">
          <div className="col-md-3 mb-4">
            <h5 className="mb-3">Buy</h5>
            <ul className="list-unstyled">
              <li className="mb-2">
                <Link to="/registration" className="text-decoration-none text-secondary">
                  Registration
                </Link>
              </li>
              <li className="mb-2">
                <Link to="/money-back-guarantee" className="text-decoration-none text-secondary">
                  Money Back Guarantee
                </Link>
              </li>
              <li className="mb-2">
                <Link to="/bidding-buying-help" className="text-decoration-none text-secondary">
                  Bidding & buying help
                </Link>
              </li>
              <li className="mb-2">
                <Link to="/stores" className="text-decoration-none text-secondary">
                  Stores
                </Link>
              </li>
            </ul>
          </div>

          <div className="col-md-3 mb-4">
            <h5 className="mb-3">Sell</h5>
            <ul className="list-unstyled">
              <li className="mb-2">
                <Link to="/start-selling" className="text-decoration-none text-secondary">
                  Start selling
                </Link>
              </li>
              <li className="mb-2">
                <Link to="/learn-to-sell" className="text-decoration-none text-secondary">
                  Learn to sell
                </Link>
              </li>
              <li className="mb-2">
                <Link to="/affiliates" className="text-decoration-none text-secondary">
                  Affiliates
                </Link>
              </li>
              <li className="mb-2">
                <Link to="/seller-center" className="text-decoration-none text-secondary">
                  Seller center
                </Link>
              </li>
            </ul>
          </div>

          <div className="col-md-3 mb-4">
            <h5 className="mb-3">About eBay</h5>
            <ul className="list-unstyled">
              <li className="mb-2">
                <Link to="/company" className="text-decoration-none text-secondary">
                  Company info
                </Link>
              </li>
              <li className="mb-2">
                <Link to="/news" className="text-decoration-none text-secondary">
                  News
                </Link>
              </li>
              <li className="mb-2">
                <Link to="/investors" className="text-decoration-none text-secondary">
                  Investors
                </Link>
              </li>
              <li className="mb-2">
                <Link to="/careers" className="text-decoration-none text-secondary">
                  Careers
                </Link>
              </li>
              <li className="mb-2">
                <Link to="/policies" className="text-decoration-none text-secondary">
                  Policies
                </Link>
              </li>
            </ul>
          </div>

          <div className="col-md-3 mb-4">
            <h5 className="mb-3">Help & Contact</h5>
            <ul className="list-unstyled">
              <li className="mb-2">
                <Link to="/help" className="text-decoration-none text-secondary">
                  Seller Information Center
                </Link>
              </li>
              <li className="mb-2">
                <Link to="/contact" className="text-decoration-none text-secondary">
                  Contact Us
                </Link>
              </li>
              <li className="mb-2">
                <Link to="/community" className="text-decoration-none text-secondary">
                  Community
                </Link>
              </li>
            </ul>

            <h5 className="mb-3 mt-4">Stay connected</h5>
            <div className="d-flex gap-3">
              <a href="#" className="text-secondary">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-secondary">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-secondary">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-secondary">
                <Youtube size={20} />
              </a>
              <a href="#" className="text-secondary">
                <Linkedin size={20} />
              </a>
            </div>
          </div>
        </div>

        <hr />

        <div className="row py-3">
          <div className="col-md-8 small text-secondary">
            <p>
              Copyright © 1995-2023 eBay Inc. All Rights Reserved. Accessibility, User Agreement, Privacy, Payments
              Terms of Use, Cookies, Your Privacy Choices and AdChoice
            </p>
          </div>
          <div className="col-md-4 text-md-end">
            <img
              src="/placeholder.svg?height=30&width=200&text=Payment+Methods"
              alt="Payment Methods"
              className="img-fluid"
            />
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer

