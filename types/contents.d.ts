import { IconKeys } from "@/components/icons"

export type HeroHeader = {
  header: string
  subheader: string
  image: string
}

export type Content = {
  text: string
  subtext: string
  icon?: IconKeys
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
}
