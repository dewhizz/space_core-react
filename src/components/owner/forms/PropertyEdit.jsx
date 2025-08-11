import React, { useContext, useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../../../context/AuthContext";

const PropertyEdit = () => {
  const { token } = useContext(AuthContext);
  const navigate = useNavigate();
  const { state } = useLocation();
  const selectedProperty = state?.propertyData;

  const [plotNumber, setPlotNumber] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [propertyType, setPropertyType] = useState("apartment");
  const [location, setLocation] = useState("");
  const [rentAmount, setRentAmount] = useState("");
  const [depositAmount, setDepositAmount] = useState("");
  const [isAvailable, setIsAvailable] = useState(true);
  const [status, setStatus] = useState("active");
  const [photo, setPhoto] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const authHeader = {
    headers: { Authorization: `Bearer ${token}` },
  };

  useEffect(() => {
    if (!selectedProperty) {
      toast.error("No property data provided");
      setTimeout(() => {
        navigate("/owner-dashboard/owner-properties");
      }, 2000);
      return;
    }

    setPlotNumber(selectedProperty.plotNumber || "");
    setTitle(selectedProperty.title || "");
    setDescription(selectedProperty.description || "");
    setPropertyType(selectedProperty.propertyType || "apartment");
    setLocation(selectedProperty.location || "");
    setRentAmount(selectedProperty.rentAmount || "");
    setDepositAmount(selectedProperty.depositAmount || "");
    setIsAvailable(selectedProperty.isAvailable ?? true);
    setStatus(selectedProperty.status || "active");
    setPhoto(null); // Reset photo input
  }, [selectedProperty, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    toast.info("Updating property...");

    const data = new FormData();
    data.append("plotNumber", plotNumber);
    data.append("title", title);
    data.append("description", description);
    data.append("propertyType", propertyType);
    data.append("location", location);
    data.append("rentAmount", rentAmount);
    data.append("depositAmount", depositAmount);
    data.append("isAvailable", isAvailable);
    data.append("status", status);
    if (photo) data.append("photo", photo);

    try {
      const res = await axios.put(
        `https://space-core.onrender.com/api/properties/${selectedProperty._id}`,
        data,
        authHeader
      );
      toast.dismiss();
      toast.success(res.data.message || "Property updated successfully");
      navigate("/owner-dashboard/owner-properties");
    } catch (error) {
      toast.dismiss();
      toast.error(error.response?.data?.message || "Error updating property");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mt-3">
      <ToastContainer position="top-right" autoClose={3000} />

      <nav aria-label="breadcrumb" className="mb-3">
        <ol className="breadcrumb">
          <li className="breadcrumb-item fw-bold">
            <Link to="/owner-dashboard">Dashboard</Link>
          </li>
          <li className="breadcrumb-item fw-bold">
            <Link to="/owner-dashboard/owner-properties">Properties</Link>
          </li>
          <li className="breadcrumb-item active">Update Property</li>
        </ol>
      </nav>

      <div className="card p-4 shadow-sm mb-4">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h5 className="text-success">
            <i className="bi bi-pencil-square me-2"></i>Edit Property
          </h5>
          <Link className="btn btn-success" to="/owner-dashboard/owner-properties">
            <i className="bi bi-arrow-left-circle-fill me-2"></i>Back
          </Link>
        </div>

        <form onSubmit={handleSubmit} encType="multipart/form-data">
          <div className="row">
            <div className="col-md-6 mb-3">
              <input
                type="text"
                className="form-control"
                placeholder="Plot Number"
                value={plotNumber}
                onChange={(e) => setPlotNumber(e.target.value)}
                required
                disabled={isLoading}
              />
            </div>

            <div className="col-md-6 mb-3">
              <input
                type="text"
                className="form-control"
                placeholder="Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                disabled={isLoading}
              />
            </div>

            <div className="col-md-12 mb-3">
              <textarea
                className="form-control"
                placeholder="Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={3}
                disabled={isLoading}
              ></textarea>
            </div>

            <div className="col-md-6 mb-3">
              <select
                className="form-control"
                value={propertyType}
                onChange={(e) => setPropertyType(e.target.value)}
                disabled={isLoading}
              >
                <option value="apartment">Apartment</option>
                <option value="bungalow">Bungalow</option>
                <option value="mansion">Mansion</option>
                <option value="office">Office</option>
                <option value="shop">Shop</option>
              </select>
            </div>

            <div className="col-md-6 mb-3">
              <input
                type="text"
                className="form-control"
                placeholder="Location"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                disabled={isLoading}
              />
            </div>

            <div className="col-md-6 mb-3">
              <input
                type="text"
                className="form-control"
                placeholder="Rent Amount"
                value={rentAmount}
                onChange={(e) => setRentAmount(e.target.value)}
                disabled={isLoading}
              />
            </div>

            <div className="col-md-6 mb-3">
              <input
                type="text"
                className="form-control"
                placeholder="Deposit Amount"
                value={depositAmount}
                onChange={(e) => setDepositAmount(e.target.value)}
                disabled={isLoading}
              />
            </div>

            <div className="col-md-6 mb-3 form-check">
              <input
                type="checkbox"
                className="form-check-input"
                id="availableCheck"
                checked={isAvailable}
                onChange={(e) => setIsAvailable(e.target.checked)}
                disabled={isLoading}
              />
              <label className="form-check-label" htmlFor="availableCheck">
                Available
              </label>
            </div>

            <div className="col-md-6 mb-3">
              <select
                className="form-control"
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                disabled={isLoading}
              >
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
                <option value="rented">Rented</option>
              </select>
            </div>

            <div className="col-md-6 mb-3">
              <input
                type="file"
                className="form-control"
                accept="image/*"
                onChange={(e) => setPhoto(e.target.files[0])}
                disabled={isLoading}
              />
            </div>
          </div>

          <button type="submit" className="btn btn-success">
            <i className="bi bi-save me-2"></i>
            {isLoading ? "Updating..." : "Save Property"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default PropertyEdit;