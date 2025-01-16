import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Home from "./pages/Home";
import LoginPage from "./pages/Login";
import RegisterPage from "./pages/Register";
import { AdminManageRequests } from "./pages/ManageRole";
import ProtectedRoute from "./components/protectedRoute"; 

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
            path="/manage-roles"
            element={
              <ProtectedRoute>
                <AdminManageRequests />
              </ProtectedRoute>
            }
          />
        </Routes>
      </Router>
    </QueryClientProvider>
  );
};

export default App;
