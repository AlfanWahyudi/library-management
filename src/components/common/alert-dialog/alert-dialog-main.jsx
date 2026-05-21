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
  triggerLabel = 'Confirm',
  triggerDisabled = false,
  triggerVariant = 'default',
  onTriggerClick = (evt) => {},
  cancelLabel = 'Cancel',
  cancelVariant = 'outline',
  actionLabel = 'Oke',
  actionVariant = 'default',
  cbAfterActionClicked = async () => {},
  cbAfterCancelClicked = () => {},
  children,
}) {
  const [ open, setOpen ] = useState(false)
  const [ actionClicked, setActionClicked ] = useState(false)

  const handleActionClicked = async (evt) => {
    try {
      evt.preventDefault()
      evt.stopPropagation()

      setActionClicked(true)

      await cbAfterActionClicked() 
      
    } catch (err) {
      console.error(err)
    } finally {
      setActionClicked(false)

      setOpen(false)
    }
  }

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>
        <Button 
          variant={triggerVariant}
          onClick={onTriggerClick} 
          disabled={triggerDisabled}
        >
          {triggerLabel}
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          <AlertDialogDescription>
            {children}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel 
            asChild={true}
          >
            <Button
              onClick={() => cbAfterCancelClicked()} 
              disabled={actionClicked}
              variant={cancelVariant}
            >
              {cancelLabel}
            </Button>
          </AlertDialogCancel>
          <AlertDialogAction 
            asChild={true}
          >
            <Button 
              onClick={handleActionClicked} 
              disabled={actionClicked}
              variant={actionVariant}
            >
              {actionClicked && <Loader2Icon className="animate-spin" />} 
              {actionLabel}
            </Button>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}