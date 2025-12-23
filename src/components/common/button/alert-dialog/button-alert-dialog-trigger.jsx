'use client'

import { Button } from "@/components/ui/button"
import { AlertDialogTrigger } from "@radix-ui/react-alert-dialog"

export default function ButtonAlertDialogTrigger({
  onTriggerClick = (evt) => {},
  variant = 'default',
  children,
  ...props
}) {
  return(
    <AlertDialogTrigger asChild>
      <Button variant={variant} onClick={onTriggerClick} {...props}>
        {children}
      </Button>
    </AlertDialogTrigger>
  )
}