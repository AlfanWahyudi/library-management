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
import { usePathname } from "next/navigation";
import Link from "next/link";

const menus = [
	{
		title: "Dashboard",
		path: "/dashboard",
		icon: LayoutDashboard,
	},
	{
		title: "Buku",
		icon: Book,
		subMenus: [
			{
				title: "Daftar Buku",
				path: "/dashboard/books",
			},
			{
				title: "Pengarang",
				path: "/dashboard/authors",
			},
			{
				title: "Reservasi Buku",
				path: "/dashboard/book-reservations",
			},
			{
				title: "Peminjaman Buku",
				path: "/dashboard/book-loans",
			},
			{
				title: "Pelanggaran Peminjaman Buku",
				path: "/dashboard/loan-violations",
			},
		],
	},
	{
		title: "Pelanggaran & Sanksi",
		path: "/dashboard/violation-sanction",
		icon: Scale,
	},
	{
		title: "Anggota",
		path: "/dashboard/members",
		icon: Users,
	},
];

function DashSidebarContent() {
	const pathname = usePathname()

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
												<SidebarMenuSubButton 
													isActive={pathname === sub.path} 
													asChild
												>
													<Link 
														href={sub.path} 
														title={sub.title}
													>
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
							<SidebarMenuButton 
								isActive={pathname === item.path} 
								asChild
							>
								<Link 
									href={item.path} 
									title={item.title}
								>
									<item.icon />
									<span>{item.title}</span>
								</Link>
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
