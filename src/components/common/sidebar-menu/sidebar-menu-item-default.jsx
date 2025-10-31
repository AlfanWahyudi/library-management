'use client'

import {
	SidebarMenuItem,
	SidebarMenuButton,
} from "@/components/ui/sidebar";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function SidebarMenuItemDefault({ isMenuActive = false, item }) {
  const pathname = usePathname()

  return (
    <SidebarMenuItem>
      <SidebarMenuButton 
        isActive={pathname === item.url} 
        asChild
      >
        <Link 
          href={item.url} 
          title={item.title}
        >
          {item.icon && <item.icon />}
          <span>{item.title}</span>
        </Link>
      </SidebarMenuButton>
    </SidebarMenuItem>
  )
}