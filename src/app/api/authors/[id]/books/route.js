import { createSuccessRes } from "@/lib/dto/res-dto";
import AuthorService from "@/lib/services/author-service";
import { generateErrorHttpRes } from "@/lib/utils/http";
import { NextResponse } from "next/server";

export async function GET(req, { params }) {
  try {
    const { id } = await params

    const books = await AuthorService.getBooks({ id })

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