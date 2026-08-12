import routeHandlerAuth from "@/lib/auth/route-handler"
import { createSuccessRes } from "@/lib/dto/res-dto"
import { bookServerSchema } from "@/lib/schemas/book/book-server-schema"
import BookService from "@/lib/services/book-service"
import { generateErrorHttpRes } from "@/lib/utils/http"
import { checkUserAlreadyLoggedIn } from "@/lib/utils/server/auth"
import { NextResponse } from "next/server"

export async function PUT(req, { params }) {
  // TODO: permission intuk route handler ini tambah di DB
  try {
    await routeHandlerAuth.verifySession()

    const { id } = await params

    const book = await BookService.restore({ id: parseInt(id) })

    return NextResponse.json(
      createSuccessRes({
        message: 'Book successfully restored, id: ' + id,
        data: book
      })
    )

  } catch (err) {
    console.error(err)
    
    const httpErr = generateErrorHttpRes(err)
    return NextResponse.json(httpErr.errRes, { status: httpErr.status })
  }
}