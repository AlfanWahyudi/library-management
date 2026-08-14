"use client";

import AppLogo from "@/components/common/app-logo";
import {
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
} from "@/components/ui/sidebar";
import { ROUTE } from "@/lib/constants/route";
import Link from "next/link";

export default function NavHeader() {
  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <SidebarMenuButton size="lg" asChild>
          <Link 
            href={ROUTE.DASHBOARD.url} 
            title={ROUTE.DASHBOARD.title} 
            className="hover:bg-transparent"
          >
            <AppLogo />
          </Link>
        </SidebarMenuButton>
      </SidebarMenuItem>
    </SidebarMenu>
  )
}