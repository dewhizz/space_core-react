import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../context/AuthContext";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const BookingAdd = () => {
  const { token } = useContext(AuthContext);

  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [inquiries, setInquiries] = useState([]);
  const [selectedInquiryId, setSelectedInquiryId] = useState("");
  const navigate = useNavigate();

  const authHeader = {
    headers: { Authorization: `Bearer ${token}` },
  };

  const fetchInquiries = async () => {
    try {
      toast.info("Loading inquiries ....");
      const res = await axios.get(
        "https://space-core.onrender.com/api/inquires/my-inquires",
        authHeader
      );
      toast.dismiss();
      const approvedInquiries = res.data.filter(
        (inquiry) => inquiry.status === "approved"
      );
      setInquiries(approvedInquiries);
    } catch (error) {
      toast.dismiss();
      toast.error(error.response?.data?.message || "Failed to load inquiries");
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
      toast.info("Submitting ....");
      const data = { startDate, endDate };
      const res = await axios.post(
        `https://space-core.onrender.com/api/bookings/${selectedInquiryId}`,
        data,
        authHeader
      );
      toast.dismiss();
      toast.success(res.data.message || "Booking added successfully");
      setStartDate("");
      setEndDate("");
      setSelectedInquiryId("");
      fetchInquiries();
      navigate("/user-dashboard/bookings");
    } catch (error) {
      toast.dismiss();
      toast.error(error.response?.data?.message || "Error submitting booking");
    }
  };

  return (
    <div className="container mt-3">
      <ToastContainer position="top-right" autoClose={3000} />

      <nav aria-label="breadcrumb" className="mb-3">
        <ol className="breadcrumb">
          <li className="breadcrumb-item fw-bold">
            <Link to="/user-dashboard">Dashboard</Link>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            Bookings
          </li>
          <li className="breadcrumb-item fw-bold">
            <Link to="#">Add Booking</Link>
          </li>
        </ol>
      </nav>

      <div className="card p-4 shadow-sm mb-4">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h5 className="text-success">
            <i className="bi bi-building me-2"></i>Add New Booking
          </h5>
          <Link className="btn btn-success" to={"/user-dashboard/bookings"}>
            <i className="bi bi-arrow-left-circle-fill me-2"></i>Back
          </Link>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="row">
            <div className="col-md-6 mb-3">
              <label className="form-label">Start Date</label>
              <input
                type="date"
                className="form-control"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                required
              />
            </div>

            <div className="col-md-6 mb-3">
              <label className="form-label">End Date</label>
              <input
                type="date"
                className="form-control"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
              />
            </div>

            <div className="col-md-12 mb-3">
              <label className="form-label">Approved Inquiry</label>
              <select
                className="form-control"
                value={selectedInquiryId}
                onChange={(e) => setSelectedInquiryId(e.target.value)}
                required
              >
                <option value="">Select Approved Inquiry</option>
                {inquiries.length === 0 ? (
                  <option disabled>No approved inquiries available</option>
                ) : (
                  inquiries.map((inquiry) => (
                    <option key={inquiry._id} value={inquiry._id}>
                      {`${inquiry.property?.title}, ${inquiry.property?.owner?.name}, ${inquiry.property?.plotNumber}`}
                    </option>
                  ))
                )}
              </select>
            </div>
          </div>

          <button type="submit" className="btn btn-success">
            <i className="bi bi-messenger me-2"></i>Send Booking
          </button>
        </form>
      </div>
    </div>
  );
};

export default BookingAdd;