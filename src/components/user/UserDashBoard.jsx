import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { AuthContext } from "../../context/AuthContext";
import {
  UserCircleGear,
  EnvelopeSimple,
  CalendarCheck,
  ChatCircleText,
  House,
} from "phosphor-react";

const UserDashboard = () => {
  const [stats, setStats] = useState({
    totalInquires: 0,
    totalBookings: 0,
    recentInquiries: [],
    recentBookings: [],
  });

  const { token } = useContext(AuthContext);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await axios.get(
          "https://space-core.onrender.com/api/userDash/",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setStats({
          totalInquires: res.data.totalInquires || 0,
          totalBookings: res.data.totalBookings || 0,
          recentInquiries: res.data.recentInquiries || [],
          recentBookings: res.data.recentBookings || [],
        });
      } catch (error) {
        console.error("Failed to fetch dashboard stats", error);
      }
    };
    if (token) fetchStats();
  }, [token]);

  return (
    <div className="container my-5">
      {/* Header */}
      <h2
        className="text-center mb-3 d-flex justify-content-center align-items-center gap-2"
        style={{
          fontFamily: "'Poppins', sans-serif",
          fontWeight: 700,
          fontSize: "2rem",
          background: "linear-gradient(to right, #1e2a38, #3a506b)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
        }}
      >
        <UserCircleGear size={32} weight="duotone" className="hover-spin" />
        User Dashboard Overview
      </h2>
      <p
        className="text-center text-muted mb-5"
        style={{ fontFamily: "'Poppins', sans-serif" }}
      >
        Welcome back! Here’s a snapshot of your latest activity.
      </p>

      {/* Summary Cards */}
      <div className="row row-cols-1 row-cols-md-2 row-cols-lg-4 g-4 mb-5">
        <div className="col">
          <div
            className="card shadow-sm border-0 rounded-4 text-center p-4 hover-shadow"
            style={{ backgroundColor: "#1e2a38", color: "#e1e8f0" }}
          >
            <div className="mb-3">
              <EnvelopeSimple size={48} weight="duotone" />
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
              <CalendarCheck size={48} weight="duotone" />
            </div>
            <h6 className="mb-1">Total Bookings</h6>
            <h2 className="fw-bold">{stats.totalBookings}</h2>
          </div>
        </div>
      </div>

      {/* Recent Inquiries */}
      <section className="mb-5">
        <h4 className="text-primary mb-3">
          <EnvelopeSimple size={24} className="me-2" /> Recent Inquiries
        </h4>
        {stats.recentInquiries.length === 0 ? (
          <p className="text-muted fst-italic">No recent inquiries found.</p>
        ) : (
          <ul className="list-group shadow-sm rounded-4 overflow-hidden">
            {stats.recentInquiries.map((inquiry, index) => (
              <li
                key={index}
                className="list-group-item d-flex align-items-center gap-3"
                style={{ backgroundColor: "#f4f7fa" }}
              >
                <img
                  src={inquiry.propertyImage || "/placeholder.jpg"}
                  alt="property"
                  className="rounded"
                  style={{
                    width: "60px",
                    height: "60px",
                    objectFit: "cover",
                  }}
                />
                <div className="flex-grow-1">
                  <strong>{inquiry.propertyTitle}</strong>
                  <div className="text-secondary small">
                    <ChatCircleText size={16} className="me-1" />
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
        <h4 className="text-primary mb-3">
          <CalendarCheck size={24} className="me-2" /> Recent Bookings
        </h4>
        {stats.recentBookings.length === 0 ? (
          <p className="text-muted fst-italic">No recent bookings found.</p>
        ) : (
          <ul className="list-group shadow-sm rounded-4 overflow-hidden">
            {stats.recentBookings.map((booking, index) => (
              <li
                key={index}
                className="list-group-item d-flex align-items-center gap-3"
                style={{ backgroundColor: "#f4f7fa" }}
              >
                <img
                  src={booking.propertyImage || "/placeholder.jpg"}
                  alt="property"
                  className="rounded"
                  style={{
                    width: "60px",
                    height: "60px",
                    objectFit: "cover",
                  }}
                />
                <div className="flex-grow-1">
                  <strong>{booking.propertyTitle}</strong>
                  <div className="text-secondary small">
                    <House size={16} className="me-1" />
                    Start: {new Date(booking.startDate).toLocaleDateString()} | End:{" "}
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

      {/* Styles */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@500;700&display=swap');

        .hover-shadow:hover {
          box-shadow: 0 0 15px rgba(0,0,0,0.3);
          transform: translateY(-5px);
          transition: all 0.3s ease;
        }

        .hover-spin:hover {
          transform: rotate(8deg);
          transition: transform 0.3s ease;
        }
      `}</style>
    </div>
  );
};

export default UserDashboard;