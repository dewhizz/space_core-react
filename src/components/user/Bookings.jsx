import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import axios from "axios";
import {
  CheckCircle,
  XCircle,
  PencilSimple,
  TrashSimple,
  PlusCircle,
} from "phosphor-react";
import "react-toastify/dist/ReactToastify.css";

const Bookings = () => {
  const [bookings, setBookings] = useState([]);
  const { token } = useContext(AuthContext);
  const navigate = useNavigate();

  const authHeader = {
    headers: { Authorization: `Bearer ${token}` },
  };

  const FetchBookings = async () => {
    try {
      toast.info("Loading Your Bookings ......");
      const res = await axios.get(
        "https://space-core.onrender.com/api/booking/my-bookings",
        authHeader
      );
      setBookings(res.data);
      toast.dismiss();
    } catch (error) {
      toast.dismiss();
      toast.error(error.response?.data?.message || "Failed to load Bookings");
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Delete this Booking?")) {
      try {
        toast.warning("Deleting Booking...");
        const res = await axios.delete(
          `https://space-core.onrender.com/api/booking/${id}`,
          authHeader
        );
        toast.success(res.data.message);
        FetchBookings();
      } catch (error) {
        toast.dismiss();
        toast.error(error.response?.data?.message);
      }
    }
  };

  useEffect(() => {
    FetchBookings();
  }, []);

  return (
    <div
      className="container mt-4"
      style={{
        fontFamily: "'Poppins', sans-serif",
        color: "#333",
      }}
    >
      <ToastContainer position="top-right" autoClose={3000} />

      <nav aria-label="breadcrumb" className="mb-4">
        <ol className="breadcrumb bg-transparent p-0">
          <li className="breadcrumb-item fw-semibold text-primary">
            <Link to="/user-dashboard">Dashboard</Link>
          </li>
          <li className="breadcrumb-item active text-muted">Bookings</li>
        </ol>
      </nav>

      <div
        className="card p-4"
        style={{
          background: "rgba(255, 255, 255, 0.75)",
          backdropFilter: "blur(14px)",
          borderRadius: "16px",
          border: "1px solid rgba(255, 255, 255, 0.3)",
          boxShadow: "0 8px 24px rgba(0, 0, 0, 0.1)",
        }}
      >
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h4
            className="fw-bold"
            style={{
              background: "linear-gradient(to right, #00c6ff, #0072ff)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              display: "flex",
              alignItems: "center",
            }}
          >
            <CheckCircle size={24} className="me-2" /> My Bookings
          </h4>
          <button
            className="btn"
            style={{
              background: "linear-gradient(to right, #00c6ff, #0072ff)",
              color: "white",
              fontWeight: "600",
              borderRadius: "10px",
              padding: "0.6rem 1.2rem",
              boxShadow: "0 4px 12px rgba(0, 114, 255, 0.3)",
              transition: "transform 0.2s ease",
            }}
            onMouseOver={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
            onMouseOut={(e) => (e.currentTarget.style.transform = "scale(1)")}
          >
            <PlusCircle size={20} className="me-2" /> Add Booking
          </button>
        </div>

        <div className="table-responsive">
          {bookings.length === 0 ? (
            <div className="alert alert-info text-center">
              <XCircle size={20} className="me-2 text-danger" />
              No bookings found.
            </div>
          ) : (
            <table className="table table-hover align-middle">
              <thead
                style={{
                  background: "rgba(240, 240, 255, 0.6)",
                  backdropFilter: "blur(6px)",
                }}
              >
                <tr>
                  <th>#</th>
                  <th>Property</th>
                  <th>Start</th>
                  <th>End</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {bookings.map((booking, index) => (
                  <tr
                    key={booking._id}
                    style={{
                      background: "rgba(255, 255, 255, 0.6)",
                      backdropFilter: "blur(6px)",
                      transition: "background 0.3s ease",
                    }}
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.background =
                        "rgba(255, 255, 255, 0.85)")
                    }
                    onMouseLeave={(e) =>
                      (e.currentTarget.style.background =
                        "rgba(255, 255, 255, 0.6)")
                    }
                  >
                    <td>{index + 1}</td>
                    <td>{booking.inquiry?.property?.title || "Untitled"}</td>
                    <td>{booking.startDate}</td>
                    <td>{booking.endDate || "N/A"}</td>
                    <td>
                      <span
                        style={{
                          padding: "0.3rem 0.6rem",
                          borderRadius: "12px",
                          fontWeight: "500",
                          color: "white",
                          background:
                            booking.status === "Confirmed"
                              ? "#28a745"
                              : "#ffc107",
                        }}
                      >
                        {booking.status || "Pending"}
                      </span>
                    </td>
                    <td>
                      <button
                        className="btn btn-sm"
                        style={{
                          border: "1px solid #0072ff",
                          color: "#0072ff",
                          borderRadius: "8px",
                          marginRight: "0.5rem",
                        }}
                      >
                        <PencilSimple size={18} />
                      </button>
                      <button
                        className="btn btn-sm"
                        style={{
                          border: "1px solid #dc3545",
                          color: "#dc3545",
                          borderRadius: "8px",
                        }}
                        onClick={() => handleDelete(booking._id)}
                      >
                        <TrashSimple size={18} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
};

export default Bookings;
