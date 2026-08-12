import BookRouteAuth from "@/lib/auth/route/book-route-auth";
import { createSuccessRes } from "@/lib/dto/res-dto";
import { bookServerSchema } from "@/lib/schemas/book/book-server-schema";
import { dataTableParamSchema } from "@/lib/schemas/datatable-param-schema";
import BookService from "@/lib/services/book-service";
import { generateErrorHttpRes } from "@/lib/utils/http";
import { checkUserAlreadyLoggedIn } from "@/lib/utils/server/auth";
import { NextResponse } from "next/server";

export async function GET(req) {
  try {
    await BookRouteAuth.verifyCanViewList()

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
    const paginatedList = await BookService.getAllPaginated(parsed)

    return NextResponse.json(
      createSuccessRes({
        message: 'books paginated-list successfully retrieved.', 
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
    await BookRouteAuth.verifyCanCreate()

    const body = await req.json()
    const parsed = bookServerSchema.parse(body)

    const book = await BookService.create(parsed)

    return NextResponse.json(
      createSuccessRes({
        message: 'Book successfully created.', 
        data: book
      }), 
      { status: 201 }
    )
  } catch (err) {
    console.error(err)
    
    const httpErr = generateErrorHttpRes(err)
    return NextResponse.json(httpErr.errRes, { status: httpErr.status })
  }
}
