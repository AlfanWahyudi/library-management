import { createSuccessRes } from "@/lib/dto/res-dto";
import { dataTableParamSchema } from "@/lib/schemas/datatable-param-schema";
import { memberDataTableParamSchema } from "@/lib/schemas/member-datatable-param-schema";
import MemberService from "@/lib/services/member-service";
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
      gender: searchParams.get('gender') || 'all',
    }

    const { 
      gender, 
      ...defaultQuery 
    } = query
    
    const parsedDefault = dataTableParamSchema.parse(defaultQuery)
    const parsedFilter = memberDataTableParamSchema.parse({ gender: gender })

    const memberPaginatedList = await MemberService.getAllPaginated({...parsedDefault, ...parsedFilter})

    return NextResponse.json(
      createSuccessRes({
        message: 'Member paginated-list successfully retrieved.', 
        data: memberPaginatedList.data,
        meta: memberPaginatedList.meta 
      }), 
      { status: 200 }
    )

  } catch (err) {
    console.error(err)

    const httpErr = generateErrorHttpRes(err)
    return NextResponse.json(httpErr.errRes, { status: httpErr.status })
  }
}