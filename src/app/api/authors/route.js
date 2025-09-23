import { createErrorRes, createSuccessRes } from "@/lib/dto/res-dto";
import { authorServerSchema } from "@/lib/schemas/author-schema";
import AuthorService from "@/lib/services/author-service";
import { NextResponse } from "next/server";
import { ZodError } from "zod";

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
