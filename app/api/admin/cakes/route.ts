import { NextResponse } from "next/server"
import { db } from "@/db/dbConfig"
import { cakes } from "@/db/schema/cakes"
import { desc, sql } from "drizzle-orm"

export async function GET() {
  try {
    const data = await db
      .select({
        id: cakes.id,
        name: cakes.name,
        image: cakes.image,
        category: cakes.category,
        status: cakes.status,
        // OPTIMIZATION: Extract 'flavor' directly in SQL
        // This avoids fetching the massive 'details' column entirely
        flavor: sql<string>`json_extract(${cakes.details}, '$.flavor')`,
      })
      .from(cakes)
      .orderBy(desc(cakes.createdAt))
      // Safety Cap: Never try to fetch 10,000 rows at once.
      .limit(1000)

    return NextResponse.json(data)
  } catch (error) {
    console.error("Admin API Error:", error)
    return NextResponse.json(
      { error: "Failed to fetch admin data" },
      { status: 500 }
    )
  }
}
