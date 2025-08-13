import React, { useEffect, useState, useContext, useRef, useCallback } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AuthContext } from "../../context/AuthContext";
import "bootstrap-icons/font/bootstrap-icons.css";

// Helper component to observe element visibility
const Sentinel = React.forwardRef((_, ref) => <div ref={ref}></div>);

const OwnerProperties = () => {
  const { token } = useContext(AuthContext);
  const navigate = useNavigate();
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const authHeader = {
    headers: { Authorization: `Bearer ${token}` },
  };

  const fetchProperties = useCallback(async () => {
    if (!hasMore) return;
    setLoading(true);
    try {
      const res = await axios.get(
        `https://space-core.onrender.com/api/properties/owner-properties?page=${page}&limit=10`,
        authHeader
      );
      const data = res.data;
      if (data.length > 0) {
        setProperties(prev => [...prev, ...data]);
        if (data.length < 10) setHasMore(false);
      } else {
        setHasMore(false);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to load properties");
    } finally {
      setLoading(false);
    }
  }, [page, token, hasMore]);

  useEffect(() => {
    fetchProperties();
  }, [fetchProperties]);

  const observer = useRef();
  const sentinelRef = useCallback(node => {
    if (loading) return;
    if (observer.current) observer.current.disconnect();

    observer.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && hasMore) {
        setPage(prev => prev + 1);
      }
    });

    if (node) observer.current.observe(node);
  }, [loading, hasMore]);

  return (
    <div className="container mt-4">
      <ToastContainer position="top-right" autoClose={3000} />
      {/* Breadcrumb and header */}
      <nav aria-label="breadcrumb" className="mb-4">
        <ol className="breadcrumb bg-light rounded p-2 shadow-sm">
          <li className="breadcrumb-item fw-bold">
            <Link to="/owner-dashboard" className="text-primary text-decoration-none">
              <i className="bi bi-speedometer2 me-1"></i>Dashboard
            </Link>
          </li>
          <li className="breadcrumb-item active text-secondary" aria-current="page">
            <i className="bi bi-building me-1"></i>Properties
          </li>
        </ol>
      </nav>

      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="text-success">
          <i className="bi bi-building me-2"></i>Your Properties
        </h2>
        <button
          className="btn btn-primary"
          onClick={() => navigate("/owner-dashboard/properties/add")}
        >
          <i className="bi bi-plus-circle me-2"></i>Add New Property
        </button>
      </div>

      <div className="table-responsive">
        <table className="table table-bordered align-middle table-hover shadow-sm">
          <thead className="table-success">
            <tr>
              <th>Photo</th>
              <th>Plot Number</th>
              <th>Title</th>
              <th>Type</th>
              <th>Location</th>
              <th>Rent Amount</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {properties.map(prop => (
              <tr key={prop._id}>
                <td>
                  <img
                    src={prop.photo || "https://via.placeholder.com/80x60?text=No+Image"}
                    alt={prop.title}
                    style={{
                      width: "80px", height: "60px",
                      objectFit: "cover", borderRadius: "6px", border: "1px solid #ccc"
                    }}
                  />
                </td>
                <td>{prop.plotNumber}</td>
                <td>{prop.title}</td>
                <td>{prop.propertyType || "N/A"}</td>
                <td>{prop.location || "N/A"}</td>
                <td>{prop.rentAmount != null ? `$${prop.rentAmount}` : "N/A"}</td>
                <td>{prop.status || "Pending"}</td>
                <td>
                  <Link
                    to={`/owner-dashboard/properties/edit/${prop._id}`}
                    className="btn btn-sm btn-secondary me-2"
                  >
                    <i className="bi bi-pencil-square"></i> Edit
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {loading && (
          <div className="text-center py-2">
            <i className="bi bi-arrow-repeat spin me-2"></i>Loading more…
          </div>
        )}

        {!hasMore && (
          <div className="text-center py-2 text-secondary">
            — No more properties —
          </div>
        )}

        {/* Sentinel div triggers load more */}
        <Sentinel ref={sentinelRef} />
      </div>
    </div>
  );
};

export default OwnerProperties;
