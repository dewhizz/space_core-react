import React from "react";
import { Link } from "react-router-dom";

const HomeComponent = () => {
  return (
    <div
      className="homepage"
      style={{
        background: "linear-gradient(135deg, #dee4ea, #f5f7fb)",
        minHeight: "100vh",
        fontFamily: "'Poppins', sans-serif",
        paddingBottom: "2rem",
      }}
    >
      {/* Navbar */}
      <nav className="navbar navbar-expand-lg navbar-dark bg-success shadow-sm">
        <div className="container">
          <Link className="navbar-brand fw-bold" to="/">
            Space Core
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div
            className="collapse navbar-collapse justify-content-end"
            id="navbarSupportedContent"
          >
            <ul className="navbar-nav">
              <li className="nav-item">
                <Link className="nav-link" to="/about-us">
                  About Us
                </Link>
              </li>
              <li className="nav-item">
                <a href="#space" className="nav-link">
                  What is Space
                </a>
              </li>
              <li className="nav-item">
                <a href="#why-space-core" className="nav-link">
                  Why Us
                </a>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/login">
                  Login
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/register">
                  Get Started
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      {/* Banner Section */}
      <div className="container mt-5">
        <div className="row g-0 align-items-center bg-dark text-white rounded overflow-hidden shadow-lg">
          <div className="col-8">
            <img
              src="/images/banner.jpg"
              alt="banner"
              className="img-fluid w-100 h-100 object-fit-cover"
              style={{ minHeight: "100%", maxHeight: "900px" }}
            />
          </div>
          <div className="col-4 p-4">
            <h1 className="display-6 fw-bold">Welcome to Space Core</h1>
            <Link
              to="/about-us"
              className="text-decoration-none"
              style={{ color: "#f06292", fontWeight: "500" }}
            >
              <i className="bi bi-hand-index-thumb">
                {" "}
                Learn more about us .....
              </i>
            </Link>
          </div>
        </div>
      </div>

      {/* CTA Buttons */}
      <div className="d-flex justify-content-center gap-3 container mt-4">
        <Link
          to="/register"
          className="btn btn-outline-dark btn-sm px-4"
          style={{ color: "#212529", fontWeight: "600" }}
          onMouseEnter={(e) => (e.target.style.color = "#00e676")}
          onMouseLeave={(e) => (e.target.style.color = "#212529")}
        >
          Get Started
        </Link>

        <Link
          to="/login"
          className="btn btn-outline-dark btn-sm px-4"
          style={{ color: "#212529", fontWeight: "600" }}
          onMouseEnter={(e) => (e.target.style.color = "#00e676")}
          onMouseLeave={(e) => (e.target.style.color = "#212529")}
        >
          Login
        </Link>
      </div>
    </div>
  );
};

export default HomeComponent;
