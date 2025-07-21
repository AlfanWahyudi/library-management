import { SidebarProvider } from "@/components/ui/sidebar";
import { DashSidebar } from "./components/sidebar/dashSidebar";
import { DashSidebarTrigger } from "./components/sidebar/dashSidebarTrigger";

export default function DashboardLayout({ children }) {
  return (
    <SidebarProvider>
      <DashSidebar />
      <main className="w-screen flex-initial flex flex-col relative">
         <DashSidebarTrigger />
        <section className="flex-none p-3 min-h-12 bg-gray-600 md:hidden">
          <h3 className="text-md font-semibold text-white">App Name</h3>
        </section>
        <section className="flex-1 ps-3 pr-3 pt-3">
          {children}
        </section>
      </main>
    </SidebarProvider>
  )
}