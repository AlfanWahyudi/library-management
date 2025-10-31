"use client";

import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarMenu, useSidebar } from "@/components/ui/sidebar";

import AppLogo from "../common/app-logo";
import NavMain from "./nav/nav-main";
import NavProfile from "./nav/nav-profile";
import NavLogout from "./nav/nav-logout";

export default function DashSidebar() {
	const {
		state,
		open,
		setOpen,
		openMobile,
		setOpenMobile,
		isMobile,
		toggleSidebar,
	} = useSidebar();

	return (
		<Sidebar collapsible="icon">
			<SidebarHeader>
				<AppLogo />
			</SidebarHeader>
			<SidebarContent>
				<NavMain />
			</SidebarContent>
			<SidebarFooter>
				<SidebarMenu>
					<NavProfile />
					<NavLogout />
				</SidebarMenu>
			</SidebarFooter>
		</Sidebar>
	);
}
