import React, { useEffect, useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "bootstrap-icons/font/bootstrap-icons.css";

const GetProperties = () => {
  const { token, user } = useContext(AuthContext);
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const authHeader = token
    ? {
        headers: { Authorization: `Bearer ${token}` },
      }
    : {};

  const FetchProperties = async () => {
    setLoading(true);
    try {
      toast.info("Loading properties ....", { theme: "colored" });
      const res = await axios.get(
        "https://space-core.onrender.com/api/properties/",
        authHeader
      );
      setProperties(res.data);
      toast.dismiss();
    } catch (error) {
      toast.dismiss();
      toast.error(
        error.response?.data?.message || "Failed to load properties",
        { theme: "colored" }
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    FetchProperties();
  }, []);

  const handleAddInquiry = (propertyId) => {
    navigate("/user-dashboard/inquires/add", { state: { propertyId } });
  };

  return (
    <div
      className="container-fluid py-4"
      style={{
        minHeight: "100vh",
        fontFamily: "Inter, sans-serif",
        background: "linear-gradient(to right, #e3f2fd, #fce4ec)",
      }}
    >
      <ToastContainer position="top-right" autoClose={3000} />

      {/* Breadcrumb with Dashboard link and page title */}
      <div className="container mb-4">
        <nav
          aria-label="breadcrumb"
          className="d-flex justify-content-between align-items-center bg-white rounded shadow-sm px-3 py-2"
        >
          <ol className="breadcrumb mb-0 d-flex align-items-center">
            <li className="breadcrumb-item">
              <Link
                to={
                  user?.role === "owner"
                    ? "/owner-dashboard"
                    : "/user-dashboard"
                }
                className="text-decoration-none fw-semibold d-flex align-items-center"
                style={{ color: "#2c3e50" }}
              >
                <i className="bi bi-person-check me-2"></i>{" "}
                {/* profile*/}
                Profile
              </Link>
            </li>
          </ol>
        </nav>

        <h4 className="mb-0 text-primary fw-bold text-center mt-3">
          Available Properties
        </h4>
      </div>

      {/* Property Cards */}
      <div className="container">
        {loading ? (
          <div className="alert alert-info text-center">
            <i className="bi bi-arrow-repeat me-2 spin"></i> Loading
            properties...
          </div>
        ) : properties.length === 0 ? (
          <div className="alert alert-warning text-center">
            <i className="bi bi-exclamation-triangle-fill me-2"></i>No
            properties found.
          </div>
        ) : (
          <div className="row">
            {properties.map((prop) => (
              <div className="col-md-6 mb-4" key={prop._id}>
                <div
                  className="card h-100 shadow"
                  style={{
                    borderRadius: "15px",
                    overflow: "hidden",
                    backgroundColor: "#fefefe",
                    border: "3px solid gold",
                    transition: "transform 0.25s ease-in-out",
                    boxShadow: "0 6px 12px rgba(0,0,0,0.1)",
                  }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.transform = "scale(1.02)")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.transform = "scale(1)")
                  }
                >
                  <img
                    src={`https://space-core.onrender.com/${prop.photo}`}
                    alt={prop.title}
                    className="card-img-top"
                    style={{
                      height: "350px",
                      objectFit: "cover",
                      width: "100%",
                      borderBottom: "2px solid gold",
                    }}
                  />
                  <div className="card-body d-flex flex-column">
                    <h5 className="card-title fw-bold text-dark mb-2">
                      {prop.title}
                    </h5>
                    <p
                      className="card-text text-muted mb-3"
                      style={{ flexGrow: 1 }}
                    >
                      {prop.description
                        ? prop.description.length > 120
                          ? prop.description.slice(0, 120) + "..."
                          : prop.description
                        : "No description available"}
                    </p>

                    <div className="d-flex justify-content-between align-items-center">
                      <small className="text-secondary">
                        <i className="bi bi-eye-fill me-1"></i>
                        {prop.views || 0} views
                      </small>

                      <button
                        onClick={() => handleAddInquiry(prop._id)}
                        className="btn btn-sm"
                        style={{
                          backgroundColor: "#00796b",
                          color: "#fff",
                          fontWeight: "600",
                        }}
                      >
                        <i className="bi bi-chat-left-text-fill me-1"></i> Add
                        Inquiry
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Floating Scroll-to-Top Button */}
      <button
        className="btn rounded-circle shadow-lg"
        style={{
          backgroundColor: "gold",
          color: "#2c3e50",
          position: "fixed",
          bottom: "20px",
          right: "20px",
          width: "56px",
          height: "56px",
          zIndex: "1000",
          fontWeight: "bold",
        }}
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      >
        <i className="bi bi-arrow-up fs-4"></i>
      </button>
    </div>
  );
};

export default GetProperties;
