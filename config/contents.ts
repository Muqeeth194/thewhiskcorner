import {
  HeroHeader,
  CarouselSection,
  CakeFilterSection,
  ContentSection,
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
      name: "Desserts",
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

export const featuredCategory: ContentSection = {
  header: `Featured Categories`,
  subheader: `Handcrafted wedding & celebration cakes made with love`,
  content: [
    {
      text: `Wedding Cakes`,
      subtext: `The perfect centerpiece for your forever.`,
      image: "/anniversary_cake.png",
    },
    {
      text: `Anniversary Cakes`,
      subtext: `Celebrating your love story, slice by slice.`,
      image: "/anniversary_cake.png",
    },
    {
      text: `Celebration Cakes`,
      subtext: `Make every milestone unforgettable.`,
      image: "/anniversary_cake.png",
    },
    {
      text: `Desserts`,
      subtext: `Bite-sized bliss for every craving.`,
      image: "/anniversary_cake.png",
    },
  ],
}

export const testimonials = {
  header: `Love Notes`,
  subheader: `Real reviews from our happy customers`,
  content: [
    {
      text: `Madiha Fatima`,
      subtext: `Tried their chocolate hazelnut praline cake and it was the best chocolate cake I had till date in Hyd. Perfectly moist and minimal cream.`,
      rating: 5,
    },
    {
      text: `Fariha Khan`,
      subtext: `Ordered fudge brownies and they were so good! Very dense and chocolatey. Packaging was cute too.`,
      rating: 5,
    },
    {
      text: `Aisha Siddiqui`,
      subtext: `The attention to detail is unmatched. You can taste the quality ingredients in every bite. Truly the best home baker in the city.`,
      rating: 5,
    },
    {
      text: `Sarah M.`,
      subtext: `The cinnamon rolls with cream cheese frosting are to die for. I ordered them for a brunch and they were gone in minutes!`,
      rating: 5,
    },
    {
      text: `Arjun Reddy`,
      subtext: `Death by Chocolate cupcakes lived up to the name. Rich, decadent, and not overly sweet. Highly recommend for chocolate lovers.`,
      rating: 5,
    },
    {
      text: `Priya Sharma`,
      subtext: `Wajeeha made my daughter's birthday cake exactly how we imagined. It looked like art and tasted even better.`,
      rating: 5,
    },
  ],
}
