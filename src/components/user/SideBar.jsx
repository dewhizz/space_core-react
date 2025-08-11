import React, { useContext, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

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

  const {logout}=useContext(AuthContext)
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
  {/* Gear Icon Button */}
  <button
    className="btn btn-link text-light"
    onClick={() => setShowSwitchOption(!showSwitchOption)}
    style={{ textDecoration: "none" }}
  >
    <i className="bi bi-gear-fill fs-4"></i>
  </button>

  {/* Dropdown Menu */}
  {showSwitchOption && (
    <div
      className="bg-dark p-2 rounded"
      style={{
        position: "absolute",
        bottom: "40px",
        left: 0,
        minWidth: "180px",
        zIndex: 10,
      }}
    >
      {/* Switch Option */}
      <div
        className="text-light py-1 px-2"
        style={{ cursor: "pointer" }}
        onClick={handleSwitchClick}
      >
        Switch to Owner Dashboard
      </div>

      {/* Divider */}
      <hr className="text-secondary my-2" />

      {/* Logout Button */}
      <button
        className="btn btn-sm btn-outline-danger w-100"
        onClick={logout}
      >
        <i className="bi bi-box-arrow-right me-2"></i>Logout
      </button>
    </div>
  )}
</div>
    </div>
  );
};

export default SideBar;
