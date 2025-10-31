import { createErrorRes, createSuccessRes } from "@/lib/dto/res-dto"
import { countryListSchema } from "@/lib/schemas/country-schema"
import CountryService from "@/lib/services/country-service"
import { generateErrorHttpRes } from "@/lib/utils/http"
import { NextResponse } from "next/server"
import { ZodError } from "zod"

export async function GET(req) {
  try {
    const params = req.nextUrl.searchParams
    const orderBy = params.get('orderBy') || 'name'
    const orderDir = params.get('orderDir') || 'asc'
  
    const parsed = countryListSchema.parse({ orderBy, orderDir })
    if (parsed.orderDir !== 'asc' &&  parsed.orderDir !== 'desc') {
      return NextResponse.json(
        createErrorRes({ error: 'orderDir can only be asc or desc' }),
        { status: 400 }
      )
    }
  
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