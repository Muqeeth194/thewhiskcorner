"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { siteConfig } from "@/config/site"
import { navLinks } from "@/lib/links"
import { cn } from "@/lib/utils"
import { Menu, X } from "lucide-react" // Icons for mobile menu
import { Button } from "@/components/ui/button"

export default function Navbar() {
  const pathname = usePathname()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false)

  // Close mobile menu when route changes
  React.useEffect(() => {
    setIsMobileMenuOpen(false)
  }, [pathname])

  return (
    <header className="sticky top-0 z-50 w-full border-b border-pink-300 bg-pink-200/70 px-12 backdrop-blur-md supports-[backdrop-filter]:bg-pink-200/70">
      <div className="container flex h-16 items-center justify-between">
        {/* 1. LOGO SECTION */}
        <div className="flex items-center gap-2">
          <Link href="/" className="flex items-center space-x-2">
            {/* Optional: Add a small logo icon here*/}
            <span className="font-serif text-2xl font-bold tracking-tight text-pink-950 transition-colors hover:text-pink-700">
              {siteConfig.name}
            </span>
          </Link>
        </div>

        {/* 2. DESKTOP NAVIGATION (Hidden on mobile) */}
        <nav className="hidden gap-8 md:flex">
          {navLinks.map((link) => {
            const isActive = pathname === link.href
            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "text-base font-semibold transition-colors hover:text-pink-600",
                  isActive ? "font-bold text-pink-900" : "text-slate-600"
                )}
              >
                {link.title}
              </Link>
            )
          })}
        </nav>

        {/* 3. CTA BUTTON (Hidden on mobile) */}
        <div className="hidden md:flex">
          <Button
            asChild
            variant="outline"
            className="rounded-full border-pink-200 bg-white text-base text-pink-900 hover:bg-pink-100 hover:text-pink-950"
          >
            <Link href="/contact">Order Now</Link>
          </Button>
        </div>

        {/* 4. MOBILE MENU TOGGLE */}
        <button
          className="flex items-center justify-center p-2 text-pink-900 md:hidden"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle menu"
        >
          {isMobileMenuOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <Menu className="h-6 w-6" />
          )}
        </button>
      </div>

      {/* 5. MOBILE MENU DROPDOWN */}
      {isMobileMenuOpen && (
        <div className="border-t border-pink-100 bg-pink-50 px-4 py-6 md:hidden">
          <nav className="flex flex-col gap-4">
            {navLinks.map((link) => {
              const isActive = pathname === link.href
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "text-lg font-medium transition-colors",
                    isActive ? "text-pink-900" : "text-slate-600"
                  )}
                >
                  {link.title}
                </Link>
              )
            })}
            <div className="mt-4">
              <Button
                asChild
                className="w-full rounded-full bg-pink-900 text-white hover:bg-pink-800"
              >
                <Link href="/contact">Order Now</Link>
              </Button>
            </div>
          </nav>
        </div>
      )}
    </header>
  )
}
