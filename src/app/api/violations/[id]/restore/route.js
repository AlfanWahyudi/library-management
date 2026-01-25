import { createSuccessRes } from "@/lib/dto/res-dto"
import ViolationService from "@/lib/services/violation-service"
import { generateErrorHttpRes } from "@/lib/utils/http"
import { NextResponse } from "next/server"


export async function PUT(req, { params }) {
  try {
    const { id } = await params

    const violation = await ViolationService.restore({ id: parseInt(id)})

    return NextResponse.json(
      createSuccessRes({
        message: 'Violation successfully restored, id: ' + id,
        data: violation
      })
    )

  } catch (err) {
    console.error(err)
    
    const httpErr = generateErrorHttpRes(err)
    return NextResponse.json(httpErr.errRes, { status: httpErr.status })
  }
}