import { SiteConfig, ContactConfig } from "@/types"

/* ====================
[> WEBSITE CONFIG <]
-- The Whisk Corner Details
 ==================== */

const baseUrl = "https://www.thewhiskcorner.com"

export const siteConfig: SiteConfig = {
  name: "The Whisk Corner",
  author: "Muqeeth",
  description:
    "Exquisite handcrafted cakes and artisanal desserts. Order custom wedding cakes, anniversary cakes, and beautiful treats for your special celebrations.",
  keywords: [
    "custom cakes",
    "wedding cakes",
    "birthday cakes",
    "anniversary cakes",
    "bakery",
    "artisanal desserts",
    "The Whisk Corner",
    "bespoke cakes",
    "celebration cakes",
  ],
  url: {
    base: baseUrl,
    author: "https://www.thewhiskcorner.com",
  },
  ogImage: `${baseUrl}/twc.png`,
}

export const contactConfig: ContactConfig = {
  email: "hello@thewhiskcorner.com",
}
