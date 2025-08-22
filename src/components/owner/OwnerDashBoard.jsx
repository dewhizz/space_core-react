import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { AuthContext } from "../../context/AuthContext";
import {
  Buildings,
  EnvelopeSimple,
  CalendarCheck,
  ChatCircleText,
  House,
} from "phosphor-react";

const OwnerDashboard = () => {
  const [stats, setStats] = useState({
    totalProperties: 0,
    totalInquiries: 0,
    totalBookings: 0,
    recentProperties: [],
    recentInquiry: [],
    recentBooking: [],
  });

  const { token } = useContext(AuthContext);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await axios.get(
          "https://space-core.onrender.com/api/owner/owner-dash",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setStats({
          totalProperties: res.data.totalProperties ?? 0,
          totalInquiries: res.data.totalInquiries ?? 0,
          totalBookings: res.data.totalBookings ?? 0,
          recentProperties: res.data.recentProperties ?? [],
          recentInquiry: res.data.recentInquiry ?? [],
          recentBooking: res.data.recentBooking ?? [],
        });
      } catch (error) {
        console.error("Failed to fetch owner dashboard stats", error);
      } finally {
        setLoading(false);
      }
    };
    if (token) fetchStats();
  }, [token]);

  return (
    <div className="container my-5">
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
        <Buildings size={32} weight="duotone" className="hover-spin" />
        Owner Dashboard Overview
      </h2>
      <p
        className="text-center text-muted mb-5"
        style={{ fontFamily: "'Poppins', sans-serif" }}
      >
        Welcome back! Here’s a snapshot of your latest activity.
      </p>

      {/* Summary Cards */}
      <div className="row row-cols-1 row-cols-md-3 g-4 mb-5">
        {[
          {
            label: "Total Properties",
            value: stats.totalProperties,
            icon: <Buildings size={48} weight="duotone" />,
          },
          {
            label: "Total Inquiries",
            value: stats.totalInquiries,
            icon: <EnvelopeSimple size={48} weight="duotone" />,
          },
          {
            label: "Total Bookings",
            value: stats.totalBookings,
            icon: <CalendarCheck size={48} weight="duotone" />,
          },
        ].map((card, index) => (
          <div className="col" key={index}>
            <div
              className="card shadow-sm border-0 rounded-4 text-center p-4 hover-shadow"
              style={{ backgroundColor: "#1e2a38", color: "#e1e8f0" }}
            >
              <div className="mb-3">{card.icon}</div>
              <h6 className="mb-1">{card.label}</h6>
              <h2 className="fw-bold">{card.value}</h2>
            </div>
          </div>
        ))}
      </div>

      {/* Recent Inquiries */}
      <section className="mb-5">
        <h4 className="text-primary mb-3">
          <EnvelopeSimple size={24} className="me-2" /> Recent Inquiries
        </h4>
        {stats.recentInquiry.length === 0 ? (
          <p className="text-muted fst-italic">No recent inquiries found.</p>
        ) : (
          <ul className="list-group shadow-sm rounded-4 overflow-hidden">
            {stats.recentInquiry.map((inquiry, index) => (
              <li
                key={index}
                className="list-group-item d-flex align-items-center gap-3"
                style={{ backgroundColor: "#f4f7fa" }}
              >
                <img
                  src={inquiry.property?.image || "/placeholder.jpg"}
                  alt="property"
                  className="rounded"
                  style={{
                    width: "60px",
                    height: "60px",
                    objectFit: "cover",
                  }}
                />
                <div className="flex-grow-1">
                  <strong>{inquiry.property?.title || "Untitled Property"}</strong>
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
        {stats.recentBooking.length === 0 ? (
          <p className="text-muted fst-italic">No recent bookings found.</p>
        ) : (
          <ul className="list-group shadow-sm rounded-4 overflow-hidden">
            {stats.recentBooking.map((booking, index) => (
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
    </div>
  );
};

export default OwnerDashboard;
