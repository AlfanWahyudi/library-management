'use client'

import AlertDialogMain from "@/components/common/alert-dialog/alert-dialog-main"
import useFetch from "@/hooks/use-fetch"
import { saveBookLoan } from "@/lib/http/book-loan-http"
import { useEffect } from "react"
import { toast } from "sonner"

export default function BookLoanAlertDialogForm({
  form,
  formTitle,
  onSuccSubmit,
}) {
  const desc = 'Apakah Anda yakin untuk simpan data peminjaman buku?'

  const {
    error: errorSaved,
    isPending: pendingSaved,
    runFetch: runSaveBookLoan,
    fetchedData: saved,
    reset
  } = useFetch({ initialValue: undefined })

  const disableSubmitBtn = pendingSaved || !form.formState.isDirty || !form.formState.isValid

  useEffect(() => {
    let timeout = null

    const handleSuccAction = () => {
      let msg =  ''
      
      if (saved) {
        msg = 'Berhasil menambahkan data peminjaman buku'
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
  
  const mapData = ({ member, books }) => {
    return {
      memberId: parseInt(member.id),
      bookIds: books.map((book) => parseInt(book.val)),
    }
  }

  const onSubmit = async () => {
    const data = form.getValues()
    const dataMapped = mapData(data)

    await runSaveBookLoan({ 
      fetchFn: async() => await saveBookLoan({ data: dataMapped })
    })
  }

  return (
    <AlertDialogMain
      title={formTitle}
      triggerLabel='Simpan'
      triggerDisabled={disableSubmitBtn}
      onTriggerClick={onTrigger}
      actionLabel="Simpan"
      cbAfterActionClicked={onSubmit}
    >
      {desc}
    </AlertDialogMain>
  )
}