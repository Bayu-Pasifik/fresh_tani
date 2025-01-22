import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/sidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";

const Dashboard: React.FC = () => {
  return (
    <div className="flex min-h-screen bg-gray-100">
      <SidebarProvider>
        <Sidebar />
        <main className="flex-1 p-6 ">
          <Outlet />
          <SidebarTrigger className="flex justify-start" />
        </main>
      </SidebarProvider>
    </div>
  );
};

export default Dashboard;
