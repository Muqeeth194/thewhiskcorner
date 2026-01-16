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
import { ImageIcon, Info, Loader2, Upload, X } from "lucide-react"
import { toast } from "sonner"
import { useRouter, useSearchParams } from "next/navigation"
import { Skeleton } from "../ui/skeleton"
import { useAppDispatch } from "@/store/hooks"
import { fetchCakes } from "@/store/cakesSlice"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"

export default function CakeForm() {
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const searchParams = useSearchParams()
  const searchId = searchParams.get("id") || null
  // const dispatch = useAppDispatch()

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

  // 🆕 NEW: Validation Logic
  const isFormValid =
    (cakeFormData.name || "").trim() !== "" &&
    (cakeFormData.status || "").trim() !== "" &&
    (cakeFormData.category || "").trim() !== "" &&
    (cakeFormData.description || "").trim() !== "" &&
    (cakeFormData.details?.servings || "").toString().trim() !== "" &&
    (cakeFormData.details?.flavor || "").trim() !== "" &&
    (cakeFormData.details?.leadTime || "").trim() !== "" &&
    previewUrl !== "" // Must have an image (either new or existing)

  // Load existing cake data if editing
  useEffect(() => {
    // FIXED: Defined fetchData inside useEffect to prevent build errors
    const fetchData = async () => {
      if (!searchId) return // Dont fetch anything if no ID exists

      try {
        setLoading(true)

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

        // Set existing image preview
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
  }, [searchId]) // Now only depends on searchId

  //  Handle file selection
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    // Validate file type
    if (!file.type.startsWith("image/")) {
      toast.error("Please select an image file")
      return
    }

    // Validate file size (10MB)
    if (file.size > 10 * 1024 * 1024) {
      toast.error("Image must be less than 10MB")
      return
    }

    setSelectedFile(file)

    //  Create local preview URL
    const localPreview = URL.createObjectURL(file)
    setPreviewUrl(localPreview)
  }

  //  Remove selected image
  const handleRemoveImage = () => {
    setSelectedFile(null)
    setPreviewUrl("")
    // Reset file input
    const fileInput = document.getElementById(
      "image-upload"
    ) as HTMLInputElement
    if (fileInput) fileInput.value = ""
  }

  // console.log("search id updated data", cakeFormData)
  // console.log("Image preview URL", previewUrl)

  //  Upload image to Cloudinary
  const uploadImageToCloudinary = async (file: File): Promise<string> => {
    const formData = new FormData()
    formData.append("file", file)
    formData.append("upload_preset", "cake_uploads")
    formData.append("folder", "cakes")

    try {
      const response = await fetch(
        `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
        {
          method: "POST",
          body: formData,
        }
      )

      if (!response.ok) throw new Error("Failed to upload image")

      const data = await response.json()
      return data.secure_url
    } catch (error) {
      console.error("Cloudinary upload error:", error)
      throw new Error("Failed to upload image to Cloudinary")
    }
  }

  console.log("selected file status:", selectedFile)
  console.log("preview URL:", previewUrl)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // Validate image for new cakes
    if (!searchId && !selectedFile) {
      toast.error("Please select an image")
      return
    }

    // Make sure the image is always selected
    if (!previewUrl) {
      toast.error("Please select an image")
      return
    }

    try {
      setLoading(true)
      let imageUrl = cakeFormData.image // Keep existing image URL if editing

      // ✅ Upload new image ONLY on form submit
      if (selectedFile) {
        toast.info("Uploading image...")
        imageUrl = await uploadImageToCloudinary(selectedFile)
        toast.success("Image uploaded!")
      }

      // Determin if its a edit request or new request
      const url = searchId ? `/api/cakes/${searchId}` : "/api/cakes"

      // Based in the initial data decide the method
      const method = searchId ? "PUT" : "POST"

      // ✅ Include image URL in form data
      const dataToSend = {
        ...cakeFormData,
        image: imageUrl, // Add the Cloudinary URL
      }

      const res = await axios({
        method: method,
        url: url,
        data: dataToSend, // Axios handles JSON.stringify automatically
        headers: { "Content-Type": "application/json" }, // (Optional) Axios sets this automatically
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

  // 1. SKELETON LOADER (Updated layout)
  if (loading) {
    return (
      <main className="container pb-12 pt-8">
        <div className="mx-auto max-w-3xl px-4 md:px-0">
          {/* Skeleton for Breadcrumbs */}
          <Skeleton className="mb-6 h-4 w-48 bg-pink-200/60" />

          <div className="space-y-8 rounded-3xl border border-pink-100 bg-white p-6 shadow-xl md:p-12">
            {/* Header Skeleton */}
            <div className="flex justify-center space-y-2 text-center">
              <Skeleton className="h-10 w-48 rounded-lg bg-pink-200/60" />
            </div>
            {/* Form Skeleton */}
            <div className="space-y-7">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Skeleton className="h-4 w-20 bg-pink-200/60" />
                  <Skeleton className="h-10 w-full rounded-md bg-pink-200/60" />
                </div>
                <div className="space-y-2">
                  <Skeleton className="h-4 w-16 bg-pink-200/60" />
                  <Skeleton className="h-10 w-full rounded-md bg-pink-200/60" />
                </div>
                <div className="space-y-2">
                  <Skeleton className="h-4 w-20 bg-pink-200/60" />
                  <Skeleton className="h-10 w-full rounded-md bg-pink-200/60" />
                </div>
              </div>
              <hr className="w-full border-pink-100" />
              <div className="space-y-2">
                <Skeleton className="h-4 w-40 bg-pink-200/60" />
                <Skeleton className="h-[100px] w-full rounded-md bg-pink-200/60" />
              </div>
              <div className="flex w-full justify-center pt-4">
                <Skeleton className="h-12 w-3/4 rounded-full bg-pink-200/60" />
              </div>
            </div>
          </div>
        </div>
      </main>
    )
  }

  console.log("form valid status:", isFormValid)

  // 2. MAIN RETURN (Updated Layout)
  return (
    <main className="container pb-12 pt-0">
      {/* Wrapper to align Breadcrumbs and Card */}
      <div className="mx-auto max-w-3xl px-4 md:px-0">
        {/* ✅ BREADCRUMBS: Moved outside the card & styled */}
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

        {/* ✅ WHITE CONTENT CARD */}
        <div className="space-y-8 rounded-3xl border border-pink-100 bg-white p-6 shadow-xl md:p-12">
          {/* HEADER */}
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
                  <div className="relative aspect-video h-48 w-full overflow-hidden rounded-xl border-2 border-pink-100 bg-pink-50">
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
                  className="flex h-48 w-full cursor-pointer flex-col items-center justify-center gap-3 rounded-xl border-2 border-dashed border-pink-200 bg-pink-50/30 transition-all hover:border-pink-400 hover:bg-pink-50/50"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-pink-100 text-pink-500">
                    <ImageIcon className="h-6 w-6" />
                  </div>
                  <div className="text-center">
                    <p className="font-semibold text-slate-700">
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

            {/* FORM INPUTS */}
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

              <div className="grid gap-4 sm:grid-cols-3">
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

                <div className="space-y-2">
                  <Label htmlFor="flavor" className="text-xs text-slate-500">
                    Base Flavor
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
                    <SelectTrigger className="w-full border-white bg-white">
                      <SelectValue placeholder="Select" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectItem value="Chocolate">Chocolate</SelectItem>
                        <SelectItem value="Vanilla">Vanilla</SelectItem>
                        <SelectItem value="Red Velvet">Red Velvet</SelectItem>
                        <SelectItem value="Blueberry">Blueberry</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
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

            {/* SUBMIT BUTTON */}
            <div className="flex w-full justify-center pt-2">
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
