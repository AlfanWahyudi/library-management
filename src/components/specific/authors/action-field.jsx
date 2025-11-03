'use client';

import { useContext, useState } from "react";
import { Sheet, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Eye, SquarePen } from "lucide-react";
import SheetContentMain from "@/components/common/sheet/sheet-content-main";
import AuthorForm from "./form";
import { Table } from "@/components/ui/table";
import { DataTableContext } from "@/store/data-table-context";

export default function ActionFieldAuthor({ author }) {
  const { refreshTable }  = useContext(DataTableContext)

  const [ openSheet, setOpenSheet ] = useState(false)
  const [action, setAction ] = useState({
    isViewOpen: false,
    isEditOpen: false,
  })

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

  const handleSuccess = () => {
    setOpenSheet(false)
    refreshTable()
  }

  return (
    <>
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
        <SheetContentMain
          preventPointerDownOutside={action.isEditOpen}
        >
          <AuthorForm 
            openForm={openSheet} 
            cbSuccess={handleSuccess}
            author={author} 
            viewOnly={action.isViewOpen} 
          >
            {/* //TODO: Display and list of book that author have */}
            {action.isViewOpen && (
              <Table>

              </Table>
            )}
          </AuthorForm>

        </SheetContentMain>
      </Sheet>
    </>
  )
}