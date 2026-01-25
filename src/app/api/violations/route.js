import { createSuccessRes } from "@/lib/dto/res-dto";
import { dataTableParamSchema } from "@/lib/schemas/datatable-param-schema";
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
    }

    const parsedQuery = dataTableParamSchema.parse(query)
    const violationPaginatedList = await ViolationService.getAllPaginated(parsedQuery)

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

//TODO
export async function POST(req) {
  try {
    const body = await req.json()
    // const parsed = memberServerSchema.parse(body)

    // const member = await MemberService.save({...parsed})

    return NextResponse.json(
      createSuccessRes({
        message: 'Member successfully created.', 
        data: member 
      }), 
      { status: 201 }
    )
  } catch (err) {
    console.error(err)
    
    const httpErr = generateErrorHttpRes(err)
    return NextResponse.json(httpErr.errRes, { status: httpErr.status })
  }
}
