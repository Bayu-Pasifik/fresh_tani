"use client";

import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/use-auth";
import { Tractor, ShoppingCart, Shield, ChevronDown, Menu } from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

const menus = [
  {
    role: "farmer",
    title: "Farmer",
    icon: Tractor,
    submenus: [
      { name: "Dashboard Farmer", path: "farmer" },
      { name: "Manage Crops", path: "/manage-crops" },
    ],
  },
  {
    role: "buyer",
    title: "Buyer",
    icon: ShoppingCart,
    submenus: [
      { name: "Dashboard Buyer", path: "/buyer" },
      { name: "Shopping Cart", path: "/cart" },
    ],
  },
  {
    role: "admin",
    title: "Admin",
    icon: Shield,
    submenus: [
      { name: "Dashboard Admin", path: "/admin" },
      { name: "Manage Users", path: "/manage-users" },
      { name: "View Reports", path: "/view-reports" },
    ],
  },
];

export default function ImprovedSidebar() {
  const { userRoles } = useAuth();
  const navigate = useNavigate();

  // Filter menus based on user roles
  const filteredMenus = menus.filter((menu) => userRoles.includes(menu.role));

  return (
    <SidebarProvider>
      {/* Sidebar Trigger untuk layar kecil */}
      <SidebarTrigger>
        {/* Pastikan hanya ada satu elemen di dalam SidebarTrigger */}
        <button
          className="p-2 text-green-600 md:hidden"
          aria-label="Open Sidebar"
        >
          <Menu className="w-6 h-6" />
        </button>
      </SidebarTrigger>

      {/* Sidebar */}
      <Sidebar className="border-r">
        <SidebarHeader className="border-b px-6 py-4">
          <h1 className="text-2xl font-bold text-green-600">
            Toko Sayur Dashboard
          </h1>
        </SidebarHeader>
        <SidebarContent>
          {filteredMenus.map((menu) => (
            <SidebarGroup key={menu.role}>
              <Collapsible>
                <CollapsibleTrigger asChild>
                  <SidebarGroupLabel className="flex items-center justify-between py-2 hover:bg-green-50 rounded-md transition-colors duration-200">
                    <div className="flex items-center space-x-3">
                      <menu.icon className="w-5 h-5 text-green-600" />
                      <span className="text-lg font-semibold">
                        {menu.title}
                      </span>
                    </div>
                    <ChevronDown className="w-4 h-4 text-green-600" />
                  </SidebarGroupLabel>
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <SidebarGroupContent>
                    <SidebarMenu>
                      {menu.submenus.map((submenu) => (
                        <SidebarMenuItem key={submenu.path}>
                          <SidebarMenuButton
                            onClick={() => navigate(`/dashboard/${submenu.path}`)}
                            className="block py-2 px-4 text-gray-700 hover:text-green-600 hover:bg-green-50 rounded-md transition-colors duration-200"
                          >
                            {submenu.name}
                          </SidebarMenuButton>
                        </SidebarMenuItem>
                      ))}
                    </SidebarMenu>
                  </SidebarGroupContent>
                </CollapsibleContent>
              </Collapsible>
            </SidebarGroup>
          ))}
        </SidebarContent>
      </Sidebar>
    </SidebarProvider>
  );
}
