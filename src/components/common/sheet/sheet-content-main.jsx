'use client';

import { SheetContent } from "@/components/ui/sheet";

export default function SheetContentMain({ 
  preventPointerDownOutside = false,
  children, 
  ...props 
}) {

  return (
    <SheetContent 
      className="w-[400px] sm:max-w-full sm:w-lg" 
      onPointerDownOutside={(e) => {
        if (preventPointerDownOutside) {
          e.preventDefault() // preventing event nya, jadi sheet tidak akan ke tutup
        }
      }}
      {...props}
    >
      {children}
    </SheetContent>
  )
}