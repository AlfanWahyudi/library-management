import { createSuccessRes } from "@/lib/dto/res-dto";
import { authorServerSchema } from "@/lib/schemas/author/author-server-schema";
import { dataTableParamSchema } from "@/lib/schemas/datatable-param-schema";
import AuthorService from "@/lib/services/author-service";
import { generateErrorHttpRes } from "@/lib/utils/http";
import { NextResponse } from "next/server";

// get paginated list 
export async function GET(req) {
  try {
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
    const authorPaginatedList = await AuthorService.getAllPaginated({...parsed})

    return NextResponse.json(
      createSuccessRes({
        message: 'Author paginated-list successfully retrieved.', 
        data: authorPaginatedList.data,
        meta: authorPaginatedList.meta 
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
    const body = await req.json()
    const parsed = authorServerSchema.parse(body)

    const author = await AuthorService.save({...parsed})

    return NextResponse.json(
      createSuccessRes({
        message: 'Author successfully created.', 
        data: author 
      }), 
      { status: 201 }
    )
  } catch (err) {
    console.error(err)
    
    const httpErr = generateErrorHttpRes(err)
    return NextResponse.json(httpErr.errRes, { status: httpErr.status })
  }
}
