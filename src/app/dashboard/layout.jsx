'use client'

import DashHeader from "@/components/dashboard/header";
import DashMainContent from "@/components/dashboard/main-content";
import DashSidebar from "@/components/dashboard/sidebar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import BreadCrumbContextProvider from "@/store/breadcrumb-context";

export default function DashboardLayout({ children }) {
  return (
    <BreadCrumbContextProvider>
      <SidebarProvider>
        <DashSidebar />
        <SidebarInset>
          <DashHeader />
          <DashMainContent>
            {children}
          </DashMainContent>
        </SidebarInset>
      </SidebarProvider>
    </BreadCrumbContextProvider>
  )
}
