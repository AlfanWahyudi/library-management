import { createSuccessRes } from "@/lib/dto/res-dto"
import BookLoanService from "@/lib/services/book-loan-service"
import { generateErrorHttpRes } from "@/lib/utils/http"
import { NextResponse } from "next/server"

export async function PUT(req, { params }) {
  try {
    const { id } = await params

    const bookLoan = await BookLoanService.complete({ id: parseInt(id) })

    return NextResponse.json(
      createSuccessRes({
        message: 'The loan book was completed successfully, id: ' + id,
        data: bookLoan
      })
    )

  } catch (err) {
    console.error(err)
    
    const httpErr = generateErrorHttpRes(err)
    return NextResponse.json(httpErr.errRes, { status: httpErr.status })
  }
}