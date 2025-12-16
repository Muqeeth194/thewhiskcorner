import { cakeIdParams } from "@/types/contents"
import { error } from "console"
import { NextResponse } from "next/server"

const cakesData = [
  {
    id: "1",
    name: "Floral Wedding Cake",
    image: "/cake.png",
    category: "Wedding Cakes",
    description:
      "Three-tier buttercream cake with handcrafted sugar roses. Perfect for intimate weddings up to 100 guests.",
  },
  {
    id: "2",
    name: "Chocolate Drip",
    image: "/cake.png",
    category: "Celebration Cakes",
    description:
      "Three-tier buttercream cake with handcrafted sugar roses. Perfect for intimate weddings up to 100 guests.",
  },
  {
    id: "3",
    name: "Rose Vanilla",
    image: "/cake.png",
    category: "Anniversary Cakes",
    description:
      "Three-tier buttercream cake with handcrafted sugar roses. Perfect for intimate weddings up to 100 guests.",
  },
  {
    id: "4",
    name: "Berry Blast",
    image: "/cake.png",
    category: "Wedding Cakes",
    description:
      "Three-tier buttercream cake with handcrafted sugar roses. Perfect for intimate weddings up to 100 guests.",
  },
  {
    id: "5",
    name: "Floral Wedding Cake",
    image: "/cake.png",
    category: "Wedding Cakes",
    description:
      "Three-tier buttercream cake with handcrafted sugar roses. Perfect for intimate weddings up to 100 guests.",
  },
  {
    id: "6",
    name: "Chocolate Drip",
    image: "/cake.png",
    category: "Celebration Cakes",
    description:
      "Three-tier buttercream cake with handcrafted sugar roses. Perfect for intimate weddings up to 100 guests.",
  },
  {
    id: "7",
    name: "Rose Vanilla",
    image: "/cake.png",
    category: "Anniversary Cakes",
    description:
      "Three-tier buttercream cake with handcrafted sugar roses. Perfect for intimate weddings up to 100 guests.",
  },
  {
    id: "8",
    name: "Berry Blast",
    image: "/cake.png",
    category: "Wedding Cakes",
    description:
      "Three-tier buttercream cake with handcrafted sugar roses. Perfect for intimate weddings up to 100 guests.",
  },
  {
    id: "9",
    name: "Berry Blast",
    image: "/cake.png",
    category: "Deserts",
    description:
      "Three-tier buttercream cake with handcrafted sugar roses. Perfect for intimate weddings up to 100 guests.",
  },
  {
    id: "10",
    name: "Berry Blast",
    image: "/cake.png",
    category: "Deserts",
    description:
      "Three-tier buttercream cake with handcrafted sugar roses. Perfect for intimate weddings up to 100 guests.",
  },
  {
    id: "11",
    name: "Berry Blast",
    image: "/cake.png",
    category: "Deserts",
    description:
      "Three-tier buttercream cake with handcrafted sugar roses. Perfect for intimate weddings up to 100 guests.",
  },
  {
    id: "12",
    name: "Berry Blast",
    image: "/cake.png",
    category: "Deserts",
    description:
      "Three-tier buttercream cake with handcrafted sugar roses. Perfect for intimate weddings up to 100 guests.",
  },
  {
    id: "13",
    name: "Berry Blast",
    image: "/cake.png",
    category: "Deserts",
    description:
      "Three-tier buttercream cake with handcrafted sugar roses. Perfect for intimate weddings up to 100 guests.",
  },
  {
    id: "14",
    name: "Berry Blast",
    image: "/cake.png",
    category: "Deserts",
    description:
      "Three-tier buttercream cake with handcrafted sugar roses. Perfect for intimate weddings up to 100 guests.",
  },
  // ... add your other cakes here
]

export async function GET(request: Request, { params }: cakeIdParams) {
  //   console.log(params.id)

  const cakeId = params.id
  const cake = cakesData.find((item) => item.id === cakeId)

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
