'use client'

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { MESSAGE } from "@/lib/constants/message"
import { OctagonAlertIcon } from "lucide-react"

export default function ForbiddenErrAlert({ message = MESSAGE.FORBIDDEN_DEFAULT_ERR_IDN,  }) {
  return (
    <Alert className="border-red-200 bg-red-50 text-amber-900 rounded-lg">
      <OctagonAlertIcon  />
      <AlertTitle>Forbidden</AlertTitle>
      <AlertDescription>{message}</AlertDescription>
    </Alert>
  )
}