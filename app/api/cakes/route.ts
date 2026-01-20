import { NextResponse } from "next/server"
import { db } from "@/db/dbConfig"
import { cakes } from "@/db/schema/cakes"
import { like, and, or, inArray, sql } from "drizzle-orm"

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)

  // 1. Extract & Parse Query Parameters
  const page = parseInt(searchParams.get("page") || "1")
  const limit = parseInt(searchParams.get("limit") || "12")
  const categoryParam = searchParams.get("category")
  const flavorParam = searchParams.get("flavor")

  // console.log("flavor from the payload", flavorParam)

  // Calculate offset for pagination
  const offset = (page - 1) * limit

  try {
    // 2. Build the WHERE conditions dynamically
    const conditions = []

    // Filter by Category
    if (categoryParam) {
      // Handles single or multiple categories (e.g., "Wedding,Birthday")
      const categories = categoryParam.split(",")
      conditions.push(inArray(cakes.category, categories))
    }

    // Filter by Flavor
    if (flavorParam) {
      // 1. Split string into array and clean whitespace
      const flavors = flavorParam.split(",").map((f) => f.trim())

      // 2. Build condition: Look inside the JSON 'details' column at the key '$.flavor'
      // We use SQL LIKE to match substring (e.g. finding "Chocolate" inside "Chocolate, Vanilla")
      const flavorConditions = flavors.map(
        (f) => sql`json_extract(${cakes.details}, '$.flavor') LIKE ${`%${f}%`}`
      )

      // 3. Push OR condition (if cake has ANY of the selected flavors)
      conditions.push(or(...flavorConditions))
    }
    // Combine all conditions with AND
    const whereClause = conditions.length > 0 ? and(...conditions) : undefined

    // 3. Fetch Data (Paginated)
    const cakesData = await db
      .select()
      .from(cakes)
      .where(whereClause)
      .limit(limit)
      .offset(offset)
      .orderBy(cakes.id) // Consistently order results

    // 4. Get Total Count (for Pagination Metadata)
    // We need to know the total number of matching items to calculate totalPages
    const allMatchingItems = await db
      .select({ id: cakes.id })
      .from(cakes)
      .where(whereClause)

    const totalItems = allMatchingItems.length
    const totalPages = Math.ceil(totalItems / limit)

    // 5. Return Structured Response
    return NextResponse.json({
      cakes: cakesData,
      pagination: {
        page,
        limit,
        totalItems,
        totalPages,
      },
    })
  } catch (error) {
    console.error("Error fetching cakes:", error)
    return NextResponse.json(
      { error: "Failed to fetch cakes" },
      { status: 500 }
    )
  }
}

export async function POST(request: Request) {
  // ... (Keep your existing POST logic exactly as is)
  try {
    const body = await request.json()
    const createdCake = await db
      .insert(cakes)
      .values({
        name: body.name,
        image: body.image,
        category: body.category,
        description: body.description,
        details: JSON.stringify(body.details),
        status: body.status,
      })
      .returning()

    if (createdCake.length === 0) {
      return NextResponse.json({ error: "Cake not created" }, { status: 404 })
    }
    return NextResponse.json(createdCake[0])
  } catch (error) {
    console.error("Error creating cake:", error)
    return NextResponse.json(
      { error: "Failed to creating cake" },
      { status: 500 }
    )
  }
}
