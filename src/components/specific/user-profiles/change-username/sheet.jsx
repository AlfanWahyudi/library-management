'use client'

import SheetContentMain from "@/components/common/sheet/sheet-content-main"
import { Button } from "@/components/ui/button"
import { Sheet, SheetTrigger } from "@/components/ui/sheet"
import { useRouter } from "next/navigation"
import { useState } from "react"
import ChangeUsernameForm from "./form"

export default function ChangeUsernameSheet({ username, disableTrigger = false }) {
  const router  = useRouter()

  const [openForm, setOpenForm] = useState(false)

  function handleSuccess() {
    router.refresh()
    
    setTimeout(() => {
      setOpenForm(false)
    }, 200)
  }

  return (
    <>
      <Sheet open={openForm} onOpenChange={setOpenForm}>
        <SheetTrigger asChild>
          <Button size='sm' disabled={disableTrigger}>Ganti Username</Button>
        </SheetTrigger>
        <SheetContentMain>
          <ChangeUsernameForm
            prevUsername={username}
            cbSuccess={handleSuccess}
          />
        </SheetContentMain>
      </Sheet>
    </>
  )
}