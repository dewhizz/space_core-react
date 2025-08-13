import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import axios from "axios";
import "react-toastify/dist/ReactToastify.css";

const Bookings = () => {
  const [bookings, setBookings] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const { token } = useContext(AuthContext);
  const navigate = useNavigate();

  const limit = 5;

  const authHeader = {
    headers: { Authorization: `Bearer ${token}` },
  };

  const fetchBookings = async (pageNumber = 1) => {
    try {
      toast.info("Loading your bookings...");
      const res = await axios.get(
        `https://space-core.onrender.com/api/booking/my-bookings`,
        authHeader
      );
      setBookings(res.data.bookings || res.data);
      setTotalPages(res.data.totalPages || 1);
      toast.dismiss();
    } catch (error) {
      toast.dismiss();
      toast.error(error.response?.data?.message || "Failed to load bookings");
    }
  };

  useEffect(() => {
    fetchBookings(page);
  }, [page]);

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages && newPage !== page) {
      setPage(newPage);
    }
  };

  const handleEditBooking = (bookingData) => {
    navigate("/user-dashboard/bookings/edit", { state: { bookingData } });
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
            <>
              <table className="table table-hover table-bordered">
                <thead className="table-light">
                  <tr>
                    <th>#</th>
                    <th>Property</th>
                    <th>Start Date</th>
                    <th>End Date</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {bookings.map((booking, index) => (
                    <tr key={booking._id}>
                      <td>{(page - 1) * limit + index + 1}</td>
                      <td>
                        <div className="d-flex align-items-center">
                          {booking.property?.photo && (
                            <img
                              src={booking.property.photo}
                              alt={booking.property.title}
                              style={{
                                width: "70px",
                                height: "50px",
                                objectFit: "cover",
                                borderRadius: "8px",
                                marginRight: "12px",
                                boxShadow: "0 2px 6px rgba(0,0,0,0.1)"
                              }}
                            />
                          )}
                          <div>
                            <div className="fw-semibold text-success">
                              {booking.property?.title || "Untitled Property"}
                            </div>
                            <small className="text-muted d-block">
                              Owner: {booking.property?.owner?.name || "Unknown"}
                            </small>
                            {booking.property?.plotNumber && (
                              <small className="text-muted">
                                Plot: {booking.property.plotNumber}
                              </small>
                            )}
                          </div>
                        </div>
                      </td>
                      <td>{new Date(booking.startDate).toLocaleDateString()}</td>
                      <td>{new Date(booking.endDate).toLocaleDateString()}</td>
                      <td>
                        <span
                          className={`badge ${
                            booking.status === "confirmed"
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
                          className="btn btn-sm btn-light border border-success rounded-circle shadow-sm"
                          onClick={() => handleEditBooking(booking)}
                          title="Edit Booking"
                          style={{
                            width: "36px",
                            height: "36px",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            transition: "0.3s",
                          }}
                        >
                          <i className="bi bi-pencil-fill text-success"></i>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {/* Pagination Controls */}
              <nav>
                <ul className="pagination justify-content-center">
                  <li className={`page-item ${page === 1 ? "disabled" : ""}`}>
                    <button className="page-link" onClick={() => handlePageChange(page - 1)}>
                      Previous
                    </button>
                  </li>

                  {[...Array(totalPages)].map((_, i) => (
                    <li key={i} className={`page-item ${page === i + 1 ? "active" : ""}`}>
                      <button className="page-link" onClick={() => handlePageChange(i + 1)}>
                        {i + 1}
                      </button>
                    </li>
                  ))}

                  <li className={`page-item ${page === totalPages ? "disabled" : ""}`}>
                    <button className="page-link" onClick={() => handlePageChange(page + 1)}>
                      Next
                    </button>
                  </li>
                </ul>
              </nav>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Bookings;