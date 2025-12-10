import {
  HeroHeader,
  ContentSection,
  CarouselSection,
  CakeFilterSection,
} from "@/types/contents"

/* ====================
[> CUSTOMIZING CONTENT <]
-- Setup image by typing `/image-name.file` (Example: `/header-image.jpg`)
-- Add images by adding files to /public folder
-- Leave blank `` if you don't want to put texts or images
 ==================== */

export const heroHeader: HeroHeader = {
  header: `Custom Cakes for Your Special Moments`,
  subheader: `Handcrafted wedding & celebration cakes made with love`,
  image: `/hero-img.webp`,
}

export const cakeFilterSection: CakeFilterSection = {
  content: [
    {
      name: "All",
    },
    {
      name: "Wedding Cakes",
    },
    {
      name: "Anniversary Cakes",
    },
    {
      name: "Celebration Cakes",
    },
    {
      name: "Deserts",
    },
  ],
}

export const carouselSection: CarouselSection = {
  content: [
    {
      image: "cake.png",
    },
    {
      image: "cake.png",
    },
    {
      image: "cake.png",
    },
    {
      image: "cake.png",
    },
    {
      image: "cake.png",
    },
  ],
}

export const featureCards: ContentSection = {
  header: `Featured Catergories`,
  subheader: `Handcrafted wedding & celebration cakes made with love`,
  content: [
    {
      text: `Wedding Cakes`,
      subtext: `Open the Gallery to check the cakes`,
      icon: "nextjs",
    },
    {
      text: `Birthday Cakes`,
      subtext: `Open the Gallery to check the cakes`,
      icon: "shadcnUi",
    },
    {
      text: `Celebration Cakes`,
      subtext: `Open the Gallery to check the cakes`,
      icon: "vercel",
    },
    {
      text: `Deserts`,
      subtext: `Open the Gallery to check the cakes`,
      icon: "vercel",
    },
  ],
}

export const features: ContentSection = {
  header: `Testimonials`,
  subheader: `See what our customers have to say about us`,
  image: `/features-img.webp`,
  content: [
    {
      text: `- Muqeeth`,
      subtext: `The Cakes were really good!!`,
      icon: "fileSearch",
    },
    {
      text: `- Mahreen`,
      subtext: `Amazing Taste!`,
      icon: "barChart",
    },
    {
      text: `- Mohammad`,
      subtext: `Great Effort!`,
      icon: "settings",
    },
  ],
}
