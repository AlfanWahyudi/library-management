'use client'

import { CircleAlert, CircleCheck, CircleX, Info, X } from "lucide-react";
import { Alert, AlertTitle, AlertDescription } from "./ui/alert"
import { Button } from "./ui/button";
import { useRef, useState } from "react";

export default function AlertMain({ variant = 'info', title, children }) {
  const alertBlockRef = useRef(null)

  let alertIcon = null
  let titleClasses = ''

  switch (variant) {
    case 'info':
      alertIcon = <Info className="stroke-blue-600"></Info>
      titleClasses += 'text-blue-600'
      break;
    case 'warning':
      alertIcon = <CircleAlert className="stroke-yellow-600"></CircleAlert>
      titleClasses += 'text-yellow-600'
        break;
    case 'error':
      alertIcon = <CircleX className="stroke-red-600"></CircleX>
      titleClasses += 'text-red-600'
      break;
    case 'success':
      alertIcon = <CircleCheck className="stroke-green-600"></CircleCheck>
      titleClasses += 'text-green-600'
      break;
  }

  const handleCloseAlert = ( ) => {
    alertBlockRef.current.style.display = 'none'
  }

  return (
    <Alert ref={alertBlockRef}>
      {alertIcon}
      <AlertTitle>
        <p className={titleClasses}>{title}</p>
      </AlertTitle>
      {children && (
        <AlertDescription>
          {children}
        </AlertDescription>
      )}
      <Button 
        type="button" 
        variant='ghost'
        size="icon" 
        className="hover:bg-transparent p-0 text-gray-600 size-5 row-start-1 col-start-3"
        onClick={handleCloseAlert}
      >
        <X className="size-4" />
      </Button>
    </Alert>
  )

}