import { IconKeys } from "@/components/icons"

export type HeroHeader = {
  header: string
  subheader: string
  image: string
}

export type Content = {
  text: string
  subtext: string
  image?: string
}
export type Image = {
  image: string
}
export type Filter = {
  name: string
}

export type ContentSection = {
  header: string
  subheader: string
  image?: string
  content: Array<Content>
}

export type CarouselItem = {
  image: string // The fallback/default image
  imageMobile?: string // Optional: 4:5 Portrait
  imageDesktop?: string // Optional: 3:2 Landscape
  imageWide?: string // Optional: Ultra-wide
  altText?: string // Accessibility text
}
export type CarouselSection = {
  content: CarouselItem[]
}

export type CakeFilterSection = {
  content: Array<Filter>
}

export type Cake = {
  id?: string
  name: string
  image: string
  category: string
  description: string
  details?: {
    servings?: number | string
    flavor?: string
    leadTime?: string
  }
  status?: string
}

export type CakeTable = {
  id: string
  name: string
  image: string
  category: string
  description: string
  details?: {
    servings?: number | string
    flavor?: string
    leadTime?: string
  }
  status: "Active" | "Inactive"
}

export type CakesState = {
  data: CakeTable[]
  selectedCake: any | null
  isLoading: boolean
  error: string | undefined
}

// This is for the search route with Cake ID
export type cakeIdParams = {
  params: {
    // This Key MUST match your folder name!
    // If your folder is named [id], use 'id'. If named [cakeId], use 'cakeId'.
    id: integer
  }
}

export type Form = {
  name: string
  contact: string // Can be Phone or Email
  instagram?: string
  type: string // Default selection
  flavour?: string
  message: string
  servings?: string
  budget?: string
}

export interface QuoteEmailData {
  userName: string
  userContact: string
  instagram?: string
  cakeType: string
  flavour: string
  servings: string
  budget: string
  message: string
  selectedCakeName?: string
  selectedCakeId?: string
}

export interface ContactEmailData {
  userName: string
  userContact: string
  cakeType: string
  subject?: string
  message: string
}

export type SendEmailParams = {
  to: string
  name?: string
  subject?: string
  html?: string
  emailType:
    | "VERIFY"
    | "RESET"
    | "WELCOME"
    | "QUOTE"
    | "CONTACT"
    | "RESET_SUCCESS"
  userId?: integer
  quoteData?: QuoteEmailData
  contactData?: ContactEmailData
}

export type User = {
  id: string
  isAdmin?: boolean
}

export type QuoteRequest = {
  id: number
  name: string
  contact: string
  instagram?: string | null
  type: string
  flavour?: string | null
  servings?: string | null
  budget?: string | null
  message: string
  selectedCakeId?: string | null
  selectedCakeName?: string | null
  isAttended: boolean
  createdAt: Date
}
