"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import { AppSidebar } from "@/components/ui/app-sidebar";
import { SidebarProvider } from "@/components/ui/sidebar";

export default function Home() {
  const [breadcrumb, setBreadcrumb] = useState("Agents");

  return (
    <SidebarProvider>
      <div className="flex h-screen">
        {/* Sidebar - fixed width */}
        <AppSidebar setBreadcrumb={setBreadcrumb} />

        {/* Main content area */}
        <div className="flex-1 flex flex-col">
          {/* Navbar - Fixed at the top with higher z-index */}
          <Navbar breadcrumb={breadcrumb} />

          {/* Content area (adjusted for navbar height) */}
          
        </div>
      </div>
    </SidebarProvider>
  );
}
