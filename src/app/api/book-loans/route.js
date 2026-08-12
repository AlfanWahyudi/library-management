import { dataTableParamSchema } from "@/lib/schemas/datatable-param-schema";
import { createSuccessRes } from "@/lib/dto/res-dto";
import { bookLoanServerSchema } from "@/lib/schemas/book-loan/book-loan-server-schema";
import BookLoanService from "@/lib/services/book-loan-service";
import { generateErrorHttpRes } from "@/lib/utils/http";
import { NextResponse } from "next/server";
import BookLoanRouteAuth from "@/lib/auth/route/book-loan-route-auth";


export async function GET(req) {
  try {
    await BookLoanRouteAuth.verifyCanViewListPage()

    const searchParams = req.nextUrl.searchParams

    const query = {
      page: parseInt(searchParams.get('page')) || 0,
      limit: parseInt(searchParams.get('limit')) || 10,
      search: searchParams.get('search') || '',
      searchFields: searchParams.get('searchFields') || '',
      orderBy: searchParams.get('orderBy') || 'updated_at',
      orderDir: searchParams.get('orderDir') || 'desc',
    }

    const parsed = dataTableParamSchema.parse(query)
    const paginatedList = await BookLoanService.getAllPaginated(parsed)

    return NextResponse.json(
      createSuccessRes({
        message: 'book-loans paginated-list successfully retrieved.', 
        data: paginatedList.data,
        meta: paginatedList.meta 
      }), 
      { status: 200 }
    )

  } catch (err) {
    console.error(err)

    const httpErr = generateErrorHttpRes(err)
    return NextResponse.json(httpErr.errRes, { status: httpErr.status })
  }
}

export async function POST(req) {
  try {
    await BookLoanRouteAuth.verifyCanCreate()

    const body = await req.json()
    const parsed = bookLoanServerSchema.parse(body)

    const bookLoan = await BookLoanService.save({...parsed})

    return NextResponse.json(
      createSuccessRes({
        message: 'book loan successfully created.', 
        data: bookLoan 
      }), 
      { status: 201 }
    )
  } catch (err) {
    console.error(err)
    
    const httpErr = generateErrorHttpRes(err)
    return NextResponse.json(httpErr.errRes, { status: httpErr.status })
  }
}