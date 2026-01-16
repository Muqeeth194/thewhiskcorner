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

export type CarouselSection = {
  content: Array<Image>
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

export type SendEmailParams = {
  to: string
  name?: string
  subject: string
  html: string
  emailType?: string
  userId: integer
}

export type User = {
  id: string
  isAdmin?: boolean
}
