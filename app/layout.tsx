import "./globals.css"
import { siteConfig } from "@/config/site"
import { Inter, Playfair_Display, Lato } from "next/font/google"
import Navbar from "@/components/layout/navbar"
import Footer from "@/components/layout/footer"
import { Toaster } from "@/components/ui/sonner"
import { cookies } from "next/headers"
import { getSessionUser } from "@/lib/auth"
import { AuthProvider } from "@/context/AuthContext"
import { User } from "@/types/contents"
import Providers from "./providers"
import MainWrapper from "@/components/main-wrapper"

const inter = Inter({ subsets: ["latin"] })

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-serif",
  weight: ["400", "700"],
})

const lato = Lato({
  subsets: ["latin"],
  variable: "--font-sans",
  weight: ["400", "700"],
})

export const metadata = {
  metadataBase: new URL(siteConfig.url.base),
  title: {
    default: siteConfig.name,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: siteConfig.keywords,
  authors: [
    {
      name: siteConfig.author,
      url: siteConfig.url.author,
    },
  ],
  creator: siteConfig.author,
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteConfig.url.base,
    title: siteConfig.name,
    description: siteConfig.description,
    siteName: siteConfig.name,
    images: [
      {
        url: siteConfig.ogImage,
        width: 1200,
        height: 630,
        alt: `${siteConfig.name} - Custom Cakes and Desserts`,
      },
    ],
  },
  icons: {
    icon: "/favicon.ico?v=2",
  },
}

export const viewport = {
  themeColor: "white",
}

interface RootLayoutProps {
  children: React.ReactNode
}

export default async function RootLayout({ children }: RootLayoutProps) {
  // Check the cookie on the server (Server can always see httpOnly cookies)
  const cookieStore = cookies()
  const token = cookieStore.get("session_token")?.value

  // Verify it on the Server
  const user = await getSessionUser(token)

  // console.log("layout user", user)

  const isLoggedIn = !!user

  // console.log("initial login status in layout", isLoggedIn)

  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.className} flex min-h-screen flex-col bg-background bg-body text-primary ${playfair.variable} ${lato.variable} font-sans`}
      >
        <AuthProvider initialUser={user as User}>
          <Providers>
            <Navbar />
            <MainWrapper>{children}</MainWrapper>
            <Toaster />
            <Footer />
          </Providers>
        </AuthProvider>
      </body>
    </html>
  )
}
