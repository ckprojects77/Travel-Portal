import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";

import MainLayout from "../layouts/MainLayout";
import AdminLayout from "../layouts/AdminLayout";
import ProtectedRoute from "./ProtectedRoute";
import AdminAccessGate from "../pages/admin/AdminAccessGate";

import Home from "../pages/Home";
import Destinations from "../pages/Destinations";
import DestinationDetails from "../pages/DestinationDetails";
import Packages from "../pages/Packages";
import PackageDetails from "../pages/PackageDetails";
import Hotels from "../pages/Hotels";
import Booking from "../pages/Booking";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Profile from "../pages/Profile";
import About from "../pages/About";
import Contact from "../pages/Contact";
import NotFound from "../pages/NotFound";

import Dashboard from "../pages/admin/Dashboard";
import ManageUsers from "../pages/admin/ManageUsers";
import ManageDestinations from "../pages/admin/ManageDestinations";
import ManagePackages from "../pages/admin/ManagePackages";
import ManageHotels from "../pages/admin/ManageHotels";
import ManageBookings from "../pages/admin/ManageBookings";
import ManageReviews from "../pages/admin/ManageReviews";

export default function AppRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/destinations" element={<Destinations />} />
          <Route path="/destinations/:id" element={<DestinationDetails />} />
          <Route path="/packages" element={<Packages />} />
          <Route path="/packages/:id" element={<PackageDetails />} />
          <Route path="/hotels" element={<Hotels />} />
          <Route
            path="/booking"
            element={
              <ProtectedRoute>
                <Booking />
              </ProtectedRoute>
            }
          />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/404" element={<NotFound />} />
          <Route path="*" element={<NotFound />} />
        </Route>

        <Route
          path="/admin-access"
          element={
            <ProtectedRoute>
              <AdminAccessGate />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin"
          element={
            <ProtectedRoute requireAdmin>
              <AdminLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Dashboard />} />
          <Route path="users" element={<ManageUsers />} />
          <Route path="destinations" element={<ManageDestinations />} />
          <Route path="packages" element={<ManagePackages />} />
          <Route path="hotels" element={<ManageHotels />} />
          <Route path="bookings" element={<ManageBookings />} />
          <Route path="reviews" element={<ManageReviews />} />
        </Route>
      </Routes>
    </AnimatePresence>
  );
}
