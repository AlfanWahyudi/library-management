"use client";

import {
	SidebarMenu,
	SidebarGroup,
	SidebarGroupContent,
	SidebarGroupLabel,
} from "@/components/ui/sidebar";


import { LayoutDashboard, Users, UserPen, Gavel, BookText, BookUp, Scale, History } from "lucide-react";
import { ROUTE } from "@/lib/constants/route";
import SidebarMenuItemDefault from "@/components/common/sidebar-menu/sidebar-menu-item-default";
import SidebarMenuItemCollapsible from "@/components/common/sidebar-menu/sidebar-menu-item-collapsible";

const menus = [
	{
		title: null,
		items: [
			{
				...ROUTE.DASHBOARD,
				icon: LayoutDashboard,
			},
			{
				...ROUTE.MEMBERS,
				icon: Users,
			},
			{
				...ROUTE.VIOLATIONS,
				icon: Scale
			},
		]
	},
	{
		title: 'Buku',
		items: [
			{
				...ROUTE.BOOKS,
				icon: BookText
			},
			{
				...ROUTE.AUTHORS,
				icon: UserPen,
			},
		]
	},
	{
		title: 'Peminjaman Buku',
		items: [
			{
				...ROUTE.BOOK_LOANS,
				icon: BookUp
			},
			{
				...ROUTE.BOOK_LOAN_HISTORIES,
				icon: History
			},
			{
				...ROUTE.LOAN_VIOLATIONS,
				icon: Gavel,
			},
		]
	}
];

export default function NavMain() {
	return (
		<>
			{menus.map((menu) => (
				<SidebarGroup key={menu.title}>
					{menu.title && <SidebarGroupLabel>{menu.title}</SidebarGroupLabel>}
					<SidebarGroupContent>
						<SidebarMenu>
							{menu.items.map((item) => {
								let menuItem = null;

								if (item["subMenus"]) {
									menuItem = (
										<SidebarMenuItemCollapsible 
											key={item.title}
											item={item}
										/>
									);
								} else {
									menuItem = (
										<SidebarMenuItemDefault 
											key={item.title}
											item={item}
										/>
									) 
								}

								return menuItem;
							})}
						</SidebarMenu>
					</SidebarGroupContent>
				</SidebarGroup>
			))}
		</>
	);
}
