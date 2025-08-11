import React, { useContext, useState } from "react";
import { AuthContext } from "../../../context/AuthContext";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const PropertyAdd = () => {
  const { token } = useContext(AuthContext); // JWT token from context
  const navigate = useNavigate();

  // Form field states
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

  const [loading, setLoading] = useState(false); // to disable button on submit

  const authHeader = {
    headers: { Authorization: `Bearer ${token}` },
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    toast.info("Submitting Property...");

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

    if (photo) {
      data.append("photo", photo);
    }

    try {
      const res = await axios.post(
        "https://space-core.onrender.com/api/properties/",
        data,
        authHeader
      );
      toast.dismiss();
      toast.success(res.data.message || "Property added successfully");

      // Optional: Reset form fields
      setPlotNumber("");
      setTitle("");
      setDescription("");
      setPropertyType("apartment");
      setLocation("");
      setRentAmount("");
      setDepositAmount("");
      setIsAvailable(true);
      setStatus("active");
      setPhoto(null);

      navigate("/owner-dashboard/properties");
    } catch (err) {
      toast.dismiss();
      toast.error(err.response?.data?.message || "Failed to add property");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="property-add container mt-4" style={{ maxWidth: 600 }}>
      <h2 className="mb-4">Add New Property</h2>

      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <input
          type="text"
          placeholder="Plot Number"
          value={plotNumber}
          onChange={(e) => setPlotNumber(e.target.value)}
          required
          className="form-control mb-3"
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
        ></textarea>

        <select
          value={propertyType}
          onChange={(e) => setPropertyType(e.target.value)}
          className="form-select mb-3"
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
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="form-select mb-3"
          disabled={loading}
        >
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
          <option value="rented">Rented</option>
        </select>

        <input
          type="file"
          onChange={(e) => setPhoto(e.target.files[0])}
          accept="image/*"
          className="form-control mb-3"
          disabled={loading}
        />

        <button type="submit" className="btn btn-primary" disabled={loading}>
          {loading ? "Submitting..." : "Add Property"}
        </button>
      </form>

      <ToastContainer />
    </div>
  );
};

export default PropertyAdd;
