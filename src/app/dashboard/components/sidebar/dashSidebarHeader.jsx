"use client";

import {
	SidebarHeader,
	SidebarMenu,
	SidebarMenuItem,
	SidebarMenuSubButton,
} from "@/components/ui/sidebar";
import {
	SquareLibrary,
} from "lucide-react";

function DashSidebarHeader() {
  return (
    <SidebarHeader>
      <SidebarMenu>
        <SidebarMenuItem>
          <SidebarMenuSubButton>
            <SquareLibrary />
            <span className="font-semibold text-xl">App Name</span>
          </SidebarMenuSubButton>
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarHeader>
  )
}

export { DashSidebarHeader }