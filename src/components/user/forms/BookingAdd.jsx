import React, { useContext, useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../../context/AuthContext";

const AddBooking = () => {
  const { token } = useContext(AuthContext);
  const navigate = useNavigate();

  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [inquiries, setInquiries] = useState([]);
  const [selectedInquiryId, setSelectedInquiryId] = useState("");

  const authHeader = {
    headers: { Authorization: `Bearer ${token}` },
  };

  const fetchInquiries = async () => {
    try {
      toast.info("Loading approved inquiries...");
      const res = await axios.get(
        "https://space-core.onrender.com/api/inquiries/my-inquiries", // ✅ corrected endpoint
        authHeader
      );
      toast.dismiss();
      const approved = res.data.filter((inq) => inq.status === "approved");
      setInquiries(approved);
    } catch (error) {
      toast.dismiss();
      toast.error(error.response?.data?.message || "Failed to fetch inquiries");
    }
  };

  useEffect(() => {
    fetchInquiries();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!selectedInquiryId) {
      toast.error("Please select an approved inquiry.");
      return;
    }

    if (endDate && new Date(endDate) < new Date(startDate)) {
      toast.error("End date cannot be earlier than start date.");
      return;
    }

    try {
      toast.info("Creating booking...");
      const payload = { startDate, endDate };

      const res = await axios.post(
        `https://space-core.onrender.com/api/bookings/${selectedInquiryId}`, // ✅ use inquiry ID
        payload,
        authHeader
      );

      toast.dismiss();
      toast.success(res.data.message || "Booking added successfully!");
      navigate("/user-dashboard/bookings");
    } catch (error) {
      toast.dismiss();
      toast.error(error.response?.data?.message || "Failed to add booking");
    }
  };

  return (
    <div className="container mt-4" style={{ fontFamily: "Inter, sans-serif" }}>
      <ToastContainer position="top-right" autoClose={3000} />

      {/* Breadcrumbs */}
      <nav aria-label="breadcrumb" className="mb-3">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link className="text-decoration-none fw-semibold" to="/user-dashboard" style={{ color: "#00b894" }}>
              <i className="bi bi-house-door-fill me-1"></i>Dashboard
            </Link>
          </li>
          <li className="breadcrumb-item">
            <Link className="text-decoration-none fw-semibold" to="/user-dashboard/bookings" style={{ color: "#00b894" }}>
              <i className="bi bi-calendar-check-fill me-1"></i>Bookings
            </Link>
          </li>
          <li className="breadcrumb-item active fw-semibold" aria-current="page" style={{ color: "#00b894" }}>
            <i className="bi bi-plus-circle-fill me-1"></i>Add Booking
          </li>
        </ol>
      </nav>

      {/* Header */}
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h5 className="text-success">
          <i className="bi bi-calendar-plus me-2"></i>Add New Booking
        </h5>
        <Link className="btn btn-outline-success" to="/user-dashboard/bookings">
          <i className="bi bi-arrow-left-circle me-2"></i>Back
        </Link>
      </div>

      {/* Inquiry Cards */}
      <div className="mb-4">
        <h6 className="fw-semibold mb-3">Select an Approved Inquiry</h6>
        <div className="row">
          {inquiries.length === 0 ? (
            <p className="text-muted">No approved inquiries available.</p>
          ) : (
            inquiries.map((inq) => (
              <div
                key={inq._id}
                className={`col-md-4 mb-3`}
                onClick={() => setSelectedInquiryId(inq._id)}
              >
                <div
                  className={`card shadow-sm h-100 border ${
                    selectedInquiryId === inq._id ? "border-success" : "border-light"
                  }`}
                  style={{ cursor: "pointer", transition: "0.3s" }}
                >
                  {inq.property?.photo && (
                    <img
                      src={inq.property.photo}
                      alt={inq.property.title}
                      className="card-img-top"
                      style={{ height: "180px", objectFit: "cover" }}
                    />
                  )}
                  <div className="card-body">
                    <h6 className="card-title text-success">{inq.property?.title}</h6>
                    <p className="card-text mb-1">
                      <i className="bi bi-person-fill me-1"></i>
                      {inq.property?.owner?.name}
                    </p>
                    <p className="card-text">
                      <i className="bi bi-geo-alt-fill me-1"></i>
                      Plot {inq.property?.plotNumber}
                    </p>
                    {selectedInquiryId === inq._id && (
                      <span className="badge bg-success">Selected</span>
                    )}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Booking Form */}
      <div className="card p-4 shadow-sm mb-4 border-0" style={{ background: "linear-gradient(to right, #eafaf1, #ffffff)" }}>
        <form onSubmit={handleSubmit}>
          <div className="row">
            <div className="col-md-6 mb-3">
              <label className="form-label fw-semibold">Start Date</label>
              <input
                type="date"
                className="form-control"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                required
              />
            </div>

            <div className="col-md-6 mb-3">
              <label className="form-label fw-semibold">End Date</label>
              <input
                type="date"
                className="form-control"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
              />
            </div>
          </div>

          <button type="submit" className="btn btn-success w-100">
            <i className="bi bi-send-check-fill me-2"></i>Submit Booking
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddBooking;