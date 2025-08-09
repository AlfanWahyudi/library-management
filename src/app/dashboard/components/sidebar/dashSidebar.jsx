"use client";

import { Sidebar, useSidebar } from "@/components/ui/sidebar";

import { DashSidebarHeader } from "./dashSidebarHeader";
import { DashSidebarContent } from "./dashSidebarContent";
import { DashSidebarFooter } from "./dashSidebarFooter";
import { DashSidebarTrigger } from "./dashSidebarTrigger";

function DashSidebar() {
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

export { DashSidebar };
