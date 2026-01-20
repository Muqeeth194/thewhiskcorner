"use client"

import { useEffect, useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Send,
  Loader2,
  CheckCircle,
  Info,
  X,
  ChevronDown,
  Check,
} from "lucide-react"
import { toast } from "sonner"
import { Cake, Form } from "@/types/contents"
import HeadingText from "../heading-text"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { useSearchParams } from "next/navigation"

// ✅ FLAVOR CONSTANTS
const CHOCOLATE_FLAVORS = [
  "Classic truffle",
  "Rich Chocolate and raspberry",
  "Dulce de leche",
  "Chocolate and caramel",
  "Chocolate & Hazelnuts Praline",
  "Hazelnut praline with french biscuits",
  "Mocha",
  "Chocolate Biscoff",
  "Nutella hazelnut",
  "Nutella Strawberry (seasonal)",
  "Hazelnut praline French Biscuit and Caramel",
]

const VANILLA_FLAVORS = [
  "Strawberry and cream (seasonal)",
  "Lemon and raspberry",
  "Vanilla and caramel",
  "Caramel & roasted almonds",
  "Biscoff",
  "Almond praline",
  "Vanilla and Milk chocolate",
]

export default function QuoteForm() {
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)

  // State to store the fetched cake details
  const [cakeData, setCakeData] = useState<Cake | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  const searchParams = useSearchParams()
  const searchId = searchParams.get("cakeId")

  // ✅ FLAVOR DROPDOWN STATE
  const [isFlavorOpen, setIsFlavorOpen] = useState(false)
  const flavorDropdownRef = useRef<HTMLDivElement>(null)

  // 1. STATE FOR FORM FIELDS
  const [quoteFormData, setQuoteFormData] = useState<Form>({
    name: "",
    contact: "",
    instagram: "",
    type: "Wedding Cake",
    flavour: "",
    servings: "",
    budget: "",
    message: "",
  })

  // ✅ HELPER: Parse current selected flavors
  const currentFlavors = quoteFormData.flavour
    ? quoteFormData.flavour
        .split(",")
        .map((f) => f.trim())
        .filter(Boolean)
    : []

  // ✅ HELPER: Toggle flavors
  const toggleFlavor = (flavor: string) => {
    const newFlavors = currentFlavors.includes(flavor)
      ? currentFlavors.filter((f) => f !== flavor) // Remove
      : [...currentFlavors, flavor] // Add

    setQuoteFormData({
      ...quoteFormData,
      flavour: newFlavors.join(", "), // Convert back to string
    })
  }

  // ✅ EFFECT: Close dropdown on click outside
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

  // 3. Fetch the cake details & AUTOFILL FORM
  useEffect(() => {
    const fetchData = async () => {
      if (!searchId) {
        setIsLoading(false)
        return
      }

      try {
        const idResponse = await fetch(`/api/cakes/${searchId}`)
        const data = await idResponse.json()
        setCakeData(data)

        // AUTOFILL LOGIC:
        if (data && data.category) {
          setQuoteFormData((prev) => ({
            ...prev,
            type: data.category,
          }))
        }
      } catch (error) {
        console.error("failed to fetch the cakes", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchData()
  }, [searchId])

  // 2. HANDLE SUBMISSION
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const response = await fetch("/api/quote", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          ...quoteFormData,
          selected_cake_id: cakeData?.id || null,
          selected_cake_name: cakeData?.name || null,
        }),
      })

      const result = await response.json()

      if (result.success) {
        toast.success(result.message)
        setSuccess(true)
        setQuoteFormData({
          name: "",
          contact: "",
          instagram: "",
          type: quoteFormData.type,
          flavour: "",
          servings: "",
          budget: "",
          message: "",
        })
      } else {
        toast.error("Something went wrong. Please try again.")
      }
    } catch (error) {
      console.error("Error submitting form", error)
      toast.error("Failed to send message.")
    } finally {
      setLoading(false)
    }
  }

  if (success) {
    return (
      <main className="container mx-auto max-w-2xl py-6">
        {/* SUCCESS STATE UI */}
        <Breadcrumb className="px-4 md:p-4">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/">Home</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Request Sent</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        <div className="mt-8 flex min-h-[400px] flex-col items-center justify-center space-y-4 rounded-3xl border border-pink-100 bg-pink-50/50 p-6 text-center md:p-8">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
            <CheckCircle className="h-8 w-8 text-green-600" />
          </div>
          <h3 className="font-serif text-2xl font-bold text-pink-950">
            Request Received!
          </h3>
          <p className="max-w-xs text-slate-600">
            Thanks, {quoteFormData.name}! We will review your requirements for
            the <strong>{cakeData?.name}</strong> and contact you shortly.
          </p>
          <Button
            variant="outline"
            onClick={() => setSuccess(false)}
            className="mt-4 border-pink-200 text-pink-900"
          >
            Send Another Request
          </Button>
        </div>
      </main>
    )
  }

  return (
    <main className="container pb-12 pt-2">
      {/* BREADCRUMBS */}
      <section className="items-left">
        <Breadcrumb className="px-4 md:pb-10">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/">Home</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href="/gallery">Gallery</BreadcrumbLink>
            </BreadcrumbItem>
            {searchId && (
              <>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbLink href={`/cake?id=${searchId}`}>
                    Cake Details
                  </BreadcrumbLink>
                </BreadcrumbItem>
              </>
            )}
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Request Quote</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </section>

      <div className="mx-4 max-w-3xl space-y-8 rounded-3xl border border-pink-100 bg-white p-6 shadow-xl md:mx-auto md:p-12">
        {/* HEADER */}
        <div className="space-y-2 text-center">
          <HeadingText subtext="Customize your order details below.">
            Get a Quote
          </HeadingText>
        </div>

        {/* 1. SELECTED CAKE PREVIEW CARD */}
        {!isLoading && cakeData && (
          <div className="flex w-full justify-center">
            {/* Added md:w-auto to prevent fixed width issue on mobile */}
            <div className="flex w-full items-center gap-5 rounded-2xl border border-pink-100 bg-pink-50 p-4 md:w-auto lg:w-[35vw]">
              <div className="h-20 w-20 shrink-0 overflow-hidden rounded-xl bg-white shadow-sm">
                <img
                  src={cakeData.image}
                  alt={cakeData.name}
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="flex min-w-0 flex-col text-left">
                <span className="text-xs font-bold uppercase tracking-wider text-pink-400">
                  Inquiring About
                </span>
                <h3 className="truncate font-serif text-lg font-bold text-pink-950">
                  {cakeData.name}
                </h3>
                <p className="line-clamp-1 text-xs text-slate-500">
                  Category: {cakeData.category}
                </p>
              </div>
            </div>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-7">
          {/* PERSONAL DETAILS SECTION */}
          {/* Added grid-cols-1 for mobile, md:grid-cols-2 for tablet+ */}
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="name" className="text-slate-600">
                Your Name
              </Label>
              <Input
                required
                id="name"
                placeholder="e.g. Mahreen Khan"
                className="border-pink-100 bg-pink-50/30"
                value={quoteFormData.name}
                onChange={(e) =>
                  setQuoteFormData({ ...quoteFormData, name: e.target.value })
                }
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="contact" className="text-slate-600">
                Phone / Email
              </Label>
              <Input
                required
                id="contact"
                placeholder="e.g. 9876543210"
                className="border-pink-100 bg-pink-50/30"
                value={quoteFormData.contact}
                onChange={(e) =>
                  setQuoteFormData({
                    ...quoteFormData,
                    contact: e.target.value,
                  })
                }
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="instagram" className="text-slate-600">
              Instagram Handle (Optional)
            </Label>
            <Input
              id="instagram"
              placeholder="@yourusername (Helps us identify you)"
              className="border-pink-100 bg-pink-50/30"
              value={quoteFormData.instagram}
              onChange={(e) =>
                setQuoteFormData({
                  ...quoteFormData,
                  instagram: e.target.value,
                })
              }
            />
          </div>

          <hr className="border-pink-100" />

          {/* CAKE DETAILS SECTION */}
          {/* Added grid-cols-1 for mobile, md:grid-cols-2 for tablet+ */}
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="type" className="text-slate-600">
                Occasion / Category
              </Label>
              <select
                id="type"
                className="flex h-10 w-full rounded-md border border-pink-100 bg-pink-50/30 px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pink-100"
                value={quoteFormData.type}
                onChange={(e) =>
                  setQuoteFormData({ ...quoteFormData, type: e.target.value })
                }
              >
                <option>Wedding Cake</option>
                <option>Celebration Cake</option>
                <option>Anniversary Cake</option>
                <option>Deserts</option>
                <option>Other</option>
              </select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="servings" className="text-slate-600">
                No. of Guests
              </Label>
              <Input
                type="number"
                id="servings"
                placeholder="e.g. 50"
                className="border-pink-100 bg-pink-50/30"
                value={quoteFormData.servings}
                onChange={(e) =>
                  setQuoteFormData({
                    ...quoteFormData,
                    servings: e.target.value,
                  })
                }
              />
            </div>
          </div>

          {/* ✅ UPDATED: MULTI-SELECT FLAVOR SECTION */}
          <div className="relative space-y-2" ref={flavorDropdownRef}>
            <Label htmlFor="flavour" className="text-slate-600">
              Preferred Flavour(s)
            </Label>

            {/* Custom Trigger */}
            <div
              className="flex h-auto min-h-[2.5rem] w-full cursor-pointer items-center justify-between rounded-md border border-pink-100 bg-pink-50/30 px-3 py-2 text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-pink-200"
              onClick={() => setIsFlavorOpen(!isFlavorOpen)}
            >
              {currentFlavors.length > 0 ? (
                <div className="flex flex-wrap gap-1">
                  {currentFlavors.map((flavor) => (
                    <span
                      key={flavor}
                      className="inline-flex items-center rounded-full border border-pink-200 bg-pink-200/60 px-2 py-0.5 text-xs font-medium text-pink-900"
                      onClick={(e) => {
                        e.stopPropagation()
                        toggleFlavor(flavor)
                      }}
                    >
                      {flavor}
                      <X className="ml-1 h-3 w-3 cursor-pointer hover:text-red-500" />
                    </span>
                  ))}
                </div>
              ) : (
                <span className="text-slate-400">Select flavors...</span>
              )}
              <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
            </div>

            {/* Custom Dropdown Content */}
            {isFlavorOpen && (
              <div className="absolute z-50 mt-1 max-h-60 w-full overflow-y-auto rounded-md border border-pink-200 bg-white p-1 shadow-lg">
                <div className="bg-pink-50/50 px-2 py-1.5 text-xs font-semibold text-slate-500">
                  Chocolate Based
                </div>
                {CHOCOLATE_FLAVORS.map((flavor) => {
                  const isSelected = currentFlavors.includes(flavor)
                  return (
                    <div
                      key={flavor}
                      onClick={() => toggleFlavor(flavor)}
                      className="relative flex w-full cursor-pointer select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none transition-colors hover:bg-pink-50 hover:text-pink-900"
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

                <div className="my-1 h-px bg-pink-100" />

                <div className="bg-pink-50/50 px-2 py-1.5 text-xs font-semibold text-slate-500">
                  Vanilla Based
                </div>
                {VANILLA_FLAVORS.map((flavor) => {
                  const isSelected = currentFlavors.includes(flavor)
                  return (
                    <div
                      key={flavor}
                      onClick={() => toggleFlavor(flavor)}
                      className="relative flex w-full cursor-pointer select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none transition-colors hover:bg-pink-50 hover:text-pink-900"
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

            <p className="text-[10px] text-slate-400">
              You can select multiple. We can suggest pairings if you
              aren&apos;t sure!
            </p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="budget" className="text-slate-600">
              Approx. Budget (Optional)
            </Label>
            <Input
              id="budget"
              placeholder="e.g. ₹3000 - ₹5000"
              className="border-pink-100 bg-pink-50/30"
              value={quoteFormData.budget}
              onChange={(e) =>
                setQuoteFormData({ ...quoteFormData, budget: e.target.value })
              }
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="message" className="text-slate-600">
              Additional Customization Details
            </Label>
            <Textarea
              required
              id="message"
              placeholder="I want to change the flowers to blue, and add a topper saying 'Happy 25th'..."
              className="min-h-[100px] border-pink-100 bg-pink-50/30"
              value={quoteFormData.message}
              onChange={(e) =>
                setQuoteFormData({ ...quoteFormData, message: e.target.value })
              }
            />
          </div>

          <div className="flex w-full justify-center pt-4">
            <Button
              type="submit"
              disabled={loading}
              className="h-12 w-full gap-2 rounded-full bg-pink-700 text-lg text-white shadow-lg transition-all hover:bg-pink-800 hover:shadow-xl sm:w-3/4"
            >
              {loading ? (
                <>
                  <Loader2 className="h-5 w-5 animate-spin" />
                  Sending Request...
                </>
              ) : (
                <>
                  <Send className="h-5 w-5" />
                  Get My Quote
                </>
              )}
            </Button>
          </div>

          <div className="flex items-center justify-center gap-2 text-center text-xs text-slate-400">
            <Info className="h-3 w-3" />
            <p>
              This is a request for availability & pricing, not a confirmed
              order.
            </p>
          </div>
        </form>
      </div>
    </main>
  )
}
