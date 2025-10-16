import { createErrorRes, createSuccessRes } from "@/lib/dto/res-dto";
import { authorServerSchema } from "@/lib/schemas/author-schema";
import { dataTableParamSchema } from "@/lib/schemas/datatable-param-schema";
import AuthorService from "@/lib/services/author-service";
import { NextResponse } from "next/server";
import { ZodError } from "zod";

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
    
    if (err instanceof ZodError) {
      return NextResponse.json(
        createErrorRes({
          error: 'Validation failed.',
          details: err.issues
        }),
        { status: 400 }
      )
    }

    return NextResponse.json(
      createErrorRes({
        error: err.toString(),
      }),
      { status: 500 }
    )
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
    
    if (err instanceof ZodError) {
      return NextResponse.json(
        createErrorRes({
          error: 'Validation failed.',
          details: err.issues
        }),
        { status: 400 }
      )
    }

    return NextResponse.json(
      createErrorRes({
        error: err.toString(),
      }),
      { status: 500 }
    )
  }
}
