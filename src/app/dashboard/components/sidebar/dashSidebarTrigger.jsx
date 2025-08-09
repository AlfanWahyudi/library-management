"use client";

import { Button } from "@/components/ui/button";
import { useSidebar } from "@/components/ui/sidebar";
import {
	AlignJustify,
	ChevronLeft,
	ChevronRight,
} from "lucide-react";

function DashSidebarTrigger({ className }) {
	const {
		state,
		open,
		setOpen,
		openMobile,
		setOpenMobile,
		isMobile,
		toggleSidebar,
	} = useSidebar();

	let cssClasses = `size-7 rounded bg-gray-300 text-dark absolute z-10 hover:bg-gray-500 hover:text-dark`;
	let icon = null;

	if (isMobile) {
		cssClasses += " top-2 right-0";
		icon = <AlignJustify className="w-10" />;
	} else {
		cssClasses += " top-3 left-[2rem] hover:";
		icon = <ChevronRight className="w-10" />;

		if (state === "expanded") {
			cssClasses += " border-none left-[14rem] shadow-none";
			icon = <ChevronLeft className="w-10" />;
		}
	}

	return (
		<Button
			variant="default"
			size="icon"
			className={cssClasses + ` ${className}`}
			onClick={toggleSidebar}
		>
			{icon}
		</Button>
	);
}

export { DashSidebarTrigger };
