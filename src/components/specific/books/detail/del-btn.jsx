'use client';

import { ROUTE } from "@/lib/constants/route";
import ButtonDisableDesc from "@/components/common/button/button-disable-desc";
import { useRouter } from "next/navigation";
import BookAlertDialogDelete from "../alert-dialog/alert-dialog-delete";


export default function BookDetailDelBtn({ bookId, canDataDeleted = false }) {
  const router = useRouter()

  const onSuccDelete = () => {
    router.push(ROUTE.BOOKS.url)
  }

  return canDataDeleted
    ? (
      <BookAlertDialogDelete 
        bookId={bookId}
        onSuccDelete={onSuccDelete}
      />
    )
    : (
      <ButtonDisableDesc
        desc="Tidak dapat dihapus, data buku sedang dipinjam"
        variant="destructive"
        labelClasses="text-destructive"
      >
        Hapus Buku
      </ButtonDisableDesc>
    )
}

