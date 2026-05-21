import { createSuccessRes } from "@/lib/dto/res-dto";
import { dataTableParamSchema } from "@/lib/schemas/datatable-param-schema";
import { violationDataTableParamSchema } from "@/lib/schemas/violation/violation-datatable-param-schema";
import { violationServerSchema } from "@/lib/schemas/violation/violation-server-schema";
import ViolationService from "@/lib/services/violation-service";
import { generateErrorHttpRes } from "@/lib/utils/http";
import { NextResponse } from "next/server";

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
      level: searchParams.get('level') || 'all'
    }

    const { 
      level, 
      ...defaultQuery 
    } = query
    
    const parsedDefault = dataTableParamSchema.parse(defaultQuery)
    const parsedFilter = violationDataTableParamSchema.parse({ level })

    const violationPaginatedList = await ViolationService.getAllPaginated({...parsedDefault, ...parsedFilter})

    return NextResponse.json(
      createSuccessRes({
        message: 'violation paginated-list successfully retrieved.', 
        data: violationPaginatedList.data,
        meta: violationPaginatedList.meta 
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
    const parsed = violationServerSchema.parse(body)

    const violation = await ViolationService.save({...parsed})

    return NextResponse.json(
      createSuccessRes({
        message: 'Violation successfully created.', 
        data: violation 
      }), 
      { status: 201 }
    )
  } catch (err) {
    console.error(err)
    
    const httpErr = generateErrorHttpRes(err)
    return NextResponse.json(httpErr.errRes, { status: httpErr.status })
  }
}
