import BookRouteAuth from "@/lib/auth/route/book-route-auth";
import { createSuccessRes } from "@/lib/dto/res-dto";
import { listSchema } from "@/lib/schemas/list-schema";
import BookService from "@/lib/services/book-service";
import { generateErrorHttpRes } from "@/lib/utils/http";
import { NextResponse } from "next/server";

export async function GET(req) {
  try {
    await BookRouteAuth.verifyCanViewListInclLoan()

    const params = req.nextUrl.searchParams
    const orderBy = params.get('orderBy') || 'title'
    const orderDir = params.get('orderDir') || 'asc'
  
    const parsed = listSchema.parse({ orderBy, orderDir })

    const list = await BookService.includeLoanList(parsed)

    return NextResponse.json(
      createSuccessRes({
        message: 'list of book include loan data successfully retrieved.', 
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