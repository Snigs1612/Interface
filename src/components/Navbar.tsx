import React from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

// ✅ Define prop type for breadcrumb
interface NavbarProps {
  breadcrumb: string;
}

const Navbar: React.FC<NavbarProps> = ({ breadcrumb }) => {
  return (
    <nav className="flex items-center gap-96 justify-between px-6 py-4 bg-white shadow-md w-full">
      {/* Breadcrumb Section */}
      <nav aria-label="Breadcrumb">
        <Breadcrumb className="text-gray-600">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/">Excel</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>{breadcrumb}</BreadcrumbPage> {/* ✅ Dynamically update breadcrumb */}
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </nav>

      {/* Avatar Section */}
      <Avatar>
        <AvatarImage src="https://github.com/shadcn.png" alt="User Avatar" />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
    </nav>
  );
};

export default Navbar;
