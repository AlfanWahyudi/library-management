'use client'

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { OctagonAlertIcon } from "lucide-react"
import { useEffect } from "react"

const titleMsgByErrorName = {
  ForbiddenError: "Forbidden",
  ActionFailedError: "Action Failed",
  Error: "Error",
  BadRequestError: "Bad Request",
  NotFoundError: "Not Found",
  UnauthorizeError: "Unauthorize",
}

export default function DashboardError({ error, reset }) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <section>
      <Alert className="border-red-200 bg-red-50 text-amber-900 rounded-lg">
        <OctagonAlertIcon  />
        <AlertTitle>{titleMsgByErrorName[error.name]}</AlertTitle>
        <AlertDescription>{error.message}</AlertDescription>
      </Alert>
    </section>
  )
}