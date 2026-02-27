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
    desktopPath:
      "https://res.cloudinary.com/djhageblb/image/upload/v1772183955/frigdoj9tpmygnigoskd.webp",
    mobilePath:
      "https://res.cloudinary.com/djhageblb/image/upload/v1772185904/rd4cqwmubgknygsmji6m.jpg",
    alt: "Signature Chocolate Truffle Wedding Cake",
  },
  {
    desktopPath:
      "https://res.cloudinary.com/djhageblb/image/upload/v1772183914/ymfc3ll1orqojybkopos.webp",
    mobilePath:
      "https://res.cloudinary.com/djhageblb/image/upload/v1772185904/e77l95z457qgutqmxfet.jpg",
    alt: "Elegant Vanilla Bean Anniversary Cake",
  },
  {
    desktopPath:
      "https://res.cloudinary.com/djhageblb/image/upload/v1772183967/ebjihdefgicqdobabio6.webp",
    mobilePath:
      "https://res.cloudinary.com/djhageblb/image/upload/v1772185904/uyuxexmwxfdfw71vpd1m.jpg",
    alt: "Custom Birthday Cake with Fresh Flowers",
  },
  {
    desktopPath:
      "https://res.cloudinary.com/djhageblb/image/upload/v1772183944/grwjpznevclsz90kw5mg.webp",
    mobilePath:
      "https://res.cloudinary.com/djhageblb/image/upload/v1772185905/eg0jtuj86u9nacg6qmzv.jpg",
    alt: "Decadent Red Velvet Celebration Cake",
  },
  {
    desktopPath:
      "https://res.cloudinary.com/djhageblb/image/upload/v1772183106/b0nkqwfuryonbimqersh.webp",
    mobilePath:
      "https://res.cloudinary.com/djhageblb/image/upload/v1772185906/xlfhh2zwmguudeyijlaa.jpg",
    alt: "Artisan Lemon & Raspberry Cake",
  },
  {
    desktopPath:
      "https://res.cloudinary.com/djhageblb/image/upload/v1772183988/mpjgjm41x4jpseuyl8f2.webp",
    mobilePath:
      "https://res.cloudinary.com/djhageblb/image/upload/v1772185905/mpcgz7yufdbkfevihyic.jpg",
    alt: "Elegant Vanilla Bean Anniversary Cake",
  },
  {
    desktopPath:
      "https://res.cloudinary.com/djhageblb/image/upload/v1772183979/ebg2qyirjlqxzr8qfbjj.webp",
    mobilePath:
      "https://res.cloudinary.com/djhageblb/image/upload/v1772185908/eiwmucvcyt8xiunyqja8.jpg",
    alt: "Custom Birthday Cake with Fresh Flowers",
  },
  {
    desktopPath:
      "https://res.cloudinary.com/djhageblb/image/upload/v1772183997/iawbqjsoz1qojn0oswub.webp",
    mobilePath:
      "https://res.cloudinary.com/djhageblb/image/upload/v1772185909/nug41vedhz4ggufpcqkn.jpg",
    alt: "Decadent Red Velvet Celebration Cake",
  },
  {
    desktopPath:
      "https://res.cloudinary.com/djhageblb/image/upload/v1772184016/j4rswzpn3obf6cfmhyce.webp",
    mobilePath:
      "https://res.cloudinary.com/djhageblb/image/upload/v1772185910/axytb0pzo82zqmmqvde8.jpg",
    alt: "Artisan Lemon & Raspberry Cake",
  },
  {
    desktopPath:
      "https://res.cloudinary.com/djhageblb/image/upload/v1772184006/hqkjjvftjurwmnkfl6xp.webp",
    mobilePath:
      "https://res.cloudinary.com/djhageblb/image/upload/v1772185910/gzoxtyx3swfrctipexyr.jpg",
    alt: "Artisan Lemon & Raspberry Cake",
  },
]

// 3. The Exported Object

export const carouselSection: CarouselSection = {
  content: cakeImages.map((cake, index) => {
    return {
      image: `${cake.mobilePath}`,
      imageMobile: `${cake.mobilePath}`,
      imageDesktop: `${cake.desktopPath}`,
      imageWide: `${cake.desktopPath}`,
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
      image:
        "https://res.cloudinary.com/djhageblb/image/upload/v1772091350/bbdgtiy6hji07mxo0ddv.png",
    },
    {
      text: `Anniversary Cakes`,
      subtext: `Celebrating your love story, slice by slice.`,
      image:
        "https://res.cloudinary.com/djhageblb/image/upload/v1772091349/ej7jqgzipnjgjgunnesv.png",
    },
    {
      text: `Celebration Cakes`,
      subtext: `Make every milestone unforgettable.`,
      image:
        "https://res.cloudinary.com/djhageblb/image/upload/v1772091349/ccgyjtopc4niceguslxu.png",
    },
    {
      text: `Desserts`,
      subtext: `Bite-sized bliss for every craving.`,
      image:
        "https://res.cloudinary.com/djhageblb/image/upload/v1772091352/cgyp2lct07g8jdbbcapf.png",
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
