"use client"

import { Button } from "@/components/ui/button"
import { useSidebar } from "@/components/ui/sidebar"
import { AlignJustify, AlignJustifyIcon, PanelLeftCloseIcon, PanelLeftOpen, PanelLeftOpenIcon } from "lucide-react"

function DashboardTrigger({ className }) {
  const { 
    state,
    open,
    setOpen,
    openMobile,
    setOpenMobile,
    isMobile,
    toggleSidebar,
  } = useSidebar()

  let cssClasses = `size-10 absolute z-10`
  let icon = null

  if (isMobile) {
    cssClasses += ' top-2 right-0'
    icon = <AlignJustify className="w-10" />
  } else  {
    cssClasses += ' top-4 left-[-1rem]'
    icon = <PanelLeftOpen className="w-10" />

    if (state === "expanded") {
      icon = <PanelLeftCloseIcon className="w-10" />
    }
  }

  return (
    <Button 
      variant="ghost" 
      size="icon" 
      className={cssClasses + ` ${className}`} 
      onClick={toggleSidebar}
    >
      {icon}
    </Button>
  )
}

export { DashboardTrigger }