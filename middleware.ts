// middleware.ts
import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { jwtVerify } from "jose"

export async function middleware(request: NextRequest) {
  // 1. Check for the cookie
  const token = request.cookies.get("session_token")?.value

  // 2. Define the protected paths and check if the routed path is from the protected path
  const protectedRoutes = ["/profile", "/admin"]
  const isProtectedRoute = protectedRoutes.some((route) =>
    request.nextUrl.pathname.startsWith(route)
  )

  if (isProtectedRoute) {
    if (!token) {
      // if its the protected route the check if the token is valid or not
      return NextResponse.redirect(new URL("/login", request.url))
    }

    try {
      // Verify the token by checking it from the JWT secret
      const secret = new TextEncoder().encode(process.env.JWT_SECRET)
      await jwtVerify(token, secret)
      // If code reaches here, token is valid.
      return NextResponse.next()
    } catch (error) {
      // Token is invalid/expired -> Redirect to login
      return NextResponse.redirect(new URL("/login", request.url))
    }
  }

  return NextResponse.next()
}

// Optimization: Only run middleware on specific paths
export const config = {
  matcher: ["/profile/:path*", "/admin/:path*"],
}
