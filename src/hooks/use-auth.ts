import { useMutation } from "@tanstack/react-query";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile, onAuthStateChanged } from "firebase/auth";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { doc, getDoc, getFirestore, setDoc } from "firebase/firestore";
import { useEffect, useState } from "react";

// Fungsi untuk registrasi pengguna
const registerUser = async ({ email, password, fullName, roles }: { 
  email: string; 
  password: string; 
  fullName: string; 
  roles: string[]; // Array role
}) => {
  const auth = getAuth();
  const db = getFirestore();

  const userCredential = await createUserWithEmailAndPassword(auth, email, password);
  await updateProfile(userCredential.user, { displayName: fullName });

  const userRef = doc(db, "users", userCredential.user.uid);
  await setDoc(userRef, {
    fullName,
    email,
    roles, // Menyimpan array role
    createdAt: new Date(),
  });

  return userCredential.user;
};


// Fungsi untuk login pengguna
const loginUser = async ({ email, password }: { email: string; password: string }) => {
  const auth = getAuth();
  const userCredential = await signInWithEmailAndPassword(auth, email, password);
  return userCredential.user; // Mengembalikan user setelah login
};

// Hook untuk registrasi
export const useRegisterMutation = () => {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: registerUser,
    onSuccess: () => {
      Swal.fire({
        icon: "success",
        title: "Registration Successful",
        text: "Your account has been created!",
      });
      navigate("/login"); // Mengarahkan ke halaman utama setelah registrasi berhasil
    },
    onError: (error: any) => {
      Swal.fire({
        icon: "error",
        title: "Registration Failed",
        text: error.message || "An error occurred during registration.",
      });
    },
  });
};

// Hook untuk login
export const useLoginMutation = () => {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: loginUser,
    onSuccess: () => {
      navigate("/"); // Mengarahkan ke halaman utama setelah login berhasil
    },
    onError: (error: any) => {
      Swal.fire({
        icon: "error",
        title: "Login Failed",
        text: error.message || "An error occurred during login.",
      });
    },
  });
};



export const getUserData = async (uid: string) => {
  const db = getFirestore();
  const userRef = doc(db, "users", uid);
  const userSnap = await getDoc(userRef);

  if (userSnap.exists()) {
    return userSnap.data(); // Data pengguna termasuk role
  } else {
    throw new Error("User data not found");
  }
};

export const useAuth = () => {
  const [userRoles, setUserRoles] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

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

  return { userRoles, loading };
};
