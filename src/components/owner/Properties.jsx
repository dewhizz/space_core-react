import React, { useContext, useEffect, useState, useRef } from "react";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import axios from "axios";
import {
  House,
  PlusCircle,
  Buildings,
  PencilSimple,
  Spinner,
} from "phosphor-react";
import "react-toastify/dist/ReactToastify.css";

const OwnerProperties = () => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(false);

  const { token } = useContext(AuthContext);
  const navigate = useNavigate();
  const propertiesRef = useRef(null);

  const authHeader = {
    headers: { Authorization: `Bearer ${token}` },
  };

  const fetchProperties = async () => {
    try {
      setLoading(true);
      toast.info("Loading your properties...");

      const res = await axios.get(
        "https://space-core.onrender.com/api/properties/owner-properties",
        authHeader
      );
      setProperties(res.data || []);
      toast.dismiss();
    } catch (error) {
      toast.dismiss();
      toast.error(error.response?.data?.message || "Failed to load properties");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProperties();
  }, []);

  const handleEdit = (propertyData) => {
    navigate("/owner-dashboard/properties/edit", { state: { propertyData } });
  };

    const handleDelete = async (id) => {
      if (window.confirm("Delete this inquiry?")) {
        try {
          toast.warning("Deleting inquiry...");
          const res = await axios.delete(
            `https://space-core.onrender.com/api/properties/${id}`,
            authHeader
          );
          toast.success(res.data.message);
          fetchProperties();
        } catch (error) {
          toast.dismiss();
          toast.error(error.response?.data?.message);
        }
      }
    };

  return (
    <div
      ref={propertiesRef}
      className="container mt-4"
      style={{ fontFamily: "Poppins, sans-serif", minHeight: "100vh" }}
    >
      <ToastContainer position="top-right" autoClose={3000} />

      {/* Breadcrumbs and Header */}
      <div className="d-flex justify-content-between align-items-center mb-3">
        <nav aria-label="breadcrumb">
          <ol className="breadcrumb">
            <li className="breadcrumb-item fw-bold">
              <Link
                to="/owner-dashboard"
                className="text-primary text-decoration-none"
              >
                <House size={18} weight="duotone" className="me-1" />
                Dashboard
              </Link>
            </li>
            <li
              className="breadcrumb-item active text-secondary"
              aria-current="page"
            >
              <Buildings size={18} weight="duotone" className="me-1" />
              Properties
            </li>
          </ol>
        </nav>
        <button
          className="btn btn-primary"
          onClick={() => navigate("/owner-dashboard/properties/add")}
        >
          <PlusCircle size={20} weight="fill" className="me-2" />
          Add Property
        </button>
      </div>

      {/* Card Container */}
      <div className="card shadow-sm p-4 mb-4" style={{ borderRadius: "12px" }}>
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h5 className="text-primary fw-semibold">
            <Buildings size={20} className="me-2" />
            My Properties
            <span className="badge bg-secondary ms-2">{properties.length}</span>
          </h5>
        </div>

        <div
          className="table-responsive"
          style={{
            maxHeight: "500px",
            overflowY: "auto",
            borderRadius: "10px",
            border: "1px solid #dee2e6",
          }}
        >
          {loading ? (
            <div className="text-center py-5">
              <Spinner size={32} className="text-primary spin" />
              <p className="mt-3">Fetching properties...</p>
            </div>
          ) : properties.length === 0 ? (
            <div className="text-center py-5">
              <img
                src="https://cdn-icons-png.flaticon.com/512/4076/4076549.png"
                alt="No properties"
                style={{ width: "120px", opacity: 0.6 }}
              />
              <p className="mt-3 text-muted">No properties found!</p>
            </div>
          ) : (
            <table className="table table-hover table-bordered align-middle mb-0">
              <thead className="table-light">
                <tr>
                  <th>Photo</th>
                  <th>Plot No.</th>
                  <th>Title</th>
                  <th>Type</th>
                  <th>Location</th>
                  <th>Rent</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {properties.map((prop) => (
                  <tr key={prop._id}>
                    <td>
                      <img
                        src={`https://space-core.onrender.com/${prop.photo}`}
                        alt={prop.title}
                        style={{
                          width: "80px",
                          height: "60px",
                          objectFit: "cover",
                          borderRadius: "6px",
                          border: "1px solid #ccc",
                        }}
                      />
                    </td>
                    <td>{prop.plotNumber || "N/A"}</td>
                    <td>{prop.title}</td>
                    <td>{prop.propertyType || "N/A"}</td>
                    <td>{prop.location || "N/A"}</td>
                    <td>
                      {prop.rentAmount != null ? `$${prop.rentAmount}` : "N/A"}
                    </td>
                    <td>
                      <span
                        className={`badge ${
                          prop.status === "available"
                            ? "bg-success"
                            : prop.status === "rented"
                            ? "bg-secondary"
                            : "bg-warning"
                        }`}
                      >
                        {prop.status || "Pending"}
                      </span>
                    </td>
                    <td>
                      <button
                        className="btn btn-sm btn-outline-primary"
                        onClick={() => handleEdit(prop)}
                      >
                        <PencilSimple size={16} weight="bold" /> Edit
                      </button>
                      <button className="btn btn-sm btn-outline-danger" onClick={() => handleDelete(prop._id)}>
                        <i className="bi bi-trash-fill"></i>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>

      {/* Custom Scrollbar Styles */}
      <style>{`
        .table-responsive::-webkit-scrollbar {
          width: 8px;
        }

        .table-responsive::-webkit-scrollbar-track {
          background: #f1f1f1;
          border-radius: 10px;
        }

        .table-responsive::-webkit-scrollbar-thumb {
          background: #3a506b;
          border-radius: 10px;
        }

        .table-responsive::-webkit-scrollbar-thumb:hover {
          background: #1e2a38;
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

export default OwnerProperties;