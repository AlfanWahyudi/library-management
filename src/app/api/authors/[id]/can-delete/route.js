import AuthorRouteAuth from "@/lib/auth/route/author-route-auth"
import { createSuccessRes } from "@/lib/dto/res-dto"
import AuthorService from "@/lib/services/author-service"
import { generateErrorHttpRes } from "@/lib/utils/http"
import { NextResponse } from "next/server"


export async function GET(req, { params }) {
  try {
    await AuthorRouteAuth.verifyDataCanDeleted()

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