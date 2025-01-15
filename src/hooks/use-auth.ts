import { useMutation } from "@tanstack/react-query";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

// Fungsi untuk registrasi pengguna
const registerUser = async ({ email, password }: { email: string; password: string }) => {
  const auth = getAuth();
  const userCredential = await createUserWithEmailAndPassword(auth, email, password);
  return userCredential.user; // Mengembalikan user setelah registrasi
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
        text: "Your account has been created successfully!",
        confirmButtonText: "OK",
      }).then(() => {
        navigate("/login"); // Mengarahkan ke halaman login setelah klik OK
      });
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
