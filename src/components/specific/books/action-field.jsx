'use client';

import { Button } from "@/components/ui/button";
import { Eye, SquarePen, Trash } from "lucide-react";
import Link from "next/link";

export default function ActionFieldBook({ book, showUpdateBtn = true }) {
  return (
   <div>
      <Button 
        type="button" 
        variant='ghost' 
        size='icon' 
        className='size-7'
        asChild={true}
      >
        <Link href={`./books/${book.id}`} >
          <Eye />
        </Link>
      </Button>
      {showUpdateBtn && (
        <Button 
          type="button" 
          variant='ghost' 
          size='icon' 
          className='size-7'
          asChild={true}
        >
          <Link href={`./books/${book.id}/update`}>
            <SquarePen />
          </Link>
        </Button>
      )}
   </div> 
  )
}