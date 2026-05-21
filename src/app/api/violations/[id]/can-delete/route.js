import { createSuccessRes } from "@/lib/dto/res-dto"
import ViolationService from "@/lib/services/violation-service"
import { generateErrorHttpRes } from "@/lib/utils/http"
import { NextResponse } from "next/server"

export async function GET(req, { params }) {
  try {
    const { id } = await params

    const violationCanDelete = await ViolationService.canDataDeleted({ id: parseInt(id)})

    return NextResponse.json(
      createSuccessRes({
        message: 'Successfully checked whether the data can be deleted, id: ' + id,
        data: {
          violationCanDelete
        }
      })
    )

  } catch (err) {
    console.error(err)
    
    const httpErr = generateErrorHttpRes(err)
    return NextResponse.json(httpErr.errRes, { status: httpErr.status })
  }
}