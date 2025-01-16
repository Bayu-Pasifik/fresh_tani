import React from "react";
import { Navigate } from "react-router-dom";
import { getAuth } from "firebase/auth";
import { getUserData } from "@/hooks/use-auth";

interface ProtectedRouteProps {
  children: React.ReactElement;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const [isAdmin, setIsAdmin] = React.useState(false);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const auth = getAuth();
    const currentUser = auth.currentUser;

    const checkAdmin = async () => {
      if (currentUser) {
        try {
          const userData = await getUserData(currentUser.uid);
          setIsAdmin(userData.roles.includes("admin")); // Periksa apakah role "admin" ada
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      }
      setLoading(false);
    };

    checkAdmin();
  }, []);

  if (loading) {
    return <div>Loading...</div>; // Tampilkan loading saat memeriksa
  }

  return isAdmin ? children : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
