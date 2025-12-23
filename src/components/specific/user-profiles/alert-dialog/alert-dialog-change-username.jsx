'use client'

import AlertDialogMain from "@/components/common/alert-dialog/alert-dialog-main"
import useFetch from "@/hooks/use-fetch"
import { changeUsername } from "@/lib/http/user-http"
import { useEffect } from "react"
import { toast } from "sonner"

export default function UserProfileAlertDialogChangeUsername({
  form,
  formTitle,
  onSuccSubmit,
}) {
  const {
    error,
    isPending,
    runFetch,
    fetchedData: user,
    reset,
  } = useFetch({ initialValue: undefined })

  const disableSubmitBtn = isPending || !form.formState.isValid

  useEffect(() => {
    if (user) {
      toast.success('Berhasil menggati username')

      setTimeout(() => {
        reset()

        onSuccSubmit()
      }, 200)
    }

    if (error) {
      toast.error(error)
    }
  }, [user, error])

  const onSubmit = async () => {
    const data = form.getValues()

    await runFetch({
      fetchFn: async () => await changeUsername(data)
    })
  }
  
  return (
    <AlertDialogMain
      title={formTitle}
      triggerLabel='Simpan'
      triggerDisabled={disableSubmitBtn}
      actionLabel="Simpan"
      cbAfterActionClicked={onSubmit}
    >
      Apakah Anda yakin untuk mengganti username?
    </AlertDialogMain>
  )
}