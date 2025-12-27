"use client"

import { Cake } from "@/types/contents"
import React, { useEffect, useState } from "react"
import HeadingText from "../heading-text"
import { Label } from "@radix-ui/react-label"
import { Input } from "../ui/input"
import { Textarea } from "../ui/textarea"
import axios from "axios"

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Button } from "../ui/button"
import { Info, Loader2, Upload } from "lucide-react"
import { toast } from "sonner"
import { useRouter, useSearchParams } from "next/navigation"

export default function CakeForm() {
  const [loading, setLoading] = useState(true)
  const router = useRouter()
  const searchParams = useSearchParams()
  const searchId = searchParams.get("id") || null

  const [cakeFormData, setCakeFormData] = useState<Cake>({
    name: "",
    image: "",
    category: "",
    description: "",
    details: {
      servings: "",
      flavor: "",
      leadTime: "",
    },
    status: "Active",
  })

  useEffect(() => {
    // FIXED: Defined fetchData inside useEffect to prevent build errors
    const fetchData = async () => {
      if (!searchId) return // Dont fetch anything if no ID exists

      try {
        const idResponse = await fetch(`/api/cakes/${searchId}`)
        if (!idResponse.ok) throw new Error("Failed to fetch")
        const cakeData = await idResponse.json()
        // In order to populate the data of the 'details' object it needs to be in JSON format.
        // Check if 'details' is a string. If so, parse it to JSON.
        let parsedDetails = { servings: "", flavor: "", leadTime: "" }

        if (typeof cakeData.details === "string") {
          try {
            parsedDetails = JSON.parse(cakeData.details)
          } catch (e) {
            console.error("Could not parse details JSON", e)
          }
        } else if (
          typeof cakeData.details === "object" &&
          cakeData.details !== null
        ) {
          // It might already be an object if your DB driver handled it
          parsedDetails = cakeData.details
        }

        // Merge into state
        setCakeFormData((prev) => ({
          ...prev, // keep the default values
          ...cakeData,
          details: {
            ...prev.details, // Keep defaults if keys are missing
            ...parsedDetails, // Overwrite with parsed data
          },
        }))
      } catch (error) {
        console.error("failed to fetch the cakes", error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [searchId]) // Now only depends on searchId

  console.log("search id updated data", cakeFormData)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      // Determin if its a edit request or new request
      const url = searchId ? `/api/cakes/${searchId}` : "/api/cakes"

      // Based in the initial data decide the method
      const method = searchId ? "PUT" : "POST"

      const res = await axios({
        method: method,
        url: url,
        data: cakeFormData, // Axios handles JSON.stringify automatically
        headers: { "Content-Type": "application/json" }, // (Optional) Axios sets this automatically
      })

      if (!res) throw new Error("Failed to save")

      toast.success(searchId ? "Cake updated!" : "Cake created!")
      router.push("/admin")
      router.refresh() // Refresh server data
    } catch (error) {
      console.error(error)
      toast.error("Something went wrong.")
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return <div className="py-10 text-center">Loading the cake ...</div>
  }

  return (
    <main className="container pb-12 pt-2">
      <div className="mx-4 max-w-3xl space-y-8 rounded-3xl border border-pink-100 bg-white p-6 shadow-xl md:mx-auto md:p-12">
        {/* HEADER */}
        <div className="space-y-2 text-center">
          <HeadingText>Add a New Cake</HeadingText>
        </div>

        <form onSubmit={handleSubmit} className="space-y-7">
          <div className="grid gap-4 md:grid-cols-2">
            {/* CAKE NAME */}
            <div className="space-y-2">
              <Label htmlFor="name" className="text-slate-600">
                Cake Name
              </Label>
              <Input
                required
                id="name"
                placeholder="e.g. Vanilla cake"
                className="border-pink-100 bg-pink-50/30"
                value={cakeFormData.name || ""}
                onChange={(e) =>
                  setCakeFormData({ ...cakeFormData, name: e.target.value })
                }
              />
            </div>

            {/* STATUS */}
            <div className="space-y-2">
              <Label htmlFor="status" className="text-slate-600">
                Status
              </Label>
              <select
                id="status"
                className="flex h-10 w-full rounded-md border border-pink-100 bg-pink-50/30 px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pink-100"
                value={cakeFormData.status || ""}
                onChange={(e) =>
                  setCakeFormData({ ...cakeFormData, status: e.target.value })
                }
              >
                <option>Active</option>
                <option>Draft</option>
              </select>
            </div>

            {/* CATEGORY */}
            <div className="space-y-2">
              <Label htmlFor="category" className="text-slate-600">
                Category
              </Label>
              <Select
                value={cakeFormData.category || ""}
                onValueChange={(value) =>
                  setCakeFormData({ ...cakeFormData, category: value })
                }
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select a category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Category</SelectLabel>
                    <SelectItem value="Wedding Cake">Wedding Cake</SelectItem>
                    <SelectItem value="Celebration Cake">
                      Celebration Cake
                    </SelectItem>
                    <SelectItem value="Anniversary Cake">
                      Anniversary Cake
                    </SelectItem>
                    <SelectItem value="Deserts">Deserts</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          </div>

          <hr className="w-full border-pink-100" />

          {/* DESCRIPTION FIELD*/}
          <div className="space-y-2">
            <Label htmlFor="description" className="text-slate-600">
              Add Description of Cake
            </Label>
            <Textarea
              required
              id="description"
              placeholder="I want to change the flowers to blue, and add a topper saying 'Happy 25th'..."
              className="min-h-[100px] border-pink-100 bg-pink-50/30"
              value={cakeFormData.description || ""}
              onChange={(e) =>
                setCakeFormData({
                  ...cakeFormData,
                  description: e.target.value,
                })
              }
            />
          </div>

          {/* PRODUCT DETAILS */}
          <div className="flex flex-col space-y-4 rounded-xl bg-gray-100/30 p-4">
            <h4 className="text-slate-600">Product Details</h4>

            <div className="mx-auto w-full max-w-xs space-y-4">
              {/* SERVINGS */}
              <div className="flex items-center gap-4">
                <Label
                  htmlFor="servings"
                  className="whitespace-nowrap text-slate-600"
                >
                  Servings
                </Label>
                <Input
                  required
                  id="servings"
                  placeholder="e.g. 100 people"
                  className="border-pink-100 bg-pink-50/30"
                  value={cakeFormData.details?.servings || ""}
                  onChange={(e) =>
                    setCakeFormData({
                      ...cakeFormData,
                      details: {
                        ...cakeFormData.details!,
                        servings: e.target.value,
                      },
                    })
                  }
                />
              </div>

              {/* FLAVOR */}
              <div className="flex items-center gap-4">
                <Label
                  htmlFor="flavor"
                  className="whitespace-nowrap text-slate-600"
                >
                  Flavor
                </Label>
                <Select
                  value={cakeFormData.details?.flavor || ""}
                  onValueChange={(value) =>
                    setCakeFormData({
                      ...cakeFormData,
                      details: {
                        ...cakeFormData.details!,
                        flavor: value,
                      },
                    })
                  }
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select a flavor" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Flavor</SelectLabel>
                      <SelectItem value="Chocolate">Chocolate</SelectItem>
                      <SelectItem value="Vanilla">Vanilla</SelectItem>
                      <SelectItem value="Red Velvet">Red Velvet</SelectItem>
                      <SelectItem value="Blueberry">Blueberry</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>

              {/* LEAD TIME */}
              <div className="flex items-center gap-4">
                <Label
                  htmlFor="leadTime"
                  className="whitespace-nowrap text-slate-600"
                >
                  Lead Time
                </Label>
                <Input
                  required
                  id="leadTime"
                  placeholder="e.g. 2 weeks"
                  className="border-pink-100 bg-pink-50/30"
                  value={cakeFormData.details?.leadTime || ""}
                  onChange={(e) =>
                    setCakeFormData({
                      ...cakeFormData,
                      details: {
                        ...cakeFormData.details!,
                        leadTime: e.target.value,
                      },
                    })
                  }
                />
              </div>
            </div>
          </div>

          {/* SUBMIT BUTTON*/}
          <div className="flex w-full justify-center pt-4">
            <Button
              type="submit"
              disabled={loading}
              className="h-12 w-3/4 gap-2 rounded-full bg-pink-700 text-lg text-white shadow-lg transition-all hover:bg-pink-800 hover:shadow-xl"
            >
              {loading ? (
                <>
                  <Loader2 className="h-5 w-5 animate-spin" />
                  Uploading Data...
                </>
              ) : (
                <>
                  <Upload className="h-5 w-5" />
                  Upload Data
                </>
              )}
            </Button>
          </div>

          <div className="flex items-center justify-center gap-2 text-center text-xs text-slate-400">
            <Info className="h-3 w-3" />
            <p>Check the details before submitting the request.</p>
          </div>
        </form>
      </div>
    </main>
  )
}
