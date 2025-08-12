import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import axios from "axios";
import "react-toastify/dist/ReactToastify.css";


const OwnerInquiries = () => {
  const [inquiries, setInquiries] = useState([]);
  const { token } = useContext(AuthContext);
  const navigate = useNavigate();

  const authHeader = {
    headers: { Authorization: `Bearer ${token}` },
  };

  const [editingInquiry, setEditingInquiry] = useState(null);
  const [responseText, setResponseText] = useState("");
  const [status, setStatus] = useState("Pending");
  const [loading, setLoading] = useState(false);

  const FetchInquiries = async () => {
    try {
      toast.info("Loading your inquiries...");
      const res = await axios.get(
        "https://space-core.onrender.com/api/inquiries/owner-inquires",
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
    try {
      if (window.confirm("Delete this inquiry?")) {
        toast.warning("Deleting inquiry...");
        const res = await axios.delete(
          `https://space-core.onrender.com/api/inquiries/${id}`,
          authHeader
        );
        toast.info(res.data.message);
        FetchInquiries();
      }
    } catch (error) {
      toast.dismiss();
      toast.error(error.response?.data?.message || "Delete failed");
    }
  };

  const handleEdit = (inquiryData) => {
    navigate("/owner-dashboard/inquires/edit", { state: { inquiryData } });
  };

  const startEditing = (inquiry) => {
    if (["Approved", "Rejected"].includes(inquiry.status)) {
      toast.info("You cannot edit inquiries that are already approved or rejected.");
      return;
    }
    setEditingInquiry(inquiry);
    setResponseText(inquiry.response || "");
    setStatus(inquiry.status || "Pending");
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
      FetchInquiries();
      setEditingInquiry(null);
      setResponseText("");
      setStatus("Pending");
    } catch (error) {
      toast.error(error.response?.data?.message || "Update failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-3">
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
          <div className="table-responsive">
            <table className="table table-bordered table-hover align-middle">
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
                      <span className={`badge bg-${inquiry.status === "Approved" ? "success" : inquiry.status === "Rejected" ? "danger" : "secondary"}`}>
                        {inquiry.status}
                      </span>
                    </td>
                    <td>
                      <button
                        className="btn btn-sm btn-outline-primary me-2"
                        onClick={() => startEditing(inquiry)}
                        disabled={["Approved", "Rejected"].includes(inquiry.status)}
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
                  <option value="Pending">Pending</option>
                  <option value="Approved">Approved</option>
                  <option value="Rejected">Rejected</option>
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
    </div>
  );
};

export default OwnerInquiries;