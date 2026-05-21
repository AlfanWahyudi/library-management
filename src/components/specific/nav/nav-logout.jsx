'use client'

import { logout } from "@/app/actions/auth"
import { SidebarMenuButton, SidebarMenuItem } from "@/components/ui/sidebar"
import { LogOut } from "lucide-react"
import { useActionState } from "react"

export default function NavLogout() {
  const [state, logoutAction, isPending] = useActionState(logout, undefined)

  return (
    <SidebarMenuItem>
      <form action={logoutAction}>
        <SidebarMenuButton type="submit" className="h-auto cursor-pointer">
          <LogOut /> <span className="">Logout</span>
        </SidebarMenuButton>
      </form>
    </SidebarMenuItem>
  )
}