"use client";

import { Sidebar, useSidebar } from "@/components/ui/sidebar";

import DashSidebarHeader from "./dash-sidebar-header";
import DashSidebarContent from "./dash-sidebar-content";
import DashSidebarFooter from "./dash-sidebar-footer";
import DashSidebarTrigger from "./dash-sidebar-trigger";

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
		<Sidebar collapsible="icon" className='relative'>
			<DashSidebarTrigger />
			<DashSidebarHeader />
			<DashSidebarContent />
			<DashSidebarFooter />
		</Sidebar>
	);
}
