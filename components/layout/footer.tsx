import Link from "next/link"
import { siteConfig } from "@/config/site"
import { navLinks } from "@/lib/links"

export default function Footer() {
  return (
    <footer className="mt-auto">
      <div className="mx-auto w-full max-w-screen-xl p-6 text-center md:py-8">
        <div className="sm:flex sm:items-center sm:justify-center">
          <Link href="/">
            <h1 className="mb-2 text-2xl font-bold sm:mb-0">
              {siteConfig.name}
            </h1>
          </Link>
        </div>
        <hr className="my-6 text-muted-foreground sm:mx-auto lg:my-8" />
        <div className="mx-8 flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <div className="space-y-1">
            <p className="text-xs font-semibold uppercase tracking-wider text-foreground">
              Email
            </p>
            <p className="text-md font-medium text-muted-foreground">
              test@test.com
            </p>
          </div>

          <div className="space-y-1">
            <p className="text-xs font-semibold uppercase tracking-wider text-foreground">
              Follow Us
            </p>
            <p className="text-md font-medium text-muted-foreground">
              Instagram
            </p>
          </div>

          <div className="space-y-1">
            <p className="text-xs font-semibold uppercase tracking-wider text-foreground">
              Phone
            </p>
            <p className="text-md font-medium text-muted-foreground">
              +91 9876543210
            </p>
          </div>
        </div>
        <span className="block text-sm text-muted-foreground sm:text-center md:py-5">
          © {new Date().getFullYear()} All Rights Reserved.
        </span>
      </div>
    </footer>
  )
}
