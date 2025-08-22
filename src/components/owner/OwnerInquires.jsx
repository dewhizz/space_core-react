import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import axios from "axios";
import "react-toastify/dist/ReactToastify.css";

const OwnerInquiries = () => {
  const [inquiries, setInquiries] = useState([]);
  const [editingInquiry, setEditingInquiry] = useState(null);
  const [responseText, setResponseText] = useState("");
  const [status, setStatus] = useState("pending");
  const [loading, setLoading] = useState(false);

  const { token } = useContext(AuthContext);
  const navigate = useNavigate();

  const authHeader = {
    headers: { Authorization: `Bearer ${token}` },
  };

  const fetchInquiries = async () => {
    try {
      toast.info("Loading inquiries...");
      const res = await axios.get(
        "https://space-core.onrender.com/api/inquiries/owner-inquiries",
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
    fetchInquiries();
  }, []);

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
        toast.error(error.response?.data?.message || "Delete failed");
      }
    }
  };

  const handleEdit = (inquiryData) => {
    navigate("/owner-dashboard/inquiries/edit", { state: { inquiryData } });
  };

  const startEditing = (inquiry) => {
    if (["approved", "declined"].includes(inquiry.status?.toLowerCase())) {
      toast.info("You cannot edit inquiries that are already approved or declined.");
      return;
    }
    setEditingInquiry(inquiry);
    setResponseText(inquiry.response || "");
    setStatus(inquiry.status?.toLowerCase() || "pending");
  };

  const handleUpdate = async () => {
    if (!editingInquiry) return;
    setLoading(true);
    try {
      toast.info("Updating inquiry...");
      await axios.put(
        `https://space-core.onrender.com/api/inquiries/${editingInquiry._id}`,
        { response: responseText, status },
        authHeader
      );
      toast.success("Inquiry updated!");
      fetchInquiries();
      setEditingInquiry(null);
      setResponseText("");
      setStatus("pending");
    } catch (error) {
      toast.error(error.response?.data?.message || "Update failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-3" style={{ fontFamily: "Poppins, sans-serif" }}>
      <ToastContainer position="top-right" autoClose={3000} />

      <nav aria-label="breadcrumb" className="mb-3">
        <ol className="breadcrumb">
          <li className="breadcrumb-item fw-bold">
            <Link to="/owner-dashboard">
              <i className="bi bi-house-door-fill me-1"></i>Dashboard
            </Link>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            <i className="bi bi-chat-left-text me-1"></i>Inquiries
          </li>
        </ol>
      </nav>

      <div className="card p-4 shadow-sm">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h5 className="text-primary fw-semibold">
            <i className="bi bi-envelope-open-text me-2"></i>User Inquiries to Your Properties
          </h5>
        </div>

        {inquiries.length === 0 ? (
          <div className="alert alert-warning text-center">
            <i className="bi bi-exclamation-circle me-2"></i>No inquiries found.
          </div>
        ) : (
          <div
            className="table-responsive"
            style={{
              maxHeight: "500px",
              overflowY: "auto",
              borderRadius: "10px",
              border: "1px solid #dee2e6",
              backgroundColor: "#ffffff",
            }}
          >
            <table className="table table-bordered table-hover align-middle mb-0">
              <thead className="table-light">
                <tr>
                  <th>#</th>
                  <th><i className="bi bi-building me-1"></i>Property</th>
                  <th><i className="bi bi-person me-1"></i>User</th>
                  <th><i className="bi bi-chat-left-text me-1"></i>Message</th>
                  <th><i className="bi bi-reply me-1"></i>Response</th>
                  <th><i className="bi bi-info-circle me-1"></i>Status</th>
                  <th><i className="bi bi-tools me-1"></i>Actions</th>
                </tr>
              </thead>
              <tbody>
                {inquiries.map((inquiry, index) => (
                  <tr key={inquiry._id}>
                    <td>{index + 1}</td>
                    <td>{inquiry.property?.title || "N/A"}</td>
                    <td>{inquiry.user?.name || inquiry.user?.email || "N/A"}</td>
                    <td>{inquiry.message}</td>
                    <td>{inquiry.response || <span className="text-muted">No response</span>}</td>
                    <td>
                      <span className={`badge bg-${inquiry.status === "approved" ? "success" : inquiry.status === "declined" ? "danger" : "secondary"}`}>
                        {inquiry.status || "Pending"}
                      </span>
                    </td>
                    <td>
                      <div className="btn-group" role="group">
                        <button
                          className="btn btn-sm btn-outline-primary me-2"
                          onClick={() => startEditing(inquiry)}
                          disabled={["approved", "declined"].includes(inquiry.status?.toLowerCase())}
                        >
                          <i className="bi bi-check2-circle me-1"></i>Respond
                        </button>
                        <button
                          className="btn btn-sm btn-outline-warning me-2"
                          onClick={() => handleEdit(inquiry)}
                        >
                          <i className="bi bi-pencil-square"></i>
                        </button>
                        <button
                          className="btn btn-sm btn-outline-danger"
                          onClick={() => handleDelete(inquiry._id)}
                        >
                          <i className="bi bi-trash"></i>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {editingInquiry && (
          <div className="card mt-4 border border-primary">
            <div className="card-header bg-primary text-white">
              <i className="bi bi-pencil-square me-2"></i>Respond to Inquiry
            </div>
            <div className="card-body">
              <div className="mb-3">
                <label className="form-label fw-semibold">Response</label>
                <textarea
                  className="form-control"
                  rows={3}
                  value={responseText}
                  onChange={(e) => setResponseText(e.target.value)}
                  disabled={loading}
                />
              </div>
              <div className="mb-3">
                <label className="form-label fw-semibold">Status</label>
                <select
                  className="form-select"
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                  disabled={loading}
                >
                  <option value="pending">Pending</option>
                  <option value="approved">Approved</option>
                  <option value="declined">Declined</option>
                </select>
              </div>
              <div className="d-flex justify-content-end">
                <button
                  className="btn btn-success me-2"
                  onClick={handleUpdate}
                  disabled={loading}
                >
                  {loading ? "Saving..." : "Save"}
                </button>
                <button
                  className="btn btn-secondary"
                  onClick={() => setEditingInquiry(null)}
                  disabled={loading}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Custom Scrollbar Styles */}
      <style>{`
        .table-responsive::-webkit-scrollbar {
          width: 8px;
        }

        .table-responsive::-webkit-scrollbar-track {
          background: #f1f1f1;
          border-radius: 10px;
        }

        .table-responsive::-webkit-scrollbar-thumb {
          background: #3a506b;
          border-radius: 10px;
        }

        .table-responsive::-webkit-scrollbar-thumb:hover {
          background: #1e2a38;
        }

        .btn-group .btn {
          transition: all 0.2s ease-in-out;
        }

        .btn-group .btn:hover {
          transform: scale(1.05);
        }

        .table th, .table td {
          vertical-align: middle;
        }
      `}</style>
    </div>
  );
};

export default OwnerInquiries;
