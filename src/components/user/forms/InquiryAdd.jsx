import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../context/AuthContext";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const InquiryAdd = () => {
  const { token } = useContext(AuthContext);

  // introduce the hooks
  const [message,setMessage] = useState("");
  const [properties,setProperties]=useState([])
  const [status,setStatus]=useState('')
  const [selectedPropertyId, setSelectedPropertyId] = useState("");
  const navigate =useNavigate()

  // we prepare our authHeader
  const authHeader = {
    headers: { Authorization: `Bearer ${token}` },
  };

  // fetch properties
  const FetchProperties = async () => {
    try {
      toast.info("Loading properties ....");
      const res = await axios.get(
        "https://space-core.onrender.com/api/properties/",
        authHeader
      );
      toast.dismiss();
      console.log(res.data);
      setProperties(res.data);
    } catch (error) {
      toast.dismiss();
      toast.error(error.response?.data?.message || "Failed to load properties");
    }
  };
  useEffect(() => {
    FetchProperties();
  }, []);

  //   handle submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      toast.info("Submitting ....");
      const data = { message, property:selectedPropertyId };
      const res = await axios.post(
        "https://space-core.onrender.com/api/inquiries/",
        data,
        authHeader
      );
      toast.dismiss()
      toast.success(res.data.message || "Inquiry added Successfully");
      setMessage('')
      setProperties([])
      setStatus('')
      // setSelectedPropertyId('')
      FetchProperties()
      navigate('/user-dashboard/inquires')
    } catch (error) {
      toast.dismiss();
      toast.error(error.response?.data?.message || "Error submitting");
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
            <Link to="page">/Add Inquiry</Link>
          </li>
        </ol>
      </nav>

      <div className="card p-4 shadow-sm mb-4">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h5 className="text-success">
            <i className="bi bi-building me-2"></i>Add New Inquiry
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
            <i className="bi bi-messenger me-2"></i>Send Inquiry
          </button>
        </form>
      </div>
    </div>
  );
};

export default InquiryAdd;
