//TODO: adding background image

/*
  ---- Notes ----
  - An error component can use the reset() function to prompt the user to attempt to recover from the error. When executed, the function will try to re-render the error boundary's contents. If successful, the fallback error component is replaced with the result of the re-render.

*/

'use client'

import { Button } from "@/components/ui/button"
import { useEffect } from "react"

export default function RootError({ error, reset }) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error)
  }, [error])

  return (
    <html>
      <body className="overflow-x-hidden max-w-screen">
        <div className="flex flex-col items-center justify-center min-h-screen p-4 space-y-4 text-center">
          <h2 className="text-4xl font-bold">Error Membuka Halaman</h2>
          <p className="text-lg text-gray-600">Mohon untuk mencoba lagi kembali, bisa dengan menekan tombol refresh dibawah ini.</p>
          <Button
            variant='outline'
            onClick={
              // Attempt to recover by trying to re-render the segment
              () => reset()
            }
          >
            Refresh
          </Button>
        </div>
      </body>
    </html>
  )
}