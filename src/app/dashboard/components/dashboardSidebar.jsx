"use client";

import { Button } from "@/components/ui/button";

import {
	Sidebar,
	SidebarContent,
	useSidebar,
	SidebarHeader,
	SidebarGroup,
	SidebarFooter,
	SidebarMenu,
	SidebarMenuItem,
	SidebarMenuButton,
	SidebarMenuSub,
	SidebarMenuSubItem,
	SidebarMenuSubButton,
	SidebarMenuAction,
} from "@/components/ui/sidebar";
import {
	Collapsible,
	CollapsibleContent,
	CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
	LayoutDashboard,
	Book,
	Users,
	Scale,
	LogOut,
	ChevronDown,
	CircleUserRound,
	SquareLibrary,
	MoreHorizontal,
} from "lucide-react";
import { Avatar } from "@/components/ui/avatar";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu";

const menus = [
	{
		title: "Dashboard",
		url: "#",
		icon: LayoutDashboard,
	},
	{
		title: "Buku",
		url: "#",
		icon: Book,
		subMenus: [
			{
				title: "Daftar Buku",
				url: "#",
			},
			{
				title: "Penulis",
				url: "#",
			},
			{
				title: "Reservasi Buku",
				url: "#",
			},
			{
				title: "Peminjaman Buku",
				url: "#",
			},
			{
				title: "Pelanggaran Peminjaman Buku",
				url: "#",
			},
		],
	},
	{
		title: "Pelanggaran & Sanksi",
		url: "#",
		icon: Scale,
	},
	{
		title: "Anggota",
		url: "#",
		icon: Users,
	},
];

function DashboardSidebar() {
	const {
		state,
		open,
		setOpen,
		openMobile,
		setOpenMobile,
		isMobile,
		toggleSidebar,
	} = useSidebar();

	const sidebarMenu = (
		<SidebarMenu>
			{menus.map((item) => {
				let menuItem = null;

				if (item["subMenus"]) {
					menuItem = (
						<Collapsible className="group/collapsible" key={item.title}>
							<SidebarMenuItem>
								<CollapsibleTrigger asChild>
									<SidebarMenuButton>
										<item.icon />
										<span>{item.title}</span>
										<ChevronDown className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-180" />
									</SidebarMenuButton>
								</CollapsibleTrigger>
								<CollapsibleContent>
									<SidebarMenuSub>
										{item.subMenus.map((sub) => (
											<SidebarMenuSubItem key={sub.title}>
												<SidebarMenuSubButton asChild>
													<a href={sub.url} title={sub.title}>
														<span>{sub.title}</span>
													</a>
												</SidebarMenuSubButton>
											</SidebarMenuSubItem>
										))}
									</SidebarMenuSub>
								</CollapsibleContent>
							</SidebarMenuItem>
						</Collapsible>
					);
				} else {
					menuItem = (
						<SidebarMenuItem key={item.title}>
							<SidebarMenuButton asChild>
								<a href={item.url} title={item.title}>
									<item.icon />
									<span>{item.title}</span>
								</a>
							</SidebarMenuButton>
						</SidebarMenuItem>
					);
				}

				return menuItem;
			})}
		</SidebarMenu>
	);

	return (
		<Sidebar collapsible="icon">
			<SidebarHeader>
				<SidebarMenu>
					<SidebarMenuItem>
						<SidebarMenuSubButton>
							<SquareLibrary />
							<span className="font-semibold text-xl">App Name</span>
						</SidebarMenuSubButton>
					</SidebarMenuItem>
				</SidebarMenu>
			</SidebarHeader>
			<SidebarContent className="p-2">{sidebarMenu}</SidebarContent>
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
							<SidebarMenuButton
								type="button"
								className="h-auto cursor-pointer"
							>
								<LogOut /> <span className="">Logout</span>
							</SidebarMenuButton>
						</form>
					</SidebarMenuItem>
				</SidebarMenu>
			</SidebarFooter>
		</Sidebar>
	);
}

export { DashboardSidebar };
