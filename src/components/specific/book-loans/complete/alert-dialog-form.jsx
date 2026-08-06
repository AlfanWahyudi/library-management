'use client'

import AlertDialogMain from "@/components/common/alert-dialog/alert-dialog-main"
import useFetch from "@/hooks/use-fetch"
import { completingBookLoan, saveBookLoan } from "@/lib/http/book-loan-http"
import { useEffect } from "react"
import { toast } from "sonner"

export default function BookLoanCompleteAlertDialogForm({
  bookLoan,
  form,
  onSuccSubmit,
}) {
  const desc = 'Apakah Anda yakin untuk menyelesaikan peminjaman buku ini?'

  const {
    error: errorSaved,
    isPending: pendingSaved,
    runFetch: runCompletingBookLoan,
    fetchedData: saved,
    reset
  } = useFetch({ initialValue: undefined })

  const disableSubmitBtn = pendingSaved || !form.formState.isValid

  useEffect(() => {
    let timeout = null

    const handleSuccAction = () => {
      let msg =  ''
      
      if (saved) {
        msg = `Buku "${bookLoan.book.title}" telah selesai dipinjam`
      }

      if (msg !== '') {
        toast.success(msg)
        
        timeout = setTimeout(() => {
          reset()
          onSuccSubmit()
        }, 200)
      }
    }

    const handleErrAction = () => {
      if (errorSaved !== '') {
        toast.error(errorSaved)
      }
    }

    handleSuccAction()
    handleErrAction()

    if (timeout) {
      return () => clearTimeout(timeout)
    }

  }, [saved, errorSaved])

  const onTrigger = (evt) => {
    form.trigger()

    if (!form.formState.isValid) {
      evt.preventDefault()
    }
  }
  
  const onSubmit = async () => {
    const data = form.getValues()

    await runCompletingBookLoan({ 
      fetchFn: async() => await completingBookLoan({ id: bookLoan.id, data })
    })
  }

  return (
    <AlertDialogMain
      title='Penyelesaian pinjaman buku'
      triggerLabel='Selesai'
      triggerDisabled={disableSubmitBtn}
      onTriggerClick={onTrigger}
      actionLabel="Selesai"
      cbAfterActionClicked={onSubmit}
    >
      {desc}
    </AlertDialogMain>
  )
}