'use client'

import PrimaryBreadcrumb from "@/components/common/primary-breadcrumb"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { Separator } from "@radix-ui/react-dropdown-menu"

// TODO: make it sticky, cannot hide while scrolling
export default function DashHeader() {
  return (
    <header className="flex min-h-14 max-h-20 shrink-0 items-center gap-2 border-b transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12 bg-white sticky top-0 z-20 shadow-sm">
      <div className="flex items-center gap-1 px-8">
        <SidebarTrigger className="-ml-1" />
        <Separator
          orientation="vertical"
          className="mr-2 data-[orientation=vertical]:h-4"
        />
        <PrimaryBreadcrumb />
      </div>
    </header>
  )
}