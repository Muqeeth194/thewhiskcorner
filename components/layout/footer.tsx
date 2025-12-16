import Link from "next/link"
import { siteConfig } from "@/config/site"
import { Mail, MapPin, Phone, Instagram, ArrowUpRight } from "lucide-react"

export default function Footer() {
  return (
    <footer className="mt-10 border-t border-pink-900 bg-pink-950 text-pink-50">
      <div className="container mx-auto px-6 py-12 lg:py-16">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          {/* 1. Brand Section */}
          <div className="space-y-4">
            <Link href="/" className="inline-block">
              <h1 className="font-serif text-3xl font-bold tracking-wide text-white transition-opacity hover:opacity-90">
                {siteConfig.name}
              </h1>
            </Link>
            <p className="max-w-xs text-sm leading-relaxed text-pink-200/80">
              Handcrafted wedding & celebration cakes made with love in
              Hyderabad.
            </p>
          </div>

          {/* 2. Address Section (New) */}
          <div className="space-y-4">
            <h3 className="font-serif text-lg font-semibold tracking-wide text-white">
              Studio
            </h3>
            <div className="flex items-start gap-3 text-pink-200/80">
              <MapPin className="mt-1 h-5 w-5 shrink-0 text-pink-400" />
              <div className="space-y-1 text-sm">
                <p>The Whisk Corner</p>
                <p>Hyderabad, Telangana</p>
                <p className="text-xs text-pink-400">(By Appointment Only)</p>
              </div>
            </div>
          </div>

          {/* 3. Contact Section */}
          <div className="space-y-4">
            <h3 className="font-serif text-lg font-semibold tracking-wide text-white">
              Contact
            </h3>
            <div className="space-y-3 text-sm text-pink-200/80">
              <a
                href="mailto:wajeehasikanderkhan@gmail.com"
                className="flex items-center gap-3 transition-colors hover:text-white"
              >
                <Mail className="h-5 w-5 shrink-0 text-pink-400" />
                <span>thewhiskcorner@gmail.com</span>
              </a>
              <a
                href="tel:+917032867259"
                className="flex items-center gap-3 transition-colors hover:text-white"
              >
                <Phone className="h-5 w-5 shrink-0 text-pink-400" />
                <span>+91 98745 63210</span>
              </a>
            </div>
          </div>

          {/* 4. Social / Follow Us */}
          <div className="space-y-4">
            <h3 className="font-serif text-lg font-semibold tracking-wide text-white">
              Follow Us
            </h3>
            <a
              href="https://instagram.com/thewhiskcorner"
              target="_blank"
              rel="noreferrer"
              className="group flex w-fit items-center gap-2 rounded-full border border-pink-800 bg-pink-900/50 px-4 py-2 text-sm text-pink-100 transition-all hover:bg-pink-900 hover:text-white"
            >
              <Instagram className="h-4 w-4" />
              <span>@thewhiskcorner</span>
              <ArrowUpRight className="h-3 w-3 opacity-50 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </a>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-pink-900 pt-8 text-xs text-pink-400 sm:flex-row">
          <p>
            © {new Date().getFullYear()} {siteConfig.name}. All Rights
            Reserved.
          </p>
          <div className="flex gap-6">
            <Link href="#" className="hover:text-pink-200">
              Privacy Policy
            </Link>
            <Link href="#" className="hover:text-pink-200">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
