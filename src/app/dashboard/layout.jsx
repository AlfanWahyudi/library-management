import { SidebarProvider } from "@/components/ui/sidebar";
import { DashSidebar } from "./components/sidebar/dashSidebar";

export default function DashboardLayout({ children }) {
  return (
    <SidebarProvider>
      <DashSidebar />
      <main className="basis-full flex flex-col relative">
        <section className="flex-none p-3 min-h-12 bg-gray-600 md:hidden">
          <h3 className="text-md font-semibold text-white">App Name</h3>
        </section>
        <section className="flex flex-col ps-3 pr-3 pt-3">
          {children}
        </section>
      </main>
    </SidebarProvider>
  )
}