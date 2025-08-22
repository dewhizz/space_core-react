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
    ? { headers: { Authorization: `Bearer ${token}` } }
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
        fontFamily: "Poppins, sans-serif",
        background: "linear-gradient(to right, #f0f4ff, #fff0f5)",
      }}
    >
      <ToastContainer position="top-right" autoClose={3000} />

      {/* Breadcrumb */}
      <div className="container mb-4">
        <nav
          aria-label="breadcrumb"
          className="d-flex justify-content-between align-items-center bg-white rounded shadow-sm px-3 py-2"
        >
          <ol className="breadcrumb mb-0 d-flex align-items-center">
            <li className="breadcrumb-item">
              <Link
                to={user?.role === "owner" ? "/owner-dashboard" : "/user-dashboard"}
                className="text-decoration-none fw-semibold d-flex align-items-center"
                style={{ color: "#2c3e50" }}
              >
                <i className="bi bi-person-check me-2"></i> Profile
              </Link>
            </li>
          </ol>
        </nav>

        <h3 className="text-center text-gradient fw-bold mt-4 mb-3">
          🏡 Explore Our Featured Properties
        </h3>
        <p className="text-center text-muted mb-4">
          Find your next space and send an inquiry with just one click.
        </p>
      </div>

      {/* Property Cards */}
      <div className="container">
        {loading ? (
          <div className="alert alert-info text-center">
            <i className="bi bi-arrow-repeat me-2 spin"></i> Loading properties...
          </div>
        ) : properties.length === 0 ? (
          <div className="alert alert-warning text-center">
            <i className="bi bi-exclamation-triangle-fill me-2"></i>No properties found.
          </div>
        ) : (
          <div className="row">
            {properties.map((prop) => (
              <div className="col-md-6 col-lg-4 mb-4" key={prop._id}>
                <div
                  className="card h-100 shadow-lg border-0"
                  style={{
                    borderRadius: "16px",
                    overflow: "hidden",
                    backgroundColor: "#ffffff",
                    transition: "transform 0.3s ease",
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.02)")}
                  onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
                >
                  <img
                    src={`https://space-core.onrender.com/${prop.photo}`}
                    alt={prop.title}
                    className="card-img-top"
                    style={{
                      height: "250px",
                      objectFit: "cover",
                      borderBottom: "4px solid #00796b",
                    }}
                  />
                  <div className="card-body p-4">
                    <h5 className="card-title fw-bold text-primary mb-2">
                      {prop.title}
                    </h5>
                    <p className="card-text text-dark mb-3">
                      {prop.description || "No description available."}
                    </p>

                    <ul className="list-unstyled text-muted small mb-3">
                      {prop.plotNumber && (
                        <li>
                          <i className="bi bi-geo-alt-fill me-2 text-danger"></i>
                          Plot Number: <strong>{prop.plotNumber}</strong>
                        </li>
                      )}
                      {prop.location && (
                        <li>
                          <i className="bi bi-map me-2 text-success"></i>
                          Location: <strong>{prop.location}</strong>
                        </li>
                      )}
                      {prop.owner?.name && (
                        <li>
                          <i className="bi bi-person-fill me-2 text-info"></i>
                          Owner: <strong>{prop.owner.name}</strong>
                        </li>
                      )}
                      {prop.rentAmount && (
                        <li>
                          <i className="bi bi-cash me-2 text-warning"></i>
                          Rent Amount: <strong>${prop.rentAmount}</strong>
                        </li>
                      )}
                      {prop.depositAmount && (
                        <li>
                          <i className="bi bi-cash-coin me-2 text-primary"></i>
                          Deposit Amount: <strong>${prop.depositAmount}</strong>
                        </li>
                      )}
                    </ul>

                    <button
                      onClick={() => handleAddInquiry(prop._id)}
                      className="btn btn-success w-100 fw-semibold"
                    >
                      <i className="bi bi-chat-left-text-fill me-2"></i> Send Inquiry
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Scroll-to-Top Button */}
      <button
        className="btn rounded-circle shadow-lg"
        style={{
          backgroundColor: "#00796b",
          color: "#fff",
          position: "fixed",
          bottom: "20px",
          right: "20px",
          width: "56px",
          height: "56px",
          zIndex: "1000",
        }}
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      >
        <i className="bi bi-arrow-up fs-4"></i>
      </button>

      {/* Custom Styles */}
      <style>{`
        .text-gradient {
          background: linear-gradient(to right, #00796b, #00b894);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }
        .spin {
          animation: spin 1s linear infinite;
        }
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};

export default GetProperties;
