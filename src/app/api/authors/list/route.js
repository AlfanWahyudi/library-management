import AuthorRouteAuth from "@/lib/auth/route/author-route-auth";
import { createErrorRes, createSuccessRes } from "@/lib/dto/res-dto"
import { listSchema } from "@/lib/schemas/list-schema";
import AuthorService from "@/lib/services/author-service";
import { generateErrorHttpRes } from "@/lib/utils/http";
import { checkUserAlreadyLoggedIn } from "@/lib/utils/server/auth";
import { NextResponse } from "next/server";

export async function GET(req) {
  try {
    await AuthorRouteAuth.verifyCanViewList()

    const params = req.nextUrl.searchParams
    const orderBy = params.get('orderBy') || 'full_name'
    const orderDir = params.get('orderDir') || 'asc'
  
    const parsed = listSchema.parse({ orderBy, orderDir })

    const authors = await AuthorService.getAll({ ...parsed })
  
    const res = createSuccessRes({
      message: 'Authors data successfully retrieved.', 
      data: authors 
    })

    return NextResponse.json(res)

  } catch (err) {
    console.error(err)

    const httpErr = generateErrorHttpRes(err)
    return NextResponse.json(httpErr.errRes, { status: httpErr.status })
  }
}