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

const cakeImages = [
  {
    path: "v1772178771/knlt9m8xenmca8pd6s9m.jpg",
    alt: "Signature Chocolate Truffle Wedding Cake",
  },
  {
    path: "v1772178772/u9cals8mcleooj0ouuwj.jpg",
    alt: "Elegant Vanilla Bean Anniversary Cake",
  },
  {
    path: "v1772178773/xditfvbbp5dz7czwgbkn.jpg",
    alt: "Custom Birthday Cake with Fresh Flowers",
  },
  {
    path: "v1772178775/awjpikxql106juqqjyrj.jpg",
    alt: "Decadent Red Velvet Celebration Cake",
  },
  {
    path: "v1772178776/lippn7jyu3gguu7ay58f.jpg",
    alt: "Artisan Lemon & Raspberry Cake",
  },
  {
    path: "v1772178777/ou0d7traad5iglfm8we8.jpg",
    alt: "Elegant Vanilla Bean Anniversary Cake",
  },
  {
    path: "v1772178780/o2wx6qlnyuunmxvkbru6.jpg",
    alt: "Custom Birthday Cake with Fresh Flowers",
  },
  {
    path: "v1772178783/phlvruwpdiotbiwaxnxn.jpg",
    alt: "Decadent Red Velvet Celebration Cake",
  },
  {
    path: "v1772178779/jegtmzs8lgyh8tbed7pu.jpg",
    alt: "Artisan Lemon & Raspberry Cake",
  },
  {
    path: "v1772181700/ryihfyxli0ln4fk20tm8.jpg",
    alt: "Artisan Lemon & Raspberry Cake",
  },
]

// 2. Base URL (so you don't have to repeat it)
const CLOUDINARY_BASE = "https://res.cloudinary.com/djhageblb/image/upload/"

// 3. The Exported Object

export const carouselSection: CarouselSection = {
  content: cakeImages.map((cake, index) => {
    // Generate a repeating slide number (2, 3, 4, 5, 2, 3...) for your local fallbacks
    // since you seem to be using /slide-2/ through /slide-5/
    const slideNum = (index % 4) + 2

    return {
      image: `/images/slide-${slideNum}/desktop.png`,
      imageMobile: `/images/slide-${slideNum}/mobile.png`,
      imageDesktop: `${CLOUDINARY_BASE}${cake.path}`,
      imageWide: `${CLOUDINARY_BASE}${cake.path}`,
      altText: cake.alt,
    }
  }),
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
