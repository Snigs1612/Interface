"use client";

import { Dispatch, SetStateAction } from "react";
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
} from "@/components/ui/sidebar";

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

// ✅ Define prop type for setBreadcrumb
interface AppSidebarProps {
  setBreadcrumb: Dispatch<SetStateAction<string>>;
}

export function AppSidebar({ setBreadcrumb }: AppSidebarProps) {
  return (
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
                          e.preventDefault(); // ✅ Prevent default link behavior
                          setBreadcrumb(item.title); // ✅ Update breadcrumb
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
  );
}
