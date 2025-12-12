'use client';

import { Button } from "@/components/ui/button";
import { Eye, SquarePen, Trash } from "lucide-react";


// TODO
export default function ActionFieldMember({ member }) {
  return (
   <div>
      <Button 
        type="button" 
        variant='ghost' 
        size='icon' 
        className='size-7'
        onClick={() => {}}
      >
        <Eye />
      </Button>
      <Button 
        type="button" 
        variant='ghost' 
        size='icon' 
        className='size-7'
        onClick={() => {}}
      >
        <SquarePen />
      </Button>
      <Button 
        type="button" 
        variant='ghost' 
        size='icon' 
        className='size-7'
        onClick={() => {}}
      >
        <Trash />
      </Button>
   </div> 
  )
}