'use client'

import AlertDialogMain from "@/components/common/alert-dialog/alert-dialog-main"
import useFetch from "@/hooks/use-fetch"
import { saveMember } from "@/lib/http/member-http"
import { formatDate } from "@/lib/utils/date"
import { useEffect } from "react"
import { toast } from "sonner"

export default function MemberAlertDialogForm({
  form,
  member = null,
  onSuccSubmit,
  formTitle,
  formType = 'create'
}) {
  const desc = formType === 'create'
    ? 'Apakah Anda yakin untuk simpan data anggota baru?'
    : formType === 'update'
      ? 'Apakah Anda yakin untuk update data anggota?'
      : 'Form Anggota'

  const {
    error: errorSaved,
    runFetch: runSaveMember,
    isPending: pendingSaved,
    fetchedData: saved,
    reset
  } = useFetch({ initialValue: undefined })

  const disableSubmitBtn = pendingSaved ||!form.formState.isDirty || !form.formState.isValid

  useEffect(() => {
    const handleSuccAction = () => {
      let msg =  ''
      
      if (saved && formType === 'create') {
        msg = 'Berhasil menambahkan data pengarang'
      }

      if (saved && formType === 'update') {
        msg = 'Berhasil memperbarui data pengarang'  
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

  const mapData = ({ fullName, email, phone, address, birthDate, gender }) => {
    return {
      email,
      phone,
      gender,
      fullName: fullName.trim(),
      address: address.trim(),
      birthDate: formatDate({ date: birthDate }),
    }
  }

  const onTrigger = (evt) => {
    form.trigger()

    if (!form.formState.isValid) {
      evt.preventDefault()
    }
  }

  const onSubmit = async () => {
    if (form.formState.isValid) {
      const id = member ? member.id : null

      const data = form.getValues()
      console.log(data)
      const mappedData = mapData(data)

      await runSaveMember({
        fetchFn: async () => await saveMember({ data: mappedData, id })
      })
    }
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