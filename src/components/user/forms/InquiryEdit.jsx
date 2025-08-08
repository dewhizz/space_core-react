import React, { useContext, useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../../../context/AuthContext";

const InquiryEdit = () => {
  const { token } = useContext(AuthContext);

  // introduce the hooks
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState("");
  const [properties, setPropties] = useState([]);
  const [selectedPropertyId, setSelectedPropertyId] = useState([]);

  const navigate = useNavigate();

    // recieve sata from the classes component
    const { state } = useLocation();
    const selectedInquiry = state?.inquiryData;

  // we prepare our authHeader
  const authHeader = {
    headers: { Authorization: `Bearer ${token}` },
  };

  const fetchproperties = async () => {
    try {
      toast.info("Loading properties ....");
      const res = await axios.get(
        "https://space-core.onrender.com/api/properties/",
        authHeader
      );
      toast.dismiss();
      console.log(res.data);
      setSelectedPropertyId(res.data);
    } catch (error) {
      toast.dismiss();
      toast.error(error.response?.data?.message || "Failed to load properties");
    }
  };
  useEffect(() => {
    fetchproperties();
  }, []);

  // useEffect to update the hooks /state to this component
  useEffect(() => {
    if (!selectedInquiry) {
      toast.error("No Inquiry data provided");
      setTimeout(() => {
        navigate("/user-dashboard/inquires");
      }, 2000);
      return;
    }
    setMessage(selectedInquiry?.message || "");
    setStatus(selectedInquiry?.status || "Pending");
    setSelectedPropertyId(selectedInquiry?.property?._id);
  }, [selectedInquiry, navigate]);

  //   handle submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      toast.info("Updating ....");
      const data = { message, property: selectedPropertyId };
      const res = await axios.put(
        `https://school-api-fexk.onrender.com/api/classroom/${selectedInquiry._id}`,
        data,
        authHeader
      );
      console.log(res.data);
      toast.success(res.data.message || "Inquiry Updated Successfully");
      navigate("/user-dashboard/inquires");
    } catch (error) {
      toast.dismiss();
      toast.error(error.response?.data?.message || "Error Updating");
    }
  };
  return (
    <div className="container mt-3">
      <ToastContainer position="top-right" autoClose={3000} />

      {/* breadcrumbs provide ease in path location */}
      <nav aria-label="breadcrumb" className="mb-3">
        <ol className="breadcrumb">
          <li className="breadcrumb-item fw-bold">
            <Link to="/user-dashboard">Dashboard</Link>
          </li>{" "}
          <li
            className="breadcrumb-item-active"
            aria-label="/user-dashboard/inquires"
          >
            /inquires
          </li>
          <li className="breadcrumb-item fw-bold">
            <Link to="page">/Update Inquiry</Link>
          </li>
        </ol>
      </nav>

      <div className="card p-4 shadow-sm mb-4">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h5 className="text-success">
            <i className="bi bi-building me-2"></i>Update Inquiry
          </h5>
          <Link className="btn btn-success" to={"/user-dashboard/inquires"}>
            <i className="bi bi-arrow-left-circle-fill me-2"></i>Back
          </Link>
        </div>

        {/* form to post the class */}
        <form onSubmit={handleSubmit}>
          <div className="row">
            <div className="col-md-6 mb-3">
              <input
                type="text"
                className="form-control"
                placeholder="message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                required
              />
            </div>

            <div className="col-md-6 mb-3">
              <select
                className="form-control"
                value={selectedPropertyId}
                onChange={(e) => setSelectedPropertyId(e.target.value)}
              >
                <option value="">Select Property</option>
                {properties.map((property, index) => (
                  <option
                    key={property._id}
                    value={property._id}
                  >{`${property.title},${property.owner?.name},${property.plotNumber}`}</option>
                ))}
              </select>
            </div>
          </div>
          <button type="submit" className="btn btn-success">
            <i className="bi bi-messenger me-2"></i>Update Inquiry
          </button>
        </form>
      </div>
    </div>
  );
};

export default InquiryEdit;
