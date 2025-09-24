'use client'

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogCancel,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"
import { Loader2Icon } from "lucide-react"
import { useState } from "react"

export default function AlertDialogMain({
  title,
  triggerLabel,
  actionLabel = 'Oke',
  cancelLabel = 'Cancel',
  cbAfterActionClicked = async () => {},
  cbAfterCancelClicked = () => {},
  children,
}) {
  const [open, setOpen] = useState(false)
  const [ actionClicked, setActionClicked ] = useState(false)

  const handleActionClicked = async () => {
    setActionClicked(true)

    await cbAfterActionClicked()

    setActionClicked(false)
    setOpen(false)
  }

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>
        <Button variant="outline">{triggerLabel}</Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          <AlertDialogDescription>
            {children}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={() => cbAfterCancelClicked()} disabled={actionClicked}>
            {cancelLabel}
            </AlertDialogCancel>
          <AlertDialogAction onClick={handleActionClicked} disabled={actionClicked}>
            {actionClicked && <Loader2Icon className="animate-spin" />} 
            {actionLabel}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}