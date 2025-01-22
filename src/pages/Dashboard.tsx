import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/sidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";

const Dashboard: React.FC = () => {
  return (
    <div className="flex min-h-screen bg-gray-100">
      <SidebarProvider>
        {/* Sidebar */}
        <Sidebar />

        {/* Main content */}
        <main className="flex-1 p-6">
          <div className="md:hidden absolute top-1/2 left-2 -translate-y-1/2 p-2 z-50">
            <SidebarTrigger>
              <span className="material-icons">menu</span>
            </SidebarTrigger>
          </div>
          <Outlet />
        </main>
      </SidebarProvider>
    </div>
  );
};

export default Dashboard;
