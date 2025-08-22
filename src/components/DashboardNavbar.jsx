import React, { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import {
  Buildings,
  UserCircle,
  GearSix,
  ArrowsLeftRight,
  SignOut,
} from "phosphor-react";
import { motion, AnimatePresence } from "framer-motion";

const DashboardNavbar = () => {
  const { user, logout } = useContext(AuthContext);
  const [showMenu, setShowMenu] = useState(false);
  const navigate = useNavigate();

  const hasAddedProperty = true;

  const handleSwitchDashboard = () => {
    setShowMenu(false);
    if (hasAddedProperty) {
      navigate("/owner-dashboard");
    }
  };

  return (
    <nav className="navbar navbar-expand-lg bg-white shadow-sm px-4 py-2 mb-3 rounded">
      <div className="container-fluid d-flex justify-content-between align-items-center">
        {/* Brand */}
        <span className="navbar-brand fw-bold text-success fs-4 d-flex align-items-center">
          <Buildings size={28} className="me-2" weight="fill" />
          Space Core
        </span>

        {/* User Info + Settings */}
        <div className="d-flex align-items-center gap-4 position-relative">
          <span className="text-muted d-flex align-items-center">
            <UserCircle size={24} className="me-2" weight="duotone" />
            <strong>{user?.name || "Guest"}</strong>
          </span>

          <span className="text-muted d-flex align-items-center">
            <strong>{user?.role || "User"}</strong>
          </span>

          {/* Gear Icon */}
          <button
            className="btn btn-link p-0 text-dark"
            onClick={() => setShowMenu((prev) => !prev)}
            title="Settings"
          >
            <GearSix size={26} weight="duotone" />
          </button>

          {/* Dropdown Menu */}
          <AnimatePresence>
            {showMenu && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                transition={{ duration: 0.2 }}
                className="bg-white border shadow rounded p-2 position-absolute"
                style={{
                  top: "100%",
                  right: 0,
                  minWidth: "220px",
                  zIndex: 999,
                }}
              >
                
                <div
                  className="dropdown-item d-flex align-items-center py-2 px-3 text-danger"
                  style={{ cursor: "pointer" }}
                  onClick={logout}
                >
                  <SignOut size={20} className="me-2" />
                  Logout
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </nav>
  );
};

export default DashboardNavbar;
