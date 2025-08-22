import React, { useContext, useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../../../context/AuthContext";

const PropertyEdit = () => {
  const { token } = useContext(AuthContext);
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [propertyType, setPropertyType] = useState("apartment");
  const [location, setLocation] = useState("");
  const [rentAmount, setRentAmount] = useState("");
  const [depositAmount, setDepositAmount] = useState("");
  const [isAvailable, setIsAvailable] = useState(true);
  const [status, setStatus] = useState("active");
  const [photo, setPhoto] = useState(null);
  const [loading, setLoading] = useState(false);

  const { state } = useLocation();
  const selectedProperty = state?.propertyData;

  const authHeader = {
    headers: { Authorization: `Bearer ${token}` },
  };

  useEffect(() => {
    if (!selectedProperty) {
      toast.error("No property data provided");
      setTimeout(() => {
        navigate("/owner-dashboard/properties");
      }, 2000);
      return;
    }

    setTitle(selectedProperty?.title || "");
    setDescription(selectedProperty?.description || "");
    setPropertyType(selectedProperty?.propertyType || "apartment");
    setLocation(selectedProperty?.location || "");
    setRentAmount(selectedProperty?.rentAmount || "");
    setDepositAmount(selectedProperty?.depositAmount || "");
    setIsAvailable(selectedProperty?.isAvailable ?? true);
    setStatus(selectedProperty?.status || "active");
    setPhoto(null);
  }, [selectedProperty, navigate]);

  const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    setLoading(true);
    toast.info("Updating property...");

    const data = new FormData();
    data.append("title", title);
    data.append("description", description);
    data.append("propertyType", propertyType);
    data.append("location", location);
    data.append("rentAmount", rentAmount);
    data.append("depositAmount", depositAmount);
    data.append("isAvailable", isAvailable);
    data.append("status", status);
    if (photo) data.append("photo", photo);

    const res = await axios.put(
      `https://space-core.onrender.com/api/properties/${selectedProperty._id}`,
      data,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      }
    );

    toast.dismiss();
    toast.success(res.data?.message || "Property Updated Successfully");
    navigate("/owner-dashboard/properties");
  } catch (error) {
    toast.dismiss();
    toast.error(error.response?.data?.message || "Error updating property");
  } finally {
    setLoading(false);
  }
};

  return (
    <div
      className="container-fluid py-5"
      style={{
        minHeight: "100vh",
        background: "linear-gradient(to right, #e0f7fa, #fce4ec)",
        fontFamily: "'Poppins', sans-serif",
      }}
    >
      <ToastContainer position="top-right" autoClose={3000} />

      {/* Breadcrumbs */}
      <div className="container mb-4">
        <nav aria-label="breadcrumb">
          <ol className="breadcrumb bg-white rounded shadow-sm px-3 py-2">
            <li className="breadcrumb-item fw-bold">
              <Link to="/owner-dashboard" className="text-decoration-none">
                Dashboard
              </Link>
            </li>
            <li className="breadcrumb-item fw-bold">
              <Link to="/owner-dashboard/properties" className="text-decoration-none">
                Properties
              </Link>
            </li>
            <li className="breadcrumb-item active" aria-current="page">
              Update Property
            </li>
          </ol>
        </nav>
      </div>

      <div className="container">
        <div className="card p-4 shadow-lg border-0 rounded-4">
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h4
              className="fw-bold mb-0"
              style={{
                background: "linear-gradient(to right, #00796b, #00b894)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              <i className="bi bi-building me-2"></i> Update Property
            </h4>
            <Link className="btn btn-outline-success" to="/owner-dashboard/properties">
              <i className="bi bi-arrow-left-circle-fill me-2"></i>Back
            </Link>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="row">
              {/* Title */}
              <div className="col-md-6 mb-3">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Property Title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                />
              </div>

              {/* Location */}
              <div className="col-md-6 mb-3">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Location"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  required
                />
              </div>

              {/* Property Type */}
              <div className="col-md-6 mb-3">
                <select
                  className="form-control"
                  value={propertyType}
                  onChange={(e) => setPropertyType(e.target.value)}
                  required
                >
                  <option value="apartment">Apartment</option>
                  <option value="house">House</option>
                  <option value="commercial">Commercial</option>
                </select>
              </div>

              {/* Rent Amount */}
              <div className="col-md-6 mb-3">
                <input
                  type="number"
                  className="form-control"
                  placeholder="Rent Amount"
                  value={rentAmount}
                  onChange={(e) => setRentAmount(e.target.value)}
                  required
                  min="0"
                />
              </div>

              {/* Deposit Amount */}
              <div className="col-md-6 mb-3">
                <input
                  type="number"
                  className="form-control"
                  placeholder="Deposit Amount"
                  value={depositAmount}
                  onChange={(e) => setDepositAmount(e.target.value)}
                  required
                  min="0"
                />
              </div>

              {/* Status */}
              <div className="col-md-6 mb-3">
                <select
                  className="form-control"
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                  required
                >
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                </select>
              </div>

              {/* Availability */}
              <div className="col-md-6 mb-3">
                <select
                  className="form-control"
                  value={isAvailable.toString()}
                  onChange={(e) => setIsAvailable(e.target.value === "true")}
                  required
                >
                  <option value="true">Available</option>
                  <option value="false">Not Available</option>
                </select>
              </div>

              {/* Description */}
              <div className="col-md-12 mb-3">
                <textarea
                  className="form-control"
                  placeholder="Description"
                  rows={4}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>

              {/* Photo Upload */}
              <div className="col-md-6 mb-3">
                <input
                  type="file"
                  className="form-control"
                  accept="image/*"
                  onChange={(e) => setPhoto(e.target.files[0])}
                />
              </div>
            </div>

            <button type="submit" className="btn btn-success" disabled={loading}>
              {loading ? (
                <span
                  className="spinner-border spinner-border-sm me-2"
                  role="status"
                  aria-hidden="true"
                ></span>
              ) : (
                <i className="bi bi-save me-2"></i>
              )}
              Update Property
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default PropertyEdit;