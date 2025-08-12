import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import axios from "axios";

const OwnerBookings = () => {
  const [bookings, setBookings] = useState([]);
  const { token } = useContext(AuthContext);
  const navigate = useNavigate();

  const authHeader = {
    headers: { Authorization: `Bearer ${token}` },
  };

  const fetchBookings = async () => {
    try {
      toast.info("Loading bookings...");
      const res = await axios.get(
        "https://space-core.onrender.com/api/booking/owner-bookings",
        authHeader
      );
      setBookings(res.data);
      toast.dismiss();
    } catch (error) {
      toast.dismiss();
      toast.error(error.response?.data?.message || "Failed to load bookings");
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  const handleUpdateStatus = async (id, newStatus) => {
    try {
      toast.info(`Setting status to "${newStatus}"...`);
      await axios.put(
        `https://space-core.onrender.com/api/bookings/${id}`,
        { status: newStatus },
        authHeader
      );
      toast.success("Booking status updated!");
      fetchBookings();
    } catch (error) {
      toast.error(error.response?.data?.message || "Update failed");
    }
  };

  return (
    <div className="container mt-4">
      <ToastContainer position="top-right" autoClose={3000} />

      <nav aria-label="breadcrumb" className="mb-3">
        <ol className="breadcrumb">
          <li className="breadcrumb-item fw-bold">
            <Link to="/owner-dashboard">Dashboard</Link>
          </li>
          <li className="breadcrumb-item-active" aria-label="page">
            /bookings
          </li>
        </ol>
      </nav>

      <div className="card p-4 shadow-sm">
        <h5 className="text-success mb-3">
          <i className="bi bi-calendar-check me-2"></i>Bookings List
        </h5>

        {bookings.length === 0 ? (
          <div className="alert alert-warning text-center">
            <i className="bi bi-exclamation-circle me-2"></i>No Bookings Found!
          </div>
        ) : (
          <div className="table-responsive">
            <table className="table table-striped table-hover table-bordered">
              <thead className="table-success">
                <tr>
                  <th>#</th>
                  <th>Property</th>
                  <th>User</th>
                  <th>Start Date</th>
                  <th>End Date</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {bookings.map((booking, idx) => (
                  <tr key={booking._id}>
                    <td>{idx + 1}</td>
                    <td>{booking.property?.title || "N/A"}</td>
                    <td>
                      {booking.user?.name || booking.user?.email || "N/A"}
                    </td>
                    <td>{new Date(booking.startDate).toLocaleDateString()}</td>
                    <td>{new Date(booking.endDate).toLocaleDateString()}</td>
                    <td>{booking.status}</td>
                    <td>
                      <button
                        className="btn btn-sm btn-success me-2"
                        onClick={() =>
                          handleUpdateStatus(booking._id, "Approved")
                        }
                        disabled={booking.status === "Approved"}
                      >
                        Approve
                      </button>
                      <button
                        className="btn btn-sm btn-danger"
                        onClick={() =>
                          handleUpdateStatus(booking._id, "Rejected")
                        }
                        disabled={booking.status === "Rejected"}
                      >
                        Reject
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default OwnerBookings;
