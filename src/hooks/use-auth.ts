import { useMutation } from "@tanstack/react-query";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

// Fungsi untuk registrasi pengguna
const registerUser = async ({ email, password }: { email: string; password: string }) => {
  const auth = getAuth();
  const userCredential = await createUserWithEmailAndPassword(auth, email, password);
  return userCredential.user; // Mengembalikan user setelah registrasi
};

// Hook untuk registrasi
export const useRegisterMutation = () => {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: registerUser,
    onSuccess: (user) => {
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
