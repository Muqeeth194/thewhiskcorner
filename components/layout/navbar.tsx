"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { siteConfig } from "@/config/site"
import { navLinks } from "@/lib/links"
import { cn } from "@/lib/utils"
import { LayoutDashboard, Menu, X } from "lucide-react" // Icons for mobile menu
import { Button } from "@/components/ui/button"
import LogoutButton from "../pages/logout-button"
import { useAuth } from "@/context/AuthContext"

// Since Navbar has use client at the top (maybe for a mobile hamburger menu), we cannot use cookies() directly inside it.
export default function Navbar() {
  const [isVisible, setIsVisible] = React.useState(true)
  const [lastScrollY, setLastScrollY] = React.useState(0)

  // 👇 No more useAppSelector!
  const { isLoggedIn, user } = useAuth()

  // console.log("Login status:", isLoggedIn)
  const pathname = usePathname()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false)

  // console.log("🟡 Navbar render - isLoggedIn:", isLoggedIn, "path:", pathname)

  // console.log(user)

  React.useEffect(() => {
    const controlNavbar = () => {
      const currentScrollY = window.scrollY

      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        // Scrolling DOWN & past 100px -> HIDE Navbar
        setIsVisible(false)
        setIsMobileMenuOpen(false) // Optional: Close mobile menu on scroll
      } else {
        // Scrolling UP -> SHOW Navbar
        setIsVisible(true)
      }

      setLastScrollY(currentScrollY)
    }

    window.addEventListener("scroll", controlNavbar)

    // Cleanup function
    return () => {
      window.removeEventListener("scroll", controlNavbar)
    }
  }, [lastScrollY])

  const showLoggedIn = isLoggedIn

  return (
    <header
      className={cn(
        "fixed top-0 z-50 w-full bg-pink-200/70 px-6 shadow-md backdrop-blur-md transition-transform duration-100 supports-[backdrop-filter]:bg-pink-200/70 md:px-12",
        isVisible ? "translate-y-0" : "-translate-y-full"
      )}
    >
      <div className="container flex h-16 items-center justify-between">
        {/* 1. LOGO SECTION */}
        <div className="flex items-center gap-2">
          <Link href="/" className="flex items-center space-x-2">
            {/* Optional: Add a small logo icon here*/}
            <span className="font-serif text-xl font-bold tracking-tight text-pink-950 transition-colors hover:text-pink-700 md:text-2xl">
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

        {/* 3. DESKTOP BUTTON (Hidden on mobile) */}
        <div className="hidden md:flex">
          {showLoggedIn ? (
            <div className="space-x-5">
              {/* ADMIN DASHBOARD BUTTON */}
              {user?.isAdmin && (
                <Button
                  asChild
                  variant="ghost"
                  className="gap-2 text-pink-900 hover:bg-pink-300/50 hover:text-pink-950"
                >
                  <Link href="/admin">
                    <LayoutDashboard className="h-4 w-4" />
                    Dashboard
                  </Link>
                </Button>
              )}
              <LogoutButton />
            </div>
          ) : (
            <Button
              asChild
              variant="outline"
              className="rounded-full border-pink-700 bg-pink-700 px-6 text-base text-white shadow-md hover:bg-pink-800 hover:text-white"
            >
              <Link href="/login">Sign In / Join Rewards</Link>
            </Button>
          )}
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
                  onClick={() => setIsMobileMenuOpen(false)}
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
              {showLoggedIn ? (
                <>
                  {user?.isAdmin && (
                    <Link
                      href="/admin"
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="flex items-center gap-2 pb-4 text-lg font-medium text-pink-700"
                    >
                      <LayoutDashboard className="h-5 w-5" />
                      Admin Dashboard
                    </Link>
                  )}
                  {/* Note: LogoutButton typically refreshes the page/redirects, which inherently closes state, but checking inside it is good practice if it's purely client-side */}
                  <div onClick={() => setIsMobileMenuOpen(false)}>
                    <LogoutButton />
                  </div>
                </>
              ) : (
                <Button
                  asChild
                  className="w-full rounded-full bg-pink-700 text-white hover:bg-pink-800"
                >
                  <Link
                    href="/login"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Sign In / Join Rewards
                  </Link>
                </Button>
              )}
            </div>
          </nav>
        </div>
      )}
    </header>
  )
}
