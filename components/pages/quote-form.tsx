"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Send, Loader2, CheckCircle, Info } from "lucide-react"
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

export default function QuoteForm() {
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)

  // State to store the fetched cake details
  const [cakeData, setCakeData] = useState<Cake | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  const searchParams = useSearchParams()
  const searchId = searchParams.get("cakeId")

  // 1. STATE FOR FORM FIELDS
  const [quoteFormData, setQuoteFormData] = useState<Form>({
    name: "",
    contact: "",
    instagram: "",
    type: "Wedding Cake", // Will be overwritten by autofill
    flavour: "", // New Field
    servings: "", // New Field
    budget: "", // New Field
    message: "",
  })

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
            type: data.category, // Map category to form type
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
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          // REPLACE THIS WITH YOUR ACTUAL ACCESS KEY FROM WEB3FORMS
          access_key: "YOUR_ACCESS_KEY_HERE",
          subject: `Quote Request for ${cakeData?.name || "Custom Cake"} - ${quoteFormData.name}`,
          from_name: "The Whisk Corner Website",

          // Send formatted data including the referenced cake
          selected_cake_id: cakeData?.id || "N/A",
          selected_cake_name: cakeData?.name || "N/A",
          ...quoteFormData,
        }),
      })

      const result = await response.json()

      if (result.success) {
        toast.success(result.message)
        setSuccess(true)
        // Reset form but keep the selected cake info
        setQuoteFormData({
          name: "",
          contact: "",
          instagram: "",
          type: quoteFormData.type, // Keep the type selected
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
          {/* Breadcrumb content is hidden in success state in original logic, keeping minimal */}
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

        {/* UPDATED: min-h instead of fixed h to prevent cutting off on landscape mobile */}
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
            <div className="flex w-full items-center gap-5 rounded-2xl border border-pink-100 bg-pink-50 p-4 lg:w-[35vw]">
              {/* Image Thumbnail */}
              <div className="h-20 w-20 shrink-0 overflow-hidden rounded-xl bg-white shadow-sm">
                <img
                  src={cakeData.image}
                  alt={cakeData.name}
                  className="h-full w-full object-cover"
                />
              </div>
              {/* Text Info */}
              {/* UPDATED: min-w-0 ensures text truncates instead of breaking layout on small phones */}
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
          <div className="grid gap-4 md:grid-cols-2">
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
          <div className="grid gap-4 md:grid-cols-2">
            {/* Type (Autofilled but editable) */}
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

            {/* Servings */}
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

          {/* Flavour Preference */}
          <div className="space-y-2">
            <Label htmlFor="flavour" className="text-slate-600">
              Preferred Flavour
            </Label>
            <Input
              id="flavour"
              placeholder="e.g. Chocolate Hazelnut, Vanilla, Red Velvet..."
              className="border-pink-100 bg-pink-50/30"
              value={quoteFormData.flavour}
              onChange={(e) =>
                setQuoteFormData({ ...quoteFormData, flavour: e.target.value })
              }
            />
            <p className="text-[10px] text-slate-400">
              We can suggest pairings if you aren&apos;t sure!
            </p>
          </div>

          {/* Budget */}
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

          {/* Message Field */}
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

          {/* Submit Button */}
          <Button
            type="submit"
            disabled={loading}
            className="h-12 w-full gap-2 rounded-full bg-pink-700 text-lg text-white shadow-lg transition-all hover:bg-pink-800 hover:shadow-xl"
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
