'use client'

import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import BreadCrumbContextProvider from "@/store/breadcrumb-context";
import DashHeader from "./components/header";
import DashSidebar from "./components/sidebar";
import DashMainContent from "./components/main-content/main-content";

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
