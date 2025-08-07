"use client";

import {
	SidebarContent,
	SidebarMenu,
	SidebarMenuItem,
	SidebarMenuButton,
	SidebarMenuSub,
	SidebarMenuSubItem,
	SidebarMenuSubButton,
} from "@/components/ui/sidebar";

import {
	Collapsible,
	CollapsibleContent,
	CollapsibleTrigger,
} from "@/components/ui/collapsible";

import { LayoutDashboard, Book, Users, Scale, ChevronDown } from "lucide-react";
import Link from "next/link";

const menus = [
	{
		title: "Dashboard",
		url: "dashboard/",
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
				title: "Pengarang",
				url: "/dashboard/pengarang",
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

function DashSidebarContent() {
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
													<Link href={sub.url} title={sub.title}>
														<span>{sub.title}</span>
													</Link>
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

	return <SidebarContent className="p-2">{sidebarMenu}</SidebarContent>;
}

export { DashSidebarContent };
