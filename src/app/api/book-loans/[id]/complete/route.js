import BookLoanRouteAuth from "@/lib/auth/route/book-loan-route-auth"
import { createSuccessRes } from "@/lib/dto/res-dto"
import BookLoanService from "@/lib/services/book-loan-service"
import { generateErrorHttpRes } from "@/lib/utils/http"
import { checkUserAlreadyLoggedIn } from "@/lib/utils/server/auth"
import { NextResponse } from "next/server"

export async function PUT(req, { params }) {
  try {
    await BookLoanRouteAuth.verifyCanCompleteLoan()

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