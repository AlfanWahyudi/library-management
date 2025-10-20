'use client';

import { useEffect, useState } from "react";
import { Sheet, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Eye, SquarePen } from "lucide-react";
import SheetContentMain from "@/components/common/sheet/sheet-content-main";
import AuthorForm from "./form";
import { Table } from "@/components/ui/table";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export default function ActionFieldAuthor({ author }) {
  const router = useRouter()

  const [ openSheet, setOpenSheet ] = useState(false)
  const [ isSuccess, setIsSuccess ] = useState(false)

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

  const handleSuccess = () => {
    setOpenSheet(false)
    setIsSuccess(true)
    router.refresh()
  }

  useEffect(() => { 
    if (isSuccess) { 
      console.log('success')
      const text = action.isEditOpen ? 'Berhasil memperbarui data pengarang' : 'Berhasil menghapus data pengarang'
      toast.success(text, {
        duration: 5000,
        action: { label: 'Tutup', onClick: () => toast.dismiss() },
      })

      setIsSuccess(false)
    }
  }, [isSuccess])

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
    </>
  )
}