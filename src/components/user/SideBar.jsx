import React from 'react'
import { NavLink } from 'react-router-dom'

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
        <i className="bi bi-speedometer me-2">User Panel</i>
      </h4>
      <ul className="nav nav-pills flex-column mb-auto">
        <li className="nav-item mb-4">
          <NavLink
            to="/user-dashboard"
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
            to="/user-dashboard/inquires"
            end
            className={({ isActive }) =>
              isActive
                ? "nav-link bg-dark text-light fw-bold"
                : "nav-link text-light"
            }
          >
            <i class="bi bi-question-octagon-fill"></i> My Inquires
          </NavLink>
        </li>

        <li className="nav-item">
          <NavLink
            to="/user-dashboard/bookings"
            end
            className={({ isActive }) =>
              isActive
                ? "nav-link bg-dark text-light fw-bold"
                : "nav-link text-light"
            }
          >
            <i className="bi bi-clock-history me-2"></i> My Bookings
          </NavLink>
        </li>
      </ul>
    </div>
  );
}

export default SideBar