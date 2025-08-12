import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import axios from 'axios';
import 'react-toastify/dist/ReactToastify.css';

const Inquiries = () => {
  const [inquiries, setInquiries] = useState([]);
  const { token } = useContext(AuthContext);
  const navigate = useNavigate();

  const authHeader = {
    headers: { Authorization: `Bearer ${token}` }
  };

  const FetchInquiries = async () => {
    try {
      toast.info('Loading Your Inquiries...');
      const res = await axios.get(
        "https://space-core.onrender.com/api/inquiries/my-inquires",
        authHeader
      );
      setInquiries(res.data);
      toast.dismiss();
    } catch (error) {
      toast.dismiss();
      toast.error(error.response?.data?.message || "Failed to load inquiries");
    }
  };

  useEffect(() => {
    FetchInquiries();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm('Delete this inquiry?')) {
      try {
        toast.warning('Deleting inquiry...');
        const res = await axios.delete(`https://space-core.onrender.com/api/my-inquiries/${id}`, authHeader);
        toast.success(res.data.message);
        FetchInquiries();
      } catch (error) {
        toast.dismiss();
        toast.error(error.response?.data?.message);
      }
    }
  };

  const handleEdit = (inquiryData) => {
    navigate("/user-dashboard/inquires/edit", { state: { inquiryData } });
  };

  return (
    <div className="container mt-4" style={{ fontFamily: 'Poppins, sans-serif' }}>
      <ToastContainer position="top-right" autoClose={3000} />

      {/* Breadcrumbs and Header */}
      <div className="d-flex justify-content-between align-items-center mb-3">
        <nav aria-label="breadcrumb">
          <ol className="breadcrumb">
            <li className="breadcrumb-item fw-bold">
              <Link to="/user-dashboard" className="text-success">Dashboard</Link>
            </li>
            <li className="breadcrumb-item active" aria-current="page">
              /inquiries
            </li>
          </ol>
        </nav>
        <button
          className="btn btn-success"
          onClick={() => navigate("/user-dashboard/inquires/add")}
        >
          <i className="bi bi-plus-circle-fill me-2"></i> Add Inquiry
        </button>
      </div>

      {/* Inquiry Table */}
      <div className="card shadow-sm p-4 mb-4" style={{ borderRadius: '12px' }}>
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h5 className="text-success fw-semibold">
            <i className="bi bi-envelope-paper-fill me-2"></i> My Inquiries
          </h5>
        </div>

        <div className="table-responsive">
          {inquiries.length === 0 ? (
            <div className="alert alert-warning text-center">
              <i className="bi bi-exclamation-triangle-fill me-2"></i>No inquiries found!
            </div>
          ) : (
            <table className="table table-hover table-bordered">
              <thead className="table-light">
                <tr>
                  <th>#</th>
                  <th>Property</th>
                  <th>Message</th>
                  <th>Response</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {inquiries.map((inq, index) => (
                  <tr key={inq._id}>
                    <td>{index + 1}</td>
                    <td>{inq.property?.title || "N/A"}</td>
                    <td>{inq.message}</td>
                    <td>{inq.response || "N/A"}</td>
                    <td>
                      <span
                        className={`badge ${
                          inq.status === 'approved' ? 'bg-success' : 'bg-warning'
                        }`}
                      >
                        {inq.status || "Pending"}
                      </span>
                    </td>
                    <td>
                      <button
                        className="btn btn-sm btn-outline-primary me-2"
                        onClick={() => handleEdit(inq)}
                      >
                        <i className="bi bi-pencil-square"></i>
                      </button>
                      <button
                        className="btn btn-sm btn-outline-danger"
                        onClick={() => handleDelete(inq._id)}
                      >
                        <i className="bi bi-trash-fill"></i>
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

export default Inquiries;
