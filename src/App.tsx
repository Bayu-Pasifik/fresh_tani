import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Home from "./pages/Home";
import LoginPage from "./pages/Login";
import RegisterPage from "./pages/Register";

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
        </Routes>
      </Router>
    </QueryClientProvider>
  );
};

export default App;
