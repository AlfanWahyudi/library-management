"use client"

import { Button } from "@/components/ui/button";

import { Sidebar, SidebarContent, useSidebar, SidebarHeader, SidebarGroup, SidebarFooter, SidebarMenu, SidebarMenuItem, SidebarMenuButton } from "@/components/ui/sidebar";

const items = [
  {
    title: "Dashboard",
    url: "#"
  },
  {
    title: "Buku",
    url: "#"
  },
  {
    title: "Anggota",
    url: "#"
  },
  {
    title: "Pelanggaran & Sanksi",
    url: "#"
  },
]

function DashboardSidebar() {
  const {
    state,
    open,
    setOpen,
    openMobile,
    setOpenMobile,
    isMobile,
    toggleSidebar,
  } = useSidebar()

  return (
    <Sidebar collapsible="icon" variant="inset" className="bg-blue-300">
      <SidebarHeader>
        <p className="py-2 px-4 border rounded text-center font-semibold ">
          APP Logo
        </p>
      </SidebarHeader>
      <SidebarContent>
        <SidebarMenu>
          {items.map((item) => (
            <SidebarMenuItem key={item.title}>
              <SidebarMenuButton asChild>
                <a href={item.url}>
                  <span>{item.title}</span>
                </a>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton>User Name</SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton>Logout</SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  )
}

export { DashboardSidebar }