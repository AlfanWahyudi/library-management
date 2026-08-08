import { createSuccessRes } from "@/lib/dto/res-dto"
import { listSchema } from "@/lib/schemas/list-schema"
import CountryService from "@/lib/services/country-service"
import { generateErrorHttpRes } from "@/lib/utils/http"
import { checkUserAlreadyLoggedIn } from "@/lib/utils/server/auth"
import { NextResponse } from "next/server"

export async function GET(req) {
  try {
    await checkUserAlreadyLoggedIn()

    const params = req.nextUrl.searchParams
    const orderBy = params.get('orderBy') || 'name'
    const orderDir = params.get('orderDir') || 'asc'
  
    const parsed = listSchema.parse({ orderBy, orderDir })
  
    const countries = await CountryService.getAll({ ...parsed })
  
    const res = createSuccessRes({
      message: 'Countries data successfully retrieved.', 
      data: countries 
    })
  
    return NextResponse.json(res)
    
  } catch (err) {
    console.error(err)

    const httpErr = generateErrorHttpRes(err)
    return NextResponse.json(httpErr.errRes, { status: httpErr.status })
  }
}