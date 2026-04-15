import BookLoanReturnBreadcrumb from "@/components/specific/book-loans/return/breadcrumb";
import ContentHead from "@/components/specific/content-head";
import { Card, CardAction, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default async function BookLoanReturnPage({ params }) {
  const { id } = await params

  //TODO: get data book loan to display member, book and loan data

  return(
    <>
      <h1 className="sr-only">Halaman Pengembalian Buku Pinjaman</h1>
      <BookLoanReturnBreadcrumb />
      <ContentHead pageTitle='Pengembalian Buku Pinjaman'></ContentHead>
      {/* TODO: main content */}
      <section className="grid grid-rows-3 lg:grid-rows-2 lg:grid-cols-[1fr_40%] gap-5">
        <Card className="lg:row-start-1 shadow-xs">
          <CardHeader>
            <CardTitle>Anggota</CardTitle>
            <CardAction>See More</CardAction>
          </CardHeader>
          <CardContent>
            <p>Konten Anggota</p>
          </CardContent>
        </Card>
        <Card className="lg:row-start-2 shadow-xs">
          <CardHeader>
            <CardTitle>Buku</CardTitle>
            <CardAction>See More</CardAction>
          </CardHeader>
          <CardContent>
            <p>Konten Buku</p>
          </CardContent>
        </Card>
        <Card className="lg:row-start-1 lg:col-start-2 shadow-xs">
          <CardHeader>
            <CardTitle>Pengembalian</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Konten Pengembalian</p>
          </CardContent>
        </Card>
      </section>
    </>
  )
}