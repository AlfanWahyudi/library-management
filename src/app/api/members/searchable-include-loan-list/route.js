import { createSuccessRes } from "@/lib/dto/res-dto";
import { searchableListSchema } from "@/lib/schemas/searchable-list-schema";
import MemberService from "@/lib/services/member-service";
import { generateErrorHttpRes } from "@/lib/utils/http";
import { checkUserAlreadyLoggedIn } from "@/lib/utils/server/auth";
import { NextResponse } from "next/server";

export async function GET(req) {
  try {
    await checkUserAlreadyLoggedIn()

    const searchParams = req.nextUrl.searchParams

    const query = {
      search: searchParams.get('search') || '',
      searchFields: searchParams.get('searchFields') || 'full_name',
      orderBy: searchParams.get('orderBy') || 'full_name',
      orderDir: searchParams.get('orderDir') || 'asc',
    }

    const parsed = searchableListSchema.parse(query)
    const items = await MemberService.searchableIncludeLoanList(parsed)

    return NextResponse.json(
      createSuccessRes({
        message: 'Member searchable list include loan data successfully retrieved.', 
        data: items
      }), 
      { status: 200 }
    )

  } catch (err) {
    console.error(err)

    const httpErr = generateErrorHttpRes(err)
    return NextResponse.json(httpErr.errRes, { status: httpErr.status })
  }
}