// src/components/Bookings/AddBooking.jsx

import React, { useState, useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";

const AddBooking = () => {
  const { token } = useContext(AuthContext);
  const navigate = useNavigate();

  const [propertyTitle, setPropertyTitle] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const authHeader = {
    headers: { Authorization: `Bearer ${token}` },
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      toast.info("Creating booking...");
      const payload = {
        propertyTitle,
        startDate,
        endDate,
      };

      // Adjust API endpoint and payload as per backend
      const res = await axios.post(
        "https://space-core.onrender.com/api/booking",
        payload,
        authHeader
      );

      toast.success("Booking added successfully!");
      navigate("/user-dashboard/bookings");
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to add booking");
    }
  };

  return (
    <div className="container mt-4" style={{ fontFamily: "Poppins, sans-serif" }}>
      <ToastContainer position="top-right" autoClose={3000} />
      <h2 className="mb-4">Add New Booking</h2>

      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Property Title</label>
          <input
            type="text"
            className="form-control"
            value={propertyTitle}
            onChange={(e) => setPropertyTitle(e.target.value)}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Start Date</label>
          <input
            type="date"
            className="form-control"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">End Date</label>
          <input
            type="date"
            className="form-control"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
          />
        </div>

        <button type="submit" className="btn btn-primary">
          Add Booking
        </button>
      </form>
    </div>
  );
};

export default AddBooking;
