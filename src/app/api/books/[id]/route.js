import BookRouteAuth from "@/lib/auth/route/book-route-auth"
import { createSuccessRes } from "@/lib/dto/res-dto"
import { bookServerSchema } from "@/lib/schemas/book/book-server-schema"
import BookService from "@/lib/services/book-service"
import { generateErrorHttpRes } from "@/lib/utils/http"
import { checkUserAlreadyLoggedIn } from "@/lib/utils/server/auth"
import { NextResponse } from "next/server"


export async function GET(req, { params }) {
  try {
    await BookRouteAuth.verifyCanView()

    const { id } = await params

    const book = await BookService.findById({ id: parseInt(id)})

    return NextResponse.json(
      createSuccessRes({
        message: 'Book successfully retrieved, id: ' + id,
        data: book
      })
    )

  } catch (err) {
    console.error(err)
    
    const httpErr = generateErrorHttpRes(err)
    return NextResponse.json(httpErr.errRes, { status: httpErr.status })
  }
}

export async function PUT(req, { params }) {
  try {
    await BookRouteAuth.verifyCanUpdate()

    const { id } = await params
    const body = await req.json()
    const parsed = bookServerSchema.parse(body)

    const book = await BookService.update({ id: parseInt(id), ...parsed })

    return NextResponse.json(
      createSuccessRes({
        message: 'Book successfully updated, id: ' + id,
        data: book
      })
    )

  } catch (err) {
    console.error(err)
    
    const httpErr = generateErrorHttpRes(err)
    return NextResponse.json(httpErr.errRes, { status: httpErr.status })
  }
}

export async function DELETE(req, { params }) {
  try {
    await BookRouteAuth.verifyCanDelete()

    const { id } = await params

    const book = await BookService.delete({ id: parseInt(id)})

    return NextResponse.json(
      createSuccessRes({
        message: 'Book successfully deleted, id: ' + id,
        data: book
      })
    )

  } catch (err) {
    console.error(err)
    
    const httpErr = generateErrorHttpRes(err)
    return NextResponse.json(httpErr.errRes, { status: httpErr.status })
  }
}