import { NextResponse } from "next/server"
import { db } from "@/db/db"
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
