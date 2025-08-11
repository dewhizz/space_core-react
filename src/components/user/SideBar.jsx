import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";

const SideBar = () => {
  const [showSwitchOption, setShowSwitchOption] = useState(false);
  const navigate = useNavigate();

  // Simulate user property status. Replace this with your real check
  const hasAddedProperty = false; // change this to true to test different flows

  const handleSwitchClick = () => {
    if (hasAddedProperty) {
      navigate("/owner-dashboard");
    } else {
      navigate("/owner-dashboard/add-property");
    }
  };

  return (
    <div
      className="text-light d-flex flex-column p-3"
      style={{
        width: "250px",
        background: "linear-gradient(135deg, #0A1F44, #555555)",
        height: "100vh",
        justifyContent: "space-between",
      }}
    >
      <div>
        <h4 className="text-center mb-4">
          <i className="bi bi-speedometer me-2" /> User Panel
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
              <i className="bi bi-question-octagon-fill"></i> My Inquires
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

      {/* Bottom gear icon */}
      <div style={{ position: "relative" }}>
        <button
          className="btn btn-link text-light"
          onClick={() => setShowSwitchOption(!showSwitchOption)}
          style={{ textDecoration: "none" }}
        >
          <i className="bi bi-gear-fill fs-4"></i>
        </button>

        {showSwitchOption && (
          <div
            className="bg-dark p-2 rounded"
            style={{
              position: "absolute",
              bottom: "40px",
              left: 0,
              width: "100%",
              cursor: "pointer",
              zIndex: 10,
            }}
            onClick={handleSwitchClick}
          >
            Switch to Owner Dashboard
          </div>
        )}
      </div>
    </div>
  );
};

export default SideBar;
