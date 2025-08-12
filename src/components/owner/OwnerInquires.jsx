import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import axios from "axios";

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
  const [loading, setLoading] = useState(false); // for better UX

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
    // This navigates to a separate edit page — can keep if you want
    navigate("/owner-dashboard/inquires/edit", { state: { inquiryData } });
  };

  const startEditing = (inquiry) => {
    // Optional: prevent editing if already approved or rejected
    if (["Approved", "Rejected"].includes(inquiry.status)) {
      toast.info(
        "You cannot edit inquiries that are already approved or rejected."
      );
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
    <div className="container mt-2">
      <ToastContainer position="top-right" autoClose={3000} />

      <nav aria-label="breadcrumb" className="mb-3">
        <ol className="breadcrumb">
          <li className="breadcrumb-item fw-bold">
            <Link to="/owner-dashboard">Dashboard</Link>
          </li>
          <li className="breadcrumb-item-active" aria-label="page">
            /inquiries
          </li>
        </ol>
      </nav>

      <div className="card p-4 shadow-sm">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h5 className="text-success">
            <i className="bi bi-building me-2"></i>OwnerInquiries List
          </h5>
        </div>

        <div className="table-responsive">
          {inquiries.length === 0 ? (
            <div className="alert alert-warning text-center">
              <i className="bi bi-exclamation-circle me-2"></i>No Owner Inquiries
              Found!
            </div>
          ) : (
            <table className="table table-striped table-hover table-bordered">
              <thead className="table-success">
                <tr>
                  <th>#</th>
                  <th>Property</th>
                  <th>User</th>
                  <th>Message</th>
                  <th>Response</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {inquiries.map((inquiry, index) => (
                  <tr key={inquiry._id}>
                    <td>{index + 1}</td>
                    <td>{inquiry.property?.title || "N/A"}</td>
                    <td>
                      {inquiry.user?.name || inquiry.user?.email || "N/A"}
                    </td>
                    <td>{inquiry.message}</td>
                    <td>{inquiry.response || "N/A"}</td>
                    <td>{inquiry.status || "Pending"}</td>
                    <td>
                      <button
                        className="btn btn-sm btn-primary me-2"
                        onClick={() => startEditing(inquiry)}
                        disabled={["Approved", "Rejected"].includes(
                          inquiry.status
                        )}
                      >
                        Respond / Approve
                      </button>
                      <button
                        className="btn btn-sm btn-warning me-2"
                        onClick={() => handleEdit(inquiry)}
                      >
                        <i className="bi bi-pencil-square"></i>
                      </button>
                      <button
                        className="btn btn-sm btn-danger"
                        onClick={() => handleDelete(inquiry._id)}
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

        {editingInquiry && (
          <div className="card mt-3 p-3 border-primary">
            <h5>Respond to Inquiry #{editingInquiry._id}</h5>
            <div className="mb-3">
              <label className="form-label">Response</label>
              <textarea
                className="form-control"
                value={responseText}
                onChange={(e) => setResponseText(e.target.value)}
                disabled={loading}
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Status</label>
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
        )}
      </div>
    </div>
  );
};

export default OwnerInquiries;
