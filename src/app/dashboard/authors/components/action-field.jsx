'use client';

import { useState } from "react";
import { Sheet, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Eye, SquarePen } from "lucide-react";
import SheetContentMain from "@/components/sheet/sheet-content-main";
import AuthorForm from "./form";
import { Table } from "@/components/ui/table";

// TODO: Feat View, Update, dan Delete
export default function ActionFieldAuthor({ author }) {
  const [ openSheet, setOpenSheet ] = useState(false)

  const [action, setAction ] = useState({
    isViewOpen: false,
    isEditOpen: false,
  })

  const title = action.isViewOpen ? author.fullName : 'Update pengarang'

  const handleOpenSheet = (action) => {
    if (action == 'view') {
      setAction({
        isViewOpen: true,
        isEditOpen: false,
      })
    }

    if (action === 'edit') {
      setAction({
        isViewOpen: false,
        isEditOpen: true,
      })
    }

    setOpenSheet(true)
  }
  
  return (
    <Sheet open={openSheet} onOpenChange={setOpenSheet}>
      <div className="flex justify-center">
        <SheetTrigger asChild>
          <Button 
            type="button" 
            variant='ghost' 
            size='icon' 
            className='size-7'
            onClick={() => handleOpenSheet('view')}
          >
            <Eye />
          </Button>
        </SheetTrigger>
        <SheetTrigger asChild>
          <Button 
            type="button" 
            variant='ghost' 
            size='icon' 
            className='size-7'
            onClick={() => handleOpenSheet('edit')}
          >
            <SquarePen />
          </Button>
        </SheetTrigger>
      </div>
      <SheetContentMain>
        <AuthorForm 
          openForm={openSheet} 
          author={author} 
          viewOnly={action.isViewOpen} 
          title={title}
        >
          {/* //TODO: Display and list of book that author have */}
          {action.isViewOpen && (
            <Table>

            </Table>
          )}
        </AuthorForm>

      </SheetContentMain>
    </Sheet>
  )
}