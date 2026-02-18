'use client'

import AlertDialogMain from "@/components/common/alert-dialog/alert-dialog-main"
import useFetch from "@/hooks/use-fetch"
import { deleteBook } from "@/lib/http/book-http"
import { useEffect } from "react"
import { toast } from "sonner"

export default function BookAlertDialogDelete({
  bookId = null,
  onSuccDelete,
}) {

  const {
    error: errorDelete,
    isPending: pendingDeleted,
    runFetch: runDelete,
    fetchedData: deleted,
    reset
  } = useFetch({ initialValue: undefined })

  useEffect(() => {
    const handleSuccDelete = () => {
      if (deleted) {
        const msg = 'Berhasil menghapus data buku'
        toast.success(msg)
        
        setTimeout(() => {
          reset()
          onSuccDelete()
        }, 200)
      }
    }

    const handleFailedDelete = () => {
      if (errorDelete) {
        toast.error(errorDelete)
      }
    }

    handleSuccDelete()
    handleFailedDelete()

  }, [deleted, errorDelete])

  const onDelete = async () => {
    if (bookId) {
      await runDelete({
        fetchFn: async() => await deleteBook({ id: bookId })
      })
    }
  }

  return (
    <AlertDialogMain
      title='Hapus buku'
      triggerLabel='Hapus buku'
      triggerDisabled={pendingDeleted}
      triggerVariant='destructive'
      actionLabel="Hapus"
      actionVariant="destructive"
      cbAfterActionClicked={onDelete}
    >
      Apakah anda yakin untuk menghapus buku ini?
    </AlertDialogMain>
  )
}