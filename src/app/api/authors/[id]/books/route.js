import BookRouteAuth from "@/lib/auth/route/book-route-auth";
import { createSuccessRes } from "@/lib/dto/res-dto";
import AuthorService from "@/lib/services/author-service";
import { generateErrorHttpRes } from "@/lib/utils/http";
import { checkUserAlreadyLoggedIn } from "@/lib/utils/server/auth";
import { NextResponse } from "next/server";

export async function GET(req, { params }) {
  // TODO: tambahkan validasi untuk mengecek data buku, dari file BookRouteAuth
  try {
    await BookRouteAuth.verifyCanViewList()

    const { id } = await params

    const books = await AuthorService.getBooks({ id: parseInt(id) })

    return NextResponse.json(
      createSuccessRes({
        message: `The list of books from the author_id ${id},  was successfully retrieved.`, 
        data: books
      }), 
      { status: 200 }
    )

  } catch (err) {
    console.error(err)

    const httpErr = generateErrorHttpRes(err)
    return NextResponse.json(httpErr.errRes, { status: httpErr.status })
  }
}