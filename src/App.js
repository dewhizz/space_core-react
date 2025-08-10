import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
import "bootstrap-icons/font/bootstrap-icons.css";

import { BrowserRouter as Router, Routes,Route } from 'react-router-dom';
import RegisterComponent from './components/RegisterComponent';
import HomeComponent from './components/HomeComponent';
import LoginComponent from './components/LoginComponent';
import NotFound from './components/NotFound';
import NotAuthorized from './components/NotAuthorized';
import AboutUs from './components/AboutUs';
import UserLayout from './components/user/UserLayout';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './context/ProtectedRoute';
import Inquiries from './components/user/Inquiries';
import Bookings from './components/user/Bookings';
import InquiryAdd from './components/user/forms/InquiryAdd';
import InquiryEdit from './components/user/forms/InquiryEdit';
import BookingAdd from './components/user/forms/BookingAdd';
import BookingEdit from './components/user/forms/BookingEdit';


function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route
            path="/user-dashboard"
            element={
              <ProtectedRoute allowedRoles={["user"]}>
                <UserLayout />
              </ProtectedRoute>
            }
          >
            <Route path="inquires" element={<Inquiries />} />
            <Route path="inquires/add" element={<InquiryAdd />} />
            <Route path="inquires/edit" element={<InquiryEdit/>} />

            <Route path="bookings" element={<Bookings />} />
            <Route path="bookings/add" element={<BookingAdd />} />
            <Route path="bookings/edit" element={<BookingEdit />} />
          </Route>

          <Route path="/" element={<HomeComponent />} />
          <Route path="/register" element={<RegisterComponent />} />
          <Route path="/login" element={<LoginComponent />} />

          {/* <Route path='/user-dash' element={<UserDashBoard/>}/> */}
          <Route path="/about-us" element={<AboutUs />} />

          {/* constrains */}
          <Route path="*" element={<NotFound />} />
          <Route path="/not-authorized" element={<NotAuthorized />} />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
