import React from "react";
import { Link } from "react-router-dom";
import { Leaf, ShoppingCart, User, Bell } from "lucide-react";
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { useNavbar } from "@/hooks/use-navbar";

const Navbar: React.FC = () => {
  const {
    user,
    roles,
    pendingRequests,
    isLoggingOut,
    handleLogout,
    handleRequestRole,
  } = useNavbar();

  return (
    <header className="bg-green-600 text-white shadow-lg">
      <div className="container mx-auto p-4 flex justify-between items-center">
        <Link to="/" className="flex items-center space-x-2">
          <Leaf size={24} className="animate-bounce" />
          <h1 className="text-3xl font-bold">Toko Sayur Fresh Tani</h1>
        </Link>

        <div className="flex items-center space-x-4">
          <Button className="flex items-center space-x-2 bg-green-700 hover:bg-green-800">
            <ShoppingCart size={20} />
            <span>Cart</span>
          </Button>

          {user ? (
            <div className="flex items-center space-x-4">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-18 w-18 rounded-full">
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
                  {!roles.includes("admin") && (
                    <DropdownMenuItem onClick={handleRequestRole}>
                      Request Role
                    </DropdownMenuItem>
                  )}
                  <DropdownMenuItem
                    onClick={handleLogout}
                    disabled={isLoggingOut}
                  >
                    {isLoggingOut ? "Logging out..." : "Logout"}
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              {roles.includes("admin") && pendingRequests > 0 && (
                <Link to="/manage-requests">
                  <Button variant="ghost" className="relative p-2 text-white bg-transparent">
                    <Bell size={24} />
                    <span className="absolute top-0 right-0 text-xs text-white bg-red-500 rounded-full w-5 h-5 flex items-center justify-center">
                      {pendingRequests}
                    </span>
                  </Button>
                </Link>
              )}
            </div>
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
