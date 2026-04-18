import InfoItem from "@/components/common/info-item";
import TitlePage from "@/components/common/title-page";
import BookLoanReturnBreadcrumb from "@/components/specific/book-loans/return/breadcrumb";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default async function BookLoanReturnPage({ params }) {
  const { id } = await params

  //TODO: get data book loan to display member, book and loan data

  //TODO: Jalankan fungsi pengembalaian
  //TODO: Rapihkan tampilan -> layout, color, font size, dll. (responsive)
  return(
    <>
      <h1 className="sr-only">Halaman Pengembalian Buku Pinjaman</h1>
      <BookLoanReturnBreadcrumb />
      <section className="flex justify-center">
        <section className="grow max-w-4xl flex flex-col mt-2">
          <TitlePage>Pengembalian Buku Pinjaman</TitlePage>
          <section className="flex flex-col gap-5 mb-5">
            <Card className="shadow-xs">
              <CardHeader>
                <CardTitle>Anggota</CardTitle>
              </CardHeader>
              <CardContent className="flex flex-col gap-3">
                <InfoItem title="Nama Lengkap">
                  <p>Lorem ipsum dolor</p>
                </InfoItem>
                <InfoItem title="Email">
                  <p>contoh@tmail.com</p>
                </InfoItem>
                <InfoItem title="Tanggal Lahir">
                  <p>12 Maret 2000</p>
                </InfoItem>
                <InfoItem title="Jenis Kelamin">
                  <p>Laki-Laki</p>
                </InfoItem>
                <InfoItem title="No Telepon">
                  <p>08543333113533</p>
                </InfoItem>
                <InfoItem title="Alamat">
                  <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Excepturi dolor soluta, ratione suscipit eligendi perspiciatis reiciendis tenetur. Iure inventore culpa voluptates cumque nesciunt consequuntur hic?</p>
                </InfoItem>
              </CardContent>
            </Card>
            <Card className="shadow-xs">
              <CardHeader>
                <CardTitle>Buku</CardTitle>
              </CardHeader>
              <CardContent className="flex flex-col gap-3">
                <InfoItem title="Judul">
                  <p>Lorem ipsum</p>
                </InfoItem>
                <InfoItem title="Sub Judul">
                  <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Veniam, sed!</p>
                </InfoItem>
                <InfoItem title="ISBN">
                  <p>1111114444411144</p>
                </InfoItem>
                <InfoItem title="Pengarang">
                  <p className="inline-flex gap-2">
                    <Badge variant="secondary">Greg McKeown</Badge>
                    <Badge variant="secondary">Alice Monroe</Badge>
                  </p>
                </InfoItem>
                <InfoItem title="Penerbit">
                  <p>Publisher</p>
                </InfoItem>
                <InfoItem title="Tanggal Penerbitan">
                  <p>12 Maret 2000</p>
                </InfoItem>
                <InfoItem title="Edisi">
                  <p>3</p>
                </InfoItem>
                <InfoItem title="Bahasa">
                  <p>Inggris</p>
                </InfoItem>
                <InfoItem title="Halaman">
                  <p>150</p>
                </InfoItem>
              </CardContent>
            </Card>
            <section className="flex flex-col gap-3">
              <InfoItem title="Tanggal Pinjam">
                <p>05 April 2026</p>
              </InfoItem>
              <InfoItem title="Tanggal Wajib Kembali">
                <p>12 April 2026</p>
              </InfoItem>
              <div>
                <Label className="mb-2">Tanggal Kembali</Label>
                <Input type="text" />
              </div>
              <div>
                <Label className="mb-2">Pelanggaran</Label>
                <Input type="text" />
              </div>
            </section>
            {/* <Card className="shadow-xs">
              <CardHeader>
                <CardTitle>Pengembalian</CardTitle>
              </CardHeader>
              <CardContent>
                <p>Konten Pengembalian</p>
              </CardContent>
            </Card> */}
          </section>
          <section className="flex justify-end">
            <Button>Simpan</Button>
          </section>
        </section>
      </section>
    </>
  )
}