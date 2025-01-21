import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getUserData } from "@/hooks/use-auth";
import Swal from "sweetalert2";

interface ProtectedRouteProps {
  children: React.ReactElement;
  allowedRoles: string[];
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, allowedRoles }) => {
  const [userRoles, setUserRoles] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [isRoleValid, setIsRoleValid] = useState(true); // Menyimpan apakah role valid atau tidak
  const navigate = useNavigate(); // Hook untuk navigasi

  useEffect(() => {
    const auth = getAuth();

    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        try {
          const userData = await getUserData(currentUser.uid);
          setUserRoles(userData.roles || []);
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      } else {
        setUserRoles([]);
      }

      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (loading) return;

    if (!userRoles.some(role => allowedRoles.includes(role))) {
      // Tampilkan SweetAlert jika role tidak sesuai
      Swal.fire({
        icon: "error",
        title: "Akses Ditolak",
        text: "Anda tidak memiliki role untuk akses ke halaman ini. Anda dapat mengajukan permintaan role baru ke admin.",
        confirmButtonText: "OK",
      }).then(() => {
          navigate(-1);
        
      });

      // Set status role valid menjadi false
      setIsRoleValid(false);
    } else {
      setIsRoleValid(true);
    }
  }, [loading, userRoles, allowedRoles, navigate]);

  if (loading) {
    return <div>Loading...</div>;
  }

  // Jika role valid, tampilkan konten. Jika tidak, tidak render apa pun (tetap di halaman sebelumnya)
  return isRoleValid ? children : null;
};

export default ProtectedRoute;
