'use client'

import { AlertDialogCancel } from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"

export default function ButtonAlertDialogCancel({
  onCancelClicked = () => {},
  actionClicked = false,
  variant = 'outline',
  children,
  ...props
}) {

  return (
    <AlertDialogCancel 
      asChild={true}
    >
      <Button
        onClick={() => onCancelClicked()} 
        variant={variant}
        disabled={actionClicked}
        {...props}
      >
        {children}
      </Button>
    </AlertDialogCancel>
  )
}