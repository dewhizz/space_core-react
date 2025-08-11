import React from 'react'
import SideBar from './SideBar'
import { Outlet } from 'react-router-dom'
import DashboardNavbar from '../DashboardNavbar'

const OwnerLayout = () => {
  return (
    <div className="d-flex">
      <SideBar />
      <div className="flex-grow-1">
        <main className="p-4 vh-100">
          {/* outlet renders the matched child route elements */}
          <DashboardNavbar />
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default OwnerLayout