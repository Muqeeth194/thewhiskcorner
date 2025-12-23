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
