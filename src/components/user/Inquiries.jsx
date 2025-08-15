import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import axios from "axios";
import "react-toastify/dist/ReactToastify.css";

const Inquiries = () => {
  const [inquiries, setInquiries] = useState([]);
  const [statusFilter, setStatusFilter] = useState("");
  const [loading, setLoading] = useState(false);

  const { token } = useContext(AuthContext);
  const navigate = useNavigate();

  const authHeader = {
    headers: { Authorization: `Bearer ${token}` },
  };

  const fetchInquiries = async () => {
    try {
      setLoading(true);
      toast.info("Loading your inquiries...");

      const endpoint = statusFilter
        ? `https://space-core.onrender.com/api/inquiries/my-inquiriesfilter?status=${statusFilter}`
        : `https://space-core.onrender.com/api/inquiries/my-inquiries`;

      const res = await axios.get(endpoint, authHeader);
      setInquiries(res.data.inquiries || res.data);
      toast.dismiss();
    } catch (error) {
      toast.dismiss();
      toast.error(error.response?.data?.message || "Failed to load inquiries");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInquiries();
  }, [statusFilter]);

  const handleDelete = async (id) => {
    if (window.confirm("Delete this inquiry?")) {
      try {
        toast.warning("Deleting inquiry...");
        const res = await axios.delete(
          `https://space-core.onrender.com/api/inquiries/${id}`,
          authHeader
        );
        toast.success(res.data.message);
        fetchInquiries();
      } catch (error) {
        toast.dismiss();
        toast.error(error.response?.data?.message);
      }
    }
  };

  const handleEdit = (inquiryData) => {
    navigate("/user-dashboard/inquiries/edit", { state: { inquiryData } });
  };

  return (
    <div className="container mt-4" style={{ fontFamily: "Poppins, sans-serif", minHeight: "100vh" }}>
      <ToastContainer position="top-right" autoClose={3000} />

      {/* Breadcrumbs and Header */}
      <div className="d-flex justify-content-between align-items-center mb-3">
        <nav aria-label="breadcrumb">
          <ol className="breadcrumb">
            <li className="breadcrumb-item fw-bold">
              <Link to="/user-dashboard" className="text-success">Dashboard</Link>
            </li>
            <li className="breadcrumb-item active" aria-current="/inquires">Inquiries</li>
          </ol>
        </nav>
        <button className="btn btn-success" onClick={() => navigate("/user-dashboard/inquires/add")}>
          <i className="bi bi-plus-circle-fill me-2"></i> Add Inquiry
        </button>
      </div>

      {/* Inquiry Card */}
      <div className="card shadow-sm p-4 mb-4" style={{ borderRadius: "12px" }}>
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h5 className="text-success fw-semibold">
            <i className="bi bi-envelope-paper-fill me-2"></i> My Inquiries
            <span className="badge bg-secondary ms-2">{inquiries.length}</span>
          </h5>
        </div>

        {/* Status Filter Tabs */}
        <div className="mb-3 d-flex gap-2 flex-wrap">
          {["All", "pending", "approved", "declined"].map((status) => (
            <button
              key={status}
              className={`btn btn-sm ${status.toLowerCase() === statusFilter?.toLowerCase() ? "btn-success" : "btn-outline-success"}`}
              onClick={() => setStatusFilter(status === "All" ? "" : status)}
            >
              {status}
            </button>
          ))}
        </div>

        {/* Inquiry Table */}
        <div className="table-responsive">
          {loading ? (
            <div className="text-center py-5">
              <div className="spinner-border text-success" role="status"></div>
              <p className="mt-3">Fetching inquiries...</p>
            </div>
          ) : inquiries.length === 0 ? (
            <div className="text-center py-5">
              <img
                src="https://cdn-icons-png.flaticon.com/512/4076/4076549.png"
                alt="No inquiries"
                style={{ width: "120px", opacity: 0.6 }}
              />
              <p className="mt-3 text-muted">No inquiries found!</p>
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
                      <span className={`badge ${
                        inq.status === "approved" ? "bg-success" :
                        inq.status === "declined" ? "bg-danger" :
                        "bg-warning"
                      }`}>
                        {inq.status || "Pending"}
                      </span>
                    </td>
                    <td>
                      <button className="btn btn-sm btn-outline-primary me-2" onClick={() => handleEdit(inq)}>
                        <i className="bi bi-pencil-square"></i>
                      </button>
                      <button className="btn btn-sm btn-outline-danger" onClick={() => handleDelete(inq._id)}>
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