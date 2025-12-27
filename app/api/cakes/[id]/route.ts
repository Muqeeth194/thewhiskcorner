import { cakeIdParams } from "@/types/contents"
import { db } from "@/db/db"
import { cakes } from "@/db/schema/cakes"
import { NextResponse } from "next/server"
import { eq } from "drizzle-orm"

export async function GET(request: Request, { params }: cakeIdParams) {
  //   console.log(params.id)

  const cakeId = params.id

  // Safety check: ensure it's a valid number before querying
  if (isNaN(cakeId)) {
    return NextResponse.json({ error: "Invalid ID" }, { status: 400 })
  }

  const result = await db
    .select()
    .from(cakes)
    .where(eq(cakes.id, cakeId))
    .limit(1)

  // select() always resturns an array
  const cake = result[0]

  // console.log(cake)

  if (!cake) {
    return NextResponse.json(
      {
        error: "Cake not found",
      },
      {
        status: 404,
      }
    )
  }
  return NextResponse.json(cake)
}

export async function PUT(request: Request, { params }: cakeIdParams) {
  try {
    const cakeId = params.id

    // Safety check: ensure it's a valid number before querying
    if (isNaN(cakeId)) {
      return NextResponse.json({ error: "Invalid ID" }, { status: 400 })
    }

    // Get the data from the payload or the request body
    const body = await request.json()

    // Perform the Update
    // .returning() gives us back the data we just updated
    const updatedCake = await db
      .update(cakes)
      .set({
        name: body.name,
        image: body.image,
        category: body.category,
        description: body.description,
        // Passing object directly -> becomes "[object Object]"
        // details: body.details,

        // Convert to string first
        details: JSON.stringify(body.details),
        status: body.status,
      })
      .where(eq(cakes.id, cakeId))
      .returning()

    // check if the cake was actually updated
    if (updatedCake.length === 0) {
      return NextResponse.json({ error: "Cake not found" }, { status: 404 })
    }

    // return the updated cake
    return NextResponse.json(updatedCake[0])
  } catch (error) {
    console.error("Error updating cake:", error)
    return NextResponse.json(
      { error: "Failed to update cake" },
      { status: 500 }
    )
  }
}
