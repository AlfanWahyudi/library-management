import { Button } from "@/components/ui/button";
import { PlusIcon } from "lucide-react";

import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import BookBreadcrumb from "./components/breadcrumb";


export default function BookPage({}) {
  // check permission untuk akses halaman ini
  // redirect ke error page karena tidak memiliki izin buka halaman ini

  // get data dari service class (business logic)

  // simpan data ke setiap component

  // jangan lupa hide jika tidak punya permission. pada semua komponen action di halaman ini

  return (
    <>
      <BookBreadcrumb />
      <section className="flex align-middle">
        {/* for header section */}
        <div className="flex-1 flex items-center">
          <h2 className="text-xl font-bold">Daftar Buku</h2>
        </div>
        <div className="flex-1 flex">
          <Button className="ml-auto" size="sm">
            <PlusIcon /> Tambah Buku
          </Button>
        </div>
      </section>

      <div>
        <div className="flex gap-5">
          <Button variant="secondary">
            Secondary
          </Button>
          <Button>Primary</Button>
        </div>
        <br />
        <br />
        <br />
        <Button variant="destructive">
          Destructive
        </Button>
        <br />
        <br />
        <Button disabled>
          Destructive
        </Button>
        <br />
        <br />
        <Card className="w-150">
          <CardHeader>
            <CardTitle>Card Title</CardTitle>
            <CardDescription>Card Description</CardDescription>
            <CardAction>Card Action</CardAction>
          </CardHeader>
          <CardContent>
            <p>Card Content</p>
          </CardContent>
          <CardFooter>
            <p>Card Footer</p>
          </CardFooter>
        </Card>
        <br />
        <br />
        <br />
        <br />

        <Popover>
          <PopoverTrigger>
            <Button variant="outline">Open popover</Button>
          </PopoverTrigger>
          <PopoverContent>Place content for the popover here.</PopoverContent>
        </Popover>

      </div>
      <section>
        <article>
          {/* modifying table like searching, filtering or even exporting */}
        </article>
        <table>
          {/* data-table */}
        </table>
      </section>
    </>
  )
}