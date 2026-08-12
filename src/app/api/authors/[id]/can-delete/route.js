import routeHandlerAuth from "@/lib/auth/route-handler"
import { createSuccessRes } from "@/lib/dto/res-dto"
import AuthorService from "@/lib/services/author-service"
import { generateErrorHttpRes } from "@/lib/utils/http"
import { checkUserAlreadyLoggedIn } from "@/lib/utils/server/auth"
import { NextResponse } from "next/server"


export async function GET(req, { params }) {
  try {
    // TODO: permission intuk route handler ini tambah di DB
    await routeHandlerAuth.verifySession()

    const { id } = await params

    const authorCanDelete = await AuthorService.canDataDeleted({ id: parseInt(id)})

    return NextResponse.json(
      createSuccessRes({
        message: 'Successfully checked whether the data can be deleted, id: ' + id,
        data: {
          authorCanDelete
        }
      })
    )

  } catch (err) {
    console.error(err)
    
    const httpErr = generateErrorHttpRes(err)
    return NextResponse.json(httpErr.errRes, { status: httpErr.status })
  }
}