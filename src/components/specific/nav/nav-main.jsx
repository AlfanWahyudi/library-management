"use client";

import {
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

import { LayoutDashboard, Book, Users, Scale, ChevronRight } from "lucide-react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { ROUTE } from "@/lib/constants/route";

const menus = [
	{
		...ROUTE.DASHBOARD,
		icon: LayoutDashboard,
	},
	{
		...ROUTE.BOOKS,
		icon: Book,
		subMenus: [
			{...ROUTE.BOOKS},
			{...ROUTE.AUTHORS},
			{...ROUTE.BOOK_RESERVATIONS},
			{...ROUTE.BOOK_LOANS},
			{...ROUTE.LOAN_VIOLATIONS},
		],
	},
	{
		...ROUTE.VIOLATION_SANCTIONS,
		icon: Scale,
	},
	{
		...ROUTE.MEMBERS,
		icon: Users,
	},
];

export default function NavMain() {
	const pathname = usePathname()

	return (
		<SidebarMenu>
			{menus.map((item) => {
				let menuItem = null;

				if (item["subMenus"]) {
					menuItem = (
						<Collapsible className="group/collapsible" key={item.title}>
							<SidebarMenuItem>
								<CollapsibleTrigger asChild>
									<SidebarMenuButton tooltip={item.title}>
										{item.icon && <item.icon />}
										<span>{item.title}</span>
										<ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
									</SidebarMenuButton>
								</CollapsibleTrigger>
								<CollapsibleContent>
									<SidebarMenuSub>
										{item.subMenus.map((sub) => (
											<SidebarMenuSubItem key={sub.title}>
												<SidebarMenuSubButton 
													isActive={pathname === sub.url} 
													asChild
												>
													<Link 
														href={sub.url} 
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
								isActive={pathname === item.url} 
								asChild
							>
								<Link 
									href={item.url} 
									title={item.title}
								>
									{item.icon && <item.icon />}
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
}
