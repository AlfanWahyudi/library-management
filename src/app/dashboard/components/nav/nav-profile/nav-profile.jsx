'use client'

import {
  SidebarMenuItem,
  SidebarMenuButton,
} from "@/components/ui/sidebar"

import { CircleUserRound } from "lucide-react"

export default function NavProfile() {
  return (
    <SidebarMenuItem>
      <SidebarMenuButton className="h-auto" asChild>
        <a href="#">
          <CircleUserRound />
          <div className="grid">
            <p className="font-semibold text-md">John Doe</p>
            <p>Pustakawan</p>
          </div>
        </a>
      </SidebarMenuButton>
    </SidebarMenuItem>
  )
}