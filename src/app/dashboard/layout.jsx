import DashHeader from "@/components/specific/header";
import DashMainContent from "@/components/specific/main-content";
import DashSidebar from "@/components/specific/sidebar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import SessionDAL from "@/lib/dal/session-dal";
import UserService from "@/lib/services/user-service";
import BreadCrumbContextProvider from "@/store/breadcrumb-context";

export default async function DashboardLayout({ children }) {
  const session = await SessionDAL.verify()

  if (!session.isAuth) {
    //TODO: handle display error message
  }

  const role = session.roles.map((role) => role.name).join(', ')
  return (
    <BreadCrumbContextProvider>
      <SidebarProvider>
        <DashSidebar userFullName={session.fullName} userRole={role}  />
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
