'use client'

import AlertDialogMain from "@/components/common/alert-dialog/alert-dialog-main"
import useFetch from "@/hooks/use-fetch"
import { deleteViolation } from "@/lib/http/violation-http"
import { useEffect } from "react"
import { toast } from "sonner"


export default function ViolationAlertDialogDelete({
  violation = null,
  onSuccDelete
}) {

  const {
    error: errorDelete,
    isPending: pendingDeleted,
    runFetch: runDelete,
    fetchedData: deleted,
  } = useFetch({ initialValue: false })

  useEffect(() => {
    const handleSuccDelete = () => {
      if (deleted) {
        const msg = 'Berhasil menghapus data pelanggaran'
        toast.success(msg)
        
        setTimeout(() => {
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
    if (violation) {
      await runDelete({
        fetchFn: async() => await deleteViolation({ id: violation?.id })
      })
    }
  }

  return (
    <AlertDialogMain
      title='Hapus pelanggaran'
      triggerLabel="Hapus pelanggaran"
      triggerDisabled={pendingDeleted}
      triggerVariant="destructive"
      actionLabel="Hapus"
      actionVariant="destructive"
      cbAfterActionClicked={onDelete}
    >
      Apakah anda yaking untuk menghapus data pelanggaran ini?
    </AlertDialogMain>
  )
}