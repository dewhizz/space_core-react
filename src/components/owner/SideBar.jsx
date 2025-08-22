import React from "react";
import { NavLink } from "react-router-dom";

const SideBar = () => {
  return (
    <div
      className="text-light d-flex flex-column p-4"
      style={{
        width: "260px",
        height: "125vh",
        background: "linear-gradient(135deg, #1F1C2C, #928DAB)",
        fontFamily: "'Segoe UI', 'Roboto', 'sans-serif'",
        boxShadow: "2px 0 10px rgba(0,0,0,0.3)",
      }}
    >
      <h4 className="text-center mb-5 fw-semibold">
        <i className="bi bi-person-gear me-2"></i> Owner Panel
      </h4>
      <ul className="nav nav-pills flex-column mb-auto">
        <li className="nav-item mb-3">
          <NavLink
            to="/owner-dashboard"
            end
            className={({ isActive }) =>
              isActive
                ? "nav-link bg-secondary text-white fw-bold"
                : "nav-link text-light"
            }
          >
            <i className="bi bi-speedometer2 me-2"></i> Dashboard
          </NavLink>
        </li>

        <li className="nav-item mb-3">
          <NavLink
            to="/owner-dashboard/properties"
            end
            className={({ isActive }) =>
              isActive
                ? "nav-link bg-secondary text-white fw-bold"
                : "nav-link text-light"
            }
          >
            <i className="bi bi-building me-2"></i> Properties
          </NavLink>
        </li>

        <li className="nav-item mb-3">
          <NavLink
            to="/owner-dashboard/owner-inquires"
            end
            className={({ isActive }) =>
              isActive
                ? "nav-link bg-secondary text-white fw-bold"
                : "nav-link text-light"
            }
          >
            <i className="bi bi-chat-dots me-2"></i> Inquiries
          </NavLink>
        </li>

        <li className="nav-item mb-3">
          <NavLink
            to="/owner-dashboard/bookings"
            end
            className={({ isActive }) =>
              isActive
                ? "nav-link bg-secondary text-white fw-bold"
                : "nav-link text-light"
            }
          >
            <i className="bi bi-calendar-check me-2"></i> Bookings
          </NavLink>
        </li>

        <li className="nav-item mb-3">
          <NavLink
            to="/get-properties"
            end
            className={({ isActive }) =>
              isActive
                ? "nav-link bg-secondary text-white fw-bold"
                : "nav-link text-light"
            }
          >
            <i className="bi bi-eye me-2"></i> View Properties
          </NavLink>
        </li>


      </ul>
    </div>
  );
};

export default SideBar;