'use client'

import AlertDialogMain from "@/components/common/alert-dialog/alert-dialog-main"
import useFetch from "@/hooks/use-fetch"
import { updateProfile } from "@/lib/http/user-http"
import { useEffect } from "react"
import { toast } from "sonner"

export default function UserProfileAlertDialogForm({
  form,
  onSuccSubmit,
}) {
  const {
    error,
    isPending,
    runFetch,
    fetchedData: user,
    reset,
  } = useFetch({ initialValue: undefined })

  const disableSubmitBtn = isPending || !form.formState.isDirty || !form.formState.isValid

  useEffect(() => {
    if (user) {
      toast.success('Berhasil update data profile')

      setTimeout(() => {
        reset()
        onSuccSubmit()
      }, 200)
    }

    if (error) {
      toast.error(error)
    }
  }, [user, error])

  const mapData = ({ username, fullName, email, gender, address }) => {
    return {
      username,
      email,
      gender,
      fullName: fullName.trim(),
      address: address.trim(),
    }
  }

  const onSubmit = async () => {
    const data = form.getValues()
    const dataMapped = mapData(data)

    await runFetch({
      fetchFn: async() => await updateProfile(dataMapped)
    })
  }
  
  return (
    <AlertDialogMain
      title='Update Profile'
      triggerLabel='Simpan Perubahan'
      triggerDisabled={disableSubmitBtn}
      actionLabel="Simpan"
      cbAfterActionClicked={onSubmit}
    >
      Apakah Anda yakin untuk update data profile ini?
    </AlertDialogMain>
  )
}