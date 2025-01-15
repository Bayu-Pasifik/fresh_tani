import { useState } from "react";
import { useLoginMutation } from "@/hooks/use-auth";
import { Leaf, ShoppingCart } from "lucide-react";
import Swal from "sweetalert2";
import { getAuth } from "firebase/auth";

const Navbar = () => {
  const auth = getAuth();
  const [isDropdownOpen, setDropdownOpen] = useState(false);

  const handleLogout = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You will be logged out.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, log out",
      cancelButtonText: "Cancel",
    }).then((result) => {
      if (result.isConfirmed) {
        // Proses logout dan arahkan ke halaman login
        window.location.href = "/login";
      }
    });
  };
  console.log(auth.currentUser);
  return (
    <header className="bg-green-600 text-white shadow-lg">
      <div className="container mx-auto p-4 flex justify-between items-center">
        {/* Logo dan Nama Toko */}
        <div className="flex items-center space-x-2">
          <Leaf size={24} className="animate-bounce" />
          <h1 className="text-3xl font-bold">Toko Sayur FreshTani</h1>
        </div>

        {/* Nama User dan Dropdown */}
        <div className="relative">
          {auth.currentUser ? (
            <div
              className="flex items-center space-x-2 cursor-pointer"
              onClick={() => setDropdownOpen((prev) => !prev)}
            >
              <span className="font-medium">{auth.currentUser.displayName}</span>
            </div>
          ) : null}

          {/* Dropdown Menu */}
          {isDropdownOpen && (
            <div className="absolute right-0 mt-2 w-40 bg-white rounded-md shadow-lg z-10">
              <ul className="py-2 text-sm text-gray-700">
                <li
                  className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                  onClick={handleLogout}
                >
                  Logout
                </li>
              </ul>
            </div>
          )}
        </div>

        {/* Keranjang Belanja */}
        <button className="flex items-center space-x-2 bg-green-700 hover:bg-green-800 px-4 py-2 rounded-full transition duration-300 transform hover:scale-105 active:scale-95">
          <ShoppingCart size={20} />
          <span>Cart</span>
        </button>
      </div>
    </header>
  );
};

export default Navbar;
