'use client'

import {
	SidebarMenuItem,
	SidebarMenuButton,
	SidebarMenuSub,
} from "@/components/ui/sidebar";

import {
	Collapsible,
	CollapsibleContent,
	CollapsibleTrigger,
} from "@/components/ui/collapsible";

import { ChevronRight } from "lucide-react";

import SidebarMenuItemDefault from "./sidebar-menu-item-default";

export default function SidebarMenuItemCollapsible({ item }) {
  return (
    <Collapsible className="group/collapsible">
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
              <SidebarMenuItemDefault 
                key={sub.title}
                item={sub}
              />
            ))}
          </SidebarMenuSub>
        </CollapsibleContent>
      </SidebarMenuItem>
    </Collapsible>
  )
}