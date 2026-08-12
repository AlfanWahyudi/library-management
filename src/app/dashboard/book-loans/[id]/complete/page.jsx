import InfoItem from "@/components/common/info-item";
import TitlePage from "@/components/common/title-page";
import BookLoanCompleteBreadcrumb from "@/components/specific/book-loans/complete/breadcrumb";
import BookLoanCompleteForm from "@/components/specific/book-loans/complete/form";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Auth from "@/lib/auth/auth";
import BookLoanPerm from "@/lib/auth/permission/book-loan-perm";
import BookLoanService from "@/lib/services/book-loan-service";

export default async function BookLoanCompletePage({ params }) {
  const auth = await Auth.validateSession()
  const session = auth.getSession()

  const blPerm = await BookLoanPerm.validation(session)
    .validateCompleteLoan()
    .exec()

  // TODO: rapihkan tampilan pesan validasi nya
  if (!blPerm.canCompleteLoan) {
    return "You don't have permission to access this page."
  }

  const { id } = await params

  const bookLoan = await BookLoanService.findStillLoanById(parseInt(id))

  //TODO: validate if bookLoan is not valid, display error message

  return(
    <>
      <h1 className="sr-only">Halaman Pengembalian Buku Pinjaman</h1>
      <BookLoanCompleteBreadcrumb />
      <BookLoanCompleteForm bookLoan={bookLoan} />
    </>
  )
}