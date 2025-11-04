'use client';

import { act, useContext, useEffect, useState } from "react";
import { Sheet, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Eye, SquarePen } from "lucide-react";
import SheetContentMain from "@/components/common/sheet/sheet-content-main";
import AuthorForm from "./form";
import { Table } from "@/components/ui/table";
import { DataTableContext } from "@/store/data-table-context";
import useFetch from "@/hooks/use-fetch";
import AuthorBookTable from "./author-book-table";
import { getBooksByAuthorId } from "@/lib/http/author-http";

export default function ActionFieldAuthor({ author }) {
  const { refreshTable }  = useContext(DataTableContext)

  const [ openSheet, setOpenSheet ] = useState(false)
  const [action, setAction ] = useState({
    isViewOpen: false,
    isEditOpen: false,
  })


  const {
    runFetch: fetchingBookItems,
    isPending: isBookItemsPending,
    error: errorBookItems,
    fetchedData: bookItems,
    reset: resetBookItems
  } = useFetch({ initialValue: null })

  const handleOpenSheet = (action) => {
    if (action == 'view') {
      setAction({
        isViewOpen: true,
        isEditOpen: false,
      })
    }

    if (action === 'edit') {
      setAction({
        isViewOpen: false,
        isEditOpen: true,
      })
    }

    setOpenSheet(true)
  }

  const handleSuccess = () => {
    setOpenSheet(false)
    refreshTable()
  }

  useEffect(() => {
    const runningFetch = async () => {
      if (action.isViewOpen) {
        await fetchingBookItems({
          fetchFn: async () => await getBooksByAuthorId({ id: author.id })
        })
      } else {
        resetBookItems()
      }
    }

    runningFetch()
  }, [action])

  return (
    <>
      <Sheet open={openSheet} onOpenChange={setOpenSheet}>
        <div className="flex justify-center">
          <SheetTrigger asChild>
            <Button 
              type="button" 
              variant='ghost' 
              size='icon' 
              className='size-7'
              onClick={() => handleOpenSheet('view')}
            >
              <Eye />
            </Button>
          </SheetTrigger>
          <SheetTrigger asChild>
            <Button 
              type="button" 
              variant='ghost' 
              size='icon' 
              className='size-7'
              onClick={() => handleOpenSheet('edit')}
            >
              <SquarePen />
            </Button>
          </SheetTrigger>
        </div>
        <SheetContentMain
          preventPointerDownOutside={action.isEditOpen}
        >
          <AuthorForm 
            openForm={openSheet} 
            cbSuccess={handleSuccess}
            author={author} 
            viewOnly={action.isViewOpen} 
          >
            {action.isViewOpen && (
              <div className="grid gap-3">
                <h2 className="font-medium">Daftar Buku</h2>
                {errorBookItems && <p>Error mengambil daftar buku yang dimiliki pengarang ini</p>}
                {bookItems && <AuthorBookTable bookItems={bookItems} />}
              </div>
            )}
          </AuthorForm>

        </SheetContentMain>
      </Sheet>
    </>
  )
}