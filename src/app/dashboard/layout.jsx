'use client'

import DashHeader from "@/components/specific/header";
import DashMainContent from "@/components/specific/main-content";
import DashSidebar from "@/components/specific/sidebar";
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
