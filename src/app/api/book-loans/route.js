import { createSuccessRes } from "@/lib/dto/res-dto";
import { bookLoanServerSchema } from "@/lib/schemas/book-loan/book-loan-server-schema";
import BookLoanService from "@/lib/services/book-loan-service";
import { generateErrorHttpRes } from "@/lib/utils/http";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const body = await req.json()
    const parsed = bookLoanServerSchema.parse(body)

    const bookLoan = await BookLoanService.save({...parsed})

    return NextResponse.json(
      createSuccessRes({
        message: 'book loan successfully created.', 
        data: bookLoan 
      }), 
      { status: 201 }
    )
  } catch (err) {
    console.error(err)
    
    const httpErr = generateErrorHttpRes(err)
    return NextResponse.json(httpErr.errRes, { status: httpErr.status })
  }
}