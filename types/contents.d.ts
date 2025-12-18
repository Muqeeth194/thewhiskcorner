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
  id: string
  name: string
  image: string
  category: string
  description: string
}

// This is for the search route with Cake ID
export type cakeIdParams = {
  params: {
    // This Key MUST match your folder name!
    // If your folder is named [id], use 'id'. If named [cakeId], use 'cakeId'.
    id: string
  }
}

export type Form = {
  name: string
  contact: string // Can be Phone or Email
  type: string // Default selection
  message: string
}
