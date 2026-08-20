import {
  HeroHeader,
  CarouselSection,
  CakeFilterSection,
  ContentSection,
} from "@/types/contents"

import {
  Search,
  MessageSquare,
  ClipboardEdit,
  ChefHat,
  PartyPopper,
  Send,
} from "lucide-react"

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
      "https://res.cloudinary.com/djhageblb/image/upload/v1772694486/llxrgwwsk7bmybfiwibf.jpg",
    alt: "Signature Chocolate Truffle Wedding Cake",
  },
  {
    desktopPath:
      "https://res.cloudinary.com/djhageblb/image/upload/v1772183914/ymfc3ll1orqojybkopos.webp",
    mobilePath:
      "https://res.cloudinary.com/djhageblb/image/upload/v1772694485/jamzbqbnlpbujrpx0gbf.jpg",
    alt: "Elegant Vanilla Bean Anniversary Cake",
  },
  {
    desktopPath:
      "https://res.cloudinary.com/djhageblb/image/upload/v1772183967/ebjihdefgicqdobabio6.webp",
    mobilePath:
      "https://res.cloudinary.com/djhageblb/image/upload/v1772694486/lih4diyvqmd8nj6byc8i.jpg",
    alt: "Custom Birthday Cake with Fresh Flowers",
  },
  {
    desktopPath:
      "https://res.cloudinary.com/djhageblb/image/upload/v1772183944/grwjpznevclsz90kw5mg.webp",
    mobilePath:
      "https://res.cloudinary.com/djhageblb/image/upload/v1772694484/xhfngfgpj1fu3ssdrxdl.jpg",
    alt: "Decadent Red Velvet Celebration Cake",
  },
  {
    desktopPath:
      "https://res.cloudinary.com/djhageblb/image/upload/v1772183106/b0nkqwfuryonbimqersh.webp",
    mobilePath:
      "https://res.cloudinary.com/djhageblb/image/upload/v1772694486/wfnmf2oicgh1vo4viidf.jpg",
    alt: "Artisan Lemon & Raspberry Cake",
  },
  {
    desktopPath:
      "https://res.cloudinary.com/djhageblb/image/upload/v1772183988/mpjgjm41x4jpseuyl8f2.webp",
    mobilePath:
      "https://res.cloudinary.com/djhageblb/image/upload/v1772694484/gi8jfphwvjmhd8hhdbrv.jpg",
    alt: "Elegant Vanilla Bean Anniversary Cake",
  },
  {
    desktopPath:
      "https://res.cloudinary.com/djhageblb/image/upload/v1772183979/ebg2qyirjlqxzr8qfbjj.webp",
    mobilePath:
      "https://res.cloudinary.com/djhageblb/image/upload/v1772694486/fjnvlx5mwl8singkfazs.jpg",
    alt: "Custom Birthday Cake with Fresh Flowers",
  },
  {
    desktopPath:
      "https://res.cloudinary.com/djhageblb/image/upload/v1772183997/iawbqjsoz1qojn0oswub.webp",
    mobilePath:
      "https://res.cloudinary.com/djhageblb/image/upload/v1772694486/girbex8326fna4o0lppl.jpg",
    alt: "Decadent Red Velvet Celebration Cake",
  },
  {
    desktopPath:
      "https://res.cloudinary.com/djhageblb/image/upload/v1772227955/ztepgn4o1xo3ebdy4bly.jpg",
    mobilePath:
      "https://res.cloudinary.com/djhageblb/image/upload/v1772694484/ecwukvdygm8mnsk6wabs.jpg",
    alt: "Artisan Lemon & Raspberry Cake",
  },
  {
    desktopPath:
      "https://res.cloudinary.com/djhageblb/image/upload/v1772184006/hqkjjvftjurwmnkfl6xp.webp",
    mobilePath:
      "https://res.cloudinary.com/djhageblb/image/upload/v1772694483/gydogqjah4hyhzjadnaz.jpg",
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

export const intro = {
  header: `Where Flour Meets Imagination`,
  subheader: `Crafting unforgettable centerpieces for life's sweetest moments`,
  part_1: `At TheWhiskCorner, we believe that every great celebration
                deserves a centerpiece as unique as the story behind it. We
                don't just bake cakes; we craft edible memories tailored to your
                exact vision.`,
  part_2: `Using only the highest quality ingredients and a meticulous eye
                for detail, our mission is to turn your sweetest dreams into
                unforgettable, melt-in-your-mouth realities. From elegant
                wedding tiers to whimsical birthday treats, we pour our passion
                into every whisk, fold, and frost.`,
  image: `https://res.cloudinary.com/djhageblb/image/upload/v1775050717/xjmexdwexyietny0ong1.png`,
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

export const STEPS = [
  {
    id: "01",
    title: "Find Inspiration",
    description:
      "Explore our gallery to find your favorite styles and flavors.",
    icon: Search,
    color: "bg-rose-50 text-rose-400 ring-rose-100",
    border: "border-rose-100",
    label: "Step one",
  },
  {
    id: "02",
    title: "Discuss Design",
    description:
      "Chat with our decorators to tailor the design to your vision.",
    icon: MessageSquare,
    color: "bg-orange-50 text-orange-400 ring-orange-100",
    border: "border-orange-100",
    label: "Step two",
  },
  {
    id: "03",
    title: "Request a Quote",
    description: "Share your event details and guest count to get a quote.",
    icon: ClipboardEdit,
    color: "bg-pink-50 text-pink-400 ring-pink-100",
    border: "border-pink-100",
    label: "Step three",
  },
  {
    id: "04",
    title: "We Bake It",
    description:
      "We craft your dream centerpiece from scratch using premium ingredients.",
    icon: ChefHat,
    color: "bg-fuchsia-50 text-fuchsia-400 ring-fuchsia-100",
    border: "border-fuchsia-100",
    label: "Step four",
  },
  {
    id: "05",
    title: "You Celebrate!",
    description: "Pick up your cake or get it delivered, and simply enjoy!",
    icon: PartyPopper,
    color: "bg-purple-50 text-purple-400 ring-purple-100",
    border: "border-purple-100",
    label: "Step five",
  },
]
