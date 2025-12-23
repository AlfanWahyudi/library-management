'use client'

import ButtonAlertDialogAction from "@/components/common/button/alert-dialog/button-alert-dialog-action"
import ButtonAlertDialogCancel from "@/components/common/button/alert-dialog/button-alert-dialog-cancel"
import ButtonAlertDialogTrigger from "@/components/common/button/alert-dialog/button-alert-dialog-trigger"
import { AlertDialog, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog"
import { useState } from "react"

export default function MemberAlertDialogForm({
  formType = 'create',
  triggerDisabled = false,
  onTrigger,
  onSubmit,
}) {
  const title = formType === 'create'
    ? 'Tambah Anggota'
    : formType === 'update'
      ? 'Update Anggota'
      : 'Dialog Title'

  const desc = formType === 'create'
    ? 'Apakah Anda yakin untuk simpan data anggota baru'
    : formType === 'update'
      ? 'Apakah Anda yakin untuk update data anggota'
      : 'Dialog Description'

  const [ open, setOpen ] = useState(false)
  const [ actionClicked, setActionClicked ] = useState(false)

  const handleAction = async () => {
    await onSubmit()
  }

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <ButtonAlertDialogTrigger 
        onTriggerClick={onTrigger}
        disabled={triggerDisabled}
      >
        Simpan
      </ButtonAlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          <AlertDialogDescription>{desc}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <ButtonAlertDialogCancel 
            actionClicked={actionClicked}
          >
            Cancel
          </ButtonAlertDialogCancel>
          <ButtonAlertDialogAction 
            actionClicked={actionClicked}
            onActionClicked={(val) => { setActionClicked(val) }}
            handleAfterClick={handleAction}
            onDialogOpenChange={(val) => { setOpen(val) }}
          >
            Simpan
          </ButtonAlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}