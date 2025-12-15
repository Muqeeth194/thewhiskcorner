"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { ModeToggle } from "@/components/mode-toggle"
import { siteConfig } from "@/config/site"
import { navLinks } from "@/lib/links"
import { settings } from "@/config/settings"
import { Button, buttonVariants } from "../ui/button"
import { cn } from "@/lib/utils"

export default function Navbar() {
  const [navbar, setNavbar] = useState(false)

  const handleClick = async () => {
    setNavbar(false)
  }

  useEffect(() => {
    if (navbar) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "auto"
    }
  }, [navbar])

  return (
    <header className="sticky top-0 z-50 w-full select-none border-b border-pink-100 bg-pink-200 backdrop-blur-md">
      <nav className="mx-auto justify-between px-4  md:flex md:items-center md:px-[6.25rem] lg:max-w-7xl">
        <div>
          <div className="flex items-center justify-between px-0 py-3 md:block md:py-3.5">
            <Link href="/" onClick={handleClick}>
              <h1 className="text-baby-pink-900 lg:hover:text-baby-pink-700 font-serif text-2xl font-bold tracking-wide transition-all duration-200 lg:hover:scale-[1.05]  ">
                {siteConfig.name}
              </h1>
            </Link>
            <div className="flex gap-1 md:hidden">
              <button
                className="text-baby-pink-700 focus:border-baby-pink-500 rounded-md p-2 outline-none focus:border"
                aria-label="Hamburger Menu"
                onClick={() => setNavbar(!navbar)}
              >
                {navbar ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  </svg>
                )}
              </button>
              {/* <ModeToggle /> */}
            </div>
          </div>
        </div>
        <div>
          <div
            className={`border-baby-pink-200 bg-baby-pink-50 absolute left-0 right-0 z-10 m-auto justify-self-center rounded-md border p-4  md:static md:mt-0 md:block md:border-none md:bg-transparent md:p-0  ${
              navbar ? "block" : "hidden"
            }`}
            style={{ width: "100%" }}
          >
            <ul className="text-baby-pink-700 flex flex-col items-center space-y-4 md:flex-row md:space-x-6 md:space-y-0 ">
              {navLinks.map((link) => (
                <li key={link.route}>
                  <Link
                    className="hover:text-baby-pink-900 inline-block font-bold transition-all duration-300 hover:scale-105 "
                    href={link.path}
                    onClick={handleClick}
                  >
                    {link.route}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {settings.themeToggleEnabled && (
          <div className="hidden items-center justify-center gap-2 md:flex">
            <Button
              className={cn(
                buttonVariants({
                  variant: "outline",
                  size: "sm",
                }),
                "w-fit rounded-full border-2 border-yellow-400 bg-yellow-400 px-6 py-2 text-sm font-medium tracking-wider text-black shadow-xl drop-shadow-[0_2px_10px_rgba(0,0,0,0.3)] transition-all duration-300 hover:scale-105 hover:bg-yellow-300 hover:shadow-2xl lg:px-8 lg:text-sm"
              )}
            >
              Order Now
            </Button>
            {/* <ModeToggle /> */}
          </div>
        )}
      </nav>
    </header>
  )
}
