import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Home from "./pages/Home";
import LoginPage from "./pages/Login";
import RegisterPage from "./pages/Register";
import { AdminManageRequests } from "./pages/ManageRole";
import ProtectedRoute from "./components/protectedRoute";
import Dashboard from "./pages/Dashboard";
import FarmerDashboard from "./pages/FarmerDashboard";
import BuyerDashboard from "./pages/BuyerDashboard";
import AdminDashboard from "./pages/AdminDashboard";

// Inisialisasi QueryClient
const queryClient = new QueryClient();

const App = () => {
  return (
    // Bungkus aplikasi dengan QueryClientProvider
    <QueryClientProvider client={queryClient}>
      <Router>
        <Routes>
          {/* Route untuk semua halaman */}
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route
            path="/manage-requests"
            element={
              <ProtectedRoute allowedRoles={["admin"]}>
                <AdminManageRequests />
              </ProtectedRoute>
            }
          />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute allowedRoles={["farmer", "buyer", "admin"]}>
                <Dashboard />
              </ProtectedRoute>
            }
          >
            <Route
              path="dashboard-farmer"
              element={
                <ProtectedRoute allowedRoles={["farmer"]}>
                  <FarmerDashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="dashboard-buyer"
              element={
                <ProtectedRoute allowedRoles={["buyer"]}>
                  <BuyerDashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="dashboard-admin"
              element={
                <ProtectedRoute allowedRoles={["admin"]}>
                  <AdminDashboard />
                </ProtectedRoute>
              }
            />
          </Route>
        </Routes>
      </Router>
    </QueryClientProvider>
  );
};

export default App;
