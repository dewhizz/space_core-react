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

import UserLayout from "./components/user/UserLayout";
import Inquiries from "./components/user/OwnerInquiries";
import InquiryAdd from "./components/user/forms/InquiryAdd";
import InquiryEdit from "./components/user/forms/InquiryEdit";
import Bookings from "./components/user/Bookings";
import BookingAdd from "./components/user/forms/BookingAdd";
import BookingEdit from "./components/user/forms/BookingEdit";


// Assuming you have this component, or create a simple one for owners
import OwnerLayout from "./components/owner/OwnerLayout";
import PropertyAdd from "./components/owner/forms/PropertyAdd";
import OwnerInquiries from "./components/user/OwnerInquiries";

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
            <Route path="inquires" element={<Inquiries />} />
            <Route path="inquires/add" element={<InquiryAdd />} />
            <Route path="inquires/edit" element={<InquiryEdit />} />

            <Route path="bookings" element={<Bookings />} />
            <Route path="bookings/add" element={<BookingAdd />} />
            <Route path="bookings/edit" element={<BookingEdit />} />

            <Route path="owner-dashboard" element={<OwnerLayout />} />
            <Route path="owner-inquires" element={<OwnerInquiries />} />
            <Route path="add-property" element={<PropertyAdd />} />
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
