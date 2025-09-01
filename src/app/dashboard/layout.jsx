import { SidebarProvider } from "@/components/ui/sidebar";
import DashSidebar from "./components/dash-sidebar";

export default function DashboardLayout({ children }) {
  return (
    <SidebarProvider>
      <DashSidebar />
      <main className="mx-auto md:w-[63%] lg:w-[72%] xl:w-[78%] 2xl:w-[82%]">
        <section className="flex-none p-3 min-h-12 bg-gray-600 md:hidden">
          <h3 className="text-md font-semibold text-white">App Name</h3>
        </section>
        <section className="flex flex-col px-3 mt-5 md:mt-7">
          {children}
        </section>
      </main>
    </SidebarProvider>
  )
}