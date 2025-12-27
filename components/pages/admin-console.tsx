"use client"

import React, { useEffect, useState } from "react"
import { Button } from "../ui/button"
import Link from "next/link"
import { columns } from "./columns"
import { DataTable } from "./data-table"
import { CakeTable } from "@/types/contents"

export default function AdminConsole() {
  const [cakes, setCakes] = useState<CakeTable[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/cakes")
        const cakeData = await response.json()
        setCakes(cakeData)
      } catch (error) {
        console.error("Error Fetching the data from the API", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchData()
  }, [])

  return (
    <main className="container">
      {/* NEW CAKE BUTTON */}
      <div className="w-full space-x-3 p-1">
        <Button
          asChild
          variant="outline"
          className="rounded-full border-pink-700 bg-pink-700 px-6 text-base text-white shadow-md hover:bg-pink-800 hover:text-white"
        >
          <Link href="/admin/cakes/new">+ Add New Cake</Link>
        </Button>

        <Button
          asChild
          variant="outline"
          className="rounded-full border-pink-700 bg-pink-700 px-6 text-base text-white shadow-md hover:bg-pink-800 hover:text-white"
        >
          <Link href="/#">View Quote Requests</Link>
        </Button>
      </div>

      {/* GALLERY TABLE VIEW */}
      <div className="container mx-auto px-2 py-4">
        {isLoading ? (
          <div> Loading Data...</div>
        ) : (
          <DataTable columns={columns} data={cakes} />
        )}
      </div>
    </main>
  )
}
