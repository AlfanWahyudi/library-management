'use client';

import { SheetContent } from "@/components/ui/sheet";

export default function SheetContentMain({ children }) {
  return (
    <SheetContent className="w-[400px] sm:max-w-full sm:w-lg">
      {children}
    </SheetContent>
  )
}