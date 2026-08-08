import { createSuccessRes } from "@/lib/dto/res-dto"
import BookService from "@/lib/services/book-service"
import { generateErrorHttpRes } from "@/lib/utils/http"
import { checkUserAlreadyLoggedIn } from "@/lib/utils/server/auth"
import { NextResponse } from "next/server"

export async function GET(req, { params }) {
  try {
    await checkUserAlreadyLoggedIn()

    const { id } = await params

    const bookCanDelete = await BookService.canDataDeleted({ id: parseInt(id) })

    return NextResponse.json(
      createSuccessRes({
        message: 'Successfully checked whether the data can be deleted, id: ' + id,
        data: {
          bookCanDelete
        }
      })
    )

  } catch (err) {
    console.error(err)
    
    const httpErr = generateErrorHttpRes(err)
    return NextResponse.json(httpErr.errRes, { status: httpErr.status })
  }
}