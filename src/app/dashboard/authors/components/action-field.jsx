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

  const [state, setState ] = useState({
    isViewOpen: false,
    isEditOpen: false,
  })

  const title = state.isViewOpen ? author.fullName : 'Update pengarang'

  const handleOpenSheet = (action) => {
    if (action == 'view') {
      setState({
        isViewOpen: true,
        isEditOpen: false,
      })
    }

    if (action === 'edit') {
      setState({
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
          viewOnly={state.isViewOpen} 
          title={title}
        >
          {/* //TODO: Display and list of book that author have */}
          {state.isViewOpen && (
            <Table>

            </Table>
          )}
        </AuthorForm>

      </SheetContentMain>
    </Sheet>
  )
}