import { dataTableParamSchema } from "@/lib/schemas/datatable-param-schema";
import { createSuccessRes } from "@/lib/dto/res-dto";
import BookLoanService from "@/lib/services/book-loan-service";
import { generateErrorHttpRes } from "@/lib/utils/http";
import { NextResponse } from "next/server";


export async function GET(req) {
  try {
    const searchParams = req.nextUrl.searchParams

    const defQuery = {
      page: parseInt(searchParams.get('page')) || 0,
      limit: parseInt(searchParams.get('limit')) || 10,
      search: searchParams.get('search') || '',
      searchFields: searchParams.get('searchFields') || '',
      orderBy: searchParams.get('orderBy') || 'finished_date',
      orderDir: searchParams.get('orderDir') || 'desc',
    }
    const defParsed = dataTableParamSchema.parse(defQuery)

    const othQuery = {
      bookId: parseInt(searchParams.get('bookId')) || null,
      memberId: parseInt(searchParams.get('memberId')) || null
    }

    const paginatedList = await BookLoanService.getAllHistPaginated({...defParsed, ...othQuery})

    return NextResponse.json(
      createSuccessRes({
        message: 'book loan histories paginated-list successfully retrieved.', 
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
