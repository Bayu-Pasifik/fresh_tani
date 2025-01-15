import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Leaf, ShoppingCart, User } from "lucide-react";
import { getAuth, signOut, onAuthStateChanged } from "firebase/auth";
import { getUserData } from "@/hooks/use-auth"; // Fungsi untuk mengambil data pengguna
import { Button } from "./ui/button";
import Swal from "sweetalert2";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

const Navbar: React.FC = () => {
  const navigate = useNavigate();
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [roles, setRoles] = useState<string[]>([]);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const auth = getAuth();

    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        setUser(currentUser);

        try {
          const userData = await getUserData(currentUser.uid);
          setRoles(userData.roles || []); // Ambil role dari Firestore
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
      title: "Request a New Role",
      input: "select",
      inputOptions: {
        buyer: "Buyer",
        farmer: "Farmer",
      },
      inputPlaceholder: "Select a role",
      showCancelButton: true,
      confirmButtonText: "Request",
      cancelButtonText: "Cancel",
      preConfirm: (selectedRole) => {
        if (!selectedRole) {
          Swal.showValidationMessage("You must select a role.");
          return false;
        }
        return selectedRole;
      },
    }).then((result) => {
      if (result.isConfirmed) {
        const selectedRole = result.value;

        // Logika untuk menyimpan permintaan role ke database
        Swal.fire({
          icon: "success",
          title: "Request Sent",
          text: `Your request for the "${selectedRole}" role has been sent to the admin.`,
        });

        console.log(`Requested role: ${selectedRole}`);
      }
    });
  };

  return (
    <header className="bg-green-600 text-white shadow-lg">
      <div className="container mx-auto p-4 flex justify-between items-center">
        <Link to="/" className="flex items-center space-x-2">
          <Leaf size={24} className="animate-bounce" />
          <h1 className="text-3xl font-bold">Toko Sayur FreshTani</h1>
        </Link>

        <div className="flex items-center space-x-4">
          <Button className="flex items-center space-x-2 bg-green-700 hover:bg-green-800">
            <ShoppingCart size={20} />
            <span>Cart</span>
          </Button>
          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="relative h-18 w-18 rounded-full"
                >
                  <User className="h-18 w-18" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuItem className="font-medium">
                  {user.displayName}
                  <span className="ml-2 text-xs text-gray-400">
                    ({roles.join(", ")})
                  </span>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={handleRequestRole}>
                  Request Role
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={handleLogout}
                  disabled={isLoggingOut}
                >
                  {isLoggingOut ? "Logging out..." : "Logout"}
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Link to="/login">
              <Button variant="ghost">Login</Button>
            </Link>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
