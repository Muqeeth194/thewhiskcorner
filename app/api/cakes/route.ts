import { NextResponse } from "next/server"
import { db } from "@/db/dbConfig"
import { cakes } from "@/db/schema/cakes"

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const category = searchParams.get("category")

  const cakesData = await db.select().from(cakes)

  if (category) {
    const categoryCakes = cakesData.filter(
      (cake) => cake.category.toLowerCase() === category.toLowerCase()
    )
    return NextResponse.json(categoryCakes)
  }
  return NextResponse.json(cakesData)
}

export async function POST(request: Request) {
  try {
    // Get the data from the payload or the request body
    const body = await request.json()

    // console.log("body:", body)

    // Perform the Update
    // .returning() gives us back the data we just updated
    const createdCake = await db
      .insert(cakes)
      .values({
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
      .returning()

    // check if the cake was actually updated
    if (createdCake.length === 0) {
      return NextResponse.json({ error: "Cake not created" }, { status: 404 })
    }

    // return the updated cake
    return NextResponse.json(createdCake[0])
  } catch (error) {
    console.error("Error creating cake:", error)
    return NextResponse.json(
      { error: "Failed to creating cake" },
      { status: 500 }
    )
  }
}
