import React from 'react'
import { Link } from 'react-router-dom';

const HomeComponent = () => {
  return (
    <div className="homepage">
      {/* navbar */}
      <nav className="navbar navbar-expand-lg navbar-dark bg-success">
        <div className="container">
          <Link className="navbar-brand" to={"/"}>
            Space Core
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div
            className="collapse navbar-collapse justify-content-end"
            id="navbarSupportedContent"
          >
            <ul className="navbar-nav">
              <li className="nav-item">
                <a href="#about" className="nav-link">
                  About Us
                </a>
              </li>
              <li className="nav-item">
                <a href="#space" className="nav-link">
                  What is Space
                </a>
              </li>
              <li className="nav-item">
                <a href="#why-space core" className="nav-link">
                  Why Us
                </a>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to={"/login"}>
                  Login
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to={"/register"}>
                  Get Started
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      {/* here section */}
      <section className="hero position-relative text-white">
        <img
          src="/images/banner.jpg"
          alt="banner"
          className="w-100 img-fluid"
          style={{ maxHeight: "500px", objectFit: "cover" }}
        />
      </section>

      {/* about section */}
      <section id="about" className="py-5 bg-light">
        <section className="about-us text-center my-5 px-4">
          <h2 className="text-success display-4 fw-bold">About Space Core</h2>
          <p className="lead mt-3">
            At <strong>Space Core</strong>, we believe finding your perfect
            space should be effortless, flexible, and tailored to your
            lifestyle. Whether you're searching for a cozy apartment, a modern
            co-working hub, or a short-term studio, we put the power in your
            hands—on your time.
          </p>
          <p className="mt-3">
            Our platform brings together verified listings, smart filters, and
            user-friendly tools to make your space search seamless. Say goodbye
            to endless phone calls and outdated directories.
          </p>
          <p className="mt-3">
            <strong>Space Core:</strong> Your next space, found your way.
          </p>
        </section>
      </section>
    </div>
  );
}

export default HomeComponent