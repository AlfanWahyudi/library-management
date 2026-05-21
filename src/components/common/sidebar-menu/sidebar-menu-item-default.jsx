'use client'

import {
	SidebarMenuItem,
	SidebarMenuButton,
} from "@/components/ui/sidebar";

import Link from "next/link";
import { usePathname } from "next/navigation";

// TODO: item not activated; cases: http://localhost:3000/dashboard/book-loans/49/return
export default function SidebarMenuItemDefault({ isMenuActive = false, item }) {
  const pathname = usePathname() // contoh hasilnya: /dashboard/books/create

  const totalMainPathExcludeDashboard = 3

  const currPathCount = pathname.split('/').length
  const activateItem = currPathCount > totalMainPathExcludeDashboard
    ? item.url === pathname.split('/').slice(0, -1).join('/')
    : pathname === item.url

  return (
    <SidebarMenuItem>
      <SidebarMenuButton 
        isActive={activateItem} 
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