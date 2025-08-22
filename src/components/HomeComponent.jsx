import React from "react";
import { Link } from "react-router-dom";

const HomeComponent = () => {
  return (
    <div
      className="homepage"
      style={{
        background: "linear-gradient(135deg, #e3f2fd, #fce4ec)",
        minHeight: "100vh",
        fontFamily: "'Poppins', sans-serif",
        paddingBottom: "2rem",
      }}
    >
      {/* Navbar */}
      <nav className="navbar navbar-expand-lg navbar-dark bg-success shadow-sm">
        <div className="container">
          <Link className="navbar-brand fw-bold" to="/" style={{ fontFamily: "'Playfair Display', serif" }}>
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
                <Link className="nav-link" to="/about-us">About Us</Link>
              </li>
              <li className="nav-item">
                <a href="#space" className="nav-link">What is Space</a>
              </li>
              <li className="nav-item">
                <a href="#why-space-core" className="nav-link">Why Us</a>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/login">Login</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/register">Get Started</Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="container mt-5">
        <div className="row g-0 align-items-center bg-dark text-white rounded overflow-hidden shadow-lg">
          <div className="col-md-8">
            <img
              src="/images/banner.jpg"
              alt="banner"
              className="img-fluid w-100 h-100 object-fit-cover"
              style={{ minHeight: "100%", maxHeight: "600px", objectFit: "cover" }}
            />
          </div>
          <div className="col-md-4 p-4">
            <h1 className="display-6 fw-bold" style={{ fontFamily: "'Playfair Display', serif" }}>
              Welcome to Space Core
            </h1>
            <p className="lead">
              Discover premium rental spaces tailored for comfort, convenience, and community.
            </p>
            <Link to="/about-us" className="btn btn-outline-light mt-3">
              Learn More
            </Link>
          </div>
        </div>
      </div>

      {/* CTA Buttons */}
      <div className="d-flex justify-content-center gap-3 container mt-4">
        <Link to="/register" className="btn btn-dark btn-lg px-4">
          Get Started
        </Link>
        <Link to="/login" className="btn btn-outline-dark btn-lg px-4">
          Login
        </Link>
      </div>

      {/* What is Space Section */}
      <section id="space" className="container mt-5">
        <h2 className="text-center fw-bold mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>
          What is Space Core?
        </h2>
        <div className="row text-center">
          <div className="col-md-4 mb-4">
            <i className="bi bi-house-door-fill fs-1 text-success"></i>
            <h5 className="mt-2">Smart Listings</h5>
            <p>Find properties that match your lifestyle and budget with intelligent filtering.</p>
          </div>
          <div className="col-md-4 mb-4">
            <i className="bi bi-shield-check fs-1 text-success"></i>
            <h5 className="mt-2">Verified Owners</h5>
            <p>We ensure every listing is vetted for authenticity and safety.</p>
          </div>
          <div className="col-md-4 mb-4">
            <i className="bi bi-calendar-check-fill fs-1 text-success"></i>
            <h5 className="mt-2">Flexible Booking</h5>
            <p>Schedule visits, book instantly, or negotiate terms with ease.</p>
          </div>
        </div>
      </section>

      {/* Why Us Section */}
      <section id="why-space-core" className="container mt-5">
        <h2 className="text-center fw-bold mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>
          Why Choose Space Core?
        </h2>
        <div className="row">
          <div className="col-md-6">
            <ul className="list-group list-group-flush">
              <li className="list-group-item">
                <i className="bi bi-check-circle-fill text-success me-2"></i>
                Seamless user experience
              </li>
              <li className="list-group-item">
                <i className="bi bi-check-circle-fill text-success me-2"></i>
                Transparent pricing and policies
              </li>
              <li className="list-group-item">
                <i className="bi bi-check-circle-fill text-success me-2"></i>
                24/7 customer support
              </li>
              <li className="list-group-item">
                <i className="bi bi-check-circle-fill text-success me-2"></i>
                Trusted by thousands of renters and owners
              </li>
            </ul>
          </div>
          <div className="col-md-6">
            <img
              src="/images/down.png"
              alt="Why Us"
              className="img-fluid rounded shadow-sm"
              style={{ height: "200px", objectFit: "cover" }}
            />
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomeComponent;