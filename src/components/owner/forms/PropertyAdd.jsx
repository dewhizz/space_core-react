import React, { useContext, useState } from "react";
import { AuthContext } from "../../../context/AuthContext";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const PropertyAdd = () => {
  const { token } = useContext(AuthContext);
  const navigate = useNavigate();

  const [plotNumber, setPlotNumber] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [propertyType, setPropertyType] = useState("apartment");
  const [location, setLocation] = useState("");
  const [rentAmount, setRentAmount] = useState("");
  const [depositAmount, setDepositAmount] = useState("");
  const [isAvailable, setIsAvailable] = useState(true);
  const [status, setStatus] = useState("active");
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(false);

  const authHeader = {
    headers: { Authorization: `Bearer ${token}` },
  };

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setPhotos([file]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    toast.info("Submitting Property...");

    const formData = new FormData();
    formData.append("plotNumber", plotNumber);
    formData.append("title", title);
    formData.append("description", description);
    formData.append("propertyType", propertyType);
    formData.append("location", location);
    formData.append("rentAmount", rentAmount);
    formData.append("depositAmount", depositAmount);
    formData.append("isAvailable", isAvailable);
    formData.append("status", status);
    if (photos.length > 0) {
      formData.append("photo", photos[0]);
    }

    try {
      const res = await axios.post(
        "https://space-core.onrender.com/api/properties/",
        formData,
        authHeader
      );
      toast.dismiss();
      toast.success(res.data.message || "Property added successfully");

      setPlotNumber("");
      setTitle("");
      setDescription("");
      setPropertyType("apartment");
      setLocation("");
      setRentAmount("");
      setDepositAmount("");
      setIsAvailable(true);
      setStatus("active");
      setPhotos([]);

      navigate("/owner-dashboard/properties");
    } catch (error) {
      toast.dismiss();
      toast.error(error.response?.data?.message );
    }
  };

  return (
    <div
      className="container-fluid py-5"
      style={{
        fontFamily: "Poppins, sans-serif",
        background: "linear-gradient(to right, #f0f4ff, #fff0f5)",
        minHeight: "100vh",
      }}
    >
      <ToastContainer position="top-right" autoClose={3000} />

      <div
        className="mx-auto p-4 shadow-lg rounded"
        style={{
          maxWidth: "700px",
          maxHeight: "90vh", 
          overflowY: "auto", 
          backgroundColor: "#ffffff",
          borderRadius: "16px",
          boxShadow: "0 8px 20px rgba(0,0,0,0.1)",
        }}
      >
        <h3 className="text-center text-primary fw-bold mb-4">
          <i className="bi bi-building me-2"></i> Add New Property
        </h3>

        <form onSubmit={handleSubmit} encType="multipart/form-data">
          {/* Basic Info */}
          <div className="mb-3">
            <label className="form-label fw-semibold">
              <i className="bi bi-hash me-2 text-secondary"></i>Plot Number
            </label>
            <input
              type="text"
              value={plotNumber}
              onChange={(e) => setPlotNumber(e.target.value)}
              className="form-control"
              required
              disabled={loading}
            />
          </div>

          <div className="mb-3">
            <label className="form-label fw-semibold">
              <i className="bi bi-card-heading me-2 text-secondary"></i>Title
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="form-control"
              disabled={loading}
            />
          </div>

          <div className="mb-3">
            <label className="form-label fw-semibold">
              <i className="bi bi-pencil-square me-2 text-secondary"></i>Description
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="form-control"
              rows={4}
              disabled={loading}
            />
          </div>

          {/* Property Details */}
          <div className="mb-3">
            <label className="form-label fw-semibold">
              <i className="bi bi-house-door me-2 text-secondary"></i>Property Type
            </label>
            <select
              className="form-select"
              value={propertyType}
              onChange={(e) => setPropertyType(e.target.value)}
              disabled={loading}
            >
              <option value="apartment">Apartment</option>
              <option value="bungalow">Bungalow</option>
              <option value="mansion">Mansion</option>
              <option value="office">Office</option>
              <option value="shop">Shop</option>
            </select>
          </div>

          <div className="mb-3">
            <label className="form-label fw-semibold">
              <i className="bi bi-geo-alt me-2 text-secondary"></i>Location
            </label>
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="form-control"
              disabled={loading}
            />
          </div>

          {/* Financials */}
          <div className="row">
            <div className="col-md-6 mb-3">
              <label className="form-label fw-semibold">
                <i className="bi bi-cash-coin me-2 text-secondary"></i>Rent Amount
              </label>
              <input
                type="text"
                value={rentAmount}
                onChange={(e) => setRentAmount(e.target.value)}
                className="form-control"
                disabled={loading}
              />
            </div>
            <div className="col-md-6 mb-3">
              <label className="form-label fw-semibold">
                <i className="bi bi-wallet2 me-2 text-secondary"></i>Deposit Amount
              </label>
              <input
                type="text"
                value={depositAmount}
                onChange={(e) => setDepositAmount(e.target.value)}
                className="form-control"
                disabled={loading}
              />
            </div>
          </div>

          {/* Status */}
          <div className="form-check form-switch mb-3">
            <input
              className="form-check-input"
              type="checkbox"
              checked={isAvailable}
              onChange={(e) => setIsAvailable(e.target.checked)}
              id="availableSwitch"
              disabled={loading}
            />
            <label className="form-check-label fw-semibold" htmlFor="availableSwitch">
              <i className="bi bi-check-circle me-2 text-secondary"></i>Available
            </label>
          </div>

          <div className="mb-3">
            <label className="form-label fw-semibold">
              <i className="bi bi-activity me-2 text-secondary"></i>Status
            </label>
            <select
              className="form-select"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              disabled={loading}
            >
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
              <option value="rented">Rented</option>
            </select>
          </div>

          {/* Photo Upload */}
          <div className="mb-3">
            <label className="form-label fw-semibold">
              <i className="bi bi-image me-2 text-secondary"></i>Upload Photo
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={handlePhotoChange}
              className="form-control"
              disabled={loading}
            />
          </div>

          {photos.length > 0 && (
            <div className="mb-3">
              <strong>Selected Photo:</strong>
              <p className="mt-2 text-muted">
                <i className="bi bi-image-fill me-2 text-info"></i>{photos[0].name}
              </p>
            </div>
          )}

          <button type="submit" className="btn btn-primary w-100" disabled={loading}>
            {loading ? "Submitting..." : "Add Property"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default PropertyAdd;