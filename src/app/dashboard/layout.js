import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { DashboardSidebar } from "./components/dashboardSidebar";
import { DashboardTrigger } from "./components/dashboardTrigger";

export default function DashboardLayout({ children }) {
  return (
    <SidebarProvider>
      <DashboardSidebar />
      <main className="w-screen flex-initial flex flex-col relative">
        <DashboardTrigger />
        <section className="flex-none p-3 min-h-12 bg-gray-600 md:hidden">
          <h3 className="text-md font-semibold text-white">App Name</h3>
        </section>
        <section className="flex-1 ps-3 pr-3 pt-3 bg-amber-100">
          {children}
        </section>
      </main>
    </SidebarProvider>
  )
}