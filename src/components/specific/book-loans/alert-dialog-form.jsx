'use client'

import AlertDialogMain from "@/components/common/alert-dialog/alert-dialog-main"
import useFetch from "@/hooks/use-fetch"
import { useEffect } from "react"
import { toast } from "sonner"

//TODO
export default function BookLoanAlertDialogForm({
  form,
  formTitle,
  formType = 'create'
}) {
  const desc = formType === 'create'
    ? 'Apakah Anda yakin untuk simpan data peminjaman buku?'
    : formType === 'update'
      ? 'Apakah Anda yakin untuk update data peminjaman buku?'
      : ''

  const {
    error: errorSaved,
    isPending: pendingSaved,
    runFetch: runSaveAuthor,
    fetchedData: saved,
    reset
  } = useFetch({ initialValue: undefined })

  const disableSubmitBtn = pendingSaved || !form.formState.isDirty || !form.formState.isValid

  useEffect(() => {
    const handleSuccAction = () => {
      let msg =  ''
      
      if (saved && formType === 'create') {
        msg = 'Berhasil menambahkan data peminjaman buku'
      }

      if (saved && formType === 'update') {
        msg = 'Berhasil memperbarui data peminjaman buku'  
      }
  
      if (msg !== '') {
        toast.success(msg)
        
        setTimeout(() => {
          reset()
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

  }, [saved, errorSaved])


  const onTrigger = (evt) => {
    form.trigger()

    if (!form.formState.isValid) {
      evt.preventDefault()
    }
  }
  
  const mapData = ({ fullName, countryCode, activeSince, about }) => {
    return {
      countryCode,
      fullName: fullName.trim(),
      activeSince: parseInt(activeSince),
      about: about.trim()
    }
  }

  const onSubmit = async () => {
    const data = form.getValues()
    const dataMapped = mapData(data)

    // await runSaveAuthor({ 
    //   fetchFn: async() => await saveAuthor({ data: dataMapped, id })
    // })
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