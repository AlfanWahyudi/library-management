'use client'

import AlertDialogMain from "@/components/common/alert-dialog/alert-dialog-main"
import useFetch from "@/hooks/use-fetch"
import { deleteAuthor } from "@/lib/http/author-http"
import { useEffect } from "react"
import { toast } from "sonner"

export default function AuthorAlertDialogDelete({
  formType,
  author = null,
  onSuccDelete,
}) {

  const {
    error: errorDelete,
    isPending: pendingDeleted,
    runFetch: runDelete,
    fetchedData: deleted,
  } = useFetch({ initialValue: undefined })


  useEffect(() => {
    const handleSuccDelete = () => {
      if (deleted && formType === 'view') {
        const msg = 'Berhasil menghapus data pengarang'
        toast.success(msg)
        
        setTimeout(() => {
          onSuccDelete()
        }, 200)
      }
    }

    const handleFailedDelete = () => {
      if (errorDelete && formType === 'view') {
        toast.error(errorDelete)
      }
    }

    handleSuccDelete()
    handleFailedDelete()

  }, [deleted, errorDelete])

  const onDelete = async () => {
    if (formType === 'view' && author) {
      await runDelete({
        fetchFn: async() => await deleteAuthor({ id: author?.id })
      })
    }
  }

  return (
    <AlertDialogMain
      title='Hapus pengarang'
      triggerLabel='Hapus pengarang'
      triggerDisabled={pendingDeleted}
      triggerVariant='destructive'
      actionLabel="Hapus"
      actionVariant="destructive"
      cbAfterActionClicked={onDelete}
    >
      Apakah anda yakin untuk menghapus pengarang ini?
    </AlertDialogMain>
  )
}