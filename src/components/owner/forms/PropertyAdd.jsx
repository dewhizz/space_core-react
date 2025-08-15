import React, { useContext, useState } from "react";
import { AuthContext } from "../../../context/AuthContext";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const PropertyAdd = () => {
  const { token } = useContext(AuthContext);
  const navigate = useNavigate();

  // Form state variables
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
    const files = Array.from(e.target.files);

    if (files.length > 5) {
      toast.error("You can upload a maximum of 5 photos.");
      return;
    }

    setPhotos(files);
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

    photos.forEach((file) => {
      formData.append("photos", file); // `photos` must match the field name in the backend
    });

    try {
      const res = await axios.post(
        "https://space-core.onrender.com/api/properties/",
        formData,
        authHeader
      );

      toast.dismiss();
      toast.success(res.data.message || "Property added successfully");

      // Reset form
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
      toast.error(error.response?.data?.message || "Failed to add property");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-3" style={{ maxWidth: 600 }}>
      <ToastContainer position="top-right" autoClose={3000} />

      <h2 className="mb-4 text-success">
        <i className="bi bi-building me-2"></i>Add New Property
      </h2>

      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <input
          type="text"
          placeholder="Plot Number"
          value={plotNumber}
          onChange={(e) => setPlotNumber(e.target.value)}
          className="form-control mb-3"
          required
          disabled={loading}
        />

        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="form-control mb-3"
          disabled={loading}
        />

        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="form-control mb-3"
          rows={4}
          disabled={loading}
        />

        <select
          className="form-select mb-3"
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

        <input
          type="text"
          placeholder="Location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          className="form-control mb-3"
          disabled={loading}
        />

        <input
          type="text"
          placeholder="Rent Amount"
          value={rentAmount}
          onChange={(e) => setRentAmount(e.target.value)}
          className="form-control mb-3"
          disabled={loading}
        />

        <input
          type="text"
          placeholder="Deposit Amount"
          value={depositAmount}
          onChange={(e) => setDepositAmount(e.target.value)}
          className="form-control mb-3"
          disabled={loading}
        />

        <div className="form-check mb-3">
          <input
            type="checkbox"
            checked={isAvailable}
            onChange={(e) => setIsAvailable(e.target.checked)}
            className="form-check-input"
            id="availableCheck"
            disabled={loading}
          />
          <label className="form-check-label" htmlFor="availableCheck">
            Available
          </label>
        </div>

        <select
          className="form-select mb-3"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          disabled={loading}
        >
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
          <option value="rented">Rented</option>
        </select>

        <input
          type="file"
          accept="image/*"
          multiple
          onChange={handlePhotoChange}
          className="form-control mb-3"
          disabled={loading}
        />

        {photos.length > 0 && (
          <div className="mb-3">
            <strong>Selected Photos:</strong>
            <ul className="mt-2">
              {photos.map((photo, idx) => (
                <li key={idx}>{photo.name}</li>
              ))}
            </ul>
          </div>
        )}

        <button type="submit" className="btn btn-primary" disabled={loading}>
          {loading ? "Submitting..." : "Add Property"}
        </button>
      </form>
    </div>
  );
};

export default PropertyAdd;
