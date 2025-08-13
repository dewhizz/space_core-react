import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../context/AuthContext";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const InquiryAdd = () => {
  const { token } = useContext(AuthContext);
  const [message, setMessage] = useState("");
  const [properties, setProperties] = useState([]);
  const [selectedPropertyId, setSelectedPropertyId] = useState("");
  const navigate = useNavigate();

  const authHeader = {
    headers: { Authorization: `Bearer ${token}` },
  };

  const FetchProperties = async () => {
    try {
      toast.info("Loading properties ....");
      const res = await axios.get(
        "https://space-core.onrender.com/api/properties/",
        authHeader
      );
      toast.dismiss();
      setProperties(res.data);
    } catch (error) {
      toast.dismiss();
      toast.error(error.response?.data?.message || "Failed to load properties");
    }
  };

  useEffect(() => {
    FetchProperties();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      toast.info("Submitting ....");
      const data = { message, property: selectedPropertyId };
      const res = await axios.post(
        "https://space-core.onrender.com/api/inquiries/",
        data,
        authHeader
      );
      toast.dismiss();
      toast.success(res.data.message || "Inquiry added successfully");
      setMessage("");
      setProperties([]);
      setSelectedPropertyId("");
      FetchProperties();
      navigate("/user-dashboard/inquires");
    } catch (error) {
      toast.dismiss();
      toast.error(error.response?.data?.message || "Error submitting");
    }
  };

  return (
    <div className="container mt-3" style={{ fontFamily: "Inter, sans-serif" }}>
      <ToastContainer position="top-right" autoClose={3000} />

      {/* Breadcrumbs */}
      <nav aria-label="breadcrumb" className="mb-3">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link
              className="text-decoration-none fw-semibold"
              to="/user-dashboard"
              style={{ color: "#00b894" }}
            >
              Dashboard
            </Link>
          </li>
          <li className="breadcrumb-item">
            <Link
              className="text-decoration-none fw-semibold"
              to="/user-dashboard/inquires"
              style={{ color: "#00b894" }}
            >
              Inquiries
            </Link>
          </li>
          <li
            className="breadcrumb-item active fw-semibold"
            aria-current="page"
            style={{ color: "#00b894" }}
          >
            Add Inquiry
          </li>
        </ol>
      </nav>

      {/* Inquiry Form */}
      <div
        className="card p-4 shadow-sm mb-4"
        style={{
          backgroundColor: "#f8f9fa",
          border: "1px solid #14532d",
        }}
      >
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h5 style={{ color: "#1e8449" }}>
            <i className="bi bi-building me-2"></i>Add New Inquiry
          </h5>
          <Link
            className="btn"
            to="/user-dashboard/inquires"
            style={{ backgroundColor: "#1e8449", color: "#fff" }}
          >
            <i className="bi bi-arrow-left-circle-fill me-2"></i>Back
          </Link>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="row">
            <div className="col-md-6 mb-3">
              <input
                type="text"
                className="form-control"
                placeholder="Message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                required
              />
            </div>

            <div className="col-md-6 mb-3">
              <select
                className="form-control"
                value={selectedPropertyId}
                onChange={(e) => setSelectedPropertyId(e.target.value)}
                required
              >
                <option value="">Select Property</option>
                {properties.map((property) => (
                  <option key={property._id} value={property._id}>
                    {`${property.title}, ${property.owner?.name}, ${property.plotNumber}`}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Preview Trigger */}
          <button
            type="button"
            className="btn"
            data-bs-toggle="modal"
            data-bs-target="#previewModal"
            style={{
              backgroundColor: "#4b0082",
              color: "#fff",
            }}
            disabled={!message || !selectedPropertyId}
          >
            <i className="bi bi-eye-fill me-2"></i>Preview Inquiry
          </button>
        </form>
      </div>

      {/* Inquiry Preview Modal */}
      <div
        className="modal fade"
        id="previewModal"
        tabIndex="-1"
        aria-labelledby="previewModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <form className="modal-content" onSubmit={handleSubmit}>
            <div
              className="modal-header"
              style={{ backgroundColor: "#1a237e", color: "#fff" }}
            >
              <h5 className="modal-title" id="previewModalLabel">
                <i className="bi bi-eye-fill me-2"></i>Preview Inquiry
              </h5>
              <button
                type="button"
                className="btn-close btn-close-white"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <p>
                <strong>Message:</strong> {message}
              </p>
              <p>
                <strong>Property:</strong>{" "}
                {properties.find((p) => p._id === selectedPropertyId)?.title ||
                  "Not selected"}
              </p>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button
                type="submit"
                className="btn"
                style={{ backgroundColor: "#00b894", color: "#fff" }}
              >
                <i className="bi bi-send-fill me-2"></i>Confirm & Submit
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Floating Action Button */}
      <button
        className="btn rounded-circle shadow-lg"
        style={{
          backgroundColor: "#d35400",
          color: "#fff",
          position: "fixed",
          bottom: "20px",
          right: "20px",
          width: "56px",
          height: "56px",
          zIndex: "1000",
        }}
        onClick={() => {
          document
            .querySelector("form")
            ?.scrollIntoView({ behavior: "smooth" });
        }}
      >
        <i className="bi bi-plus-lg fs-4"></i>
      </button>
    </div>
  );
};

export default InquiryAdd;
