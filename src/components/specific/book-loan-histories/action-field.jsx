'use client';


import { Button } from "@/components/ui/button"
import { Eye } from "lucide-react";
import Link from "next/link";


export default function ActionFieldBookLoanHist({ bookLoanHist }) {
  return (
   <div>
      <Button 
        type="button" 
        variant='ghost' 
        size='icon' 
        className='size-7'
        asChild={true}
      >
        <Link href={`./book-loan-histories/${bookLoanHist.id}`} >
          <Eye />
        </Link>
      </Button>
   </div> 
  )
}