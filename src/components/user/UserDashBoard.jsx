import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../../context/AuthContext';
import axios from 'axios';

const UserDashBoard = () => {
  const [stats, setStats] = useState({
    totalInquires: 0,
    totalBookings: 0,
    recentInquires: [],
    recentBookings: [],
    
  });

  const {token}=useContext(AuthContext)
  // we prepare our authHeader
  const authHeader = {
    headers: { Authorization: `Bearer ${token}` },
  };

  useEffect(()=>{
    const fetchStats=async()=>{
      try {
        const res = await axios.get(
          "https://space-core.onrender.com/api/userDash/",authHeader
        );
        setStats(res.data)
        console.log(res.data)
      } catch (error) {
        console.error(error)
      }
    }
    fetchStats()
  },[authHeader])

  return (
    <div className="container my-2">
      <h2 className="text-center text-success mb-2">
        User Dashboard Overview
      </h2>
      <div className="row row-cols-1 row-cols-md-2 row-cols-lg-4 g-4">
        {/* Inquires */}
        <div className="h-100 p-4 shadow-lg rounded-4 bg-light hover-card">
          <div className="icon-circle bg-primary text-light mb-3">
            <i className="bi bi-person-lines-fill fs-3"></i>
          </div>
          <h6 className="text-muted">Inquires</h6>
          <h2 className="fw-bold text-dark">{stats.totalInquires}</h2>
        </div>

        {/* Bookings */}
        <div className="h-100 p-4 shadow-lg rounded-4 bg-light hover-card">
          <div className="icon-circle bg-primary text-light mb-3">
            <i className="bi bi-person-lines-fill fs-3"></i>
          </div>
          <h6 className="text-muted">Students</h6>
          <h2 className="fw-bold text-dark">{stats.totalBookings}</h2>
        </div>

        </div>

        <div className="mt-5">
          <div className="card-header ng-primary text-light">
            <h5>
              <i className="bi bi-person-lines-fill">Recent Inquires</i>
            </h5>
          </div>
          <div className="card-body">
            {stats.recentTeachers.length===0?(
            <p className="text-muted">No Recent Inquires</p>
            ):(
              <ul className="list-group">
                {stats.recentTeachers.map((inquiry,index)=>(
                  <li key={index} className='list-group-item'>{inquiry.property}-{inquiry.status}</li>
                ))}
              </ul>
            )}
          </div>
        </div>

                <div className="mt-5">
          <div className="card-header ng-primary text-light">
            <h5>
              <i className="bi bi-person-lines-fill">Recent Bookings</i>
            </h5>
          </div>
          <div className="card-body">
            {stats.recentTeachers.length===0?(
            <p className="text-muted">No Recent Booking</p>
            ):(
              <ul className="list-group">
                {stats.recentTeachers.map((booking,index)=>(
                  <li key={index} className='list-group-item'>{booking.startDate}-{booking.status}</li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    
  );
}

export default UserDashBoard