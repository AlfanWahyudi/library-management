"use client";

import {
	SidebarFooter,
	SidebarMenu,
	SidebarMenuItem,
	SidebarMenuButton,
} from "@/components/ui/sidebar";
import { LogOut, CircleUserRound } from "lucide-react";

function DashSidebarFooter() {
	return (
		<SidebarFooter>
			<SidebarMenu>
				<SidebarMenuItem>
					<SidebarMenuButton className="h-auto" asChild>
						<a href="#">
							<CircleUserRound />
							<div className="grid">
								<p className="font-semibold text-md">John Doe</p>
								<p>Pustakawan</p>
							</div>
						</a>
					</SidebarMenuButton>
				</SidebarMenuItem>
				<SidebarMenuItem>
					<form>
						<SidebarMenuButton type="button" className="h-auto cursor-pointer">
							<LogOut /> <span className="">Logout</span>
						</SidebarMenuButton>
					</form>
				</SidebarMenuItem>
			</SidebarMenu>
		</SidebarFooter>
	);
}

export { DashSidebarFooter };
