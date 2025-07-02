"use client";

import { Button } from "@/components/ui/button";
import { useSidebar } from "@/components/ui/sidebar";
import {
	AlignJustify,
	AlignJustifyIcon,
	ChevronLeft,
	ChevronRight,
	PanelLeftCloseIcon,
	PanelLeftOpen,
	PanelLeftOpenIcon,
} from "lucide-react";

function DashboardTrigger({ className }) {
	const {
		state,
		open,
		setOpen,
		openMobile,
		setOpenMobile,
		isMobile,
		toggleSidebar,
	} = useSidebar();

	let cssClasses = `size-7 rounded bg-sidebar text-dark absolute z-10 hover:bg-white hover:text-dark`;
	let icon = null;

	if (isMobile) {
		cssClasses += " top-2 right-0";
		icon = <AlignJustify className="w-10" />;
	} else {
		cssClasses += " top-3 left-[-1rem] hover:";
		icon = <ChevronRight className="w-10" />;

		if (state === "expanded") {
			cssClasses += " border-none shadow-none left-[-2.5rem]";
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

export { DashboardTrigger };
