"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Send, Loader2, CheckCircle } from "lucide-react"
import { toast } from "sonner"
import { Form } from "@/types/contents"
import HeadingText from "../heading-text"

export default function ContactForm() {
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)

  // 1. STATE FOR FORM FIELDS
  const [contactFormData, setContactFormData] = useState<Form>({
    name: "",
    contact: "", // Can be Phone or Email
    type: "Wedding Cake", // Default selection
    message: "",
  })

  // 2. HANDLE SUBMISSION
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      // 3. SEND TO WEB3FORMS (The Free Tool)
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          ...contactFormData,
        }),
      })

      const result = await response.json()

      if (result.success) {
        toast.success(result.message)
        setSuccess(true)
        setContactFormData({ name: "", contact: "", type: "", message: "" })
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
      <div className="flex h-[400px] flex-col items-center justify-center space-y-4 rounded-3xl border border-pink-100 bg-pink-50/50 p-8 text-center">
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
          <CheckCircle className="h-8 w-8 text-green-600" />
        </div>
        <h3 className="font-serif text-2xl font-bold text-pink-950">
          Message Sent!
        </h3>
        <p className="max-w-xs text-slate-600">
          Thanks, {contactFormData.name}! We have received your request and will
          reach out to you at the contact details provided shortly.
        </p>
        <Button
          variant="outline"
          onClick={() => setSuccess(false)}
          className="mt-4 border-pink-200 text-pink-900"
        >
          Send Another Request
        </Button>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-lg space-y-8 rounded-3xl border border-pink-100 bg-white p-8 shadow-xl md:p-12">
      <div className="space-y-2 text-center">
        <HeadingText subtext="Fill out the details below and we will call you to discuss your dream cake.">
          {/* FIXED: Escaped the quote here */}
          Let&apos;s Talk Cake
        </HeadingText>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Name Field */}
        <div className="space-y-2">
          <Label htmlFor="name" className="text-slate-600">
            Your Name
          </Label>
          <Input
            required
            id="name"
            placeholder="e.g. Khan"
            className="border-pink-100 bg-pink-50/30"
            value={contactFormData.name}
            onChange={(e) =>
              setContactFormData({ ...contactFormData, name: e.target.value })
            }
          />
        </div>

        {/* Contact Field (Phone/Email) */}
        <div className="space-y-2">
          <Label htmlFor="contact" className="text-slate-600">
            Phone Number / Email
          </Label>
          <Input
            required
            id="contact"
            placeholder="e.g. 9876543210"
            className="border-pink-100 bg-pink-50/30"
            value={contactFormData.contact}
            onChange={(e) =>
              setContactFormData({
                ...contactFormData,
                contact: e.target.value,
              })
            }
          />
        </div>

        {/* Cake Type Selection */}
        <div className="space-y-2">
          <Label htmlFor="type" className="text-slate-600">
            {/* FIXED: Escaped the quote here */}
            I&apos;m interested in...
          </Label>
          <select
            id="type"
            className="flex h-10 w-full rounded-md border border-pink-100 bg-pink-50/30 px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pink-100 disabled:cursor-not-allowed disabled:opacity-50"
            value={contactFormData.type}
            onChange={(e) =>
              setContactFormData({ ...contactFormData, type: e.target.value })
            }
          >
            <option>Wedding Cake</option>
            <option>Birthday Cake</option>
            <option>Anniversary Cake</option>
            <option>Cupcakes / Brownies</option>
            <option>Other</option>
          </select>
        </div>

        {/* Message Field */}
        <div className="space-y-2">
          <Label htmlFor="message" className="text-slate-600">
            Any specific details?
          </Label>
          <Textarea
            required
            id="message"
            placeholder="I need a 2kg cake for 50 people on Dec 20th..."
            className="min-h-[120px] border-pink-100 bg-pink-50/30"
            value={contactFormData.message}
            onChange={(e) =>
              setContactFormData({
                ...contactFormData,
                message: e.target.value,
              })
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
              Sending...
            </>
          ) : (
            <>
              <Send className="h-5 w-5" />
              Send Request
            </>
          )}
        </Button>

        <p className="text-center text-xs text-slate-400">
          We usually respond within 24 hours via WhatsApp or Phone.
        </p>
      </form>
    </div>
  )
}
