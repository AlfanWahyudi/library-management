'use client';


import { Button } from "@/components/ui/button"
import { BookDown } from "lucide-react";
import Link from "next/link";


export default function ActionFieldBookLoan({ bookLoan }) {
  return (
   <div>
      <Button 
        type="button" 
        variant='ghost' 
        size='icon' 
        className='size-7'
        asChild={true}
      >
        <Link href={`./book-loans/${bookLoan.id}/complete`} >
          <BookDown />
        </Link>
      </Button>
   </div> 
  )
}