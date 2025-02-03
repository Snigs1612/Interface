"use client";

import { useState } from "react";
import { useRouter } from "next/navigation"; // ✅ Import useRouter
import Navbar from "@/components/Navbar";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
} from "@/components/ui/sidebar";
import {
  User,
  Database,
  Key,
  Settings,
  Layers,
  Book,
  Home,
} from "lucide-react";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [breadcrumb, setBreadcrumb] = useState("Dashboard");
  const router = useRouter(); // ✅ Initialize router

  const sections = [
    {
      items: [
        { title: "Agents", url: "/dashboard/agents", icon: User },
        { title: "Datastores", url: "/dashboard/datastores", icon: Database },
        { title: "API Reference", url: "/dashboard/api-reference", icon: Book },
      ],
    },
    {
      label: "Admin",
      items: [
        { title: "API Keys", url: "/dashboard/api-keys", icon: Key },
        { title: "Admin Settings", url: "/dashboard/admin-settings", icon: Settings },
        { title: "Global Settings", url: "/dashboard/global-settings", icon: Layers },
      ],
    },
    {
      label: "Internal",
      items: [
        { title: "Integrations", url: "/dashboard/integrations", icon: Home },
        { title: "Models", url: "/dashboard/models", icon: Database },
      ],
    },
  ];

  return (
    <SidebarProvider>
      <div className="flex h-screen w-full">
        {/* Sidebar */}
        <Sidebar className="w-64 bg-gray-100 p-4">
          <SidebarContent>
            {sections.map((section, sectionIndex) => (
              <SidebarGroup key={section.label || `section-${sectionIndex}`}>
                {section.label && <SidebarGroupLabel>{section.label}</SidebarGroupLabel>}
                <SidebarGroupContent>
                  <SidebarMenu>
                    {section.items.map((item, itemIndex) => (
                      <SidebarMenuItem key={`${item.title}-${itemIndex}`}>
                        <SidebarMenuButton asChild>
                          <button
                            className="flex items-center gap-2 w-full text-left"
                            aria-label={item.title}
                            onClick={() => {
                              setBreadcrumb(item.title); // ✅ Update breadcrumb
                              router.push(item.url); // ✅ Navigate to the selected page
                            }}
                          >
                            <item.icon className="w-5 h-5" />
                            <span>{item.title}</span>
                          </button>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    ))}
                  </SidebarMenu>
                </SidebarGroupContent>
              </SidebarGroup>
            ))}
          </SidebarContent>
        </Sidebar>

        {/* Main Content */}
        <div className="flex-1 flex flex-col">
          <Navbar breadcrumb={breadcrumb} />
          <main className="flex-1 p-4">{children}</main>
        </div>
      </div>
    </SidebarProvider>
  );
}
