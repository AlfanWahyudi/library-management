import { createSuccessRes } from "@/lib/dto/res-dto"
import { authorServerSchema } from "@/lib/schemas/author/author-server-schema"
import AuthorService from "@/lib/services/author-service"
import { generateErrorHttpRes } from "@/lib/utils/http"
import { checkUserAlreadyLoggedIn } from "@/lib/utils/server/auth"
import { NextResponse } from "next/server"

export async function PUT(req, { params }) {
  try {
    await checkUserAlreadyLoggedIn()

    const { id } = await params
    const body = await req.json()
    const parsed = authorServerSchema.parse(body)

    const author = await AuthorService.save({ id, ...parsed })

    return NextResponse.json(
      createSuccessRes({
        message: 'Author successfully updated, id: ' + id,
        data: author
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
    await checkUserAlreadyLoggedIn()

    const { id } = await params

    const author = await AuthorService.delete({ id: parseInt(id)})

    return NextResponse.json(
      createSuccessRes({
        message: 'Author successfully deleted, id: ' + id,
        data: author
      })
    )

  } catch (err) {
    console.error(err)
    
    const httpErr = generateErrorHttpRes(err)
    return NextResponse.json(httpErr.errRes, { status: httpErr.status })
  }
}