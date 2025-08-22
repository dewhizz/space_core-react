import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import axios from "axios";
import "react-toastify/dist/ReactToastify.css";

const Bookings = () => {
  const [bookings, setBookings] = useState([]);
  const { token } = useContext(AuthContext);
  const navigate = useNavigate();

  const authHeader = {
    headers: { Authorization: `Bearer ${token}` },
  };

  const fetchBookings = async () => {
    try {
      toast.info("Loading your bookings...");
      const res = await axios.get(
        "https://space-core.onrender.com/api/bookings/my-bookings",
        authHeader
      );
      setBookings(res.data.bookings || res.data);
      toast.dismiss();
    } catch (error) {
      toast.dismiss();
      toast.error(error.response?.data?.message || "Failed to load bookings");
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm("Delete this inquiry?")) {
      try {
        toast.warning("Deleting inquiry...");
        const res = await axios.delete(
          `https://space-core.onrender.com/api/bookings/${id}`,
          authHeader
        );
        toast.success(res.data.message);
        fetchBookings();
      } catch (error) {
        toast.dismiss();
        toast.error(error.response?.data?.message);
      }
    }
  };



  return (
    <div className="container mt-4" style={{ fontFamily: "Poppins, sans-serif" }}>
      <ToastContainer position="top-right" autoClose={3000} />

      {/* Breadcrumbs and Header */}
      <div className="d-flex justify-content-between align-items-center mb-3">
        <nav aria-label="breadcrumb">
          <ol className="breadcrumb">
            <li className="breadcrumb-item fw-bold">
              <Link to="/user-dashboard" className="text-success">
                Dashboard
              </Link>
            </li>
            <li className="breadcrumb-item active" aria-current="page">
              Bookings
            </li>
          </ol>
        </nav>
        <button
          className="btn btn-success"
          onClick={() => navigate("/user-dashboard/bookings/add")}
        >
          <i className="bi bi-plus-circle-fill me-2"></i> Add Booking
        </button>
      </div>

      {/* Bookings Table */}
      <div className="card shadow-sm p-4 mb-4" style={{ borderRadius: "12px" }}>
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h5 className="text-success fw-semibold">
            <i className="bi bi-calendar-check-fill me-2"></i> My Bookings
          </h5>
        </div>

        <div className="table-responsive">
          {bookings.length === 0 ? (
            <div className="alert alert-warning text-center">
              <i className="bi bi-exclamation-triangle-fill me-2"></i>No bookings found!
            </div>
          ) : (
            <table className="table table-hover table-bordered">
              <thead className="table-light">
                <tr>
                  <th>#</th>
                  <th>Photo</th>
                  <th>Details</th>
                  <th>Start Date</th>
                  <th>End Date</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {bookings.map((booking, index) => (
                  <tr key={booking._id}>
                    <td>{index + 1}</td>
                    <td>
                      {booking.property?.photo ? (
                        <img
                          src={`https://space-core.onrender.com/${booking.property.photo}`}
                          alt="Property"
                          width={60}
                          height={60}
                          style={{ objectFit: 'cover', borderRadius: '50%' }}
                        />
                      ) : (
                        'No Photo'
                      )}
                    </td>
                    <td>
                      <div className="d-flex align-items-center">
                        <div>
                          <div className="fw-semibold text-success">
                            {booking.property?.title || "Untitled Property"}
                          </div>


                        </div>
                      </div>

                    </td>
                    <td>{new Date(booking.startDate).toLocaleDateString()}</td>
                    <td>{new Date(booking.endDate).toLocaleDateString()}</td>
                    <td>
                      <span
                        className={`badge ${booking.status === "confirmed"
                          ? "bg-success"
                          : booking.status === "pending"
                            ? "bg-warning"
                            : "bg-secondary"
                          }`}
                      >
                        {booking.status || "Pending"}
                      </span>
                    </td>
                    <td>
                      <button
                        className="btn btn-sm btn-outline-danger"
                        onClick={() => handleDelete(booking._id)}
                      >
                        <i className="bi bi-trash-fill"></i>
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