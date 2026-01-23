import { createErrorRes, createSuccessRes } from "@/lib/dto/res-dto"
import { authorServerSchema } from "@/lib/schemas/author/author-server-schema"
import AuthorService from "@/lib/services/author-service"
import { generateErrorHttpRes } from "@/lib/utils/http"
import { NextResponse } from "next/server"

export async function PUT(req, { params }) {
  try {
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
    const { id } = await params
    
    await AuthorService.delete({id})

    return NextResponse.json(
      createSuccessRes({ message: 'Author successfully deleted, id: ' + id })
    )
  } catch (err) {
    console.error(err)

    const httpErr = generateErrorHttpRes(err)
    return NextResponse.json(httpErr.errRes, { status: httpErr.status })
  }
}