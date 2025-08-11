import React, { useContext } from 'react'
import { AuthContext } from '../context/AuthContext'

const DashboardNavbar = () => {
    const {user}=useContext(AuthContext)
  return (
    <nav className="navbar navbar-expand-lg bg-light shadow-sm ox-4 mb-3 rounded">
      <div className="container-fluid d-flex justify-content-between align-items-center">
        <span className="navbar-brand fw-bold text-success fs-4">
          <i className="bi bi-building me-2"></i>Space Core
        </span>
        <div className="d-flex align-items-center">
          <span className="me-3 text-muted">
            <i className="bi bi-person-circle me-1"></i>
            <strong>{user?.name}</strong>
          </span>

          <span className="me-3 text-muted">
            <i className="bi bi-person-gear me-1"></i>
            <strong>{user?.role}</strong>
          </span> 
        </div>
      </div>
    </nav>
  );
}

export default DashboardNavbar