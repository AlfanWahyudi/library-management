'use client'

import { Sheet, SheetTrigger } from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import AuthorForm from "./form";
import SheetContentMain from "@/components/common/sheet/sheet-content-main";
import { toast } from "sonner";

//TODO: Jangan tutup mmodal nya ketika click diluar modal component. close modal nya hanya dengan click tombol "tutup dan X"
export default function SaveSheetAuthor({
}) {
  const router = useRouter()

  const [ isSuccess, setIsSuccess ] = useState(false)
  const [ openForm, setOpenForm ] = useState(false)

  function handleSuccess() {
    setOpenForm(false)
    setIsSuccess(true)
    router.refresh()
  }

  useEffect(() => { 
    if (isSuccess) { 
      console.log('success')
      toast.success('Berhasil menambahkan data pengarang', {
        duration: 5000,
        action: { label: 'Tutup', onClick: () => toast.dismiss() },
      })

      setIsSuccess(false)
    }
  }, [isSuccess])

  return (
    <>
      <Sheet open={openForm} onOpenChange={setOpenForm}>
        <SheetTrigger asChild>
          <Button size='sm'>Tambah pengarang</Button>
        </SheetTrigger>
        <SheetContentMain>
          <AuthorForm 
            openForm={openForm}
            cbSuccess={handleSuccess}
            title='Tambah pengarang'
          />
        </SheetContentMain>
      </Sheet>
    </>
  )
}