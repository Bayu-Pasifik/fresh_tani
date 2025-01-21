import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "@/hooks/use-auth"; // Custom hook to get user roles
import { Tractor, ShoppingCart, Shield } from "lucide-react";

const Sidebar: React.FC = () => {
  const { userRoles } = useAuth();

  const menus = [
    {
      role: "farmer",
      title: "Farmer",
      icon: <Tractor className="w-5 h-5" />,
      submenus: [
        { name: "Dashboard Farmer", path: "/dashboard-farmer" },
        { name: "Manage Crops", path: "/manage-crops" },
      ],
    },
    {
      role: "buyer",
      title: "Buyer",
      icon: <ShoppingCart className="w-5 h-5" />,
      submenus: [
        { name: "Dashboard Buyer", path: "/dashboard-buyer" },
        { name: "Shopping Cart", path: "/cart" },
      ],
    },
    {
      role: "admin",
      title: "Admin",
      icon: <Shield className="w-5 h-5" />,
      submenus: [
        { name: "Dashboard Admin", path: "/dashboard-admin" },
        { name: "Manage Users", path: "/manage-users" },
        { name: "View Reports", path: "/view-reports" },
      ],
    },
  ];

  // Filter menus based on user roles
  const filteredMenus = menus.filter((menu) =>
    userRoles.includes(menu.role)
  );

  return (
    <aside className="w-64 bg-white shadow-md">
      <div className="p-4 border-b">
        <h1 className="text-2xl font-bold text-green-600">
          Toko Sayur Dashboard
        </h1>
      </div>
      <nav className="p-4">
        <ul className="space-y-4">
          {filteredMenus.map((menu) => (
            <li key={menu.role}>
              <div className="flex items-center space-x-2">
                {menu.icon}
                <span className="text-lg font-semibold">{menu.title}</span>
              </div>
              <ul className="mt-2 pl-6 space-y-2">
                {menu.submenus.map((submenu) => (
                  <li key={submenu.path}>
                    <Link
                      to={submenu.path}
                      className="block text-gray-700 hover:text-green-600"
                    >
                      {submenu.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
