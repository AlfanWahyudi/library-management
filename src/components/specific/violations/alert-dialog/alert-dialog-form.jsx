'use client'

import AlertDialogMain from "@/components/common/alert-dialog/alert-dialog-main"
import useFetch from "@/hooks/use-fetch"
import { saveViolation } from "@/lib/http/violation-http"
import { useEffect } from "react"
import { toast } from "sonner"

export default function ViolationAlertDialogForm({
  form,
  violation = null,
  onSuccSubmit,
  formTitle,
  formType = 'create'
}) {
  const desc = formType === 'create'
    ? 'Apakah Anda yakin untuk simpan data pelanggaran baru?'
    : formType === 'update'
      ? 'Apakah Anda yakin untuk update data pelanggaran?'
      : ''

  const {
    error: errorSaved,
    isPending: pendingSaved,
    runFetch: runSaveViolation,
    fetchedData: saved,
    reset
  } = useFetch({ initialValue: undefined })

  const disableSubmitBtn = pendingSaved || !form.formState.isDirty || !form.formState.isValid

  
  useEffect(() => {
    const handleSuccAction = () => {
      let msg =  ''
      
      if (saved && formType === 'create') {
        msg = 'Berhasil menambahkan data pelanggaran'
      }

      if (saved && formType === 'update') {
        msg = 'Berhasil memperbarui data pelanggaran'  
      }
  
      if (msg !== '') {
        toast.success(msg)
        
        setTimeout(() => {
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

  }, [saved, errorSaved])


  const onTrigger = (evt) => {
    form.trigger()

    if (!form.formState.isValid) {
      evt.preventDefault()
    }
  }

  const mapData = ({ title, description, level }) => {
    return {
      title: title.trim(),
      level: level.trim(),
      description: description.trim(),
    }
  }

  const onSubmit = async () => {
    const id = violation !== null ? violation.id : null

    const data = form.getValues()
    const dataMapped = mapData(data)

    await runSaveViolation({ 
      fetchFn: async() => await saveViolation({ data: dataMapped, id })
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