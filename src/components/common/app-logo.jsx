"use client";

import {
	SquareLibrary,
} from "lucide-react";

export default function AppLogo() {
  return (
    <div className="flex gap-2 items-center w-full">
      <div className="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
        <SquareLibrary size={18} />
      </div>
      <div>
        <span className="font-semibold text-lg">Library</span>
      </div>
    </div>
  )
}