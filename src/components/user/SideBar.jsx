import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { motion } from "framer-motion";
import { House, ChatText, CalendarCheck } from "phosphor-react";

const SideBar = () => {
  const { user } = useContext(AuthContext);

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
        height: "125vh",
        background: "linear-gradient(135deg, #0A1F44, #555555)",
        backdropFilter: "blur(8px)",
        boxShadow: "0 0 10px rgba(0,0,0,0.3)",
        fontFamily: "Poppins, sans-serif",
      }}
    >
      {/* Greeting Section */}
      <div>
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
          <small className="text-warning">Welcome back to your dashboard</small>
        </div>

        {/* Navigation Links */}
        <ul className="nav nav-pills flex-column mb-auto">
          <li className="nav-item mb-3">
            <NavLink
              to="/user-dashboard"
              end
              className={({ isActive }) =>
                `nav-link d-flex align-items-center gap-2 px-3 py-2 rounded ${
                  isActive
                    ? "bg-warning text-dark fw-bold shadow-sm border-start border-4 border-light"
                    : "text-light"
                }`
              }
            >
              <House size={20} weight="fill" /> Dashboard
            </NavLink>
          </li>

          <li className="nav-item mb-3">
            <NavLink
              to="/user-dashboard/inquires"
              end
              className={({ isActive }) =>
                `nav-link d-flex align-items-center gap-2 px-3 py-2 rounded ${
                  isActive
                    ? "bg-warning text-dark fw-bold shadow-sm border-start border-4 border-light"
                    : "text-light"
                }`
              }
            >
              <ChatText size={20} weight="fill" /> My Inquiries
            </NavLink>
          </li>

          <li className="nav-item mb-3">
            <NavLink
              to="/user-dashboard/bookings"
              end
              className={({ isActive }) =>
                `nav-link d-flex align-items-center gap-2 px-3 py-2 rounded ${
                  isActive
                    ? "bg-warning text-dark fw-bold shadow-sm border-start border-4 border-light"
                    : "text-light"
                }`
              }
            >
              <CalendarCheck size={20} weight="fill" /> My Bookings
            </NavLink>
          </li>

           <li className="nav-item mb-3">
            <NavLink
              to="/owner-dashboard/properties/add"
              end
              className={({ isActive }) =>
                `nav-link d-flex align-items-center gap-2 px-3 py-2 rounded ${
                  isActive
                    ? "bg-warning text-dark fw-bold shadow-sm border-start border-4 border-light"
                    : "text-light"
                }`
              }
            >
              <CalendarCheck size={20} weight="fill" /> Add Properties
            </NavLink>
          </li>
        </ul>
      </div>

      {/* Footer */}
      <div className="text-center text-muted small mt-4">v1.0</div>
    </motion.div>
  );
};

export default SideBar;