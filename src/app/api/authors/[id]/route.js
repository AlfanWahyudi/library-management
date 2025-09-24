import { createErrorRes, createSuccessRes } from "@/lib/dto/res-dto"
import { authorServerSchema } from "@/lib/schemas/author-schema"
import AuthorService from "@/lib/services/author-service"
import { NextResponse } from "next/server"
import { ZodError } from "zod"

export async function PUT(req, { params }) {
  try {
    const { id } = await params
    const body = await req.json()
    const parsed = authorServerSchema.parse(body)

    const author = await AuthorService.save({ id, ...parsed })

    return NextResponse.json(
      createSuccessRes({
        message: 'Author successfully updated, id: ' + id,
        data: author
      })
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

export async function DELETE(req, { params }) {
  try {
    const { id } = await params
    
    // delete data service class
    const success = await AuthorService.delete({id})

    if (success) {
      return NextResponse.json(
        createSuccessRes({ message: 'Author successfully deleted, id: ' + id })
      )
    } else {
      return NextResponse.json(
        createErrorRes({ error: `Failed to remove author, id: ${id}. Please try again later`}),
        { status : 500 }
      )
    }
    
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