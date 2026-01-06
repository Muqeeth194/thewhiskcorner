"use client"

import React, { useEffect } from "react"
import { Button } from "../ui/button"
import Link from "next/link"
import { columns } from "./columns"
import { DataTable } from "./data-table"
import { useAppDispatch, useAppSelector } from "../../store/hooks"
import { fetchCakes } from "../../store/cakesSlice"

export default function AdminConsole() {
  const dispatch = useAppDispatch()
  const { data: cakes } = useAppSelector((state) => state.cakes)

  useEffect(() => {
    // Only fetches if the data is empty to avoid multiple refetches
    if (cakes.length === 0) {
      dispatch(fetchCakes())
    }
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
        <DataTable columns={columns} data={cakes} />
      </div>
    </main>
  )
}
