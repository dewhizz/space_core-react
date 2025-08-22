import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
import "bootstrap-icons/font/bootstrap-icons.css";

import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./context/ProtectedRoute";

import HomeComponent from "./components/HomeComponent";
import LoginComponent from "./components/LoginComponent";
import RegisterComponent from "./components/RegisterComponent";
import AboutUs from "./components/AboutUs";
import NotAuthorized from "./components/NotAuthorized";
import NotFound from "./components/NotFound";
import GetProperties from "./components/GetProperties";

import UserLayout from "./components/user/UserLayout";
import Inquiries from "./components/user/Inquiries";
import InquiryAdd from "./components/user/forms/InquiryAdd";
import InquiryEdit from "./components/user/forms/InquiryEdit";
import Bookings from "./components/user/Bookings";
import BookingAdd from "./components/user/forms/BookingAdd";
import BookingEdit from "./components/user/forms/BookingEdit";
import UserDashBoard from "./components/user/UserDashBoard";


// Assuming you have this component, or create a simple one for owners
import OwnerLayout from "./components/owner/OwnerLayout";
import PropertyAdd from "./components/owner/forms/PropertyAdd";
import OwnerInquiries from "./components/owner/OwnerInquires";
import PropertyEdit from "./components/owner/forms/PropertyEdit";
import OwnerBookings from "./components/owner/OwnerBookings";
import OwnerProperties from "./components/owner/Properties";
import OwnerDashboard from "./components/owner/OwnerDashBoard";



function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<HomeComponent />} />
          <Route path="/login" element={<LoginComponent />} />
          <Route path="/register" element={<RegisterComponent />} />
          <Route path="/about-us" element={<AboutUs />} />
          {/* Protected User Dashboard */}
          <Route
            path="/user-dashboard"
            element={
              <ProtectedRoute allowedRoles={["user", "owner"]}>
                <UserLayout />
              </ProtectedRoute>
            }
          >
            <Route path="" element={<UserDashBoard />} />

            <Route path="inquires" element={<Inquiries />} />
            <Route path="inquires/add" element={<InquiryAdd />} />
            <Route path="inquires/edit" element={<InquiryEdit />} />

            <Route path="bookings" element={<Bookings />} />
            <Route path="bookings/add" element={<BookingAdd />} />
            <Route path="bookings/edit" element={<BookingEdit />} />
          </Route>

          <Route path="get-properties" element={<GetProperties />} />

          {/* Owner Dashboard Routes */}
          <Route
            path="/owner-dashboard"
            element={
              <ProtectedRoute allowedRoles={["owner"]}>
                <OwnerLayout />
              </ProtectedRoute>
            }
          >
            <Route path="" element={<OwnerDashboard />} />
            <Route path="owner-inquires" element={<OwnerInquiries />} />
            
            <Route path="properties" element={<OwnerProperties  />} />
            <Route path="properties/add" element={<PropertyAdd />} />
            <Route path="properties/edit" element={<PropertyEdit />} />
            <Route path="bookings" element={<OwnerBookings />} />
          </Route>

          {/* Other Routes */}
          <Route path="/not-authorized" element={<NotAuthorized />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
