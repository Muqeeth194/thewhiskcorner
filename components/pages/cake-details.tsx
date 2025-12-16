"use client"

import { Cake, cakeIdParams } from "@/types/contents"
import { useSearchParams } from "next/navigation"
import React, { useEffect, useState } from "react"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardTitle,
} from "../ui/card"
import { Button } from "../ui/button"

export default function CakeDetailsPage() {
  const [cake, setCake] = useState<Cake | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  const searchParams = useSearchParams()
  const searchId = searchParams.get("id")
  //   console.log("param id: ", searchId)

  const fetchCakes = async () => {
    if (!searchId) return //Dont fetch anything if no ID exists
    try {
      const response = await fetch(`/api/cakes/${searchId}`)
      const data = await response.json()
      setCake(data)
    } catch (error) {
      console.error("failed to fetch the cakes in cake details page", error)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchCakes()
  }, [searchId])

  if (isLoading) {
    return <div className="py-10 text-center">Loading the cakes ...</div>
  }

  return (
    <main className="container flex flex-col items-center py-2">
      <div className="item-center flex w-full justify-between ">
        <div className="flex w-1/2 items-center justify-center p-8">
          {cake && (
            <img
              src={cake.image}
              alt={cake.name}
              className="h-full w-full rounded-xl border-2 border-solid object-cover"
            />
          )}
        </div>

        {/* 0. DETAILS SECTION */}
        <div className="flex w-full flex-col justify-center p-8 lg:w-1/2 lg:p-8">
          {cake && (
            <div className="flex flex-col items-start gap-8 text-left">
              {/* 1. HEADER SECTION */}
              <div className="space-y-4">
                {/* Category Badge */}
                <span className="inline-block rounded-full bg-pink-200 px-4 py-1.5 text-sm font-semibold tracking-wide text-pink-700">
                  {cake.category}
                </span>

                <h1 className="text-4xl font-bold tracking-tight text-slate-900 lg:text-5xl">
                  {cake.name}
                </h1>
              </div>

              {/* 2. DESCRIPTION SECTION */}
              <div className="space-y-3 rounded-xl bg-pink-200 p-3">
                <h3 className="text-sm font-bold uppercase tracking-widest text-slate-400">
                  Description
                </h3>
                <p className="text-sm leading-relaxed text-slate-600">
                  {cake.description}
                </p>
              </div>

              {/* 3. DETAILS SECTION */}
              <div className="space-y-3 rounded-xl bg-pink-200 p-3">
                <h3 className="text-sm font-bold uppercase tracking-widest text-slate-400">
                  Details
                </h3>
                <p className="text-sm leading-relaxed text-slate-600">
                  Three-tier buttercream cake with handcrafted sugar roses.
                  Perfect for intimate weddings up to 100 guests.
                </p>
              </div>

              {/* 4. ACTION BUTTON */}
              <div className="pt-2">
                <Button
                  size="lg"
                  className="rounded-full px-8 text-lg shadow-lg transition-all hover:shadow-xl"
                >
                  Request a Quote
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="item-center flex w-full justify-center bg-blue-400">
        Similar Cakes
      </div>
    </main>
  )
}
