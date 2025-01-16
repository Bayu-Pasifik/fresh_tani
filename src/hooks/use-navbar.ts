// hooks/useNavbar.ts
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAuth, signOut, onAuthStateChanged } from "firebase/auth";
import { getUserData } from "@/hooks/use-auth";
import Swal from "sweetalert2";
import { requestRole } from "@/service/roleService";
import { getFirestore, collection, query, where, getDocs } from "firebase/firestore";

export const useNavbar = () => {
  const navigate = useNavigate();
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [roles, setRoles] = useState<string[]>([]);
  const [user, setUser] = useState<any>(null);
  const [pendingRequests, setPendingRequests] = useState<number>(0);

  useEffect(() => {
    const auth = getAuth();

    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        setUser(currentUser);

        try {
          const userData = await getUserData(currentUser.uid);
          setRoles(userData.roles || []);

          // Jika user adalah admin, ambil jumlah permintaan role yang belum diproses
          if (userData.roles?.includes("admin")) {
            await fetchPendingRequests();
          }
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      } else {
        setUser(null);
        setRoles([]);
      }
    });

    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    try {
      setIsLoggingOut(true);
      await signOut(getAuth());
      navigate("/login");
    } catch (error) {
      console.error("Error signing out: ", error);
    } finally {
      setIsLoggingOut(false);
    }
  };

  const handleRequestRole = () => {
    Swal.fire({
      title: "Request Role Baru",
      input: "select",
      inputOptions: {
        buyer: "Buyer",
        farmer: "Farmer",
      },
      inputPlaceholder: "Pilih Role",
      showCancelButton: true,
      confirmButtonText: "Request",
      cancelButtonText: "Cancel",
      preConfirm: (selectedRole) => {
        if (!selectedRole) {
          Swal.showValidationMessage("Anda harus memilih role.");
          return false;
        }
        return selectedRole;
      },
    }).then(async (result) => {
      if (result.isConfirmed) {
        const selectedRole = result.value;

        try {
          await requestRole({
            userId: user.uid,
            email: user.email,
            currentRoles: roles,
            requestedRole: selectedRole,
          });

          Swal.fire({
            icon: "success",
            title: "Permintaan sudah dikirim",
            text: `Permintaan role ${selectedRole} telah dikirim ke admin.`,
          });
        } catch (error: any) {
          Swal.fire(
            "Error",
            error.message || "Gagal meminta role, silahkan coba lagi.",
            "error"
          );
        }
      }
    });
  };

  const fetchPendingRequests = async () => {
    const db = getFirestore();
    const q = query(
      collection(db, "roleRequests"),
      where("status", "==", "pending")
    );
    const querySnapshot = await getDocs(q);
    setPendingRequests(querySnapshot.size);
  };

  return {
    user,
    roles,
    pendingRequests,
    isLoggingOut,
    handleLogout,
    handleRequestRole,
  };
};
