// import React, { useContext, useEffect, useState } from "react";
// import { toast, ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import axios from "axios";
// import { Link, useLocation, useNavigate } from "react-router-dom";
// import { AuthContext } from "../../../context/AuthContext";

// const BookingEdit = () => {
//   const { token } = useContext(AuthContext);

//   const [startDate, setStartDate] = useState("");
//   const [endDate, setEndDate] = useState("");

//   const navigate = useNavigate();
//   const { state } = useLocation();
//   const selectedBooking = state?.bookingData;

//   const authHeader = {
//     headers: { Authorization: `Bearer ${token}` },
//   };

//   //  Load booking data and validate inquiry status
//   useEffect(() => {
//     if (!selectedBooking) {
//       toast.error("No booking data provided");
//       setTimeout(() => {
//         navigate("/user-dashboard/bookings");
//       }, 2000);
//       return;
//     }

//     if (selectedBooking.inquiry?.status !== "approved") {
//       toast.warn("Booking can only be edited if the inquiry is approved.");
//       setTimeout(() => {
//         navigate("/user-dashboard/bookings");
//       }, 2000);
//       return;
//     }

//     setStartDate(selectedBooking.startDate?.substring(0, 10) || "");
//     setEndDate(selectedBooking.endDate?.substring(0, 10) || "");
//   }, [selectedBooking, navigate]);

//   //  Handle booking update
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       toast.info("Updating ....");
//       const data = { startDate, endDate };
//       const res = await axios.put(
//         `https://space-core.onrender.com/api/booking/${selectedBooking._id}`,
//         data,
//         authHeader
//       );
//       toast.dismiss();
//       toast.success(res.data.message || "Booking Updated Successfully");
//       navigate("/user-dashboard/bookings");
//     } catch (error) {
//       toast.dismiss();
//       toast.error(error.response?.data?.message || "Error Updating");
//     }
//   };

//   return (
//     <div className="container mt-3">
//       <ToastContainer position="top-right" autoClose={3000} />

//       {/*  Breadcrumbs */}
//       <nav aria-label="breadcrumb" className="mb-3">
//         <ol className="breadcrumb">
//           <li className="breadcrumb-item fw-bold">
//             <Link to="/user-dashboard">Dashboard</Link>
//           </li>
//           <li className="breadcrumb-item active" aria-current="page">
//             Bookings
//           </li>
//           <li className="breadcrumb-item fw-bold">
//             <Link to="#">Update Booking</Link>
//           </li>
//         </ol>
//       </nav>

//       <div className="card p-4 shadow-sm mb-4">
//         <div className="d-flex justify-content-between align-items-center mb-3">
//           <h5 className="text-success">
//             <i className="bi bi-building me-2"></i>Update Booking
//           </h5>
//           <Link className="btn btn-success" to={"/user-dashboard/bookings"}>
//             <i className="bi bi-arrow-left-circle-fill me-2"></i>Back
//           </Link>
//         </div>

//         {/*  Booking Form */}
//         <form onSubmit={handleSubmit}>
//           <div className="row">
//             <div className="col-md-6 mb-3">
//               <label className="form-label">Start Date</label>
//               <input
//                 type="date"
//                 className="form-control"
//                 value={startDate}
//                 onChange={(e) => setStartDate(e.target.value)}
//                 required
//               />
//             </div>

//             <div className="col-md-6 mb-3">
//               <label className="form-label">End Date</label>
//               <input
//                 type="date"
//                 className="form-control"
//                 value={endDate}
//                 onChange={(e) => setEndDate(e.target.value)}
//                 required
//               />
//             </div>
//           </div>
//           <button type="submit" className="btn btn-success">
//             <i className="bi bi-messenger me-2"></i>Update Booking
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default BookingEdit;