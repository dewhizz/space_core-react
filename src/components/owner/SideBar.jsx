import React from "react";
import { NavLink } from "react-router-dom";

const SideBar = () => {
  return (
    <div
      className="text-light d-flex-columns p-3"
      style={{
        width: "250px",
        background: "linear-gradient(135deg, #0A1F44, #555555)",
      }}
    >
      <h4 className="text-center mb-4">
        <i className="bi bi-speedometer me-2">Owner Panel</i>
      </h4>
      <ul className="nav nav-pills flex-column mb-auto">
        <li className="nav-item mb-4">
          <NavLink
            to="/owner-dashboard"
            end
            className={({ isActive }) =>
              isActive
                ? "nav-link bg-dark text-light fw-bold"
                : "nav-link text-light"
            }
          >
            <i className="bi bi-ui-checks-grid"></i> DashBoard
          </NavLink>
        </li>

            <li className="nav-item">
          <NavLink
            to="/owner-dashboard/properties"
            end
            className={({ isActive }) =>
              isActive
                ? "nav-link bg-dark text-light fw-bold"
                : "nav-link text-light"
            }
          >
            <i class="bi bi-question-octagon-fill"></i> Properties
          </NavLink>
        </li>

        <li className="nav-item">
          <NavLink
            to="/owner-dashboard/owner-inquires"
            end
            className={({ isActive }) =>
              isActive
                ? "nav-link bg-dark text-light fw-bold"
                : "nav-link text-light"
            }
          >
            <i class="bi bi-question-octagon-fill"></i> Inquires Made
          </NavLink>
        </li>

        <li className="nav-item">
          <NavLink
            to="/owner-dashboard/bookings"
            end
            className={({ isActive }) =>
              isActive
                ? "nav-link bg-dark text-light fw-bold"
                : "nav-link text-light"
            }
          >
            <i className="bi bi-clock-history me-2"></i> Bookings Made
          </NavLink>
        </li>
      </ul>
    </div>
  );
};

export default SideBar;
