import React, { useContext, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { motion } from "framer-motion";

const SideBar = () => {
  const [showSwitchOption, setShowSwitchOption] = useState(false);
  const navigate = useNavigate();
  const { logout, user } = useContext(AuthContext);

  const hasAddedProperty = true;

  const handleSwitchClick = () => {
    if (hasAddedProperty) {
      navigate("/owner-dashboard");
    }
  };

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good morning";
    if (hour < 18) return "Good afternoon";
    return "Good evening";
  };

  return (
    <motion.div
      initial={{ x: -250, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="d-flex flex-column justify-content-between p-4 text-light"
      style={{
        width: "250px",
        height: "100vh",
        background: "linear-gradient(135deg, #0A1F44, #555555)",
        backdropFilter: "blur(8px)",
        boxShadow: "0 0 10px rgba(0,0,0,0.3)",
        fontFamily: "Poppins, sans-serif",
      }}
    >
      {/* Top Section */}
      <div>
        {/* Greeting with animated wave */}
        <div className="text-center mb-4">
          <h5 className="fw-bold">
            {getGreeting()}, {user?.name || "Guest"}{" "}
            <motion.span
              initial={{ rotate: 0 }}
              animate={{ rotate: [0, 20, -10, 20, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 2 }}
              style={{ display: "inline-block" }}
            >
              👋
            </motion.span>
          </h5>
          <small className="text-muted">Welcome back to your dashboard</small>
        </div>

        {/* Navigation */}
        <ul className="nav nav-pills flex-column mb-auto">
          <li className="nav-item mb-3" title="Go to Dashboard">
            <NavLink
              to="/user-dashboard"
              end
              className={({ isActive }) =>
                `nav-link d-flex align-items-center gap-2 px-3 py-2 rounded ${
                  isActive ? "bg-warning text-dark fw-bold shadow-sm border-start border-4 border-light" : "text-light"
                }`
              }
            >
              <i className="bi bi-speedometer2" title="Dashboard"></i> Dashboard
            </NavLink>
          </li>

          <li className="nav-item mb-3" title="View your inquiries">
            <NavLink
              to="/user-dashboard/inquires"
              end
              className={({ isActive }) =>
                `nav-link d-flex align-items-center gap-2 px-3 py-2 rounded ${
                  isActive ? "bg-warning text-dark fw-bold shadow-sm border-start border-4 border-light" : "text-light"
                }`
              }
            >
              <i className="bi bi-chat-left-text-fill" title="My Inquiries"></i> My Inquiries
            </NavLink>
          </li>

          <li className="nav-item mb-3" title="Check your bookings">
            <NavLink
              to="/user-dashboard/bookings"
              end
              className={({ isActive }) =>
                `nav-link d-flex align-items-center gap-2 px-3 py-2 rounded ${
                  isActive ? "bg-warning text-dark fw-bold shadow-sm border-start border-4 border-light" : "text-light"
                }`
              }
            >
              <i className="bi bi-calendar-check-fill" title="My Bookings"></i> My Bookings
            </NavLink>
          </li>
        </ul>
      </div>

      {/* Bottom Section */}
      <div style={{ position: "relative" }}>
        {/* Gear Icon */}
        <button
          className="btn btn-link text-light"
          onClick={() => setShowSwitchOption(!showSwitchOption)}
          style={{ textDecoration: "none" }}
          title="Settings"
        >
          <i className="bi bi-sliders fs-4"></i>
        </button>

        {/* Dropdown Menu */}
        {showSwitchOption && (
          <div
            className="bg-dark p-3 rounded shadow"
            style={{
              position: "absolute",
              bottom: "50px",
              left: 0,
              minWidth: "200px",
              zIndex: 100,
              border: "1px solid #444",
            }}
          >
            <div
              className="text-light py-2 px-3 rounded"
              style={{ cursor: "pointer", transition: "0.3s" }}
              onClick={handleSwitchClick}
              onMouseEnter={(e) => (e.target.style.backgroundColor = "#333")}
              onMouseLeave={(e) => (e.target.style.backgroundColor = "transparent")}
              title="Switch to Owner Dashboard"
            >
              <i className="bi bi-arrow-left-right me-2"></i> Switch to Owner Dashboard
            </div>

            <hr className="text-secondary my-2" />

            <button
              className="btn btn-sm btn-outline-danger w-100 d-flex align-items-center justify-content-center gap-2"
              onClick={logout}
              title="Logout"
            >
              <i className="bi bi-door-open-fill"></i> Logout
            </button>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default SideBar;