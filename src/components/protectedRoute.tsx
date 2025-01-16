import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getUserData } from "@/hooks/use-auth";

interface ProtectedRouteProps {
  children: React.ReactElement;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const auth = getAuth();

    // Pantau perubahan status autentikasi
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        try {
          const userData = await getUserData(currentUser.uid);

          // Periksa apakah user memiliki role "admin"
          setIsAdmin(userData.roles.includes("admin"));
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      } else {
        setIsAdmin(false);
      }

      setLoading(false); // Selesai memeriksa status autentikasi
    });

    return () => unsubscribe(); // Bersihkan listener saat komponen di-unmount
  }, []);

  if (loading) {
    return <div>Loading...</div>; // Tampilkan loading saat memeriksa
  }

  return isAdmin ? children : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
