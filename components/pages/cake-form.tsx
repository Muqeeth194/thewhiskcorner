"use client"

import { Cake } from "@/types/contents"
import React, { useEffect, useState, useRef } from "react"
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
import {
  ImageIcon,
  Info,
  Loader2,
  Trash,
  Upload,
  X,
  ChevronDown,
  Check,
} from "lucide-react"
import { toast } from "sonner"
import { useRouter, useSearchParams } from "next/navigation"
import { Skeleton } from "../ui/skeleton"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { CHOCOLATE_FLAVORS, VANILLA_FLAVORS } from "@/config/contents"
import { uploadImageToCloudinary } from "@/lib/cloudinary/upload"

export default function CakeForm() {
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const searchParams = useSearchParams()
  const searchId = searchParams.get("id") || null

  // State for Custom Flavor Dropdown
  const [isFlavorOpen, setIsFlavorOpen] = useState(false)
  const flavorDropdownRef = useRef<HTMLDivElement>(null)

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

  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [previewUrl, setPreviewUrl] = useState<string>("")

  // Validation Logic
  const isFormValid =
    (cakeFormData.name || "").trim() !== "" &&
    (cakeFormData.status || "").trim() !== "" &&
    (cakeFormData.category || "").trim() !== "" &&
    (cakeFormData.description || "").trim() !== "" &&
    (cakeFormData.details?.servings || "").toString().trim() !== "" &&
    (cakeFormData.details?.flavor || "").trim() !== "" &&
    (cakeFormData.details?.leadTime || "").trim() !== "" &&
    previewUrl !== ""

  // Helper to parse current selected flavors from string to array
  const currentFlavors = cakeFormData.details?.flavor
    ? cakeFormData.details.flavor
        .split(",")
        .map((f) => f.trim())
        .filter(Boolean)
    : []

  // Helper to toggle flavors
  const toggleFlavor = (flavor: string) => {
    const newFlavors = currentFlavors.includes(flavor)
      ? currentFlavors.filter((f) => f !== flavor) // Remove
      : [...currentFlavors, flavor] // Add

    setCakeFormData({
      ...cakeFormData,
      details: {
        ...cakeFormData.details!,
        flavor: newFlavors.join(", "), // Convert back to string for DB
      },
    })
  }

  // Handle click outside to close flavor dropdown
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        flavorDropdownRef.current &&
        !flavorDropdownRef.current.contains(event.target as Node)
      ) {
        setIsFlavorOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  // Load existing cake data if editing
  useEffect(() => {
    const fetchData = async () => {
      if (!searchId) return

      try {
        setLoading(true)

        const idResponse = await fetch(`/api/cakes/${searchId}`)
        if (!idResponse.ok) throw new Error("Failed to fetch")
        const cakeData = await idResponse.json()

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
          parsedDetails = cakeData.details
        }

        setCakeFormData((prev) => ({
          ...prev,
          ...cakeData,
          details: {
            ...prev.details,
            ...parsedDetails,
          },
        }))

        if (cakeData.image) {
          setPreviewUrl(cakeData.image)
        }

        setLoading(false)
      } catch (error) {
        console.error("failed to fetch the cakes", error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [searchId])

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    if (!file.type.startsWith("image/")) {
      toast.error("Please select an image file")
      return
    }

    if (file.size > 10 * 1024 * 1024) {
      toast.error("Image must be less than 10MB")
      return
    }

    setSelectedFile(file)
    const localPreview = URL.createObjectURL(file)
    setPreviewUrl(localPreview)
  }

  const handleRemoveImage = () => {
    setSelectedFile(null)
    setPreviewUrl("")
    const fileInput = document.getElementById(
      "image-upload"
    ) as HTMLInputElement
    if (fileInput) fileInput.value = ""
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!searchId && !selectedFile) {
      toast.error("Please select an image")
      return
    }

    if (!previewUrl) {
      toast.error("Please select an image")
      return
    }

    try {
      setLoading(true)
      let imageUrl = cakeFormData.image

      if (selectedFile) {
        toast.info("Uploading image...")
        imageUrl = await uploadImageToCloudinary(selectedFile)
        toast.success("Image uploaded!")
      }

      const url = searchId ? `/api/cakes/${searchId}` : "/api/cakes"
      const method = searchId ? "PUT" : "POST"

      const dataToSend = {
        ...cakeFormData,
        image: imageUrl,
      }

      const res = await axios({
        method: method,
        url: url,
        data: dataToSend,
        headers: { "Content-Type": "application/json" },
      })

      if (!res) throw new Error("Failed to save")

      toast.success(searchId ? "Cake updated!" : "Cake created!")

      router.push("/admin")
    } catch (error) {
      console.error(error)
      toast.error("Something went wrong.")
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async () => {
    if (!searchId) return

    const confirmDelete = window.confirm(
      "Are you sure you want to delete this cake? This action cannot be undone."
    )
    if (!confirmDelete) return

    try {
      setLoading(true)
      const response = await axios.delete(`/api/cakes/${searchId}`)

      if (response.status === 200) {
        toast.success("Cake deleted successfully")
        router.push("/admin")
      }
    } catch (error) {
      console.error("Delete error:", error)
      toast.error("Failed to delete cake")
    } finally {
      setLoading(false)
    }
  }

  if (loading && !cakeFormData.name) {
    return (
      <main className="container pb-12 pt-8">
        <div className="mx-auto max-w-3xl px-4 md:px-0">
          <Skeleton className="mb-6 h-4 w-48 bg-pink-200/60" />
          <div className="space-y-8 rounded-3xl border border-pink-100 bg-white p-6 shadow-xl md:p-12">
            <div className="flex justify-center space-y-2 text-center">
              <Skeleton className="h-10 w-48 rounded-lg bg-pink-200/60" />
            </div>
            <div className="space-y-7">
              <div className="grid gap-4 md:grid-cols-2">
                <Skeleton className="h-20 w-full bg-pink-200/60" />
                <Skeleton className="h-20 w-full bg-pink-200/60" />
              </div>
            </div>
          </div>
        </div>
      </main>
    )
  }

  return (
    <main className="container pb-12 pt-0">
      <div className="mx-auto max-w-3xl px-4 md:px-0">
        <div className="mb-6 ml-2">
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink
                  href="/"
                  className="text-slate-500 transition-colors hover:text-pink-600"
                >
                  Home
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator className="text-slate-300" />
              <BreadcrumbItem>
                <BreadcrumbLink
                  href="/admin"
                  className="text-slate-500 transition-colors hover:text-pink-600"
                >
                  Dashboard
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator className="text-slate-300" />
              <BreadcrumbItem>
                <BreadcrumbPage className="font-medium text-pink-900">
                  {searchId ? "Edit Cake" : "New Cake"}
                </BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>

        <div className="space-y-8 rounded-3xl border border-pink-100 bg-white p-6 shadow-xl md:p-12">
          <div className="space-y-2 text-center">
            <HeadingText>
              {searchId ? "Edit Cake Details" : "Add a New Cake"}
            </HeadingText>
          </div>

          <form onSubmit={handleSubmit} className="space-y-7">
            {/* IMAGE UPLOAD SECTION */}
            <div className="w-full space-y-4">
              <Label className="text-slate-600">Upload Cake Image</Label>

              {previewUrl ? (
                <div className="relative w-full">
                  <div className="relative aspect-video h-28 w-full overflow-hidden rounded-xl border-2 border-pink-100 bg-pink-50">
                    <img
                      src={previewUrl}
                      alt="Cake preview"
                      className="h-full w-full object-contain"
                    />
                  </div>
                  <Button
                    type="button"
                    variant="destructive"
                    size="icon"
                    className="absolute right-3 top-3 h-8 w-8 rounded-full shadow-md"
                    onClick={handleRemoveImage}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                  <p className="mt-2 text-center text-xs text-slate-400">
                    {selectedFile ? selectedFile.name : "Current saved image"}
                  </p>
                </div>
              ) : (
                <label
                  htmlFor="image-upload"
                  className="flex h-28 w-full cursor-pointer flex-col items-center justify-center gap-3 rounded-xl border-2 border-dashed border-pink-200 bg-pink-50/30 transition-all hover:border-pink-400 hover:bg-pink-50/50"
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-pink-100 text-pink-500">
                    <ImageIcon className="h-6 w-6" />
                  </div>
                  <div className="text-center">
                    <p className="text-sm font-semibold text-slate-700">
                      Click to upload image
                    </p>
                    <p className="text-xs text-slate-400">
                      PNG, JPG up to 10MB
                    </p>
                  </div>
                  <input
                    id="image-upload"
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleFileChange}
                  />
                </label>
              )}
            </div>

            <hr className="w-full border-pink-100" />

            <div className="grid gap-6 md:grid-cols-2">
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

              <div className="space-y-2">
                <Label htmlFor="status" className="text-slate-600">
                  Status
                </Label>
                <div className="relative">
                  <select
                    id="status"
                    className="flex h-10 w-full appearance-none rounded-md border border-pink-100 bg-pink-50/30 px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pink-100"
                    value={cakeFormData.status || ""}
                    onChange={(e) =>
                      setCakeFormData({
                        ...cakeFormData,
                        status: e.target.value,
                      })
                    }
                  >
                    <option>Active</option>
                    <option>Draft</option>
                  </select>
                </div>
              </div>

              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="category" className="text-slate-600">
                  Category
                </Label>
                <Select
                  value={cakeFormData.category || ""}
                  onValueChange={(value) =>
                    setCakeFormData({ ...cakeFormData, category: value })
                  }
                >
                  <SelectTrigger className="w-full border-pink-100 bg-pink-50/30">
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Category</SelectLabel>
                      <SelectItem value="Wedding Cakes">
                        Wedding Cakes
                      </SelectItem>
                      <SelectItem value="Celebration Cakes">
                        Celebration Cakes
                      </SelectItem>
                      <SelectItem value="Anniversary Cakes">
                        Anniversary Cakes
                      </SelectItem>
                      <SelectItem value="Deserts">Deserts</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description" className="text-slate-600">
                Description
              </Label>
              <Textarea
                required
                id="description"
                placeholder="Describe the cake design, textures, and details..."
                className="min-h-[120px] border-pink-100 bg-pink-50/30 leading-relaxed"
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
            <div className="rounded-xl border border-pink-100 bg-pink-50/40 p-6">
              <h4 className="mb-4 font-semibold text-slate-700">
                Product Specifications
              </h4>

              <div className="grid gap-4 sm:grid-cols-4">
                <div className="space-y-2">
                  <Label htmlFor="servings" className="text-xs text-slate-500">
                    Servings
                  </Label>
                  <Input
                    required
                    id="servings"
                    placeholder="e.g. 100"
                    className="border-white bg-white"
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

                {/* ✅ UPDATED: MULTI-SELECT FLAVOR SECTION WITH PILLS */}
                <div
                  className="relative space-y-2 sm:col-span-2"
                  ref={flavorDropdownRef}
                >
                  <Label htmlFor="flavor" className="text-xs text-slate-500">
                    Base Flavor (Multi-Select)
                  </Label>

                  {/* Custom Trigger behaving like Shadcn Select */}
                  <div
                    className="flex h-auto min-h-[2.5rem] w-full cursor-pointer items-center justify-between rounded-md border border-white bg-white px-3 py-2 text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    onClick={() => setIsFlavorOpen(!isFlavorOpen)}
                  >
                    {currentFlavors.length > 0 ? (
                      <div className="flex flex-wrap gap-1">
                        {currentFlavors.map((flavor) => (
                          <span
                            key={flavor}
                            className="inline-flex items-center rounded-full bg-pink-100 px-2 py-0.5 text-xs font-medium text-pink-800"
                            onClick={(e) => {
                              e.stopPropagation() // Prevent opening/closing dropdown when clicking remove
                              toggleFlavor(flavor)
                            }}
                          >
                            {flavor}
                            <X className="ml-1 h-3 w-3 cursor-pointer hover:text-pink-900" />
                          </span>
                        ))}
                      </div>
                    ) : (
                      <span className="text-muted-foreground">
                        Select flavors...
                      </span>
                    )}
                    <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                  </div>

                  {/* Custom Dropdown Content */}
                  {isFlavorOpen && (
                    <div className="absolute z-50 mt-1 max-h-60 w-full overflow-y-auto rounded-md border border-slate-200 bg-white p-1 shadow-md">
                      {/* Chocolate Section */}
                      <div className="px-2 py-1.5 text-xs font-semibold text-slate-500">
                        Chocolate Based
                      </div>
                      {CHOCOLATE_FLAVORS.map((flavor) => {
                        const isSelected = currentFlavors.includes(flavor)
                        return (
                          <div
                            key={flavor}
                            onClick={() => toggleFlavor(flavor)}
                            className="relative flex w-full cursor-pointer select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none hover:bg-slate-100 hover:text-slate-900"
                          >
                            <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
                              {isSelected && (
                                <Check className="h-4 w-4 text-pink-600" />
                              )}
                            </span>
                            <span>{flavor}</span>
                          </div>
                        )
                      })}

                      <div className="my-1 h-px bg-slate-100" />

                      {/* Vanilla Section */}
                      <div className="px-2 py-1.5 text-xs font-semibold text-slate-500">
                        Vanilla Based
                      </div>
                      {VANILLA_FLAVORS.map((flavor) => {
                        const isSelected = currentFlavors.includes(flavor)
                        return (
                          <div
                            key={flavor}
                            onClick={() => toggleFlavor(flavor)}
                            className="relative flex w-full cursor-pointer select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none hover:bg-slate-100 hover:text-slate-900"
                          >
                            <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
                              {isSelected && (
                                <Check className="h-4 w-4 text-pink-600" />
                              )}
                            </span>
                            <span>{flavor}</span>
                          </div>
                        )
                      })}
                    </div>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="leadTime" className="text-xs text-slate-500">
                    Lead Time
                  </Label>
                  <Input
                    required
                    id="leadTime"
                    placeholder="e.g. 2 weeks"
                    className="border-white bg-white"
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

            <div className="flex w-full flex-col items-center justify-center gap-4 pt-2 sm:flex-row">
              <Button
                type="submit"
                disabled={loading || !isFormValid}
                className="h-12 w-full gap-2 rounded-full bg-pink-700 text-lg text-white shadow-lg transition-all hover:bg-pink-800 hover:shadow-xl sm:w-2/3"
              >
                {loading ? (
                  <>
                    <Loader2 className="h-5 w-5 animate-spin" />
                    Saving...
                  </>
                ) : (
                  <>
                    <Upload className="h-5 w-5" />
                    {searchId ? "Update Cake" : "Create Cake"}
                  </>
                )}
              </Button>

              {searchId && (
                <Button
                  type="button"
                  variant="destructive"
                  disabled={loading}
                  onClick={handleDelete}
                  className="h-12 w-full gap-2 rounded-full shadow-lg sm:w-auto sm:px-6"
                >
                  <Trash className="h-5 w-5" />
                  Delete
                </Button>
              )}
            </div>

            <div className="flex items-center justify-center gap-2 text-center text-xs text-slate-400">
              <Info className="h-3 w-3" />
              <p>Double check details before saving.</p>
            </div>
          </form>
        </div>
      </div>
    </main>
  )
}
