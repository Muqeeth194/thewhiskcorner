import {
  HeroHeader,
  CarouselSection,
  CakeFilterSection,
  ContentSection,
} from "@/types/contents"

/* ====================
[> CUSTOMIZING CONTENT <]
-- Setup image by typing `/image-name.file` (Example: `/header-image.png`)
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
    // SLIDE 1
    {
      // Fallback for very old browsers
      image: "/images/slide-1/desktop.jpg",

      // 📱 Mobile: 4:5 Portrait (e.g. 800x1000px)
      imageMobile: "/images/slide-1/mobile.png",

      // 💻 Laptop/Desktop: 23:9 Landscape (e.g. 1200x800px)
      imageDesktop: "/images/slide-1/desktop.jpg",

      // 🖥️ Ultra-Wide: 23:9 or wider (e.g. 1920x800px) - Optional
      imageWide: "/images/slide-1/desktop.jpg",

      altText: "Signature Chocolate Truffle Wedding Cake",
    },

    // SLIDE 2
    {
      image: "/images/slide-2/desktop.png",
      imageMobile: "/images/slide-2/mobile.png",
      imageDesktop: "/images/slide-2/desktop.png",
      imageWide: "/images/slide-2/desktop.png",
      altText: "Elegant Vanilla Bean Anniversary Cake",
    },

    // SLIDE 3
    {
      image: "/images/slide-3/desktop.png",
      imageMobile: "/images/slide-3/mobile.png",
      imageDesktop: "/images/slide-3/desktop.png",
      imageWide: "/images/slide-3/desktop.png",
      altText: "Custom Birthday Cake with Fresh Flowers",
    },

    // SLIDE 4
    {
      image: "/images/slide-4/desktop.png",
      imageMobile: "/images/slide-4/mobile.png",
      imageDesktop: "/images/slide-4/desktop.png",
      imageWide: "/images/slide-4/desktop.png",
      altText: "Decadent Red Velvet Celebration Cake",
    },

    // SLIDE 5
    {
      image: "/images/slide-5/desktop.png",
      imageMobile: "/images/slide-5/mobile.png",
      imageDesktop: "/images/slide-5/desktop.png",
      imageWide: "/images/slide-5/desktop.png",
      altText: "Artisan Lemon & Raspberry Cake",
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
      image: "/images/label/wedding_cake.png",
    },
    {
      text: `Anniversary Cakes`,
      subtext: `Celebrating your love story, slice by slice.`,
      image: "/images/label/anniversary_cake.png",
    },
    {
      text: `Celebration Cakes`,
      subtext: `Make every milestone unforgettable.`,
      image: "/images/label/birthday_cake.png",
    },
    {
      text: `Desserts`,
      subtext: `Bite-sized bliss for every craving.`,
      image: "/images/label/desert.png",
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

export const CHOCOLATE_FLAVORS = [
  "Classic truffle",
  "Rich Chocolate and raspberry",
  "Dulce de leche",
  "Chocolate and caramel",
  "Chocolate & Hazelnuts Praline",
  "Hazelnut praline with french biscuits",
  "Mocha",
  "Chocolate Biscoff",
  "Nutella hazelnut",
  "Nutella Strawberry (seasonal)",
  "Hazelnut praline French Biscuit and Caramel",
]

export const VANILLA_FLAVORS = [
  "Strawberry and cream (seasonal)",
  "Lemon and raspberry",
  "Vanilla and caramel",
  "Caramel & roasted almonds",
  "Biscoff",
  "Almond praline",
  "Vanilla and Milk chocolate",
]
