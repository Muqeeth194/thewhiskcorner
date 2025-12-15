import { Cake, cakeIdParams } from "@/types/contents"
import React, { useEffect, useState } from "react"

export default function CakeDetailsPage({ id }: cakeIdParams) {
  const [cakes, setCakes] = useState<Cake[]>([])
  const [isLoading, setIsLoading] = useState(true)

  const fetchCakes = async () => {
    try {
      const response = await fetch("/api/cakes")
      const data = await response.json()
      setCakes(data)
    } catch (error) {
      console.error("failed to fetch the cakes in cake details page", error)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchCakes()
  }, [])

  if (isLoading) {
    return <div className="py-10 text-center">Loading the cakes ...</div>
  }

  const foundCake = cakes.find((cake) => cake.id === id)

  if (!foundCake) {
    ;<div className="py-10 text-center">Cake not found</div>
  }

  return <div>{foundCake && <p> Cake is found: {foundCake.name}</p>}</div>
}
