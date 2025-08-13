import React, { useContext, useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../../../context/AuthContext";

const InquiryEdit = () => {
  const { token } = useContext(AuthContext);
  const [message, setMessage] = useState("");
  const [properties, setProperties] = useState([]);
  const [selectedPropertyId, setSelectedPropertyId] = useState("");

  const navigate = useNavigate();
  const { state } = useLocation();
  const selectedInquiry = state?.inquiryData;

  const authHeader = {
    headers: { Authorization: `Bearer ${token}` },
  };

  const fetchProperties = async () => {
    try {
      toast.info("Loading properties...");
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
    fetchProperties();
  }, []);

  useEffect(() => {
    if (!selectedInquiry) {
      toast.error("No Inquiry data provided");
      setTimeout(() => {
        navigate("/user-dashboard/inquires");
      }, 2000);
      return;
    }

    if (selectedInquiry.status === "approved") {
      toast.warn("Approved inquiries cannot be edited.");
      setTimeout(() => {
        navigate("/user-dashboard/inquires");
      }, 2000);
      return;
    }

    setMessage(selectedInquiry.message || "");
    setSelectedPropertyId(selectedInquiry.property?._id || "");
  }, [selectedInquiry, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      toast.info("Updating inquiry...");
      const data = { message, property: selectedPropertyId };
      const res = await axios.put(
        `https://space-core.onrender.com/api/inquiries/${selectedInquiry._id}`,
        data,
        authHeader
      );
      toast.dismiss();
      toast.success(res.data.message || "Inquiry updated successfully");
      navigate("/user-dashboard/inquires");
    } catch (error) {
      toast.dismiss();
      toast.error(error.response?.data?.message || "Error updating inquiry");
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
              to="/user-dashboard"
              className="text-decoration-none fw-semibold"
              style={{ color: "#00b894" }}
            >
              <i className="bi bi-speedometer2 me-1"></i>Dashboard
            </Link>
          </li>
          <li className="breadcrumb-item">
            <Link
              to="/user-dashboard/inquires"
              className="text-decoration-none fw-semibold"
              style={{ color: "#00b894" }}
            >
              <i className="bi bi-chat-left-text-fill me-1"></i>Inquiries
            </Link>
          </li>
          <li
            className="breadcrumb-item active fw-semibold"
            style={{ color: "#00b894" }}
            aria-current="page"
          >
            <i className="bi bi-pencil-square me-1"></i>Edit Inquiry
          </li>
        </ol>
      </nav>

      {/* Form Card */}
      <div
        className="card p-4 shadow-sm"
        style={{
          border: "1px solid #14532d",
          backgroundColor: "#fdfdfd",
          borderRadius: "12px",
        }}
      >
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h4 style={{ color: "#1e8449" }}>
            <i className="bi bi-pen-fill me-2"></i>Update Inquiry
          </h4>
          <Link
            to="/user-dashboard/inquires"
            className="btn"
            style={{ backgroundColor: "#1e8449", color: "#fff" }}
          >
            <i className="bi bi-arrow-left-circle-fill me-2"></i>Back
          </Link>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit}>
          <div className="row">
            {/* Message Input */}
            <div className="col-md-6 mb-3">
              <label className="form-label fw-semibold">Message</label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter your message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                required
              />
            </div>

            {/* Property Selector */}
            <div className="col-md-6 mb-3">
              <label className="form-label fw-semibold">Property</label>
              <select
                className="form-select"
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

          <div className="text-end mt-4">
            <button
              type="submit"
              className="btn px-4"
              style={{
                backgroundColor: "#4b0082",
                color: "#fff",
                fontWeight: 600,
              }}
            >
              <i className="bi bi-send-check-fill me-2"></i>Update
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default InquiryEdit;
