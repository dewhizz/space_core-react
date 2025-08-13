import React, { useEffect, useState, useContext, useCallback } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AuthContext } from "../context/AuthContext"; // Ensure inside src/context/AuthContext.js
import "bootstrap-icons/font/bootstrap-icons.css"; // Make sure Bootstrap Icons are installed

const GetProperties = () => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(false);
  const { token, user } = useContext(AuthContext);
  const navigate = useNavigate();

  const apiUrl =
    user?.role === "owner"
      ? "https://space-core.onrender.com/api/properties/owner-properties"
      : "https://space-core.onrender.com/api/properties";

  const fetchProperties = useCallback(async () => {
    setLoading(true);
    try {
      toast.info("Loading properties...", { theme: "colored" });

      const authHeader = {
        headers: { Authorization: `Bearer ${token}` },
      };

      const res = await axios.get(apiUrl, authHeader);
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
  }, [apiUrl, token]);

  useEffect(() => {
    fetchProperties();
  }, [fetchProperties]);

  const handleAddInquiry = (propertyId) => {
    navigate("/inquiries/add", { state: { propertyId } });
  };

  return (
    <div className="container mt-4">
      <ToastContainer position="top-right" autoClose={3000} />

      <nav aria-label="breadcrumb" className="mb-4">
        <ol className="breadcrumb bg-light rounded p-2 shadow-sm">
          <li className="breadcrumb-item fw-bold">
            <Link
              to={
                user?.role === "owner" ? "/owner-dashboard" : "/user-dashboard"
              }
              className="text-primary text-decoration-none"
            >
              <i className="bi bi-speedometer2 me-1"></i>Dashboard
            </Link>
          </li>
          <li
            className="breadcrumb-item active text-secondary"
            aria-current="page"
          >
            <i className="bi bi-house-door-fill me-1"></i>Properties
          </li>
        </ol>
      </nav>

      {user?.role === "owner" && (
        <div className="d-flex justify-content-end mb-4">
          <button
            className="btn btn-gradient-primary shadow-sm"
            onClick={() => navigate("/owner-dashboard/properties/add")}
            disabled={loading}
            style={{
              background: "linear-gradient(90deg, #4b6cb7 0%, #182848 100%)",
              color: "white",
              fontWeight: "600",
              border: "none",
              boxShadow: "0 4px 15px rgba(75,108,183,0.4)",
              transition: "transform 0.15s ease-in-out",
            }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.transform = "scale(1.05)")
            }
            onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
          >
            <i className="bi bi-plus-circle-fill me-2"></i> Add New Property
          </button>
        </div>
      )}

      {loading ? (
        <div className="alert alert-info text-center">
          <i className="bi bi-arrow-repeat spin me-2"></i> Loading properties...
        </div>
      ) : properties.length === 0 ? (
        <div className="alert alert-warning text-center">
          <i className="bi bi-exclamation-triangle-fill me-2"></i>No properties
          found.
        </div>
      ) : (
        <div className="row">
          {properties.map((prop) => (
            <div key={prop._id} className="col-md-4 mb-4">
              <div
                className="card shadow-sm h-100 border-0"
                style={{
                  borderRadius: "12px",
                  overflow: "hidden",
                  boxShadow: "0 6px 18px rgba(0,0,0,0.1)",
                  border: "2px solid gold", // gold border outline
                }}
              >
                <img
                  src={
                    prop.photo ||
                    "https://via.placeholder.com/400x200?text=No+Image"
                  }
                  alt={prop.title}
                  className="card-img-top"
                  style={{
                    height: "200px",
                    objectFit: "cover",
                    filter: "brightness(0.9)",
                  }}
                />
                <div className="card-body d-flex flex-column">
                  <h5 className="card-title text-primary fw-bold">
                    {prop.title}
                  </h5>
                  <p
                    className="card-text text-muted"
                    style={{
                      flexGrow: 1,
                      fontSize: "0.95rem",
                      lineHeight: "1.3",
                    }}
                    title={prop.description}
                  >
                    {prop.description
                      ? prop.description.length > 100
                        ? prop.description.slice(0, 100) + "..."
                        : prop.description
                      : "No description available"}
                  </p>
                  <div className="mb-3 d-flex justify-content-between align-items-center">
                    <small className="text-secondary d-flex align-items-center">
                      <i className="bi bi-eye-fill me-1"></i> {prop.views || 0}{" "}
                      views
                    </small>

                    <div>
                      {user?.role === "owner" && (
                        <Link
                          to={`/owner-dashboard/properties/edit/${prop._id}`}
                          className="btn btn-sm btn-outline-primary me-2"
                          style={{ fontWeight: "600" }}
                        >
                          <i className="bi bi-pencil-fill"></i> Edit
                        </Link>
                      )}

                      <button
                        onClick={() => handleAddInquiry(prop._id)}
                        className="btn btn-sm btn-success"
                        style={{ fontWeight: "600" }}
                      >
                        <i className="bi bi-chat-left-text-fill me-1"></i> Add
                        Inquiry
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default GetProperties;
