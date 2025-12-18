import { NextResponse } from "next/server"

const cakesData = [
  {
    id: "1",
    name: "Floral Wedding Cake",
    image: "/cake.png",
    category: "Wedding Cakes",
  },
  {
    id: "2",
    name: "Chocolate Drip",
    image: "/cake.png",
    category: "Celebration Cakes",
  },
  {
    id: "3",
    name: "Rose Vanilla",
    image: "/cake.png",
    category: "Anniversary Cakes",
  },
  {
    id: "4",
    name: "Berry Blast",
    image: "/cake.png",
    category: "Wedding Cakes",
  },
  {
    id: "5",
    name: "Floral Wedding Cake",
    image: "/cake.png",
    category: "Wedding Cakes",
  },
  {
    id: "6",
    name: "Chocolate Drip",
    image: "/cake.png",
    category: "Celebration Cakes",
  },
  {
    id: "7",
    name: "Rose Vanilla",
    image: "/cake.png",
    category: "Anniversary Cakes",
  },
  {
    id: "8",
    name: "Berry Blast",
    image: "/cake.png",
    category: "Wedding Cakes",
  },
  {
    id: "9",
    name: "Berry Blast",
    image: "/cake.png",
    category: "Desserts",
  },
  {
    id: "10",
    name: "Berry Blast",
    image: "/cake.png",
    category: "Desserts",
  },
  {
    id: "11",
    name: "Berry Blast",
    image: "/cake.png",
    category: "Desserts",
  },
  {
    id: "12",
    name: "Berry Blast",
    image: "/cake.png",
    category: "Desserts",
  },
  {
    id: "13",
    name: "Berry Blast",
    image: "/cake.png",
    category: "Desserts",
  },
  {
    id: "14",
    name: "Berry Blast",
    image: "/cake.png",
    category: "Desserts",
  },
  // ... add your other cakes here
]

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const category = searchParams.get("category")

  if (category) {
    const categoryCakes = cakesData.filter(
      (cake) => cake.category.toLowerCase() === category.toLowerCase()
    )
    return NextResponse.json(categoryCakes)
  }

  return NextResponse.json(cakesData)
}
