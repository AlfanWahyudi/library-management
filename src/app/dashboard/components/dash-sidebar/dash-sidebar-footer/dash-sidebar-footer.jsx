"use client";

import { logout } from "@/app/actions/auth";
import {
	SidebarFooter,
	SidebarMenu,
	SidebarMenuItem,
	SidebarMenuButton,
} from "@/components/ui/sidebar";
import { LogOut, CircleUserRound } from "lucide-react";
import { useActionState } from "react";

export default function DashSidebarFooter() {
	const [state, logoutAction, isPending] = useActionState(logout, undefined)

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
					<form action={logoutAction}>
						<SidebarMenuButton type="submit" className="h-auto cursor-pointer">
							<LogOut /> <span className="">Logout</span>
						</SidebarMenuButton>
					</form>
				</SidebarMenuItem>
			</SidebarMenu>
		</SidebarFooter>
	);
}
