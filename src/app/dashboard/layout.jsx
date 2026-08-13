import DashHeader from "@/components/specific/header";
import DashMainContent from "@/components/specific/main-content";
import DashSidebar from "@/components/specific/sidebar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import Auth from "@/lib/auth/auth";
import UserService from "@/lib/services/user-service";
import BreadCrumbContextProvider from "@/store/breadcrumb-context";

export default async function DashboardLayout({ children }) {
  const auth = await Auth.validateSession()
  const userId = auth.getUserId()
  const roles = auth.getRoles()

  const user = await UserService.getById(userId)
  const role = roles.map((role) => role.name).join(', ')
  return (
    <BreadCrumbContextProvider>
      <SidebarProvider>
        <DashSidebar userFullName={user.fullName} userRole={role}  />
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
