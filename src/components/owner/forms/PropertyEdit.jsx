import React, { useContext, useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../../../context/AuthContext";

const PropertyEdit = () => {
  const { token } = useContext(AuthContext);

  const [title, setTitle] = useState("");
  const [address, setAddress] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [photo, setPhoto] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();
  const { state } = useLocation();
  const selectedProperty = state?.propertyData;

  const authHeader = {
    headers: { Authorization: `Bearer ${token}` },
  };

  useEffect(() => {
    if (!selectedProperty) {
      toast.error("No Property data provided");
      setTimeout(() => {
        navigate("/admin-dashboard/properties");
      }, 2000);
      return;
    }
    setTitle(selectedProperty?.title || "");
    setAddress(selectedProperty?.address || "");
    setPrice(selectedProperty?.price || "");
    setDescription(selectedProperty?.description || "");
    setPhoto(null);
  }, [selectedProperty, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      toast.info("Updating property...");

      const data = new FormData();
      data.append("title", title);
      data.append("address", address);
      data.append("price", price);
      data.append("description", description);
      if (photo) data.append("photo", photo);

      const res = await axios.put(
        `https://space-core.onrender.com/api/properties/${selectedProperty._id}`,
        data,
        authHeader
      );

      toast.success(res.data.message || "Property Updated Successfully");
      navigate("/admin-dashboard/properties");
    } catch (error) {
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
            <Link to="/admin-dashboard">Dashboard</Link>
          </li>
          <li className="breadcrumb-item fw-bold">
            <Link to="/admin-dashboard/properties">Properties</Link>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            Update Property
          </li>
        </ol>
      </nav>

      <div className="card p-4 shadow-sm mb-4">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h5 className="text-success">
            <i className="bi bi-building me-2"></i>Update Property
          </h5>
          <Link className="btn btn-success" to={"/admin-dashboard/properties"}>
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

            {/* Address */}
            <div className="col-md-6 mb-3">
              <input
                type="text"
                className="form-control"
                placeholder="Address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                required
              />
            </div>

            {/* Price */}
            <div className="col-md-6 mb-3">
              <input
                type="number"
                className="form-control"
                placeholder="Price"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                required
              />
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

            {/* Photo upload */}
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

          <button
            type="submit"
            className="btn btn-success"
            disabled={isLoading}
          >
            <i className="bi bi-save me-2"></i>
            Save Property
          </button>
        </form>
      </div>
    </div>
  );
};

export default PropertyEdit;
