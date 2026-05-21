import { createSuccessRes } from "@/lib/dto/res-dto"
import AuthorService from "@/lib/services/author-service"
import { generateErrorHttpRes } from "@/lib/utils/http"
import { NextResponse } from "next/server"

export async function PUT(req, { params }) {
  try {
    const { id } = await params

    const author = await AuthorService.restore({ id: parseInt(id)})

    return NextResponse.json(
      createSuccessRes({
        message: 'author successfully restored, id: ' + id,
        data: author
      })
    )

  } catch (err) {
    console.error(err)
    
    const httpErr = generateErrorHttpRes(err)
    return NextResponse.json(httpErr.errRes, { status: httpErr.status })
  }
}