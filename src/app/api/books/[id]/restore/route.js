import routeHandlerAuth from "@/lib/auth/route-handler"
import BookRouteAuth from "@/lib/auth/route/book-route-auth"
import { createSuccessRes } from "@/lib/dto/res-dto"
import BookService from "@/lib/services/book-service"
import { generateErrorHttpRes } from "@/lib/utils/http"
import { NextResponse } from "next/server"

export async function PUT(req, { params }) {
  try {
    await BookRouteAuth.verifyCanRestore()

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