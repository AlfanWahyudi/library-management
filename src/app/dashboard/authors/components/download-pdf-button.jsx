'use client'

import useFetch from "@/hooks/use-fetch"
import { Button } from "@/components/ui/button"
import { downloadPdfAuthorAll } from "@/lib/http/author-http"
import { Loader2Icon } from "lucide-react"

export default function DownloadPdfButton({}) {
  const {
    error,
    isPending,
    runFetch,
  } = useFetch({ initialValue: undefined })


  const handleDownload = async () => {
    await runFetch({
      fetchFn: async() => await downloadPdfAuthorAll(),
      onSuccess: (fetchedData) => {
        console.log(fetchedData)
        //TODO: buat util function untuk trigger download nya
        // 4. Create a temporary link and trigger the download
        const url = window.URL.createObjectURL(fetchedData.blobData);
        const a = document.createElement("a");
        a.href = url;
        a.download = fetchedData.filename;
        document.body.appendChild(a);
        a.click();

        // 5. Cleanup
        a.remove();
        window.URL.revokeObjectURL(url);
      },
      onError: () => {
        //TODO
      }
    })
  }

  return (
    <Button variant='outline' size='sm' onClick={handleDownload} disabled={isPending}>
      {isPending && <Loader2Icon className="animate-spin" />}
      {isPending ? 'Downloading...' : 'Download PDF'}
    </Button>
  )
}