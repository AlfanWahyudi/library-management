import { createSuccessRes } from "@/lib/dto/res-dto";
import { listSchema } from "@/lib/schemas/list-schema";
import ViolationService from "@/lib/services/violation-service";
import { generateErrorHttpRes } from "@/lib/utils/http";
import { NextResponse } from "next/server";

export async function GET(req) {
  try {
    const params = req.nextUrl.searchParams
    const orderBy = params.get('orderBy') || 'title'
    const orderDir = params.get('orderDir') || 'asc'
  
    const parsed = listSchema.parse({ orderBy, orderDir })

    const list = await ViolationService.getAll(parsed)

    return NextResponse.json(
      createSuccessRes({
        message: 'list of violations successfully retrieved.', 
        data: list,
      }), 
      { status: 200 }
    )

  } catch (err) {
    console.error(err)

    const httpErr = generateErrorHttpRes(err)
    return NextResponse.json(httpErr.errRes, { status: httpErr.status })
  }
}