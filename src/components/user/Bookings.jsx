import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import axios from "axios";

const Bookings = () => {
  const [inquiries, setInquiries] = useState([]);
  const { token } = useContext(AuthContext);
  const navigate = useNavigate();

  const authHeader = {
    headers: { Authorization: `Bearer ${token}` },
  };

  const FetchInquiries = async () => {
    try {
      toast.info("Loading Your Bookings ......");
      const res = await axios.get(
        "https://space-core.onrender.com/api/bookings/",
        authHeader
      );
      setInquiries(res.data);
      console.log(res.data);
      toast.dismiss();
    } catch (error) {
      toast.dismiss();
      toast.error(error.response?.data?.message || "Failed to load Bookings");
    }
  };

  useEffect(() => {
    FetchInquiries();
  }, []);

  const handleDelete = async (id) => {
    try {
      if (window.confirm("Delete this Booking")) {
        try {
          toast.warning("Deleting Credentials");
          const res = await axios.delete(
            `https://space-core.onrender.com/api/inquiries/${id}`,
            authHeader
          );
          toast.info(res.data.message);
        } catch (error) {
          toast.dismiss();
          toast.error(error.response?.data?.message);
        }
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="container mt-2">
      <ToastContainer position="top-right" autoClose={3000} />

      <nav aria-label="breadcrumb" className="mb-3">
        <ol className="breadcrumb">
          <li className="breadcrumb-item fw-bold">
            <Link to="/user-dashboard">Dashboard</Link>
          </li>
          <li className="breadcrumb-item-active" aria-label="page">
            /bookings
          </li>
        </ol>
      </nav>

      <div className="card p-4 shadow-sm">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h5 className="text-success">
            <i className="bi bi-building me-2"></i>Bookings List
          </h5>
          <button className="btn btn-success">
            <i className="bi bi-plus-circle"></i> Add Booking
          </button>
        </div>

        <div className="table-responsive">
          {inquiries.length === 0 ? (
            <div className="alert alert-warning text-center">
              <i className="bi bi-exclamation-circle me-2"></i>No Bookings
              Found!
            </div>
          ) : (
            <table className="table table-striped table-hover table-bordered">
              <thead className="table-success">
                <tr>
                  <th>#</th>
                  <th>User</th>
                  <th>Property</th>
                  <th>Message</th>
                </tr>
              </thead>
              <tbody>
                {inquiries.map((inq, index) => (
                  <tr key={inq._id}>
                    <td>{index + 1}</td>
                    <td>{inq.user?.name || "N/A"}</td>
                    <td>{inq.property}</td>
                    <td>{inq.message}</td>
                    <td>{inq.user?.phone || "N/A"}</td>
                    <td>
                      <button className="btn btn-sm btn-warning me-2">
                        <i className="bi bi-pencil-square"></i>
                      </button>
                      <button
                        className="btn btn-sm btn-danger me-2"
                        onClick={() => handleDelete(inq._id)}
                      >
                        <i className="bi bi-trash"></i>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
};

export default Bookings;
