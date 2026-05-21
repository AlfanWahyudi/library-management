'use client'

import {
  SidebarMenuItem,
  SidebarMenuButton,
} from "@/components/ui/sidebar"
import { ROUTE } from "@/lib/constants/route"

import { CircleUserRound } from "lucide-react"
import { usePathname } from "next/navigation"

export default function NavProfile({ name, role }) {
  const pathname = usePathname()

  const profileRoute = ROUTE.USER_PROFILES

  return (
    <SidebarMenuItem>
      <SidebarMenuButton 
        className="h-auto" 
        isActive={pathname===profileRoute.url}
        asChild
      >
        <a href={profileRoute.url}>
          <CircleUserRound />
          <div className="grid">
            <p className="font-semibold text-md">{name}</p>
            <p>{role}</p>
          </div>
        </a>
      </SidebarMenuButton>
    </SidebarMenuItem>
  )
}