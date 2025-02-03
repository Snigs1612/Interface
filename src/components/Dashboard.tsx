"use client";

import { useState } from "react";
import {
  User,
  Database,
  Key,
  Settings,
  Layers,
  Book,
  Home,
} from "lucide-react";
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
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

// Sidebar sections
const sections = [
  {
    items: [
      { title: "Agents", url: "#", icon: User },
      { title: "Datastores", url: "#", icon: Database },
      { title: "API Reference", url: "#", icon: Book },
    ],
  },
  {
    label: "Admin",
    items: [
      { title: "API Keys", url: "#", icon: Key },
      { title: "Admin Settings", url: "#", icon: Settings },
      { title: "Global Settings", url: "#", icon: Layers },
    ],
  },
  {
    label: "Internal",
    items: [
      { title: "Integrations", url: "#", icon: Home },
      { title: "Models", url: "#", icon: Database },
    ],
  },
];

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [breadcrumb, setBreadcrumb] = useState("Dashboard");

  return (
    <SidebarProvider>
      <div className="flex h-screen">
        {/* Sidebar */}
        <Sidebar className="w-64 bg-gray-100 p-4">
          <SidebarContent>
            {sections.map((section, sectionIndex) => (
              <SidebarGroup key={section.label || `section-${sectionIndex}`}>
                {section.label && (
                  <SidebarGroupLabel>{section.label}</SidebarGroupLabel>
                )}
                <SidebarGroupContent>
                  <SidebarMenu>
                    {section.items.map((item, itemIndex) => (
                      <SidebarMenuItem key={`${item.title}-${itemIndex}`}>
                        <SidebarMenuButton asChild>
                          <a
                            href={item.url}
                            className="flex items-center gap-2"
                            aria-label={item.title}
                            onClick={(e) => {
                              e.preventDefault();
                              setBreadcrumb(item.title);
                            }}
                          >
                            <item.icon className="w-5 h-5" />
                            <span>{item.title}</span>
                          </a>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    ))}
                  </SidebarMenu>
                </SidebarGroupContent>
              </SidebarGroup>
            ))}
          </SidebarContent>
        </Sidebar>

        {/* Main content */}
        <div className="flex-1 flex flex-col">
          {/* Full-width Navbar */}
          <nav className="flex items-center justify-between px-6 py-4 bg-white shadow-md w-full">
            {/* Breadcrumb */}
            <nav aria-label="Breadcrumb">
              <Breadcrumb className="text-gray-600">
                <BreadcrumbList>
                  <BreadcrumbItem>
                    <BreadcrumbLink href="/">Excel</BreadcrumbLink>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator />
                  <BreadcrumbItem>
                    <BreadcrumbPage>{breadcrumb}</BreadcrumbPage>
                  </BreadcrumbItem>
                </BreadcrumbList>
              </Breadcrumb>
            </nav>

            {/* Avatar */}
            <Avatar>
              <AvatarImage src="https://github.com/shadcn.png" alt="User Avatar" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
          </nav>

          {/* Page content */}
          <main className="flex-1 p-4">{children}</main>
        </div>
      </div>
    </SidebarProvider>
  );
}
