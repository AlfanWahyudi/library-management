'use client'

import useFetch from "@/hooks/use-fetch"
import { Button } from "@/components/ui/button"
import { downloadPdfAuthorAll } from "@/lib/http/author-http"
import { Loader2Icon } from "lucide-react"
import { useEffect } from "react"
import { downloadBlobData } from "@/lib/utils/client/download"
import { toast } from "sonner"

export default function DownloadExcelButton({}) {
  const {
    error,
    isPending,
    runFetch,
    reset,
    fetchedData
  } = useFetch({ initialValue: undefined })

  const onSuccessFetchedData = () => {
    downloadBlobData({ blob: fetchedData.blobData, filename: fetchedData.filename })
  }

  const onErrorFetchedData = () => {
    toast.error(error)
  }

  useEffect(() => {
    if (fetchedData) {
      onSuccessFetchedData()
    }

    if (error) {
      onErrorFetchedData()
    }

  }, [fetchedData, error])

  const handleDownload = async () => {
    reset()
    await runFetch({
      fetchFn: async() => await downloadPdfAuthorAll(),
    })
  }

  return (
    <Button variant='outline' size='sm' onClick={handleDownload} disabled={isPending}>
      {isPending && <Loader2Icon className="animate-spin" />}
      {isPending ? 'Downloading...' : 'Download Excel'}
    </Button>
  )
}