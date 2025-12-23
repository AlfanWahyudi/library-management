'use client'

import { AlertDialogAction } from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"
import { Loader2Icon } from "lucide-react"

export default function ButtonAlertDialogAction({
  label = 'Oke',
  variant = 'default',
  handleAfterClick,
  onDialogOpenChange,
  onActionClicked,
  actionClicked = false,
  children,
  ...props
}) {
  const handleBtnClick = async (evt) => {
    try {
      evt.preventDefault()
      evt.stopPropagation()

      onActionClicked(true)

      await handleAfterClick() 
      
    } catch (err) {
      console.error(err)
    } finally {
      onActionClicked(false)
      onDialogOpenChange(false)
    }
  }

  return(
    <AlertDialogAction 
      asChild={true}
    >
      <Button 
        onClick={handleBtnClick} 
        variant={variant}
        disabled={actionClicked}
        {...props}
      >
        {actionClicked && <Loader2Icon className="animate-spin" />} 
        {children}
      </Button>
    </AlertDialogAction>
  )
}