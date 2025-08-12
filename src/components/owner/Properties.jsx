import React, { useEffect, useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AuthContext } from "../../context/AuthContext";

const OwnerProperties = () => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(false);
  const { token } = useContext(AuthContext);
  const navigate = useNavigate();

  const authHeader = {
    headers: { Authorization: `Bearer ${token}` },
  };

  const fetchProperties = async () => {
    setLoading(true);
    try {
      toast.info("Loading your properties...");
      const res = await axios.get(
        "https://space-core.onrender.com/api/properties/owner-properties",
        authHeader
      );
      setProperties(res.data);
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

  return (
    <div className="container mt-3">
      <ToastContainer position="top-right" autoClose={3000} />

      <nav aria-label="breadcrumb" className="mb-3">
        <ol className="breadcrumb">
          <li className="breadcrumb-item fw-bold">
            <Link to="/owner-dashboard">Dashboard</Link>
          </li>
          <li className="breadcrumb-item-active" aria-current="page">
            / Properties
          </li>
        </ol>
      </nav>

      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2 className="text-success">
          <i className="bi bi-building me-2"></i>Your Properties
        </h2>
        <button
          className="btn btn-primary"
          onClick={() => navigate("/owner-dashboard/properties/add")}
          disabled={loading}
        >
          <i className="bi bi-plus-circle me-2"></i>Add New Property
        </button>
      </div>

      {loading ? (
        <div className="alert alert-info text-center">
          Loading properties...
        </div>
      ) : properties.length === 0 ? (
        <div className="alert alert-warning text-center">
          No properties found. Please add one.
        </div>
      ) : (
        <div className="table-responsive">
          <table className="table table-striped table-bordered">
            <thead className="table-success">
              <tr>
                <th>Plot Number</th>
                <th>Title</th>
                <th>Type</th>
                <th>Location</th>
                <th>Rent Amount</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {properties.map((prop) => (
                <tr key={prop._id}>
                  <td>{prop.plotNumber}</td>
                  <td>{prop.title}</td>
                  <td>{prop.propertyType || "N/A"}</td>
                  <td>{prop.location || "N/A"}</td>
                  <td>
                    {prop.rentAmount != null ? `$${prop.rentAmount}` : "N/A"}
                  </td>
                  <td>{prop.status || "Pending"}</td>
                  <td>
                    <Link
                      to={`/owner-dashboard/properties/edit/${prop._id}`}
                      className="btn btn-sm btn-secondary me-2"
                    >
                      <i className="bi bi-pencil-square"></i> Edit
                    </Link>
                    {/* Add Delete or View buttons here if needed */}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default OwnerProperties;
