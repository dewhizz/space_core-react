import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../context/AuthContext';
import axios from 'axios';

const UserDashBoard = () => {
  const [stats, setStats] = useState({
    totalInquiries: 0,
    totalBookings: 0,
    recentInquiries: [],
    recentBookings: [],
  });

  const { token } = useContext(AuthContext);

  // Assuming your API returns data filtered by the authenticated owner via token
  const authHeader = {
    headers: { Authorization: `Bearer ${token}` },
  };

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await axios.get(
          "https://space-core.onrender.com/api/userDash/",
          authHeader
        );
        setStats({
          totalInquires: res.data.totalInquires || 0,
          totalBookings: res.data.totalBookings || 0,
          recentInquiries: res.data.recentInquiries || [],
          recentBookings: res.data.recentBookings || [],
        });
      } catch (error) {
        console.error(error);
      }
    };
    if (token) fetchStats();
  }, [token]);

  return (
    <div className="container my-5">
      <h2
        className="text-center text-primary mb-4"
        style={{
          fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
        }}
      >
        User Dashboard Overview
      </h2>

      {/* Summary Cards */}
      <div className="row row-cols-1 row-cols-md-2 row-cols-lg-4 g-4 mb-5">
        <div className="col">
          <div
            className="card shadow-sm border-0 rounded-4 text-center p-4 hover-shadow"
            style={{ backgroundColor: "#1e2a38", color: "#e1e8f0" }}
          >
            <div className="mb-3">
              <i className="bi bi-envelope-fill fs-1"></i>
            </div>
            <h6 className="mb-1">Total Inquiries</h6>
            <h2 className="fw-bold">{stats.totalInquires}</h2>
          </div>
        </div>

        <div className="col">
          <div
            className="card shadow-sm border-0 rounded-4 text-center p-4 hover-shadow"
            style={{ backgroundColor: "#1e2a38", color: "#e1e8f0" }}
          >
            <div className="mb-3">
              <i className="bi bi-calendar-check-fill fs-1"></i>
            </div>
            <h6 className="mb-1">Total Bookings</h6>
            <h2 className="fw-bold">{stats.totalBookings}</h2>
          </div>
        </div>
      </div>

      {/* Recent Inquiries */}
      <section className="mb-5">
        <h4
          className="text-primary mb-3"
          style={{
            fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
          }}
        >
          <i className="bi bi-envelope-fill me-2"></i>Recent Inquiries
        </h4>
        {stats.recentInquiries.length === 0 ? (
          <p className="text-muted fst-italic">No recent inquiries found.</p>
        ) : (
          <ul className="list-group shadow-sm rounded-4 overflow-hidden">
            {stats.recentInquiries.map((inquiry, index) => (
              <li
                key={index}
                className="list-group-item d-flex justify-content-between align-items-center"
                style={{ backgroundColor: "#f4f7fa" }}
              >
                <div>
                  <strong>{inquiry.property}</strong>
                  <div className="text-secondary small">
                    {inquiry.message || "No message provided"}
                  </div>
                </div>
                <span
                  className={`badge rounded-pill ${
                    inquiry.status === "approved"
                      ? "bg-success"
                      : inquiry.status === "pending"
                      ? "bg-warning text-dark"
                      : "bg-secondary"
                  }`}
                >
                  {inquiry.status}
                </span>
              </li>
            ))}
          </ul>
        )}
      </section>

      {/* Recent Bookings */}
      <section>
        <h4
          className="text-primary mb-3"
          style={{
            fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
          }}
        >
          <i className="bi bi-calendar-check-fill me-2"></i>Recent Bookings
        </h4>
        {stats.recentBookings.length === 0 ? (
          <p className="text-muted fst-italic">No recent bookings found.</p>
        ) : (
          <ul className="list-group shadow-sm rounded-4 overflow-hidden">
            {stats.recentBookings.map((booking, index) => (
              <li
                key={index}
                className="list-group-item d-flex justify-content-between align-items-center"
                style={{ backgroundColor: "#f4f7fa" }}
              >
                <div>
                  <strong>{booking.property}</strong>
                  <div className="text-secondary small">
                    Start: {new Date(booking.startDate).toLocaleDateString()}{" "}
                    &nbsp;|&nbsp; End:{" "}
                    {new Date(booking.endDate).toLocaleDateString()}
                  </div>
                </div>
                <span
                  className={`badge rounded-pill ${
                    booking.status === "confirmed"
                      ? "bg-success"
                      : booking.status === "pending"
                      ? "bg-warning text-dark"
                      : "bg-secondary"
                  }`}
                >
                  {booking.status}
                </span>
              </li>
            ))}
          </ul>
        )}
      </section>

      <style>{`
        .hover-shadow:hover {
          box-shadow: 0 0 15px rgba(0,0,0,0.3);
          transform: translateY(-5px);
          transition: all 0.3s ease;
        }
      `}</style>
    </div>
  );
};

export default UserDashBoard;
 