import { createSuccessRes } from "@/lib/dto/res-dto"
import { violationServerSchema } from "@/lib/schemas/violation/violation-server-schema"
import ViolationService from "@/lib/services/violation-service"
import { generateErrorHttpRes } from "@/lib/utils/http"
import { NextResponse } from "next/server"


export async function GET(req, { params }) {
  try {
    const { id } = await params

    const violation = await ViolationService.findById({ id: parseInt(id)})

    return NextResponse.json(
      createSuccessRes({
        message: 'Violation successfully retrieved, id: ' + id,
        data: violation
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
    const { id } = await params
    const body = await req.json()
    const parsed = violationServerSchema.parse(body)

    const violation = await ViolationService.save({ id: parseInt(id), ...parsed })

    return NextResponse.json(
      createSuccessRes({
        message: 'Violation successfully updated, id: ' + id,
        data: violation
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

    const violation = await ViolationService.delete({ id: parseInt(id)})

    return NextResponse.json(
      createSuccessRes({
        message: 'Violation successfully deleted, id: ' + id,
        data: violation
      })
    )

  } catch (err) {
    console.error(err)
    
    const httpErr = generateErrorHttpRes(err)
    return NextResponse.json(httpErr.errRes, { status: httpErr.status })
  }
}