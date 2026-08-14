"use client";

import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarMenu } from "@/components/ui/sidebar";

import NavMain from "./nav/nav-main";
import NavProfile from "./nav/nav-profile";
import NavLogout from "./nav/nav-logout";
import NavHeader from "./nav/nav-header";

export default function DashSidebar({ userFullName, userRole }) {
	return (
		<Sidebar collapsible="icon">
			<SidebarHeader>
				<NavHeader />
			</SidebarHeader>
			<SidebarContent>
				<NavMain />
			</SidebarContent>
			<SidebarFooter>
				<SidebarMenu>
					<NavProfile name={userFullName} role={userRole} />
					<NavLogout />
				</SidebarMenu>
			</SidebarFooter>
		</Sidebar>
	);
}
